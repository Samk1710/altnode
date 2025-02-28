import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

const { RPC_URL_ETH, RPC_URL_BASE, RPC_URL_AMOY, PRIVATE_KEY, ETHERSCAN_API, POLYGONSCAN_API, BASESCAN_API } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sonic: {
      url: "https://rpc.soniclabs.com",
      chainId: 146,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    sonicTestnet: {
      url: "https://rpc.blaze.soniclabs.com",
      chainId: 57054,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    baseSepolia: {
      url: RPC_URL_BASE,
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      'sonic': "I24DBHGKGXGIIYX96DEH5KEJG8NXSUWKU8",
      'sonicTestnet': "I24DBHGKGXGIIYX96DEH5KEJG8NXSUWKU8",
      'base-sepolia': `${BASESCAN_API}`,
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com",
        },
      },
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org"
        }
      },
      {
        network: "sonicTestnet",
        chainId: 57054,
        urls: {
          apiURL: "https://api-testnet.sonicscan.org/api",
          browserURL: "https://testnet.sonicscan.org"
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  },
};

export default config;