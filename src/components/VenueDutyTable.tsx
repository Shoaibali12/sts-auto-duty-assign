"use client";

import React from "react";
import campusesBlocks from "@/data/campuses_blocks.json";
import { assignDutiesByMethod } from "@/utils/assignDutiesByMethod";

export interface VenueDutyTableProps {
  method: "RS" | "SRS" | "CS";
  venueType: "academic" | "hall";
  campusName: string;
  blocks: { name: string; subBlocks: string[] }[] | string[];
  blockLabel: string;
}

const BLOCK_CAPACITY = 30;

const VenueDutyTable: React.FC<VenueDutyTableProps> = ({
  method,
  venueType,
}) => {
  const firstCampus = campusesBlocks[0];
  const campusName = firstCampus?.campus || "N/A";

  const academicBlock = firstCampus.blocks.find(
    (block: any) => typeof block === "object" && block.subBlocks
  ) as { name: string; subBlocks: string[] } | undefined;

  const blocks = academicBlock?.subBlocks || [];
  const roles = assignDutiesByMethod(blocks.length, venueType, method);

  const firstSupervisor = roles.supervisors[0]?.NAME || "N/A";

  return (
    <div className=" bg-white rounded shadow">
      <h2 className="text-center text-lg font-semibold border-t border-b bg-gray-200 p-1">
        Venue {(academicBlock?.name || "Academic Block I").replace("-", " ")},{" "}
        {campusName}
      </h2>

      <p className="text-center p-1 font-medium border-t border-b bg-gray-300">
        Center Incharge:{" "}
        <span className="font-semibold">
          {roles.centerIncharges[0]?.NAME || "N/A"}
        </span>
      </p>
      <p className=" font-semibold text-center px-4 py-1 bg-gray-200 border">
        Supervisor: {firstSupervisor}
      </p>

      {/* TABLE HEADER */}
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Block#</th>
            <th className="border p-2">Seat# From</th>
            <th className="border p-2">Seat# To</th>
            <th className="border p-2">Capacity</th>
            <th className="border p-2">Invigilator</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block: string, index: number) => {
            const seatFrom = index * BLOCK_CAPACITY + 1;
            const seatTo = seatFrom + BLOCK_CAPACITY - 1;
            const invigilator = roles.invigilators[index]?.NAME || "N/A";

            // For 2nd+ supervisor groups, inject supervisor heading within table
            const showSupervisorHeader = index !== 0 && index % 10 === 0;
            const supervisorIndex = Math.floor(index / 10);
            const supervisor =
              roles.supervisors[supervisorIndex]?.NAME || "N/A";

            return (
              <React.Fragment key={index}>
                {showSupervisorHeader && (
                  <tr>
                    <td
                      colSpan={6}
                      className="font-semibold text-center px-4 py-1 bg-gray-200 border"
                    >
                      Supervisor: {supervisor}
                    </td>
                  </tr>
                )}

                <tr className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{block}</td>
                  <td className="border p-2">{seatFrom}</td>
                  <td className="border p-2">{seatTo}</td>
                  <td className="border p-2">{BLOCK_CAPACITY}</td>
                  <td className="border p-2">{invigilator}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className=" px-4 py-2 text-left border">
        <p>
          <span className="font-semibold">
            {(academicBlock?.name.replace("-", " ") || "Academic Block I") +
              " (Coordinators):"}
          </span>{" "}
          {roles.coordinators.map((c: any) => c.NAME).join(", ") || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default VenueDutyTable;
