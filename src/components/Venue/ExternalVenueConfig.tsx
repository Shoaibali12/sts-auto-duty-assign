import React, { useState } from "react";
import { ExternalProps } from "./types";
import { dummySupervisors, supportOptions } from "../../data/constants";
import SupportRoleSelector from "../SupportRoleSelector";
import { customSelectStyles } from "@/utils/selectStyles";
import Select, { SingleValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

const venueOptions: OptionType[] = [
  { value: "Nawabshah Public School", label: "Nawabshah Public School" },
  { value: "Hyderabad Public School", label: "Hyderabad Public School" },
  { value: "Karachi Public School", label: "Karachi Public School" },
  { value: "Sukkur Public School", label: "Sukkur Public School" },
  { value: "Larkana Public School", label: "Larkana Public School" },
  { value: "Ubaid Public School", label: "Ubaid Public School" },
];

const supervisorOptions: OptionType[] = dummySupervisors.map((name) => ({
  value: name,
  label: name,
}));

const ExternalVenueConfig: React.FC<ExternalProps> = ({
  numberOfBlocks,
  setNumberOfBlocks,
  studentsPerBlock,
  setStudentsPerBlock,
  supervisors,
  setSupervisors,
  blocksPerSupervisor,
  setBlocksPerSupervisor,
  supportRoles,
  setSupportRoles,
}) => {
  // Use OptionType or null for react-select value type
  const [selectedVenue, setSelectedVenue] = useState<OptionType | null>(null);
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<OptionType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddSupervisor = () => {
    if (selectedSupervisor && !supervisors.includes(selectedSupervisor.value)) {
      setSupervisors([...supervisors, selectedSupervisor.value]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        External Venue Configuration
      </h3>

      {/* Venue Name Dropdown */}
      <div className="flex flex-col w-[300px] mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Select Venue Name
        </label>
        <Select
          options={venueOptions}
          value={selectedVenue}
          onChange={(option) => setSelectedVenue(option as OptionType | null)}
          placeholder="Choose a venue..."
          isClearable
          styles={customSelectStyles(350)}
        />
      </div>

      {/* Config Inputs in One Row */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        {/* Number of Blocks */}
        <div className="flex flex-col w-[180px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Number of Blocks
          </label>
          <input
            type="number"
            min={0}
            value={numberOfBlocks}
            onChange={(e) => setNumberOfBlocks(+e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10"
          />
        </div>

        {/* Students per Block */}
        <div className="flex flex-col w-[180px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Students per Block
          </label>
          <input
            type="number"
            min={0}
            value={studentsPerBlock}
            onChange={(e) => setStudentsPerBlock(+e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 30"
          />
        </div>

        {/* Blocks per Supervisor */}
        <div className="flex flex-col w-[180px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Blocks per Supervisor
          </label>
          <input
            type="number"
            min={0}
            value={blocksPerSupervisor}
            onChange={(e) => setBlocksPerSupervisor(+e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 2"
          />
        </div>

        {/* Supervisor Dropdown */}
        <div className="flex flex-col w-[200px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Select Supervisor
          </label>
          <Select
            options={supervisorOptions}
            value={selectedSupervisor}
            onChange={(option) =>
              setSelectedSupervisor(option as OptionType | null)
            }
            placeholder="Select a supervisor..."
            isClearable
            styles={customSelectStyles(250)}
          />
        </div>

        {/* Add Supervisor Button */}
        <div className="flex flex-col">
          <label className="invisible">Add</label>
          <button
            type="button"
            onClick={handleAddSupervisor}
            className="ml-12 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            disabled={!selectedSupervisor}
          >
            Add Supervisor
          </button>
        </div>
      </div>

      {/* Support Roles */}
      <SupportRoleSelector
        supportRoles={supportRoles}
        setSupportRoles={setSupportRoles}
        supportOptions={supportOptions}
      />

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="absolute top-full -mt-56 right-40 z-50 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 text-green-700 text-sm font-medium border border-green-300">
          <span className="text-green-600 text-xl">✅</span>
          Supervisor added successfully
        </div>
      )}
    </div>
  );
};

export default ExternalVenueConfig;
