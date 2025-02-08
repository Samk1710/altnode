'use client';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useMemo } from 'react';
import { coinbaseWallet } from 'wagmi/connectors';
import { abi, contractAddress } from '../abi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';

export default function MintPage() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isMinting, setIsMinting] = useState(false);

  // Configure `useWriteContracts` to call the mint function on the contract
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: () => console.log('Mint successful') },
  });

  const handleMint = async () => {
    setIsMinting(true);
    try {
      writeContracts({
        contracts: [
          {
            address: contractAddress,
            abi,
            functionName: 'mint',
            args: [address],
          },
        ],
        capabilities,
      });
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsMinting(false);
    }
  };

  // Check for paymaster capabilities with `useCapabilities`
  const { data: availableCapabilities } = useCapabilities({
    account: address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !address) return {};
    const capabilitiesForChain = availableCapabilities[chainId ? chainId : 84532];
    if (
      capabilitiesForChain['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      return {
        paymasterService: {
          url: `https://api.developer.coinbase.com/rpc/v1/base/${process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT}`, //For production use proxy
        },
      };
    }
    return {};
  }, [availableCapabilities, address]);

  return (
    <div>
      <p>
        {isConnected ? `Connected wallet: ${address}` : 'No wallet connected'}
      </p>
      <button
        onClick={
          isConnected
            ? handleMint
            : () => connect({ connector: coinbaseWallet() })
        }
      >
        {isMinting ? 'Minting...' : isConnected ? 'Mint NFT' : 'Connect Wallet'}
      </button>
      {isConnected && <button onClick={() => disconnect()}>Disconnect</button>}
    </div>
  );
}