"use client";
import React, { useState } from "react";

interface Room {
  roomNumber: number;
  size: number;
  tempSize: number;
}

interface Section {
  sectionNumber: number;
  numberOfRooms: number;
  rooms: Room[];
  showRooms: boolean; // Toggle visibility
}

const Section: React.FC = () => {
  const [numberOfSections, setNumberOfSections] = useState<number>(1);
  const [sections, setSections] = useState<Section[]>([]);

  // Generate sections
  const handleGenerateSections = () => {
    const newSections: Section[] = Array.from(
      { length: numberOfSections },
      (_, i) => ({
        sectionNumber: i + 1,
        numberOfRooms: 1,
        rooms: [],
        showRooms: false,
      })
    );
    setSections(newSections);
  };

  // Handle number of rooms input
  const handleRoomCountChange = (sectionIndex: number, count: number) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              numberOfRooms: count,
              rooms: Array.from({ length: count }, (_, j) => ({
                roomNumber: j + 1,
                size: 30,
                tempSize: 30,
              })),
            }
          : section
      )
    );
  };

  // Toggle room config UI
  const toggleShowRooms = (sectionIndex: number) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? { ...section, showRooms: !section.showRooms }
          : section
      )
    );
  };

  // Temporary input value change
  const handleTempSizeChange = (
    sectionIndex: number,
    roomIndex: number,
    newSize: number
  ) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              rooms: section.rooms.map((room, j) =>
                j === roomIndex ? { ...room, tempSize: newSize } : room
              ),
            }
          : section
      )
    );
  };

  // Apply updated size
  const handleApplyRoomSize = (sectionIndex: number, roomIndex: number) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              rooms: section.rooms.map((room, j) =>
                j === roomIndex ? { ...room, size: room.tempSize } : room
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Number of Sections */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Sections
          </label>
          <input
            type="number"
            min={1}
            value={numberOfSections}
            onChange={(e) => setNumberOfSections(+e.target.value)}
            className="w-40 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <button
          onClick={handleGenerateSections}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm mt-2"
        >
          Generate Sections
        </button>
      </div>

      {/* Step 2: Per Section Config */}
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="border border-gray-300 rounded-2xl p-6 shadow-sm bg-white"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📦 Section {section.sectionNumber}
          </h3>

          {/* Number of Rooms */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Rooms in Section {section.sectionNumber}
            </label>
            <input
              type="number"
              min={1}
              value={section.numberOfRooms}
              onChange={(e) =>
                handleRoomCountChange(sectionIndex, +e.target.value)
              }
              className="w-40 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Toggle Room Config Button */}
          <button
            onClick={() => toggleShowRooms(sectionIndex)}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            {section.showRooms ? "Hide Rooms" : "Show Rooms"}
          </button>

          {/* Room UI */}
          {section.showRooms && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.rooms.map((room, roomIndex) => (
                <div
                  key={roomIndex}
                  className="border border-gray-200 p-4 rounded-xl"
                >
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Room {room.roomNumber}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={room.tempSize}
                    onChange={(e) =>
                      handleTempSizeChange(
                        sectionIndex,
                        roomIndex,
                        +e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => handleApplyRoomSize(sectionIndex, roomIndex)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    Update Size
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Saved: {room.size} students
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Section;
