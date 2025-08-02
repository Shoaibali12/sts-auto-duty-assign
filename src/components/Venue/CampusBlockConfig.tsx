// CampusBlockConfig.tsx
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import BlockConfigForm from "./BlockConfigForm";
import {
  dummySupervisors,
  campusOptions,
  blockOptions,
  venueOptions,
} from "../../data/constants";
import { customSelectStyles } from "../../utils/selectStyles";

interface BlockDetails {
  rooms: number;
  studentsPerRoom: number;
  supervisor: string;
  supportRoles: string[];
}

interface CampusBlockConfigProps {
  venueType: string;
  selectedBlock: string | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<string | null>>;
  blockDetails: { [block: string]: BlockDetails };
  setBlockDetails: React.Dispatch<
    React.SetStateAction<{ [block: string]: BlockDetails }>
  >;
  supervisors: string[];
  supportRoles: string[];
}

type OptionType = { value: string; label: string };

const CampusBlockConfig: React.FC<CampusBlockConfigProps> = ({
  venueType,
  selectedBlock,
  setSelectedBlock,
  blockDetails,
  setBlockDetails,
  supervisors,
  supportRoles,
}) => {
  const [selectedCampus, setSelectedCampus] =
    useState<SingleValue<OptionType>>(null);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isExternal = venueType === "external";

  const handleSelectCampus = (option: SingleValue<OptionType>) => {
    setSelectedCampus(option);
    setSelectedBlock(null);
    setSaved(false);
  };

  const handleSelectBlock = (option: SingleValue<OptionType>) => {
    setSelectedBlock(option ? option.value : null);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setShowToast(true);
    setSelectedBlock(null);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const selectedCampusOption = selectedCampus || null;
  const selectedBlockOption =
    blockOptions.find((opt) => opt.value === selectedBlock) || null;

  const configKey =
    (isExternal ? selectedCampus?.value + "-" : "") + (selectedBlock || "");

  const config = blockDetails[configKey] || {
    rooms: 0,
    studentsPerRoom: 0,
    supervisor: dummySupervisors[0],
    supportRoles: [],
  };

  const showConfigForm = selectedCampus && selectedBlock;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 max-w-6xl mx-auto relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {isExternal
            ? "External Venue Configuration"
            : "Academic Block Configuration"}
        </h2>
        <span className="text-sm text-gray-500 italic">
          Configure block rooms and staff
        </span>
      </div>

      {/* Select Campus or External Venue */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isExternal ? "Select External Venue" : "Select Campus"}
        </label>
        <Select<OptionType>
          options={isExternal ? venueOptions : campusOptions}
          value={selectedCampusOption}
          onChange={handleSelectCampus}
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={isExternal ? "Choose a venue..." : "Choose a campus..."}
          styles={customSelectStyles<OptionType>(430)}
        />
      </div>

      {/* Select Block (for both venue types, with label changing) */}
      {selectedCampus && (
        <div className="mb-8 max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isExternal ? "Select Block" : "Select Academic Block"}
          </label>
          <Select<OptionType>
            options={blockOptions}
            value={selectedBlockOption}
            onChange={handleSelectBlock}
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Choose a block..."
            styles={customSelectStyles<OptionType>(200)}
          />
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50">
          ✅ Saved successfully
        </div>
      )}

      {/* Config Form */}
      {showConfigForm && config && !saved ? (
        <div className="transition-all duration-300 ease-in-out">
          <BlockConfigForm
            block={configKey}
            config={config}
            setBlockDetails={setBlockDetails}
          />
          <button
            onClick={handleSave}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-500 italic">
          {isExternal
            ? "Please select a venue and block to configure."
            : "Please select a campus and academic block to configure."}
        </div>
      )}
    </div>
  );
};

export default CampusBlockConfig;
