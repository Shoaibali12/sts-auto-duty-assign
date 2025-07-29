// components/Venue/VenueSelector.tsx
import React from "react";

interface Props {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const VenueSelector: React.FC<Props> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="my-8 px-6 py-5 bg-white rounded-2xl shadow-lg border  max-w-md mx-auto">
      <label className="block mb-3 text-gray-800 font-semibold text-lg">
        Select Venue Type
      </label>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">-- Choose Venue Type --</option>
        <option value="campus">🏫 Campus</option>
        <option value="external">🏢 External Venue</option>
      </select>
    </div>
  );
};

export default VenueSelector;
