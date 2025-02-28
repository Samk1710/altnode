"use client";

import { http, createConfig, createStorage } from "wagmi";
import { sepolia, mainnet, baseSepolia, polygonAmoy, arbitrumSepolia, sonicTestnet } from "wagmi/chains";
import { Chain } from "@rainbow-me/rainbowkit";
import { coinbaseWallet } from 'wagmi/connectors';

export const sonicBlaze = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  rpcUrls: {
    default: { http: ["https://rpc.blaze.soniclabs.com"] },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  testnet: true,

  blockExplorers: {
    default: {
      name: "Sonic Testnet Explorer",
      url: "https://testnet.sonicscan.org",
      apiUrl: "https://api-testnet.sonicscan.org/api",
    },
  },
} as const satisfies Chain;

const chains: readonly [Chain, ...Chain[]] = [
  sonicBlaze,
];

const isClient = typeof window !== "undefined";


export const config = createConfig({
  chains,
  connectors: [
    coinbaseWallet({
      appName: 'AltNode',
    }),
  ],
  storage: createStorage({
    storage: isClient ? window.localStorage : undefined,
  }),
  transports: {
    [sonicBlaze.id]: http(),
  },
  ssr: false,
});
