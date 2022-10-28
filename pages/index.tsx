import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Box from "../components/Box";
import Nav from "../components/Nav"
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  // const { program } = useProgram(
  //   your_nft_collection_address,
  //   "nft-collection"
  // );

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Box />
      </div>
    </>
  );
};

export default Home;
