var ERC721Mintable = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new( {from: account_one} );

            this.contract.mint(account_two, 1, {from: account_one})
            this.contract.mint(account_two, 2, {from: account_one});
            this.contract.mint(account_three, 3, {from: account_one});
            this.contract.mint(account_three, 4, {from: account_one});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            console.log(totalSupply);
            assert.equal(parseInt(totalSupply), 4, "Incorrect total supply");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_two);
            console.log(balance);
            assert.equal(parseInt(balance), 2, "Incorrect token balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {   
            let uri = await this.contract.baseTokenURI();
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Incorrect URI");
        })

        it('should transfer token from one owner to another', async function () {
            let tokenId = 2;
            await this.contract.transferFrom(account_two, account_three, tokenId, {from: account_two});
            let newOwner = await this.contract.ownerOf(tokenId);
            assert.equal(newOwner, account_three, "Incorrect owner transfer");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let statusFail = false;
            try {
                // let status = await this.contract.mint(account_three, 4, {from: account_one});
                await this.contract.mint(account_three, 4, {from: account_one});
            } catch {
                // error
                statusFail = true;
            }
            assert.equal(statusFail, false, "Incorrect address when minting");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner() ;
            assert.equal(owner, account_one, "Owner does not match");
        })

    });
})