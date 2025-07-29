import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import BlockConfigForm from "./BlockConfigForm";
import { dummySupervisors } from "../../data/constants";
import { customSelectStyles } from "../../utils/selectStyles"; // import your custom styles function

interface BlockDetails {
  rooms: number;
  studentsPerRoom: number;
  supervisor: string;
  supportRoles: string[];
}

interface CampusBlockConfigProps {
  selectedBlock: string | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<string | null>>;
  blockDetails: { [block: string]: BlockDetails };
  setBlockDetails: React.Dispatch<
    React.SetStateAction<{ [block: string]: BlockDetails }>
  >;
  supervisors: string[];
  supportRoles: string[];
}

const campusOptions = [
  { value: "main", label: "Sukkur IBA University, Main Campus" },
  { value: "kandkot", label: "Sukkur IBA University, Kandkot Campus" },
  { value: "mirpurkhas", label: "Sukkur IBA University, Mirpurkhas Campus" },
  { value: "kherpur", label: "Sukkur IBA University, Kherpur Campus" },
];

const blockOptions = [
  { value: "Block-1", label: "Block-I" },
  { value: "Block-2", label: "Block-II" },
  { value: "Block-3", label: "Block-III" },
  { value: "Block-4", label: "Block-IV" },
];

type OptionType = { value: string; label: string };

const CampusBlockConfig: React.FC<CampusBlockConfigProps> = ({
  selectedBlock,
  setSelectedBlock,
  blockDetails,
  setBlockDetails,
  supervisors,
  supportRoles,
}) => {
  const [selectedCampus, setSelectedCampus] =
    useState<SingleValue<OptionType>>(null);

  const handleSelectCampus = (option: SingleValue<OptionType>) => {
    setSelectedCampus(option);
    setSelectedBlock(null); // Clear block selection when campus changes
  };

  const handleSelectBlock = (option: SingleValue<OptionType>) => {
    setSelectedBlock(option ? option.value : null);
  };

  const selectedCampusOption = selectedCampus || null;
  const selectedOption =
    blockOptions.find((opt) => opt.value === selectedBlock) || null;

  const config = selectedBlock
    ? blockDetails[selectedBlock] || {
        rooms: 0,
        studentsPerRoom: 0,
        supervisor: dummySupervisors[0],
        supportRoles: [],
      }
    : null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Academic Block Configuration
        </h2>
        <span className="text-sm text-gray-500 italic">
          Configure each block’s room and staffing
        </span>
      </div>

      {/* Campus Dropdown */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Campus
        </label>
        <Select<OptionType>
          options={campusOptions}
          value={selectedCampusOption}
          onChange={handleSelectCampus}
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Choose a campus..."
          styles={customSelectStyles<OptionType>(430)} // use your custom style with width 430
        />
      </div>

      {/* Academic Block Dropdown (disabled until campus selected) */}
      <div className="mb-8 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Academic Block
        </label>
        <Select<OptionType>
          options={blockOptions}
          value={selectedOption}
          onChange={handleSelectBlock}
          isClearable
          isDisabled={!selectedCampus}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={
            selectedCampus ? "Choose a block..." : "Select campus first"
          }
          styles={customSelectStyles<OptionType>(200)} // narrower width for block selector
        />
      </div>

      {selectedBlock && config ? (
        <div className="transition-all duration-300 ease-in-out">
          <BlockConfigForm
            block={selectedBlock}
            config={config}
            setBlockDetails={setBlockDetails}
          />
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-500 italic">
          Please select a block to configure its settings.
        </div>
      )}
    </div>
  );
};

export default CampusBlockConfig;
