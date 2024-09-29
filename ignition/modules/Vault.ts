import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// 0x8058ea0F3b72BAA756C85Dfa7a2de687EDBD7d04
const VaultModule = buildModule("DataVault", (m) => {
  const vault = m.contract("DataVault");

  return { vault };
});

export default VaultModule;
