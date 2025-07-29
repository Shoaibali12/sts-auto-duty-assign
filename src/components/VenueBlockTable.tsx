import React from "react";

interface BlockData {
  blockNumber: number;
  seatFrom: number;
  seatTo: number;
  invigilator: string;
}

interface VenueBlockTableProps {
  venueName: string;
  blockLabel: string;
  centerIncharge: string;
  supervisor: string;
  blocks: BlockData[];
}

const VenueBlockTable: React.FC<VenueBlockTableProps> = ({
  venueName,
  blockLabel,
  centerIncharge,
  supervisor,
  blocks,
}) => {
  return (
    <div className="border border-gray-400 rounded-lg p-6 my-6">
      <h2 className="text-lg font-semibold mb-2">
        Venue Academic ({blockLabel}), {venueName}
      </h2>
      <p className="font-medium text-black">
        Center Incharge: {centerIncharge}
      </p>
      <p className="font-medium text-black mb-4">Supervisor: {supervisor}</p>

      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-sm text-left">
            <th className="border px-2 py-1">S.No</th>
            <th className="border px-2 py-1">Block#</th>
            <th className="border px-2 py-1">Seat# From</th>
            <th className="border px-2 py-1">Seat# To</th>
            <th className="border px-2 py-1">Capacity</th>
            <th className="border px-2 py-1">Invigilator Name</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index} className="text-sm">
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{block.blockNumber}</td>
              <td className="border px-2 py-1">{block.seatFrom}</td>
              <td className="border px-2 py-1">{block.seatTo}</td>
              <td className="border px-2 py-1">
                {block.seatTo - block.seatFrom + 1}
              </td>
              <td className="border px-2 py-1">{block.invigilator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueBlockTable;
