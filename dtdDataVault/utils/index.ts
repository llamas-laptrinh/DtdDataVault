import { ethers } from "ethers";
import { abi } from './abi.json'
// import { stringToBytes } from "./convert";

// Define the contract address and ABI
const contractAddress = "0x8058ea0F3b72BAA756C85Dfa7a2de687EDBD7d04";

export default class VaultData {
    protected contract: ethers.Contract;
    constructor(signer: ethers.Signer) {

        this.contract = new ethers.Contract(
            contractAddress,
            abi,
            signer
        );
    }
    async storeData(data: any) {
        console.log(data)
        try {
            const tx = await this.contract.storeData(data)
            await tx.wait();
            return true;
        } catch (error) {
            console.error("storeData", error);
            return false;
        }
    }
    async grantAccess(appAddress: string) {
        console.log("appAddress", appAddress)
        try {

            const duration = 36000; // 10 hour
            await this.contract.grantAccess(appAddress, duration);
            return true;
        } catch (error) {
            console.error("grantAccess error", error);
            return false;
        }
    }
    async revokeAccess(appAddress: string) {
        try {
            await this.contract.revokeAccess(appAddress);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async retrieveData(address: string) {
        try {
            const data = await this.contract.retrieveData(address);
            return data
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}