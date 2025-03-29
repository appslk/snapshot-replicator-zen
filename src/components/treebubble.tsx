import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some, keypairIdentity, sol, Keypair as UmiKeypair } from '@metaplex-foundation/umi';
import { TokenPaymentMintArgs, fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { clusterApiUrl, PublicKey, Connection, sendAndConfirmTransaction } from '@solana/web3.js';
import * as bs58 from 'bs58';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { Keypair, Transaction } from '@solana/web3.js';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createTree, mplBubblegum, fetchMerkleTree, fetchTreeConfigFromSeeds } from '@metaplex-foundation/mpl-bubblegum';
import { none } from '@metaplex-foundation/umi'
import { mintV1 } from '@metaplex-foundation/mpl-bubblegum'
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { publicKey as UMIPublicKey } from "@metaplex-foundation/umi";

import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import { createGenericFile, percentAmount } from "@metaplex-foundation/umi";
import { findLeafAssetIdPda, LeafSchema, mintToCollectionV1, parseLeafFromMintToCollectionV1Transaction } from "@metaplex-foundation/mpl-bubblegum";
import { transferSol, addMemo } from '@metaplex-foundation/mpl-toolbox';
import axios from 'axios';
import crypto from "crypto"; // Use crypto-browserify if running in the browser
import { ComputeBudgetProgram } from '@solana/web3.js';

export const TreeBubble: FC = () => {

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000, // Adjust as needed
    });

    const { connection } = useConnection();
    const wallet = useWallet();
    const [_merkleTree, set_merkleTree] = useState(0);
    const [_leafOwner, set_leafOwner] = useState(0);

    const quicknodeEndpoint = process.env.NEXT_PUBLIC_HELIUS_RPC;
    const merkleTreeLink = UMIPublicKey(process.env.NEXT_PUBLIC_MERKLETREE);
    const tokenAddress = UMIPublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS_OF_THE_COLLECTION);
    const systemProgram = SystemProgram;

    const [walletObject, setwalletObject] = useState(null);
    const [numAdditions, setNumAdditions] = useState(1);
    const [generatedCode, setGeneratedCode] = useState('');


    // Replace the numbers below with your actual secret key values.
    const myPrivateKey = Uint8Array.from([
        157, 132, 58, 26, 13, 104, 217, 112, 85, 59, 158, 208, 138, 109, 225, 187, 228, 156, 109, 159, 165, 110, 119, 161, 95, 166, 113, 207, 222, 154, 164, 144, 65, 112, 32, 249, 158, 153, 94, 97, 196, 135, 140, 177, 119, 12, 126, 195, 141, 132, 86, 235, 145, 217, 17, 77, 58, 234, 81, 173, 76, 113, 207, 22
    ]);

    // Create a keypair object
    const umiKeypairz = {
        publicKey: UMIPublicKey(myPrivateKey.slice(32, 64)), // Extract public key from the secret key
        secretKey: myPrivateKey
    };


    const umi = useMemo(() =>
        createUmi(quicknodeEndpoint)
            // Use your keypair-based adapter here
            .use(keypairIdentity(umiKeypairz))  // This sets your identity to use your keypair
            .use(mplTokenMetadata())
            .use(mplBubblegum()),
        [quicknodeEndpoint]
    );


    /*const umi = useMemo(() =>
        createUmi(quicknodeEndpoint)
            .use(walletAdapterIdentity(wallet))
            .use(mplTokenMetadata())
            .use(mplBubblegum()),

        [wallet, mplCandyMachine, walletAdapterIdentity, mplTokenMetadata, quicknodeEndpoint, createUmi]
    );*/

    /* async function createMerkleTree() {
         try {
             const merkleTree = generateSigner(umi);
 
             const builder = await createTree(umi, {
                 merkleTree,
                 maxDepth: 9, // Allows up to 512 NFTs
                 maxBufferSize: 256, // Buffer size before finalizing (safe range)
                 public: true
             });
 
             await builder.sendAndConfirm(umi);
             console.log("Merkle Tree created:", merkleTree.publicKey.toString());
 
             // Save or use merkleTree.publicKey as needed
         } catch (error) {
             console.error("Error creating Merkle Tree:", error);
         }
     }*/

    async function createMerkleTree() {
        try {
            const merkleTree = generateSigner(umi);

            const builder = await createTree(umi, {
                merkleTree,
                maxDepth: 14,
                maxBufferSize: 64,
                public: false
            });

            await builder.sendAndConfirm(umi);
            console.log("Merkle Tree created:", merkleTree.publicKey.toString());

            // ... other operations using merkleTree.publicKey
        } catch (error) {
            console.error("Error creating Merkle Tree:", error);
            // Handle error, e.g., display a notification to the user
        }
    }

    /*const mintNFT = async () => {
        try {

            axios.post('http://localhost:3001/api/webhook/crossmint', {


            })
                .then(response => {
                    console.log('File sent successfully.');
                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error sending file.', error);
                });


        } catch (err) {
            console.log(err);
        }
    };*/

    /* async function mint() {
         try {
 
             await mintV1(umi, {
                 leafOwner: umi.identity.publicKey,
                 merkleTree: merkleTreeLink,
                 metadata: {
                     name: 'My Compressed NFT',
                     uri: 'https://aqua-labour-marmoset-544.mypinata.cloud/ipfs/bafkreie4c5vig3hi2cphklye5ichiq6xwkyntaweznieju6ge5hukqkmk4',
                     sellerFeeBasisPoints: 500, // 5%
                     collection: none(),
                     creators: [
                         { address: umi.identity.publicKey, verified: false, share: 100 },
                     ],
                 },
             }).sendAndConfirm(umi);
             console.log("NFT minted successfully");
         } catch (error) {
             console.error("Error minting NFT:", error);
             // Handle error, e.g., display a notification to the user
         }
     }*/

    const mintNFT = async () => {
        try {
            const secret = "your-crossmint-webhook-secret"; // Replace with your secret
            const payload = JSON.stringify({
                // Example payload
                eventType: "mint",
                data: { id: 1, name: "Example NFT" }
            });

            // Generate the HMAC signature
            const signature = crypto
                .createHmac("sha256", secret)
                .update(payload)
                .digest("hex");

            // Send the request with the payload and signature
            const response = await axios.post(
                "http://localhost:3001/api/webhook/crossmint",
                payload,
                {
                    headers: {
                        "x-crossmint-signature": signature,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("File sent successfully.");
            console.log(response.data);
        } catch (error) {
            console.error("Error sending file.", error);
        }
    };

    async function mintToCollection() {

        const uintSig = await transactionBuilder()
            .add(setComputeUnitLimit(umi, { units: 800_000 }))
            .add(await mintToCollectionV1(umi, {
                leafOwner: umi.identity.publicKey,
                merkleTree: merkleTreeLink,
                collectionMint: tokenAddress,
                metadata: {
                    name: "NFT",
                    uri: "https://bafybeic4gghq6qc4mufi4b3mlnfcg5q42mx4wxnlshflt2bpxlgrsxrebe.ipfs.w3s.link/my-collection.json",
                    sellerFeeBasisPoints: 0, // 0%
                    collection: { key: tokenAddress, verified: false },
                    creators: [
                        { address: umi.identity.publicKey, verified: false, share: 100 },
                    ],
                },
            }))

        const { signature } = await uintSig.sendAndConfirm(umi, {
            confirm: { commitment: "finalized" },
        });



        const txid = bs58.encode(signature);
        console.log('success', `Mint successful! ${txid}`)
        notify({ type: 'success', message: 'Mint successful!', txid });


        const leaf: LeafSchema = await parseLeafFromMintToCollectionV1Transaction(
            umi,
            signature,
        );
        const assetId = findLeafAssetIdPda(umi, {
            merkleTree: merkleTreeLink,
            leafIndex: leaf.nonce,
        })[0];

        //https://solana.com/developers/courses/state-compression/compressed-nfts#interact-with-cnfts

        console.log("asset_id : " + assetId);
        console.log("id:", leaf.id);
        console.log("Owner:", leaf.owner);
        console.log("Delegate:", leaf.delegate);
        console.log("Nonce:", leaf.nonce);
        console.log("DataHash:", leaf.dataHash);
        console.log("CreatorHash:", leaf.creatorHash);


        // @ts-ignore
        const rpcAsset = await umi.rpc.getAsset(assetId);
        console.log(rpcAsset);

    }

    //6iLESEy28ALQcjByk7MkkhKS7SRxWU9wB1mR9vDMohwK client's address
    //5QSfiwsEaHrU1v2oszuz9fthya3qNazcY9r8xgHFj54h our wallet
    //Agi1XfeCWBVrHKSizypKbqS9EQ3f7B3qmBHUDdBCKv3e

    /*async function mintMultipleNFTs() {
        try {
            const destinationWallet = publicKey("DuXNuKceCtQ6HMwiN2tQFfkTUM4o1hVff9iL3Y8HhzfH"); // Change to the wallet address where NFTs should be sent

            for (let nftIndex = 1; nftIndex <= 11; nftIndex++) {

                const nftName = `NFT LITECOIN #${2}`;
                const metadataUri = `https://bafybeigzkinwurmliplgsvdyrda6t2hedcibxqiw45al7253cncf55nueq.ipfs.w3s.link/${2}.json`; // Change this to the correct URI
                //const metadataUri = `https://bafybeif5fa6l7c7ttpdn2jd35ddqmduoyxzq2v7cyjarnhndvqkowpaenm.ipfs.w3s.link/${2}.json`; // Change this to the correct URI


                let uintSig = await transactionBuilder()
                    .add(setComputeUnitLimit(umi, { units: 800_000 }));

                // Dynamically append minting logic
                for (let i = 0; i < 3; i++) {
                    uintSig = uintSig.add(await mintToCollectionV1(umi, {
                        leafOwner: destinationWallet, // Send to the given wallet
                        merkleTree: merkleTreeLink,
                        collectionMint: tokenAddress,
                        metadata: {
                            name: nftName,
                            uri: metadataUri,
                            sellerFeeBasisPoints: 500, // 5%
                            collection: { key: tokenAddress, verified: false },
                            creators: [{ address: umi.identity.publicKey, verified: false, share: 100 }],
                        },
                    }))
                };

                const { signature } = await uintSig.sendAndConfirm(umi, { confirm: { commitment: "finalized" } });
                const txid = bs58.encode(signature);
                console.log(`Minted: ${nftName} | TxID: ${txid}`);

                notify({ type: 'success', message: `Minted ${nftName}`, txid });
            }



            console.log("All NFTs minted successfully!");
        } catch (error) {
            console.error("Error minting NFTs:", error);
            notify({ type: 'error', message: "Minting failed!", description: error.message });
        }
    }*/

    async function mintMultipleNFTs() {
        try {
            const destinationWallet = publicKey("6iLESEy28ALQcjByk7MkkhKS7SRxWU9wB1mR9vDMohwK"); // Change to the correct wallet
            const totalMintsPerType = 10; // Mint 10 per type
            const batchSize = 3; // Maximum NFTs per transaction

            for (let nftIndex = 1; nftIndex <= 11; nftIndex++) {
                let mintedCount = 0;

                while (mintedCount < totalMintsPerType) {
                    let uintSig = await transactionBuilder()
                        .add(setComputeUnitLimit(umi, { units: 800_000 }));

                    let batchMintCount = Math.min(batchSize, totalMintsPerType - mintedCount);

                    for (let i = 0; i < batchMintCount; i++) {
                        const nftName = `NFT ${nftIndex}`;
                        const metadataUri = `https://bafybeigzkinwurmliplgsvdyrda6t2hedcibxqiw45al7253cncf55nueq.ipfs.w3s.link/${nftIndex}.json`;

                        uintSig = uintSig.add(await mintToCollectionV1(umi, {
                            leafOwner: destinationWallet,
                            merkleTree: merkleTreeLink,
                            collectionMint: tokenAddress,
                            metadata: {
                                name: nftName,
                                uri: metadataUri,
                                sellerFeeBasisPoints: 500, // 5%
                                collection: { key: tokenAddress, verified: false },
                                creators: [{ address: umi.identity.publicKey, verified: false, share: 100 }],
                            },
                        }));
                    }

                    const { signature } = await uintSig.sendAndConfirm(umi, { confirm: { commitment: "finalized" } });
                    const txid = bs58.encode(signature);

                    console.log(`Minted batch of ${batchMintCount} for ${nftIndex} | TxID: ${txid}`);
                    notify({ type: 'success', message: `Minted batch of ${batchMintCount} NFTs for ${nftIndex}`, txid });

                    mintedCount += batchMintCount;
                }
            }

            console.log("All NFTs minted successfully!");
        } catch (error) {
            console.error("Error minting NFTs:", error);
            notify({ type: 'error', message: "Minting failed!", description: error.message });
        }
    }
    async function mintFromBackend() {

        try {

            const payload = {
                count: 10
            };

            const response = await axios.post('http://localhost:3001/api/mint', payload);

            console.log("RESPONSE: " + response);

        } catch (error) {
            console.error("Error minting NFTs:", error);
            notify({ type: "error", message: "Minting failed!", description: error.message });
        }
    }


    async function mintToCollectionWithPayments() {

        // Fetch the current price of SOL in USD
        const solPriceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
        const solPriceData = await solPriceResponse.json();
        const solPriceInUsd = solPriceData.solana.usd;

        // Calculate the amount of SOL equivalent to $100
        const amountInSol = 100 / solPriceInUsd;

        const destination = publicKey(`7eLQnG9QoqdqtPbpXxQ3kSJXTTjWdGXK8SeVeHR7HnsM`)


        // Use the instruction directly in the builder
        const uintSig = await transactionBuilder()
            .add(setComputeUnitLimit(umi, { units: 800_000 }))
            .add(await mintToCollectionV1(umi, {
                leafOwner: umi.identity.publicKey,
                merkleTree: merkleTreeLink,
                collectionMint: tokenAddress,
                metadata: {
                    name: "NFT Testing #@",
                    uri: "https://aqua-labour-marmoset-544.mypinata.cloud/ipfs/bafkreifefx4nwtarrfp2dvli4bwyuch23svvlxzjzhv26krputathrpb7m",
                    sellerFeeBasisPoints: 0,
                    collection: { key: tokenAddress, verified: false },
                    creators: [
                        { address: umi.identity.publicKey, verified: false, share: 100 },
                    ],
                },
            })).add(transferSol(umi, {
                source: umi.identity,
                destination,
                amount: sol(1.3)
            }));

        console.log("Transaction sent successfully:", uintSig);

        const { signature } = await uintSig.sendAndConfirm(umi, {
            confirm: { commitment: "finalized" },
        });

        const txid = bs58.encode(signature);
        console.log('success', `Mint successful! ${txid}`)
        notify({ type: 'success', message: 'Mint successful!', txid });

        const leaf: LeafSchema = await parseLeafFromMintToCollectionV1Transaction(
            umi,
            signature,
        );
        const assetId = findLeafAssetIdPda(umi, {
            merkleTree: merkleTreeLink,
            leafIndex: leaf.nonce,
        })[0];

        console.log("asset_id : " + assetId);
        console.log("id:", leaf.id);
        console.log("Owner:", leaf.owner);
        console.log("Delegate:", leaf.delegate);
        console.log("Nonce:", leaf.nonce);
        console.log("DataHash:", leaf.dataHash);
        console.log("CreatorHash:", leaf.creatorHash);

        const rpcAsset = await umi.rpc.getAsset(assetId);
        console.log(rpcAsset);
    }

    async function createACollection() {

        const collectionMint = generateSigner(umi);

        const response = await createNft(umi, {
            mint: collectionMint,
            name: `NFT`,
            uri: 'https://bafybeic4gghq6qc4mufi4b3mlnfcg5q42mx4wxnlshflt2bpxlgrsxrebe.ipfs.w3s.link/my-collection.json',
            sellerFeeBasisPoints: percentAmount(0),
            isCollection: true, // mint as collection NFT
        }).sendAndConfirm(umi);

        console.log("create a collection section : " + JSON.stringify(response));
    }

    /* async function fetchData(){
     
         const merkleTreeAccount = await fetchMerkleTree(umi, merkleTree);
         const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree });
     
     
     }*/


    useEffect(() => {

        /* const merkleTree = generateSigner(umi);
         const leafOwner = umi.use(keypairIdentity(merkleTree)).use(mplBubblegum()).use(dasApi());
     
    */
        umi.use(mplTokenMetadata());
    }, [connection, wallet?.publicKey]);



    return (

        <div className="mintDetails">

            {/*<div className='others'>
                <button onClick={mint}>Mint</button>
            </div>*/}

            <div>
                <div className='others'>
                    <button onClick={createMerkleTree}>Create MerkleTree</button>
                </div>

                <div className='others'>
                    <button onClick={createACollection}>Create Collection</button>
                </div>

                <div className='others'>
                    <button onClick={mintToCollection}>Mint To Collection</button>
                </div>
            </div>

            <div>
                <div className='others'>
                    <button onClick={mintToCollectionWithPayments}>Mint To Collection on With Payments</button>
                </div>

                <div className='others'>
                    <button onClick={mintNFT}>Mint BTN</button>
                </div>

            </div>

            <div className='others'>
                <button onClick={mintMultipleNFTs}>Multiple NFTs Backend</button>
            </div>


        </div>

    );
};


