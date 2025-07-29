// components/Venue/BlockConfigForm.tsx
import React from "react";
import Select, { SingleValue } from "react-select";
import { dummySupervisors, supportOptions } from "../../data/constants";
import SupportRoleSelector from "../SupportRoleSelector";
import { customSelectStyles } from "@/utils/selectStyles";
interface OptionType {
  value: string;
  label: string;
}

interface BlockConfigFormProps {
  block: string;
  config: {
    rooms: number;
    studentsPerRoom: number;
    supervisor: string;
    supportRoles: string[];
  };
  setBlockDetails: React.Dispatch<
    React.SetStateAction<{
      [block: string]: {
        rooms: number;
        studentsPerRoom: number;
        supervisor: string;
        supportRoles: string[];
      };
    }>
  >;
}

const BlockConfigForm: React.FC<BlockConfigFormProps> = ({
  block,
  config,
  setBlockDetails,
}) => {
  const handleBlockFieldChange = (
    field: "rooms" | "studentsPerRoom" | "supervisor",
    value: number | string
  ) => {
    setBlockDetails((prev) => ({
      ...prev,
      [block]: {
        ...prev[block],
        [field]: value,
        supportRoles: prev[block]?.supportRoles ?? [],
        supervisor:
          field === "supervisor"
            ? (value as string)
            : prev[block]?.supervisor ?? dummySupervisors[0],
      },
    }));
  };

  const setSupportRoles = (value: React.SetStateAction<string[]>) => {
    setBlockDetails((prev) => {
      const newRoles =
        typeof value === "function"
          ? (value as (prev: string[]) => string[])(
              prev[block]?.supportRoles ?? []
            )
          : value;

      return {
        ...prev,
        [block]: {
          ...prev[block],
          supportRoles: newRoles,
          supervisor: prev[block]?.supervisor ?? dummySupervisors[0],
        },
      };
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h4 className="text-xl font-bold text-gray-700 mb-6">
        🏢 Configuration for {block}
      </h4>

      {/* Rooms, Students per Room, Supervisor in one row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Rooms */}
        <div className="max-w-[10rem]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rooms
          </label>
          <input
            type="number"
            min={0}
            value={config.rooms ?? 0}
            onChange={(e) => handleBlockFieldChange("rooms", +e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 5"
          />
        </div>
        {/* Students per Room */}
        <div className="max-w-[12rem]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Students/Room
          </label>
          <input
            type="number"
            min={0}
            value={config.studentsPerRoom ?? 0}
            onChange={(e) =>
              handleBlockFieldChange("studentsPerRoom", +e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 30"
          />
        </div>
        {/* Supervisor */}
        <div className="max-w-[18rem]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supervisor
          </label>
          <Select<OptionType>
            options={dummySupervisors.map((name) => ({
              value: name,
              label: name,
            }))}
            value={
              config.supervisor
                ? { value: config.supervisor, label: config.supervisor }
                : null
            }
            onChange={(selected: SingleValue<OptionType>) =>
              handleBlockFieldChange("supervisor", selected?.value || "")
            }
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Choose a supervisor..."
            styles={customSelectStyles(260)} // Width customized
          />
        </div>{" "}
      </div>

      {/* Support Roles */}
      <div className="mt-6">
        <SupportRoleSelector
          supportRoles={config.supportRoles ?? []}
          setSupportRoles={setSupportRoles}
          supportOptions={supportOptions}
        />
      </div>
    </div>
  );
};

export default BlockConfigForm;
