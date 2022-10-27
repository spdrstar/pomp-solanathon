import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { NextUIProvider } from '@nextui-org/react';
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <ThirdwebProvider network={network}>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </ThirdwebProvider>
    </NextUIProvider>
  );
}

export default MyApp;
