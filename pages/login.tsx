import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useLogin,
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";
import { programAddress } from "../const/nftDropDetails";

const Login = () => {
  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();
  const program = useProgram(programAddress, "nft-drop");
  const { mutate, isLoading } = useClaimNFT(program.data);

  return (
    <div>
      {/* <div>
        <img
          src="https://1000logos.net/wp-content/uploads/2021/05/Patreon-logo-2013.png"
          height={80}
          width={140}
        />
        <h3>
          <WalletMultiButton
            style={{ color: "red", position: "fixed", right: 60 }}
          />
        </h3>
      </div> */}

      <div
        style={{
          backgroundColor: "skyblue",
          width: 1000,
        }}
      >
        <img
          src="https://1000logos.net/wp-content/uploads/2021/05/Patreon-logo-2013.png"
          height={80}
          width={140}
        />
      </div>

      <h1>NFT Gated Patreon on Solana</h1>
      {!publicKey && <WalletMultiButton />}

      {publicKey && !user && (
        <button onClick={() => login()}>Login with NFT Access Wallet</button>
      )}

      {user && <p>Logged in as {user.address} </p>}
      {user && (
        <h3>
          Sorry,You Don't have the NFT to access. To get aceess To Patreon
          special content from the creator, claim a NFT
        </h3>
      )}

      {user && (
        <button
          onClick={() =>
            mutate({
              amount: 1,
            })
          }
        >
          {isLoading ? "Claiming..." : " Claim NFT"}
        </button>
      )}
    </div>
  );
};

export default Login;
