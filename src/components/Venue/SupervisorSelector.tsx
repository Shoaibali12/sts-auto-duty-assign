// components/Venue/SupervisorSelector.tsx
import React from "react";

interface Props {
  selected: string;
  onChange: (value: string) => void;
  supervisors: string[];
}

const SupervisorSelector: React.FC<Props> = ({
  selected,
  onChange,
  supervisors,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Supervisor</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">-- Select Supervisor --</option>
        {supervisors.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupervisorSelector;
