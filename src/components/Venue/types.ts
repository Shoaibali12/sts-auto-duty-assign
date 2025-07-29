// components/Venue/types.ts

export interface BlockData {
  rooms: number;
  studentsPerRoom: number;
  supervisor: string;
  supportRoles: string[];
}

export interface BlockDetails {
  [blockName: string]: BlockData;
}

export interface CampusProps {
  selectedBlocks: string[]; // e.g., "AB I", "AB II"
  setSelectedBlocks: React.Dispatch<React.SetStateAction<string[]>>;

  blockDetails: BlockDetails;
  setBlockDetails: React.Dispatch<React.SetStateAction<BlockDetails>>;

  supervisors: string[];
  setSupervisors: React.Dispatch<React.SetStateAction<string[]>>;

  supportRoles: string[];
  setSupportRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ExternalProps {
  numberOfBlocks: number;
  setNumberOfBlocks: React.Dispatch<React.SetStateAction<number>>;

  studentsPerBlock: number;
  setStudentsPerBlock: React.Dispatch<React.SetStateAction<number>>;

  supervisors: string[];
  setSupervisors: React.Dispatch<React.SetStateAction<string[]>>;

  blocksPerSupervisor: number;
  setBlocksPerSupervisor: React.Dispatch<React.SetStateAction<number>>;

  supportRoles: string[];
  setSupportRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface VenueSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}
