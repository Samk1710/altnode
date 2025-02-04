"use client";

import { http, createConfig, createStorage } from "wagmi";
import { sepolia, mainnet, baseSepolia, polygonAmoy } from "wagmi/chains";
import { Chain } from "wagmi/chains";
import { coinbaseWallet } from 'wagmi/connectors';

const chains: readonly [Chain, ...Chain[]] = [
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
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
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: false,
});
