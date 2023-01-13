var Voting = artifacts.require("./Voting.sol");
var TokenERC20 = artifacts.require("./TokenERC20.json.sol");

module.exports = function(deployer) {
    deployer.deploy(Voting)
    deployer.deploy(TokenERC20);
};