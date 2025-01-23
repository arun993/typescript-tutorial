import { IpMetadata } from '@story-protocol/core-sdk'
import { mintNFT } from './utils/mintNFT'
import { NFTContractAddress, account, client } from './utils/utils'
import { uploadJSONToIPFS } from './utils/uploadToIpfs'
import { createHash } from 'crypto'

// BEFORE YOU RUN THIS FUNCTION: Make sure to read the README which contains
// instructions for running this "Simple Mint and Register" example.

const main = async function () {
    // 1. Set up your IP Metadata
    
const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
  title: 'My IP Asset',
  description: 'This is a test IP asset',
  ipType: 'Music',
  media: [
    {
      name: 'Rise Again',
      url: 'https://cdn1.suno.ai/SONG_ID.mp3',
      mimeType: 'audio/mpeg',
    },
  ],
  attributes: [
    {
      key: 'Artist',
      value: 'amazedneurofunk956',
    },
    {
      key: 'Artist ID',
      value: '4123743b-8ba6-4028-a965-75b79a3ad424',
    },
    {
      key: 'Source',
      value: 'Suno.com',
    },
  ],
  creators: [
    {
      name: 'srivatsan_qb',
      address: account.address,
      contributionPercent: 100,
    },
  ],
})

    // 2. Set up your NFT Metadata
    
const nftMetadata = {
  name: 'Test NFT',
  description: 'This is a test NFT',
  image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
  media: [
    {
      name: 'Rise Again',
      url: 'https://cdn1.suno.ai/SONG_ID.mp3',
      mimeType: 'audio/mpeg',
    },
  ],
  attributes: [
    {
      key: 'Artist',
      value: 'amazedneurofunk956',
    },
    {
      key: 'Artist ID',
      value: '4123743b-8ba6-4028-a965-75b79a3ad424',
    },
    {
      key: 'Source',
      value: 'Suno.com',
    },
  ],
}

    // 3. Upload your IP and NFT Metadata to IPFS
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

    // 4. Mint an NFT
    const tokenId = await mintNFT(account.address, `https://ipfs.io/ipfs/${nftIpfsHash}`)
    console.log(`NFT minted with tokenId ${tokenId}`)

    // 5. Register an IP Asset

    const response = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId!,
        terms: [],
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    })
    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
    console.log(`Congrats! Your music registered on IP View it on the explorer: https://explorer.story.foundation/ipa/${response.ipId}`)
}

main()
