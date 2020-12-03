// pragma solidity >=0.4.21 <0.6.0;
pragma solidity >=0.5.0;
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
//     // function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool r);
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    SquareVerifier private verifierContract;
    
    constructor(address verifierAddress) CustomERC721Token() public {
        verifierContract = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        // uint256 solutionIndex;
        // address solutionAddress;
        // // bool solutionExists;
        // // bool minted;
        // bytes32 hash;
        // bytes32 index;
        uint256 tokenId;
        address to;
        bytes32 tokenHash;
        bool exist;
    }

    // TODO define an array of the above struct
    mapping(uint256 => Solution) solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address to, uint256 tokenId,  bytes32 tokenHash);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
        
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));
        require(!uniqueSolutions[solutionHash], "Solution already exists");

        // bool check = verifyTx(a, b, c, input);

        // require(verifyTx(a, b, c, input), "Proof is not valid");

        // await this.contract.addSolution(tokenHolder, 1, proof, otherAccount, {from: owner});

        Solution memory solution = Solution(tokenId, to, solutionHash, true);
        solutions[tokenId] = solution;
        uniqueSolutions[solutionHash] = true;


        // uniqueSolutions[solutionHash] = Solution({index: counter, to: msg.sender, tokenHash: solutionHash});
        // counter+=1;
        // bool verified = verifierContract.verifyTx(a, b, c, input);


        // Solution memory _soln = Solution({tokenId: _index, to: _to});
        // submittedSolutions.push(_soln);
        // uniqueSolutions[_tokenHash] = _soln;

        
        emit SolutionAdded(to, tokenId, solutionHash);
        // require(verified, "Solution could not be verified");

        // solutions[solutionHash] = Solution(numberOfSolutions, msg.sender, true, false);
        
        // emit SolutionAdded(numberOfSolutions, msg.sender);
        // numberOfSolutions = numberOfSolutions + 1;
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mint(address to, uint256 tokenId) public returns(bool){
        // bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));
        // let result = await this.contract.mintNewNFT(account_two, 2, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, {from: account_one});
        // require(uniqueSolutions[solutionHash].solutionAddress == true, "Solution does not exist");
        // require(uniqueSolutions[solutionHash].minted == false, "Token already minted");
        // require(uniqueSolutions[solutionHash].to == address(0), "Sender does not match address");
        require(solutions[tokenId].exist, "Duplicate solution");
        // require(verifierContract.)
        // super.mint(_solutionAddress, uniqueSolutions[solutionHash].solutionIndex);
        // uniqueSolutions[solutionHash].minted = true;

        //addSolution(a, b, c, input);
        //emit SolutionAdded(msg.sender, counter, solutionHash);
        return super.mint(to, tokenId);
    }
}




























