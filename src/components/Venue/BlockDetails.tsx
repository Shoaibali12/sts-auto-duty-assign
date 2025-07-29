// components/Venue/BlockDetails.tsx
import React from "react";
import SupportRoleSelector from "../SupportRoleSelector";
import SupervisorSelector from "./SupervisorSelector";

interface Props {
  blockName: string;
  data: {
    rooms: number;
    roomSize: number;
    supervisor: string;
    supportRoles: string[];
  };
  setData: (data: {
    rooms: number;
    roomSize: number;
    supervisor: string;
    supportRoles: string[];
  }) => void;
  supervisors: string[];
  supportRoles: string[];
}

const BlockDetails: React.FC<Props> = ({
  blockName,
  data,
  setData,
  supervisors,
  supportRoles,
}) => {
  const handleToggleRole = (role: string) => {
    if (data.supportRoles.includes(role)) {
      setData({
        ...data,
        supportRoles: data.supportRoles.filter((r) => r !== role),
      });
    } else {
      setData({ ...data, supportRoles: [...data.supportRoles, role] });
    }
  };

  return (
    <div className="border p-4 rounded mb-4 bg-gray-50">
      <h4 className="font-semibold text-lg mb-2">{blockName} Configuration</h4>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Rooms
        </label>
        <input
          type="number"
          min={1}
          className="w-full max-w-xs border px-3 py-2 rounded"
          value={data.rooms}
          onChange={(e) => setData({ ...data, rooms: +e.target.value })}
        />
        <p className="text-xs text-gray-500 mt-1">
          One room will be reserved for the controller.
        </p>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Size (Students)
        </label>
        <input
          type="number"
          min={1}
          className="w-full max-w-xs border px-3 py-2 rounded"
          value={data.roomSize}
          onChange={(e) => setData({ ...data, roomSize: +e.target.value })}
        />
      </div>

      <SupervisorSelector
        selected={data.supervisor}
        onChange={(supervisor) => setData({ ...data, supervisor })}
        supervisors={supervisors}
      />

      <SupportRoleSelector
        supportRoles={supportRoles}
        selectedRoles={data.supportRoles}
        toggleRole={handleToggleRole}
      />
    </div>
  );
};

export default BlockDetails;
