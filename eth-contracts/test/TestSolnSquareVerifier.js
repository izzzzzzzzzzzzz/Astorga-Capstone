var Verifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');


contract('TestSolnSquareVerifier', accounts => {
    const acct_one = accounts[0];
    const acct_two = accounts[1];
    // const acct_three = accounts[2];

    // const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    let proof = {
        "proof": {
            "a": ["0x16f282875586bac36e1df992eb9aa09ffec5119e420f50d1ea61688bed3c266e", "0x0a2eecfea9e36c4a2c8a987f269cbe3ce230fcbac332cbf513ccad2bad51c42b"],
            "b": [["0x2bc4455b28df3e76b4f0148339176b4b7e35a37d155564edad84b401685ffb4c", "0x2db4cc9a4967843fb52ef7fd1a5ffd60bfaad5d492f34a7dbe3a555834917900"], ["0x0341db3b568d4f5137338f6a18ef57da64cebb11909d630c37b8c4e72565302d", "0x126c167b21248baa2b88985cbafa0069e6d8790eb3e2d458fcae154cbcfbeebe"]],
            "c": ["0x1aca48141edee35c7e49611d923d3b951e76f7945ecbd9174206aa7b7900fb14", "0x0cb4130629f7d534574ba85a43e1af24912e761d3d1723e71037af28511d9941"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }
    

    describe('Test if a new solution can be added for contract', function () {
        beforeEach(async function () { 
            const verifier = await Verifier.new({ from: acct_one });
            console.log('here 1');
            this.contract = await SolnSquareVerifier.new(verifier.address);
            console.log('here 3');
        })
        
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('New Solution can be added', async function () { 
            let results = await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: acct_two});         // may not need this part
            assert.equal(results.logs[0].event, 'SolutionAdded', 'Solution was not added');
        });
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('ERC721 token can be minted', async function () { 
            let mint = true;
            try {
                // await this.contract.mintNTF(acct_two, 2, proof.proof.a, proof.proof.b, proof.proof.c, {from: acct_one} )
                await this.contract.mintNTF(acct_two, 2, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: acct_one} )
            } catch {
                mint = false;
            }
            assert.equal(mint, true, 'ERC721 token can not be minted'); 

        });

    });
})


      