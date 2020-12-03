var SquareVerifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let proof = {
    "proof": {
        "a": ["0x0c609ba05276753548c7f505b0eff5da823c64b49f8d283caafff6374db43661", "0x0c37ced2bb129eb5ac5131983dea446e782aa357bf9f3a3a89e18a113369c9f0"],
        "b": [["0x037d199acb4be887501f041f9aea58e5cb55b4dd3b7faffb3f862bb7c7161dca", "0x0f3d62b0f7720ad8c3c55dbb0e9b2e72364de7cea77f95422f0902c28a949ed6"], ["0x1c4f33a211e5706e9dc5e9aee5e04966a6a6275ee14dcc73c4fc0cfcd46146c7", "0x2695d3efa6f7f4ec6a831ddca6b25a5b802b9f728bbc53505791a9e85c262021"]],
        "c": ["0x07691e69117247e85f6e26755443e16a2bcdbb3f2525bb6ea097b8057af7e12c", "0x260175881eba4aea6821f2e7ae3a163e4f93fca8ec812de7fdb9b3679e345beb"]
    },
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}

contract('TestSolnSquareVerifier', accounts => {
    const owner = accounts[0];
    const tokenHolder = accounts[1];
    const otherAccount = accounts[2];

    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    
    describe('Test if a new solution can be added for contract', function () {
        beforeEach(async function () { 
            const verifier = await SquareVerifier.new({ from: owner });
            //this.contract = await solnSquareContrsdfact.new(verifier.address, name, symbol, { from: owner });
            this.contract = await SolnSquareVerifier.new(verifier.address, { from: owner });
            console.log('Marco 2');
        })
        console.log('Polo');
        
    // Test if a new solution can be added for contract - SolnSquareVerifier
        it('New Solution added', async function () { 
            let tokenId = '1';
            let results = await this.contract.addSolution(tokenHolder, tokenId, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: owner});
            assert.equal(results.logs[0].event, 'SolutionAdded', 'Solution was not added');
            // assert.equal(results.logs[1].event, 'SolutionAdded', 'Solution was not added');
        });
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('can mint new ERC721 token', async function () { 
            let tokenId = '1';
            let results = await this.contract.addSolution(tokenHolder, tokenId, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: owner});
            assert.equal(results.logs[0].event, 'SolutionAdded', 'Incorrect taken balance'); 
        });

    });
})


      