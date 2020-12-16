// pragma solidity >=0.4.21 <0.6.0;
pragma solidity >=0.5.0;
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
    
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    SquareVerifier private verifierContract;

    uint256 _index;
    
    constructor(address verifierAddress) CustomERC721Token() public {
        verifierContract = SquareVerifier(verifierAddress);
        _index = 1;
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address toAddress;
        bytes32 solutionHash;
    }

    // TODO define an array of the above struct
    Solution[] solutionsArr;
    uint256 solCount = 0;

    // TODO define a mapping to store unique solutions submitted
    // mapping(bytes32 => Solution) private uniqueSolutions;
    mapping(bytes32 => Solution) public uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address toAddress, uint256 index, bytes32 solutionHash);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[solutionHash].index == 0, "Duplicate Solutions");          // address(0x0
        uniqueSolutions[solutionHash] = Solution({index: solCount, toAddress: msg.sender, solutionHash: solutionHash});
        solCount+=1;
        emit SolutionAdded(msg.sender, solCount, solutionHash);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupll
    function mintNTF(address toAddress, uint256 index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public { 
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[solutionHash].toAddress == address(0), "Duplicate Solutions");          // address(0x0)
        addSolution(a, b, c, input);
        emit SolutionAdded(msg.sender, index, solutionHash);
        mint(toAddress, index);
    }
}




























