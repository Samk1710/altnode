"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CopyIcon } from "lucide-react"
import { tokenAbi, tokenAddress } from "@/app/abi"
import { useReadContract, useAccount } from "wagmi"
import { formatEther } from "viem"

// This is a placeholder. Replace with actual function to fetch balance
// const fetchAitBalance = async () => {
//     return "1000" // Placeholder value
// }

// This is a placeholder. Replace with actual AIT token contract address
const AIT_CONTRACT_ADDRESS = tokenAddress;

export function AitBalanceButton() {
    const [balance, setBalance] = useState<string | null>(null)

    const { address } = useAccount()

    const result = useReadContract({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [address]
    })

    const handleClick = async () => {
        if (result.data) {
            setBalance(formatEther(BigInt(result.data.toString())))
            console.log("Balance:", formatEther(BigInt(result.data.toString())))
        } else if (!balance) {
            const fetchedBalance = "0"
            setBalance(fetchedBalance)
        }
    }

    const copyToClipboard = async () => {
        await handleClick()
        navigator.clipboard.writeText(AIT_CONTRACT_ADDRESS)
    }

    return (
        <>
            <Button onClick={copyToClipboard} variant="outline">
                AIT Balance: {balance || "Click to view"}
            </Button>
        </>
    )
}

