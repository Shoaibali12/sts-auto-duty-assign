import React from "react";

interface InstructionCategoryInputProps {
  instructionFields: { [category: string]: string };
  setInstructionFields: React.Dispatch<
    React.SetStateAction<{ [category: string]: string }>
  >;
  onSaveInstructions?: () => void;
}

const instructionCategories = [
  "General Instructions",
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

const InstructionCategoryInput: React.FC<InstructionCategoryInputProps> = ({
  instructionFields,
  setInstructionFields,
  onSaveInstructions,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
    if (!(category in instructionFields)) {
      setInstructionFields((prev) => ({
        ...prev,
        [category]: "",
      }));
    }
  };

  const handleInstructionChange = (text: string) => {
    if (selectedCategory) {
      setInstructionFields((prev) => ({
        ...prev,
        [selectedCategory]: text,
      }));
    }
  };

  return (
    <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 max-w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 border-b pb-3">
        🗂 Select Instruction Category
      </h2>

      {/* Radio Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {instructionCategories.map((category) => (
          <label
            key={category}
            className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="instructionCategory"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleRadioChange(category)}
              className="accent-blue-600 h-4 w-4"
            />
            <span className="font-medium">{category}</span>
          </label>
        ))}
      </div>

      {/* Instruction Textarea + Save */}
      {selectedCategory && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ✏️ {selectedCategory}
            </label>
            <textarea
              rows={4}
              placeholder={`Write instructions for ${selectedCategory.toLowerCase()}...`}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              value={instructionFields[selectedCategory] || ""}
              onChange={(e) => handleInstructionChange(e.target.value)}
            />
          </div>

          <button
            onClick={onSaveInstructions}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          >
            💾 Save Instructions
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructionCategoryInput;
