var PantherToken = artifacts.require("PantherToken");
var USN = artifacts.require("USN");
var LPOOL = artifacts.require("LPOOL");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PantherToken);
  const PNT = await PantherToken.deployed();

  await deployer.deploy(USN);
  const usn = await USN.deployed();
  console.log("----------------ADDRESS--------------", usn.address);

  await deployer.deploy(LPOOL, PNT.address, usn.address);
  const lpool = await LPOOL.deployed();
  console.log("----------------ADDRESS--------------", lpool.address);

  // await PNT.transfer(lpool.address, 1000000000000000000000000000000);
};
