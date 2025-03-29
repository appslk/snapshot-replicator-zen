import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some } from '@metaplex-foundation/umi';
import { TokenPaymentMintArgs, fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import * as bs58 from 'bs58';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';


import { Keypair } from '@solana/web3.js';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createTree, mplBubblegum, fetchMerkleTree, fetchTreeConfigFromSeeds } from '@metaplex-foundation/mpl-bubblegum';

import { none } from '@metaplex-foundation/umi'
import { mintV1 } from '@metaplex-foundation/mpl-bubblegum'





export const TreeBubble: FC = () => {

    const { connection } = useConnection();
    const wallet = useWallet();

    const quicknodeEndpoint = 'https://api.devnet.solana.com';

    const umi = useMemo(() =>
        createUmi(quicknodeEndpoint)
            .use(walletAdapterIdentity(wallet))
            .use(mplCandyMachine())
            .use(mplTokenMetadata()),

        [wallet, mplCandyMachine, walletAdapterIdentity, mplTokenMetadata, quicknodeEndpoint, createUmi]
    );


    async function createMerkleTree() {
       
    }


    async function mint() {
    
    }

    /* async function fetchData(){
 
         const merkleTreeAccount = await fetchMerkleTree(umi, merkleTree);
         const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree });
 
 
     }*/

    useEffect(() => {
        umi.use(mplBubblegum());
        umi.use(mplTokenMetadata());
    }, [connection, wallet?.publicKey]);


    return (

        <div className="mintDetails">
            <div className='others'>
                <button onClick={createMerkleTree}>Create MerkleTree</button>
                <button onClick={mint}>Mint</button>
            </div>
        </div>

    );
};


