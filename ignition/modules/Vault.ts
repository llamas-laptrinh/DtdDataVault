import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
const VaultModule = buildModule("VaultModule", (m) => {
  const vault = m.contract("DataVault");

  return { vault };
});

export default VaultModule;
