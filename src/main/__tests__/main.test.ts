import { getGameNamesAndCRCList } from "../main";

describe("IO Interaction", () => {
  it("should get a list of games from a folder", async () => {
    await expect(getGameNamesAndCRCList()).resolves.toEqual([]);
  });
});
