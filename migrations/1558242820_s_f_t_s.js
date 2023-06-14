const sftsMigration = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(sftsMigration);
};
