import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

const name = "projects/659029137345/secrets/solana/versions/1";
const client = new SecretManagerServiceClient();

async function accessSecretVersion() {
    const [version] = await client.accessSecretVersion({
      name: name,
    });
  
    // Extract the payload as a string.
    const payload = version.payload.data.toString();

    return payload;
}

const sdk = ThirdwebSDK.fromPrivateKey("https://api.devnet.solana.com", await accessSecretVersion());

const address = await sdk.deployer.createNftDrop({
  name: "Cool Drop",
  symbol: "NFT",
  totalSupply: 10, // the total amount of NFTs that will be available through this drop
});
// This will log out the address of our newly minted NFT Drop
console.log(address);