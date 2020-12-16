var ERC721Mintable = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const acct_one = accounts[0];
    const acct_two = accounts[1];
    const acct_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new( {from: acct_one} );
            this.contract.mint(acct_two, 1, {from: acct_one})
            this.contract.mint(acct_two, 2, {from: acct_one});
            this.contract.mint(acct_three, 3, {from: acct_one});
            this.contract.mint(acct_three, 4, {from: acct_one});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(parseInt(totalSupply), 4, "Incorrect total supply");       // 4 tokens created
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(acct_two);
            assert.equal(parseInt(balance), 2, "Incorrect token balance");    
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {   
            let uri = await this.contract.baseTokenURI();
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Incorrect URI");
        })

        it('should transfer token from one owner to another', async function () {
            let tokenId = 2;
            await this.contract.transferFrom(acct_two, acct_three, tokenId, {from: acct_two});
            let newOwner = await this.contract.ownerOf(tokenId);
            assert.equal(newOwner, acct_three, "Incorrect owner for transfer")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: acct_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let statusFail = false;
            try {
                await this.contract.mint(acct_three, 5, {from: acct_one});
            } catch {
                return true;
            }
            assert.equal(statusFail, false, "Incorrect address when minting");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call();             //getOwner.call()
            assert.equal(owner, acct_one, "Owner does not match");
        })

    });
})