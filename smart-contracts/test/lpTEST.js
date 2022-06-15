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
// https://ropsten.etherscan.io/address/0x54C413630385Ba4e44e5Da23bE3c91577789f1B0 lpool
// https://ropsten.etherscan.io/address/0x7Cc3D492A7181Cc0753754E9948270178a298970  usn
// https://ropsten.etherscan.io/address/0x7b23EB0326a4b77D1d22A37C8Bcf30A5573eC747
