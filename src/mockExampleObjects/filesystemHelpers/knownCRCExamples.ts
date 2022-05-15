import { FileCRCStruct } from "../../interfacesAndStructures/FileCRCStruct";
export const CRCTestFile = "CRCTest.txt";
export const knowCRCExampleList: Array<FileCRCStruct> = [
  {
    //a file inside this exact same folder
    filename: CRCTestFile,
    crc: "9fdfdd95",
  },
  {
    filename: "Aero the Acro-Bat (Europe).md",
    crc: "1a3eaf57",
    fileRoute: "romsandbox/Aero the Acro-Bat (Europe).md",
  },
  {
    filename: "Aero the Acro-Bat (Europe).sfc",
    crc: "fa0ce63a",
    fileRoute: "romsandbox/Aero the Acro-Bat (Europe).sfc",
  },
  {
    filename: "Aero the Acro-Bat (USA).md",
    crc: "a3a7a8b5",
    fileRoute: "romsandbox/Aero the Acro-Bat (USA).md",
  },
  {
    filename: "Aero the Acro-Bat (USA).zip",
    crc: "332c8af",
    fileRoute: "romsandbox/Aero the Acro-Bat (USA).zip",
  },
  {
    filename: "Super Mario Bros. 2 (USA).nes",
    crc: "7d3f6f3d",
    fileRoute: "romsandbox/Super Mario Bros. 2 (USA).nes",
  },
];
