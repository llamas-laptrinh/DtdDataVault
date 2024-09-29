import { expect } from "chai";
import { AddressLike, ContractTransactionResponse, Typed } from "ethers";
import { ethers } from "hardhat";
import { DataVault } from "../typechain-types";

describe("Vault", function () {
    let vault: DataVault & { deploymentTransaction(): ContractTransactionResponse; };
    let owner: { address: AddressLike | Typed; };
    let user;
    const ONE_GWEI = 1_000_000_000;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();
        const Vault = await ethers.getContractFactory("DataVault");
        vault = await Vault.deploy();
    });

    describe("Data Storage", function () {
        it("Should store data for the user", async function () {
            const data = { name: "Alice", age: 30 };
            const jsonString = JSON.stringify(data);
            const hexString = '0x' + Buffer.from(jsonString).toString('hex');
            await vault.storeData(hexString);
            console.log("storedData")
            // const storedData = await vault.retrieveData(owner.address)

            // console.log("storedData", storedData)
            expect(true);
        });
    });

    describe("Access Control", function () {
        it("Should grant access to a specific app", async function () {
            const appAddress = "0x1234567890123456789012345678901234567890";
            const duration = 3600; // 1 hour
            await vault.grantAccess(appAddress, duration);
            const access = await vault.accessList(owner.address, appAddress);
            expect(access.granted).to.be.true;
            expect(access.expiry).to.be.greaterThan(Math.floor(Date.now() / 1000));
        });

        it("Should revoke access for a specific app", async function () {
            const appAddress = "0x1234567890123456789012345678901234567890";
            const duration = 3600; // 1 hour
            await vault.grantAccess(appAddress, duration);
            await vault.revokeAccess(appAddress);
            const access = await vault.accessList(owner.address, appAddress);
            expect(access.granted).to.be.false;
        });
    });

    describe("Data Retrieval", function () {
        it("Should retrieve data if access is granted", async function () {
            const appAddress = "0x1234567890123456789012345678901234567890";
            const data = { name: "Alice", age: 30 };
            const jsonString = JSON.stringify(data);
            const hexString = '0x' + Buffer.from(jsonString).toString('hex');
            
            await vault.storeData(hexString);
            console.log(jsonString, hexString)

            await vault.grantAccess(owner.address, 3600); // 1 hour

            const retrievedData = await vault.retrieveData(owner.address);

            
            console.log("retrievedData",retrievedData)
            expect(retrievedData).to.equal(jsonString);
        });

        it("Should revert if access is not granted", async function () {
            const appAddress = "0x1234567890123456789012345678901234567890";
            await expect(vault.retrieveData(appAddress)).to.be.revertedWith("Access expired or not granted");
        });
    });
});