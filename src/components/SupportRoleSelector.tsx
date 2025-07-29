// components/SupportRoleSelector.tsx
import React from "react";

interface SupportRoleSelectorProps {
  supportRoles: string[];
  setSupportRoles: React.Dispatch<React.SetStateAction<string[]>>;
  supportOptions: string[];
}

const SupportRoleSelector: React.FC<SupportRoleSelectorProps> = ({
  supportRoles,
  setSupportRoles,
  supportOptions,
}) => {
  const toggleSupportRole = (role: string) => {
    if (supportRoles.includes(role)) {
      setSupportRoles(supportRoles.filter((r) => r !== role));
    } else {
      setSupportRoles([...supportRoles, role]);
    }
  };

  return (
    <fieldset className="border border-gray-200 p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Support Roles</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {supportOptions.map((role) => (
          <label
            key={role}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <input
              type="checkbox"
              checked={supportRoles.includes(role)}
              onChange={() => toggleSupportRole(role)}
              className="form-checkbox h-4 w-4 text-indigo-600 rounded-md border-gray-300"
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default SupportRoleSelector;
