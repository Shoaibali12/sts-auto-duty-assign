// src/components/VenueSection.tsx
"use client";

import React from "react";
import VenueIntro from "./VenueIntro";
import VenueDutyTable from "./VenueDutyTable";

import fixedRoles from "@/data/fixedRoles.json";
import campuses from "@/data/campuses_blocks.json";
import { useSearchParams } from "next/navigation";

const VenueSection: React.FC = () => {
  const firstCampus = campuses[0]; // Sukkur IBA University, Main Campus
  const searchParams = useSearchParams();
  const method = searchParams.get("method") as "RS" | "SRS" | "CS";

  return (
    <div className="border my-6  ">
      <VenueIntro campusName={firstCampus.campus} fixedRoles={fixedRoles} />

      {/* Render the duty assignment table dynamically */}
      {method && (
        <VenueDutyTable
          method={method}
          campusName={firstCampus.campus}
          blocks={firstCampus.blocks.slice(0, 10)} // only first 10 blocks for demo
          venueType="academic"
          blockLabel="Block-III"
        />
      )}
    </div>
  );
};

export default VenueSection;
