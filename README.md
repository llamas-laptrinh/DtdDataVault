
![Logo](./image.webp)

# DtdDataVault
The **Blockchain-based Personal Data Vault** is a system where users can securely store personal data, such as identity information, health records, or financial details, on the blockchain. This system ensures that users retain full control of their data, allowing them to selectively grant access to third-party apps or services. The access is permissioned via smart contracts, meaning users can set specific conditions under which their data can be viewed or used. This approach enhances privacy and security, providing transparency and control over how personal data is shared.

Key features include:

1. **Data Ownership**: Users own their data, which is stored in an encrypted, decentralized manner.
2. **Permissioned Access**: Through smart contracts, users can grant or revoke access to third parties.
3. **Auditable Access**: Every time data is accessed, it’s logged on the blockchain, ensuring transparency.
4. **Interoperability**: Can be integrated with various applications (e.g., healthcare, finance) for seamless interaction with user data.

This project empowers users with privacy while aligning with the decentralized ethos of Web3.
## Demo

[![Watch the video](https://raw.githubusercontent.com/username/repository/branch/path/to/thumbnail.jpg)](https://drive.google.com/file/d/1-bnB20dKRpsestsh_dNjEgrwFBaSVmLg/view)

- Create hexString from userinformation and store to blockchain. 
- Granted Access for owner or third parties.
- Read data has granted.
## 🔗 Alchemy
```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {

    sepolia: {
      url: `https://scroll-sepolia.g.alchemy.com/v2/API_KEY`,
      accounts: ["YOUR_PRIVATE_KEY"],
    },

  }, defaultNetwork: "sepolia"
};

export default config;
```

