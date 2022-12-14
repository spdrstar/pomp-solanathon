import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import { PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from 'fs';

import {
  getAssociatedTokenAddressSync,
  createApproveInstruction
} from '@solana/spl-token';

import {
  Metaplex, keypairIdentity, bundlrStorage,
} from "@metaplex-foundation/js";

// Where the google secret is stored
const name = "projects/659029137345/secrets/solana/versions/1";

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
//   name: "Founders Inc",
//   description: "Proof of Membership to Founders, Inc",
//   symbol: "NFT"
// });

const programAddress = "Dp2Dkoma2smN4SXDSgqLvC2QmSDmXyMDZhbpuKmBbWep"


// console.log("Collection deployed to: ", programAddress);

// Find the Glorious NFT Collection (oh brother where art thou)
const nftCollection = await sdk.getNFTCollection(programAddress);

// The Public address we're sending the NFT to (you're welcome)
const publicAddress = "6nr36TNV8pyDj5UfiBg18spnNvazqsXBott8wVLkZpAE"

// The Metadata for the specific NFT
const metadata = {
  name: "Final Frozen",
  description: "Actually Frozen",
  image: fs.readFileSync("../public/fincPOMP.png"),
  symbol: "POMP",
  attributes: [
    {
      "trait_type": "frozen",
      "value": "true"
    }
  ]
}

// Add an NFT to the "NFT Collection" (or so it calls itself with no NFTs ???_???)
const nft = await nftCollection.mintTo(publicAddress, metadata);

// Get the Token Address of the NFT (This is made from the owner and mint address and is the account delegate)
const tokenAddress = getAssociatedTokenAddressSync(new PublicKey(nft), keypair.publicKey)

// Print this shit for sanity purposes only
console.log("Collection deployed to: ", programAddress);
console.log("Minted nft: ", nft);

// Approve the NFT for freezing
const approveIx = createApproveInstruction(tokenAddress, keypair.publicKey, keypair.publicKey, 1);

// Connect to the metaplex gods (centralized authority, please don't take my NFT from me ????)
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage());

// Freeze the NFT
const freezeIxs = metaplex
                  .nfts()
                  .builders()
                  .freezeDelegatedNft({delegateAuthority: keypair, mintAddress: new PublicKey(nft)})
                  .getInstructions();

// Execute the NFT freezing
let tx = new Transaction().add(approveIx);

freezeIxs.map((ix) => {
    tx = tx.add(ix);
});

const txId = await sendAndConfirmTransaction(connection, tx, [keypair], {
  skipPreflight: true,
  commitment: "confirmed",
});

// Holy shit this works
console.log("Froze nft in tx:", txId);