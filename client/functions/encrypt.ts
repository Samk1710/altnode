import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { encryptString } from "@lit-protocol/encryption";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { contractAddress } from "@/app/abi";

const chain = "baseSepolia";
const accessControlConditions = [
    {
        contractAddress: contractAddress,
        standardContractType: "ERC721", // Specify the correct contract type
        chain: "baseSepolia",
        method: "balanceOf", // Or the appropriate method
        parameters: [":userAddress"],
        returnValueTest: {
            comparator: ">=",
            value: "0", // Example condition
        },
    },
];

async function encrypt(message: string) {
    const client = new LitJsSdk.LitNodeClient({
        alertWhenUnauthorized: false,
        debug: false,
        litNetwork: LIT_NETWORK.DatilDev,
    });
    await client.connect();
    // Encrypt the message
    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
            accessControlConditions,
            dataToEncrypt: message,
        },
        client,
    );
    await client.disconnect();
    // Return the ciphertext and dataToEncryptHash
    return {
        ciphertext,
        dataToEncryptHash,
    };
}

export default encrypt;