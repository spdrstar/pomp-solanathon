import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import NextCors from "nextjs-cors";
import { IncomingForm } from 'formidable'
import fs from 'fs'
import PNG from 'png-js'

import {
  getAssociatedTokenAddressSync,
  createApproveInstruction
} from '@solana/spl-token';

import { PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

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

// Mint an NFT to the collection
// TODO: Add Metadata and Collection to request
const mintNFT = async (publicAddress: any, image: any) => {

  // Connect to the ThirdWeb SDK
  const sdk = ThirdwebSDK.fromPrivateKey(network, await accessSecretVersion());

  // Get some important shit from ThirdWeb (Thanks bb)
  const signer = sdk.wallet.getSigner()
  const keypair = signer._driver.keypair
  const connection = sdk.connection

  // Assuming Collection and Metadata for hackathon
  const collection = 'Dp2Dkoma2smN4SXDSgqLvC2QmSDmXyMDZhbpuKmBbWep'

  const metadata = {
    name: "Founders Inc Founder",
    description: "Congrats you caffeine addict!",
    image: fs.readFileSync(image),
    symbol: "NFT",
    attributes: [
      {
        "trait_type": "nerdy",
        "value": "definitely"
      },
      {
        "trait_type": "localhost",
        "value": "not a fucking chance"
      }
    ]
  }

  // Find the Glorious NFT Collection (oh brother where art thou)
  const nftCollection = await sdk.getNFTCollection(collection);

  // Add an NFT to the "NFT Collection" (or so it calls itself with no NFTs ಠ_ಠ)
  const nft = await nftCollection.mintTo(publicAddress, metadata);

  // Print Mint Address for sanity
  console.log("Minted nft: ", nft);

  // Get the Token Address of the NFT (This is made from the owner and mint address and is the account delegate)
  const tokenAddress = getAssociatedTokenAddressSync(new PublicKey(nft), keypair.publicKey)

  // Approve the NFT for freezing
  const approveIx = createApproveInstruction(tokenAddress, keypair.publicKey, keypair.publicKey, 1);

  // Connect to the metaplex gods (centralized authority, please don't take my NFT from me 🙏)
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

  // Give the Mint Address back over to the API
  return(nft);

}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // await NextCors(req, res, {
  //   methods: ["GET", "POST"],
  //   origin: "*",
  //   optionsSuccessStatus: 200,
  // });

  if(req.method === "POST") {

    const fData = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
      const form = new IncomingForm({
          multiples: false
      })
      form.parse(req, (err: any, fields: any, files: any) => {
          if (err) return reject(err)
          resolve({ fields, files })
      })
    });

    const publicAddress = fData.fields.publicAddress;

    try {
      const nft = await mintNFT(publicAddress, fData?.files?.photo.filepath)
      res.json({ nft });
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  } else {
    res.status(200).json({ test: 'API Works' });
  }

};