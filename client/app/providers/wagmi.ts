"use client";

import { http, createConfig, createStorage } from "wagmi";
import { sepolia, mainnet, baseSepolia, polygonAmoy, arbitrumSepolia } from "wagmi/chains";
import { Chain } from "@rainbow-me/rainbowkit";
import { coinbaseWallet } from 'wagmi/connectors';

const chains: readonly [Chain, ...Chain[]] = [
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
  arbitrumSepolia,
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
    [arbitrumSepolia.id]: http(),
  },
  ssr: false,
});
