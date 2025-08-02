// components/Venue/BlockConfigForm.tsx
import React from "react";
import { supportOptions } from "../../data/constants";
import SupportRoleSelector from "../SupportRoleSelector";
import Section from "./Section";

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
          supervisor: prev[block]?.supervisor ?? "",
        },
      };
    });
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h4 className="text-xl font-bold text-gray-700 mb-6">
        🏢 Configuration for {block}
      </h4>
      <Section />

      {/* Support Roles */}
      <div>
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
