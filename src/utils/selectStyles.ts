// utils/selectStyles.ts
import { StylesConfig } from "react-select";

export function customSelectStyles<OptionType = unknown>(
  width: number = 430
): StylesConfig<OptionType, false> {
  return {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.75rem",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      backgroundColor: state.isDisabled ? "#f9fafb" : "white",
      boxShadow: "none",
      paddingLeft: "2px",
      width,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 50,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
  };
}
