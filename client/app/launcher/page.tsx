"use client";

import React, { useEffect, useState } from "react";
import {
  Coins,
  Sparkles,
  BookOpen,
  Users,
  X,
  Plus,
  Percent,
} from "lucide-react";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { abi, contractAddress } from "../abi";
import Navbar from "@/components/functions/NavBar";

// Mock NFT data - in a real app this would come from an API
const AVAILABLE_NFTS = [
  {
    id: 1,
    name: "Cosmic Dreamer #1",
    image:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?auto=format&fit=crop&q=80&w=500",
    description: "A mystical NFT from the cosmic collection",
  },
  {
    id: 2,
    name: "Digital Phoenix #2",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
    description: "Rising from the digital ashes",
  },
  {
    id: 3,
    name: "Neon Warrior #3",
    image:
      "https://images.unsplash.com/photo-1569428034239-f9565e32e224?auto=format&fit=crop&q=80&w=500",
    description: "A warrior from the neon realm",
  },
];

interface TokenFormData {
  name: string;
  symbol: string;
  initialSupply: string;
  lore: string;
  airdropPercentage: string;
  airdropAddresses: string[];
}

interface NFT {
  tokenId: number; // Unique identifier for the NFT
  tokenUri: string; // IPFS or URL pointing to the metadata
  name: string; // Name of the NFT
  description: string; // Description of the NFT
  price: number; // Price of the NFT
  owner: string; // Address of the NFT owner
  image: string; // Image URL of the NFT
  attributes: NFTAttribute[]; // Array of attributes for the NFT
}

interface NFTAttribute {
  trait_type: string; // Type of the trait (e.g., 'nft_type')
  value: string | number; // Value of the trait
}

function App() {
  const account = useAccount();
  const { data: nftData = [] as any[], refetch: refetchNft } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAllAssets",
  });
  const [selectedNft, setSelectedNft] = useState<number | null>(0);
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getActiveSubscribers",
    args: [0],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableNfts, setAvailableNfts] = useState<NFT[]>([]);
  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    initialSupply: "",
    lore: "",
    airdropPercentage: "",
    airdropAddresses: [],
  });
  const [activeSubscribers, setActiveSubscribers] = useState<string[]>([]);
  const [numSubs, setNumSubs] = useState(0);
  useEffect(() => {
    if (nftData) {
      console.log("NFT Data:", nftData);

      const fetchNftMetadata = async () => {
        try {
          const parsedData =
            typeof nftData === "string" ? JSON.parse(nftData) : nftData;

          const updatedNfts = await Promise.all(
            parsedData.map(async (nft: NFT) => {
              try {
                const metadata = await fetchData(nft.tokenUri);
                return { ...nft, ...metadata }; // Merge metadata with NFT object
              } catch (error) {
                console.error(
                  `Error fetching metadata for tokenUri ${nft.tokenUri}:`,
                  error
                );
                return nft; // Return the NFT object as is if metadata fetch fails
              }
            })
          );

          // console.log("Updated NFTs with metadata: ", updatedNfts);
          const myNfts = updatedNfts.filter(
            (nft: NFT) => nft.owner === account.address
          );
          console.log("My NFTs:", myNfts);
          setAvailableNfts(myNfts);
        } catch (error) {
          console.error("Error processing NFT data: ", error);
        }
      };

      fetchNftMetadata();
    }
  }, [nftData]);
  const getActiveSubscribers = async () => {
    const { data } = await refetch();
    console.log("Active Subscribers for NFT:", data);
    console.log("numSubs", numSubs);
    if (Array.isArray(data)) {
      setActiveSubscribers(data as string[]);
    } else {
      console.error("Expected data to be an array, but got:", data);
    }
    if (Array.isArray(data)) {
      setNumSubs(data.length);
    } else {
      console.error("Expected data to be an array, but got:", data);
    }
  };

  useEffect(() => {
    console.log("Getting active subscribers for NFT:", selectedNft);
    if (selectedNft !== null) {
      getActiveSubscribers();
    }
  }, [selectedNft]);

  async function fetchData(tokenUri: string) {
    const res = await fetch(tokenUri);
    const data = await res.json();
    return data;
  }

  const handleNftClick = (id: number) => {
    setSelectedNft(id);

    setIsModalOpen(true);
  };

  const addAirdropAddress = () => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: [...prev.airdropAddresses, ""],
    }));
  };

  const removeAirdropAddress = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: prev.airdropAddresses.filter((_, i) => i !== index),
    }));
  };

  const updateAirdropAddress = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: prev.airdropAddresses.map((addr, i) =>
        i === index ? value : addr
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const perAddressPercentage =
      formData.airdropAddresses.length > 0
        ? parseFloat(formData.airdropPercentage) /
          formData.airdropAddresses.length
        : 0;

    console.log("Form submitted:", {
      ...formData,
      airdropDistribution: formData.airdropAddresses.map((address) => ({
        address,
        percentage: perAddressPercentage.toFixed(2),
      })),
    });

    setIsModalOpen(false);
    setFormData({
      name: "",
      symbol: "",
      initialSupply: "",
      lore: "",
      airdropPercentage: "",
      airdropAddresses: [],
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-violet-950 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            NFT Token Launch Platform
          </h1>
          <p className="text-gray-300 text-center mb-12">
            Select an NFT to launch your token
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableNfts.map((nft) => (
              <div
                key={nft.tokenId}
                onClick={() => handleNftClick(nft.tokenId)}
                className="transform transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {nft.name}
                    </h3>
                    {nft.description.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Token Launch Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Launch Your Token
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Coins className="inline-block mr-2" size={16} />
                        Token Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter token name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Sparkles className="inline-block mr-2" size={16} />
                        Token Symbol
                      </label>
                      <input
                        type="text"
                        value={formData.symbol}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            symbol: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter token symbol"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Users className="inline-block mr-2" size={16} />
                        Initial Supply
                      </label>
                      <input
                        type="number"
                        value={formData.initialSupply}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            initialSupply: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter initial supply"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <BookOpen className="inline-block mr-2" size={16} />
                        Token Lore
                      </label>
                      <textarea
                        value={formData.lore}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lore: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                        placeholder="Enter token lore"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-300">
                          Airdrop Configuration
                        </label>
                        <button
                          type="button"
                          onClick={addAirdropAddress}
                          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <Plus size={16} className="mr-1" />
                          Add Address
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {numSubs} active subscribers for this NFT
                      </p>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Total Airdrop Percentage
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.airdropPercentage}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                airdropPercentage: e.target.value,
                              }))
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                            placeholder="Enter percentage to distribute"
                            min="0"
                            max="100"
                          />
                          <Percent
                            size={14}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                        </div>
                        {formData.airdropAddresses.length > 0 &&
                          formData.airdropPercentage && (
                            <p className="text-sm text-gray-400 mt-2">
                              Each address will receive{" "}
                              {(
                                parseFloat(formData.airdropPercentage) /
                                formData.airdropAddresses.length
                              ).toFixed(2)}
                              % of the total supply
                            </p>
                          )}
                      </div>

                      <div className="space-y-4">
                        {formData.airdropAddresses.map((address, index) => (
                          <div key={index} className="flex gap-4">
                            <input
                              type="text"
                              value={address}
                              onChange={(e) =>
                                updateAirdropAddress(index, e.target.value)
                              }
                              className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Wallet address"
                            />
                            <button
                              type="button"
                              onClick={() => removeAirdropAddress(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X size={24} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={20} />
                      Launch Token
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
