import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {

    sepolia: {
      url: `https://scroll-sepolia.g.alchemy.com/v2/`,
      accounts: [""],
    },

  }, defaultNetwork: "sepolia"
};

export default config;
