import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import fs from 'fs';

const name = "projects/659029137345/secrets/solana/versions/1";
const client = new SecretManagerServiceClient();

// Only Google may know all my secrets
async function accessSecretVersion() {
    const [version] = await client.accessSecretVersion({
      name: name,
    });
  
    // Extract the payload as a string.
    const payload = version.payload.data.toString();

    return payload;
}

// Connect to the ThirdWeb SDK
const sdk = ThirdwebSDK.fromPrivateKey("https://api.devnet.solana.com", await accessSecretVersion());

// Mint the Glorious NFT Collection
// const programAddress = await sdk.deployer.createNftCollection({
//   name: "POMP Beta",
//   description: "Proof of Membership Protocol aka validation you're a badass ( like we even need that ;) )",
//   symbol: "POMP"
// });

const programAddress = 'AEc9Ay38dpBVVEJKubUgTvfTnsN7GuRKiUixuNun41YL';

// Find the Glorious NFT Collection (oh brother where art thou)
const nftCollection = await sdk.getNFTCollection(programAddress);

// The Public address we're sending the NFT to (you're welcome)
const publicAddress = "3vX7yTSgWUkDfhcy5hjn1uWteCbDT3KX9nE8ZcTompGD"

// The Metadata for the specific NFT
const metadata = {
  name: "Hopeful",
  description: "Please work",
  image: fs.readFileSync("./images/hope.png"),
  symbol: "POMP",
  attributes: [
    {
      "trait_type": "energy",
      "value": "immaculate"
    }
  ]
}

// Add an NFT to the "NFT Collection" (or so it calls itself with no NFTs ಠ_ಠ)
const nft = await nftCollection.mintTo(publicAddress, metadata);

// Print this shit for sanity purposes only
console.log("Collection deployed to: ", programAddress);
console.log("Minted nft: ", nft);