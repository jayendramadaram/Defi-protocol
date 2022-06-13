const { assert } = require("chai");

var PantherToken = artifacts.require("PantherToken");
var USN = artifacts.require("USN");
var LPOOL = artifacts.require("LPOOL");

require("chai").use(require("chai-as-promised")).should();

contract("LPOOL", (accounts) => {
  let usn, PNT, tokenFarm;
  before(async () => {
    usn = await USN.new();
    PNT = await PantherToken.new();
    tokenFarm = await LPOOL.new(usn.address, PNT.address);
  });

  describe("USN check", async () => {
    it("has a name", async () => {
      const name = await usn.name();
      assert.equal(name, "USN");
    });
  });

  describe("PNT check", async () => {
    it("has a name", async () => {
      const name = await PNT.name();
      assert.equal(name, "PantherToken");
    });
  });

  describe("Token Farm deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });
  });
});

// urls
// https://ropsten.etherscan.io/address/0x19360bfea94E6908bC4D74525F7aBE4D65f850D8
// https://ropsten.etherscan.io/address/0xb6B68F90786712b7f50aF07B10DC3F8C0f713aE4
// https://ropsten.etherscan.io/address/0x5Cfb95f9e0d63422724B6ce4eeaba68d289723E2
