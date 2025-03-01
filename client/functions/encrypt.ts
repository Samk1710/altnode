import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { encryptString } from "@lit-protocol/encryption";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { accessControAddress } from "@/app/abi";

const PUBLIC_KEY=process.env.NEXT_PUBLIC_PUBLIC_KEY as string
const chain = "baseSepolia";
const accessControlConditions = [
    {
        contractAddress: '',
        standardContractType: '',
        chain,
        method: '',
        parameters: [
            ':userAddress',
        ],
        returnValueTest: {
            comparator: '=',
            value: PUBLIC_KEY,
        }
    }
]

console.log(accessControlConditions);

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