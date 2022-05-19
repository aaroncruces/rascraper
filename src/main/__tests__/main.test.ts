const path = require("path");
jest.setTimeout(500000); //if testing screenscraper online (goes really slow sometimes)
jest.mock("../../io/apiRequest");
