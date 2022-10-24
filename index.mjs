import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import { Keypair, PublicKey, Signer, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from 'fs';

import {
  getAccount,
  createApproveInstruction
} from '@solana/spl-token';

import {
  Metaplex, keypairIdentity, bundlrStorage,
  freezeDelegatedNftBuilder,
  token,
} from "@metaplex-foundation/js";

// Where the google secret is stored
const name = "projects/659029137345/secrets/solana/versions/1";

// The public address of the program owner
const ownerAddress = "3vX7yTSgWUkDfhcy5hjn1uWteCbDT3KX9nE8ZcTompGD"

// The Solana RPC network
const network = "https://api.devnet.solana.com";

const google = new SecretManagerServiceClient();

// Only Google may know all my secrets
async function accessSecretVersion() {
    const [version] = await google.accessSecretVersion({
      name: name,
    });
  
    // Extract the payload as a string.
    const payload = version.payload.data.toString();

    return payload;
}

// Connect to the ThirdWeb SDK
const sdk = ThirdwebSDK.fromPrivateKey(network, await accessSecretVersion());

// Get some important shit from ThirdWeb (Thanks bb)
const signer = sdk.wallet.getSigner()
const keypair = signer._driver.keypair
const connection = sdk.connection

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
  name: "Cold 3",
  description: "Frozen picture",
  image: fs.readFileSync("./images/zach.jpg"),
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

// Approve the NFT for freezing
const approveIx = createApproveInstruction(programAddress, signer.publicKey, signer.publicKey, 1);

// Connect to the metaplex gods (centralized authority, please don't take my NFT from me 🙏)
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage());

// Freeze the NFT
const freezeIxs = metaplex
                  .nfts()
                  .builders()
                  .freezeDelegatedNft({delegateAuthority: keypair, mintAddress: signer.publicKey})
                  .getInstructions();

// Execute the NFT freezing
let tx = new Transaction().add(approveIx);

freezeIxs.map((ix) => {
    tx = tx.add(ix);
});


const newKeypair = new Keypair(keypair);
const Signer newSigner = new Signer(
console.log(newKeypair)

console.log("pubkey in transaction:", signer.publicKey)

const txId = await sendAndConfirmTransaction(connection, tx, [newKeypair], {
  skipPreflight: true,
  commitment: "confirmed",
});

console.log("Froze nft in tx:", txId);