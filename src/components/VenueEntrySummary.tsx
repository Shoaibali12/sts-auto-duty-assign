// components/VenueEntrySummary.tsx
import React from "react";

interface VenueEntry {
  type: string;
  name?: string;
  supportRoles?: string[];
}

type Props = {
  entries: VenueEntry[];
};

const VenueEntrySummary: React.FC<Props> = ({ entries }) => {
  if (entries.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Added Venues</h3>
      <ul className="list-disc list-inside">
        {entries.map((entry, index) => (
          <li key={index} className="text-gray-700">
            {entry.type.toUpperCase()}: {entry.name} (
            {entry.supportRoles?.length || 0} roles assigned)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueEntrySummary;
