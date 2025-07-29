// src/components/VenueIntro.tsx
import React from "react";

interface FixedRoles {
  overallTestIncharge: string;
  overallTestCenterIncharge: string;
  testAdministrator: string;
}

interface Props {
  campusName: string;
  fixedRoles: FixedRoles;
}

const VenueIntro: React.FC<Props> = ({ campusName, fixedRoles }) => {
  return (
    <div className="text-center  ">
      <h2 className="text-lg font-semibold bg-gray-300 p-2 border-t border-b ">
        Venue: {campusName}
      </h2>
      <div className="border">
        <p className=" text-left p-1 ">
          Consequent upon the approval of the Vice Chancellor, Sukkur IBA
          University, the following Officials / Staff members are hereby engaged
          / assigned duties for Direct Aptitude Test 2025 (Phase-II) to be held
          on Sunday July 13, 2025.
        </p>
        <p className="text-left font-bold p-1">
          All the concerned are strictly advised to be available on the test day
          at their assigned duty places at <strong>8:00 AM</strong> sharp.
        </p>
      </div>

      <div className="border-t border-b  bg-gray-300 space-y-3">
        <p>
          <strong>Overall Test Incharge:</strong>{" "}
          {fixedRoles.overallTestIncharge}
        </p>
        <p>
          <strong>Overall Test Center Incharge:</strong>{" "}
          {fixedRoles.overallTestCenterIncharge}
        </p>
        <p>
          <strong>Test Administrator:</strong> {fixedRoles.testAdministrator}
        </p>
      </div>
    </div>
  );
};

export default VenueIntro;
