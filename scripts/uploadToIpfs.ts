import { PinataSDK } from 'pinata-web3'

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  // you can put your pinata gateway here, or leave it empty
  pinataGateway: process.env.PINATA_GATEWAY
})

// upload our image to ipfs by putting it in a public group
export async function uploadBlobToIPFS(blob: Blob, fileName: string): Promise<string> {
  const file = new File([blob], fileName, { type: 'image/png' })
  const { IpfsHash } = await pinata.upload.file(file)
  return IpfsHash
}

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
    const { IpfsHash } = await pinata.upload.json(jsonMetadata)
    return IpfsHash
}
