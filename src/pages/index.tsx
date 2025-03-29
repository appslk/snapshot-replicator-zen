
import type { NextPage } from "next";
import Head from "next/head";
import { PuffView } from "../views/puff";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Puff Dog NFT Collection</title>
        <meta
          name="description"
          content="Puff Dog NFT Collection on Solana"
        />
      </Head>
      <PuffView />
    </div>
  );
};

export default Home;
