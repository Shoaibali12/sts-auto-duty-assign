import React, { useState } from "react";
import VenueSelector from "./Venue/VenueSelector";
import CampusBlockConfig from "./Venue/CampusBlockConfig";
import { BlockDetails } from "./Venue/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InstructionCategoryInput from "./Venue/InstructionCategoryInput";

interface TestInfo {
  testTitle: string;
  testDate: Date | null;
  totalStudents: number;
}

const GeneralTestInformationForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [testInfo, setTestInfo] = useState<TestInfo>({
    testTitle: "",
    testDate: null,
    totalStudents: 0,
  });

  const [instructionFields, setInstructionFields] = useState<{
    [category: string]: string;
  }>({});

  const [venueType, setVenueType] = useState<string>("");

  // Campus/External Shared State
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [blockDetails, setBlockDetails] = useState<BlockDetails>({});
  const [supervisors, setSupervisors] = useState<string[]>([]);
  const [supportRoles, setSupportRoles] = useState<string[]>([]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-lg md:text-2xl font-semibold mb-10 text-center text-gray-800">
        General Test Information
      </h2>

      {/* Step 1: General Info */}
      {step === 1 && (
        <>
          <div className="bg-white rounded-2xl shadow-lg p-8 border mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Test Title */}
              <div className="md:col-span-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  📝 Test Title
                </label>
                <input
                  type="text"
                  placeholder="Enter test title"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={testInfo.testTitle}
                  onChange={(e) =>
                    setTestInfo({ ...testInfo, testTitle: e.target.value })
                  }
                />
              </div>

              {/* Test Date */}
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  📅 Test Date
                </label>
                <DatePicker
                  selected={testInfo.testDate}
                  onChange={(date) =>
                    setTestInfo({ ...testInfo, testDate: date })
                  }
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              {/* Total Students */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  👥 Total Students
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={testInfo.totalStudents}
                  onChange={(e) =>
                    setTestInfo({ ...testInfo, totalStudents: +e.target.value })
                  }
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <InstructionCategoryInput
                instructionFields={instructionFields}
                setInstructionFields={setInstructionFields}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Save and Continue →
            </button>
          </div>
        </>
      )}

      {/* Step 2: Venue Selector and Config */}
      {step === 2 && (
        <>
          <VenueSelector
            selectedType={venueType}
            onTypeChange={(type) => setVenueType(type)}
          />

          {venueType && (
            <CampusBlockConfig
              venueType={venueType}
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
              blockDetails={blockDetails}
              setBlockDetails={setBlockDetails}
              supervisors={supervisors}
              supportRoles={supportRoles}
            />
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              ← Back
            </button>

            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralTestInformationForm;
