import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { userAgent } from "next/server";
import { getUser } from "../auth.config";
import { programAddress } from "../const/nftDropDetails";

const Protected = (prop) => {
  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: "skyblue",
            width: 1300,
          }}
        >
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/Patreon-logo-2013.png"
            height={80}
            width={140}
          />
        </div>
       
        <h1 style={{ color: "yellow" }}>
          Patreon Page for Creator's supporters.
        </h1>
        <p>User's Address : {prop.userAddress} </p>
      </div>
      <p >
        Hello Amit, Thank you for being a patreon supporter for the creator. You have
        access to this special content from the Creator.
      </p>
      <br />
      <img
        src="https://images.squarespace-cdn.com/content/v1/5efa71a01cb40e3bef9582a0/1594133136252-L9KU9Q5XU34DVL2U39U2/2_Hero.jpg?format=1000w"
        width={780}
        height={400}
      />
    </div>
  );
};
export default Protected;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork("devnet");

  const user = await getUser(req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const program = await sdk.getNFTDrop(programAddress);
  const nfts = await program?.getAllClaimed();

  const hasNFT = nfts?.some((nft) => nft.owner === user.address);

  if (!hasNFT) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {userAddress:user.address},
  };
};

/*

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Image from "next/image";
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
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/thirdweb.svg"
            height={75}
            width={115}
            objectFit="contain"
            alt="thirdweb"
          />
          <Image
            width={75}
            height={75}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
        <p className={styles.explain}>
          Explore what you can do with thirdweb&rsquo;s brand new{" "}
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana SDK
            </a>
          </b>
          .
        </p>

        <WalletMultiButton />
      </div>
    </>
  );
};

export default Home;


*/
