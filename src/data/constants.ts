// constants.ts

export interface OptionType {
  value: string;
  label: string;
}

export const dummySupervisors = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "Diana Prince",
  "Ethan Hunt",
  "Fiona Gallagher",
  "George Clooney",
  "Hannah Montana",
  "Ian McKellen",
  "Julia Roberts",
];

export const supportOptions = [
  "Transportation",
  "Coordination (Pre Team)",
  "Coordination (Post Team)",
  "IT",
  "Janitorial Staff",
  "Engineering Staff",
  "Procurement",
  "Security",
  "Control Room Staff",
];

export const campusOptions: OptionType[] = [
  { value: "main", label: "Sukkur IBA University, Main Campus" },
  { value: "kandkot", label: "Sukkur IBA University, Kandkot Campus" },
  { value: "mirpurkhas", label: "Sukkur IBA University, Mirpurkhas Campus" },
  { value: "kherpur", label: "Sukkur IBA University, Kherpur Campus" },
];

export const blockOptions: OptionType[] = [
  { value: "Block-1", label: "Block-I" },
  { value: "Block-2", label: "Block-II" },
  { value: "Block-3", label: "Block-III" },
  { value: "Block-4", label: "Block-IV" },
];

export const venueOptions: OptionType[] = [
  { value: "Nawabshah Public School", label: "Nawabshah Public School" },
  { value: "Hyderabad Public School", label: "Hyderabad Public School" },
  { value: "Karachi Public School", label: "Karachi Public School" },
  { value: "Sukkur Public School", label: "Sukkur Public School" },
  { value: "Larkana Public School", label: "Larkana Public School" },
  { value: "Ubaid Public School", label: "Ubaid Public School" },
];
