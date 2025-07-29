import faculty from "@/data/faculty.json";
import staff from "@/data/staff.json";
import supportStaff from "@/data/non_invigilation_staff.json";
import config from "@/data/dutyConfig.json";
import { shuffle } from "@/utils/shuffle";

interface Person {
  NAME: string;
  GRADE: number;
  "SENIORITY (DAYS)": number;
  [key: string]: any;
}

interface RoleAssignments {
  centerIncharges: Person[];
  supervisors: Person[];
  invigilators: Person[];
  coordinators: Person[];
  peons: Person[];
  mallis: Person[];
  hallSupport: { role: string; person: Person }[];
}

export const assignDutiesByMethod = (
  totalBlocks: number,
  venueType: "academic" | "hall",
  method: "RS" | "SRS" | "CS"
): RoleAssignments => {
  const seniorFacultyStaff: Person[] = [...faculty, ...staff].filter(
    (p) => p.GRADE >= 17
  );
  const support = supportStaff;

  const {
    centerIncharge,
    supervision,
    invigilation,
    coordination,
    support: supportConfig,
  } = config;

  let sortedList: Person[] = [];

  if (method === "RS") {
    // Random Sampling
    sortedList = shuffle([...seniorFacultyStaff]);
  } else if (method === "SRS") {
    // Stratified Sampling by Grade and Seniority
    const grouped = seniorFacultyStaff.reduce(
      (acc: Record<number, Person[]>, person) => {
        acc[person.GRADE] = acc[person.GRADE] || [];
        acc[person.GRADE].push(person);
        return acc;
      },
      {}
    );

    for (const grade in grouped) {
      grouped[+grade].sort(
        (a, b) => b["SENIORITY (DAYS)"] - a["SENIORITY (DAYS)"]
      );
    }

    sortedList = Object.values(grouped).flat();
  } else if (method === "CS") {
    // Convenient Sampling: Sort by seniority only
    sortedList = [...seniorFacultyStaff].sort(
      (a, b) => b["SENIORITY (DAYS)"] - a["SENIORITY (DAYS)"]
    );
  }

  const roles: RoleAssignments = {
    centerIncharges: [],
    supervisors: [],
    invigilators: [],
    coordinators: [],
    peons: [],
    mallis: [],
    hallSupport: [],
  };

  // Center Incharges
  const ciCount =
    venueType === "hall"
      ? centerIncharge.hallIncharges
      : totalBlocks <= centerIncharge.smallBlockThreshold
      ? centerIncharge.smallBlockIncharges
      : centerIncharge.largeBlockIncharges;

  roles.centerIncharges = sortedList.splice(0, ciCount);

  // Supervisors
  const supervisorCount = Math.ceil(
    totalBlocks / supervision.blocksPerSupervisor
  );
  roles.supervisors = sortedList.splice(0, supervisorCount);

  // Invigilators
  const invigilatorCount = totalBlocks * invigilation.invigilatorsPerBlock;
  roles.invigilators = sortedList.splice(0, invigilatorCount);

  // Coordinators
  const coordinatorCount =
    venueType === "hall" ? coordination.hall.coordinators : 3; // Fixed: Always 3 coordinators per academic campus

  roles.coordinators = sortedList.splice(0, coordinatorCount);

  // Support Roles
  if (venueType === "academic") {
    const peonCount = totalBlocks * supportConfig.academicBlock.peonsPerBlock;
    const mallisCount =
      totalBlocks * supportConfig.academicBlock.mallisPerBlock;
    const sortedSupport = [...support].sort(
      (a, b) => b["SENIORITY (DAYS)"] - a["SENIORITY (DAYS)"]
    );
    roles.peons = sortedSupport.splice(0, peonCount);
    roles.mallis = sortedSupport.splice(0, mallisCount);
  } else {
    const sortedSupport = [...support].sort(
      (a, b) => b["SENIORITY (DAYS)"] - a["SENIORITY (DAYS)"]
    );
    roles.hallSupport = supportConfig.hall.roles.map((role, index) => ({
      role,
      person: sortedSupport[index] || { NAME: "N/A", GRADE: 0 },
    }));
  }

  return roles;
};
