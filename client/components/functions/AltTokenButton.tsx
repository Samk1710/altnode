"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { tokenAbi, tokenAddress } from "@/app/abi"
import { useReadContract, useAccount } from "wagmi"
import { formatEther } from "viem"

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
            console.log("Balance:", formatEther(BigInt(result.data.toString())))
            setBalance(formatEther(BigInt(result.data.toString())))
            console.log("Balance:", formatEther(BigInt(result.data.toString())))
        } else if (!balance) {
            console.log("Balance not found")
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

