import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import {
  ScreenScraperLanguages,
  ScreenScraperRegions,
} from "../../../interfacesAndStructures/localesAndRegions";
import {
  aeromega_default_SS_ExpectedAssets,
  aeromega_eur_SS_ExpectedAssets,
  aeromega_usa_SS_ExpectedAssets,
} from "../../../mockExampleObjects/screenscraper/assets/aeromega_asset";
import { aerosnes_SS_ExpectedAssets } from "../../../mockExampleObjects/screenscraper/assets/aerosnes_asset";
import { mslug_SS_ExpectedAssets } from "../../../mockExampleObjects/screenscraper/assets/mslug_asset";
import {
  smb2_SS_ExpectedAssets,
  smb2_default_jp_SS_ExpectedAssets,
  smb2_fr_default_SS_ExpectedAssets,
  smb2_fr_jp_SS_ExpectedAssets,
} from "../../../mockExampleObjects/screenscraper/assets/smb2_asset";
import scrape_screenscraper from "../screenscraper";

jest.mock("../../../io/apiRequest");
jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)

describe("--> Screenscraper engine", () => {
  it("Obtains the assets of the game Aero the Acro-Bat (usa) on MegaDrive", async () => {
    await expect(
      scrape_screenscraper(
        "Aero the Acro-Bat (USA).md",
        undefined,
        GameSystems.MEGADRIVE
      )
    ).resolves.toEqual(aeromega_usa_SS_ExpectedAssets);
  });
  it("Obtains the assets of the game Aero the Acro-Bat (eur) on MegaDrive", async () => {
    await expect(
      scrape_screenscraper(
        "Aero the Acro-Bat (Europe).md",
        undefined,
        GameSystems.MEGADRIVE
      )
    ).resolves.toEqual(aeromega_eur_SS_ExpectedAssets);
  });
  it("Obtains the assets of the game Aero the Acro-Bat.zip without defined system", async () => {
    await expect(
      scrape_screenscraper("Aero the Acro-Bat.zip")
    ).resolves.toEqual(aeromega_default_SS_ExpectedAssets);
  });

  it("Obtains the assets of the game Aero the Acro-Bat on Super Nintendo", async () => {
    await expect(
      scrape_screenscraper(
        "Aero the Acro-Bat (USA).sfc",
        undefined,
        GameSystems.SNES
      )
    ).resolves.toEqual(aerosnes_SS_ExpectedAssets);
  });

  it("Obtains the assets of super mario bros 2 (NES) with default parameters", async () => {
    await expect(
      scrape_screenscraper("Super Mario Bros. 2 (USA).zip")
    ).resolves.toEqual(smb2_SS_ExpectedAssets);
  });
  it("Obtains the assets of super mario bros 2 (NES) with custom region and custom language", async () => {
    await expect(
      scrape_screenscraper(
        "Super Mario Bros. 2 (USA).zip",
        undefined,
        undefined,
        ScreenScraperLanguages.FR,
        ScreenScraperRegions.JP
      )
    ).resolves.toEqual(smb2_fr_jp_SS_ExpectedAssets);
  });
  it("Obtains the assets of super mario bros 2 (NES) with custom language and wrong region", async () => {
    await expect(
      scrape_screenscraper(
        "Super Mario Bros. 2 (USA).zip",
        undefined,
        undefined,
        ScreenScraperLanguages.FR,
        "wrong"
      )
    ).resolves.toEqual(smb2_fr_default_SS_ExpectedAssets);
  });
  it("Obtains the assets of super mario bros 2 (NES) with custom region and wrong language", async () => {
    await expect(
      scrape_screenscraper(
        "Super Mario Bros. 2 (USA).zip",
        undefined,
        undefined,
        "wrong",
        ScreenScraperRegions.JP
      )
    ).resolves.toEqual(smb2_default_jp_SS_ExpectedAssets);
  });
  it("Obtains the assets of super mario bros 2 (NES) with wrong both language and region", async () => {
    await expect(
      scrape_screenscraper(
        "Super Mario Bros. 2 (USA).zip",
        undefined,
        undefined,
        "wrong",
        "wrong"
      )
    ).resolves.toEqual(smb2_SS_ExpectedAssets);
  });
  it("Obtains the assets of the game metal slug", async () => {
    await expect(scrape_screenscraper("mslug.zip")).resolves.toEqual(
      mslug_SS_ExpectedAssets
    );
  });
  // //takes too long if testing it against the real web api . TODO: see why
  // //test invalid each param
  // it("Obtains {} from a random non existant rom in the db", async () => {
  //   await expect(scrape_screenscraper("somerandomfile")).resolves.toEqual({});
  // });
});
