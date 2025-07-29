"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [method, setMethod] = useState<"RS" | "SRS" | "CS" | null>(null);
  const router = useRouter();

  const handleGenerate = () => {
    if (!method) {
      alert("Please select a sampling method");
      return;
    }

    router.push(`/report?method=${method}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Auto Duty Assignment
        </h1>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sampling"
              value="RS"
              onChange={() => setMethod("RS")}
              checked={method === "RS"}
            />
            Random Sampling (RS)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sampling"
              value="SRS"
              onChange={() => setMethod("SRS")}
              checked={method === "SRS"}
            />
            Stratified Sampling (SRS)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sampling"
              value="CS"
              onChange={() => setMethod("CS")}
              checked={method === "CS"}
            />
            Convenient Sampling (CS)
          </label>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Generate Report
        </button>
      </div>
    </main>
  );
};

export default HomePage;
