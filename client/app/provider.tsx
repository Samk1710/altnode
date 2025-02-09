"use client";

import { WagmiProvider } from "wagmi";
import { config } from "./providers/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import '@coinbase/onchainkit/styles.css';
import { baseSepolia, arbitrumSepolia } from "viem/chains";
// import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OnchainKitProvider
                    apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                    projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
                    config={{
                        appearance: {
                            name: 'AltNode',
                            logo: 'https://onchainkit.xyz/favicon/48x48.png?v4-19-24',
                            mode: 'auto',
                            theme: 'default',
                        },
                        wallet: {
                            display: 'modal',
                            termsUrl: 'https://...',
                            privacyUrl: 'https://...',
                        },
                    }}
                    chain={arbitrumSepolia}
                >
                    {children}
                </OnchainKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
