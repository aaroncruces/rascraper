export interface FileCRCPair {
  filename: string;
  crc: string;
}
export const CRCTest_filename = "CRCTest.txt";
export const knowcrc: Array<FileCRCPair> = [
  {
    filename: "mslug.zip",
    crc: "somecrc",
  },
  {
    filename: "Aero the Acro-Bat (USA).sfc",
    crc: "somecrc",
  },
  {
    filename: "Aero the Acro-Bat (USA).smd",
    crc: "somecrc",
  },
  {
    //a file inside this exact same folder
    filename: CRCTest_filename,
    crc: "9fdfdd95",
  },
];
