// components/VenueTypeSelector.tsx
import React from "react";

interface Props {
  selectedType: string;
  setSelectedType: (type: string) => void;
  venueName: string;
  setVenueName: (name: string) => void;
}

const VenueTypeSelector: React.FC<Props> = ({
  selectedType,
  setSelectedType,
  venueName,
  setVenueName,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Venue Type
      </label>
      <select
        className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select Venue Type</option>
        <option value="campus">Campus</option>
        <option value="external">External Venue</option>
      </select>

      {selectedType && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue Name
          </label>
          <input
            type="text"
            placeholder="Enter Venue Name"
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default VenueTypeSelector;
