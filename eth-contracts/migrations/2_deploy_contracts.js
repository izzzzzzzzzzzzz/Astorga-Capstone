// // migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SquareVerifier);
//   deployer.deploy(SolnSquareVerifier);
// };

// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
// var Verifier = artifacts.require("./Verifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
module.exports = function(deployer) {
    console.log('HERE');
	deployer.deploy(Verifier).then(() => {
        return deployer.deploy(SolnSquareVerifier, Verifier.address);
    });
    // console.log('HERE');
    // deployer.deploy(SolnSquareVerifier, Verifier.address);
    //deployer.deploy(Verifier);
    //  deployer.deploy(SolnSquareVerifier, "0xE981FC6275CB40a38F2B92b9a7bF438F71Aa9BC7");
};