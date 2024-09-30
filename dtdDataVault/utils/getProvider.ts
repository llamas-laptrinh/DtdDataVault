import { ethers } from "ethers";
import { MetaMaskSDK } from "@metamask/sdk-react";

const getWallet = () => {
    const Window: Window | any = window;
    const wallet =
        Window.coin98 !== undefined ? Window.coin98.provider : Window.ethereum;

    return wallet;
};
export const SyncWalletAddress = async () => {
    return await getAccount();
};

export const connectWallet = async () => {

    const accounts = await getWallet() // Or window.ethereum if you don't support EIP-6963.
        .request({ method: "eth_requestAccounts" })
        .catch((err: any) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error.
                // If this happens, the user rejected the connection request.
                console.log("Please connect to MetaMask.");
            } else {
                console.error(err);
            }
        });
    return accounts;
};
// eth_requestAccounts
export async function getAccount() {
    return getWallet()
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err: any) => {
            console.error(err);
        });
}
function handleAccountsChanged(accounts: Array<string>) {
    if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        connectWallet();
        return "Please connect to MetaMask";
    } else {
        return accounts[0] || "";
    }
}

export const getProvier = async (ether: any) => {
    const provider = new ethers.providers.Web3Provider(ether || getWallet());
    const signer = provider.getSigner();
    return { signer, provider };
};