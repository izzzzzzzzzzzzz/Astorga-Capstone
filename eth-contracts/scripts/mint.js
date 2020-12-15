const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
// const MNEMONIC = process.env.MNEMONIC;
const MNEMONIC = "buddy list unlock route judge silly license shallow eager range pistol fame";
// const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const NODE_API_KEY = "d72a29bf975b46df83aace69c45553ac"
//const isInfura = !!process.env.INFURA_KEY;
const isInfura = true;
const FACTORY_CONTRACT_ADDRESS = null;
const NFT_CONTRACT_ADDRESS = "0xE9C8B4cDbBD04eBe2cB071d5ceB4Fe543d6ABBaa";
const OWNER_ADDRESS = "0x59ba8C060abc9522F900a48a57736f9077C98B6D";
const NETWORK = "rinkeby";


// export INFURA_KEY="d72a29bf975b46df83aace69c45553ac"
// export MNEMONIC="buddy list unlock route judge silly license shallow eager range pistol fame"
// export NETWORK="rinkeby"

// export OWNER_ADDRESS="0x59ba8C060abc9522F900a48a57736f9077C98B6D"
// export NFT_CONTRACT_ADDRESS="0xf601D9987b50d8266fc934303bdC5D4a8cAF9c59"

const NUM_CREATURES = 12;
const NUM_LOOTBOXES = 4;
const DEFAULT_OPTION_ID = 0;
const LOOTBOX_OPTION_ID = 2;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  // return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );
    // Creatures issued directly to the owner.
    for (var i = 3; i < NUM_CREATURES; i++) {
      console.log('Marco 2');
      const result = await nftContract.methods
        .mintTo(OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }
  } else if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        .mint(DEFAULT_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }

    // Lootboxes issued directly to the owner.
    for (var i = 0; i < NUM_LOOTBOXES; i++) {
      const result = await factoryContract.methods
        .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted lootbox. Transaction: " + result.transactionHash);
    }
  } else {
    console.log('Marco');
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();