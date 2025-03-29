import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some, keypairIdentity } from '@metaplex-foundation/umi';
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

    const [_merkleTree, set_merkleTree] = useState(0);
    const [_leafOwner, set_leafOwner] = useState(0);

    const quicknodeEndpoint = 'https://api.devnet.solana.com';

    const umi = useMemo(() =>
        createUmi(quicknodeEndpoint)
            .use(walletAdapterIdentity(wallet))
            .use(mplCandyMachine())
            .use(mplTokenMetadata()),

        [wallet, mplCandyMachine, walletAdapterIdentity, mplTokenMetadata, quicknodeEndpoint, createUmi]
    );





    async function createMerkleTree() {

        


        const builder = await createTree(umi, {
            merkleTree,
            maxDepth: 14,
            maxBufferSize: 64,
            public: true
        });


        /* const builder = await createTree(umi, {
             treeCreator: customTreeCreator,
             maxDepth: 14,
             maxBufferSize: 64,
             public: true,
         });*/



        await builder.sendAndConfirm(umi);
        console.log("builder :" + builder);

        const merkleTreeAccount = await fetchMerkleTree(umi, merkleTree.publicKey);
        console.log("merkleTreeAccount : " + merkleTreeAccount);
        //const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree });

        // Use merkleTree.publicKey instead of merkleTree
        const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree: merkleTree.publicKey });
        console.log("treeConfig : ", treeConfig);

    }

    async function mint() {


        await mintV1(umi, {
            
            leafOwner,
            merkleTree,
            metadata: {
                name: 'My Compressed NFT',
                uri: 'https://example.com/my-cnft.json',
                sellerFeeBasisPoints: 500, // 5%
                collection: none(),
                creators: [
                    { address: umi.identity.publicKey, verified: false, share: 100 },
                ],
            },
        }).sendAndConfirm(umi)
    }

    /* async function fetchData(){
 
         const merkleTreeAccount = await fetchMerkleTree(umi, merkleTree);
         const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree });
 
 
     }*/




    useEffect(() => {
        const merkleTree = generateSigner(umi);
        const leafOwner = umi.use(keypairIdentity(merkleTree)).use(mplBubblegum()).use(dasApi());
        set_merkleTree(merkleTree);
        set_leafOwner(leafOwner);


        umi.use(mplBubblegum());
        umi.use(mplTokenMetadata());
        umi.use(mplBubblegum());




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


function dasApi(): import("@metaplex-foundation/umi").UmiPlugin {
    throw new Error('Function not implemented.');
}

