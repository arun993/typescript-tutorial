import { zeroAddress } from 'viem'
import { client } from './utils'
import fs from 'fs'

const main = async function () {
    // Create a new SPG NFT collection
    const newCollection = await client.nftClient.createNFTCollection({
        name: 'Test NFT',
        symbol: 'TEST',
        isPublicMinting: true,
        mintOpen: true,
        mintFeeRecipient: zeroAddress,
        contractURI: '',
        txOptions: { waitForTransaction: true },
    })

    const contractAddress = newCollection.spgNftContract
    console.log(`New SPG NFT collection created at transaction hash ${newCollection.txHash}`)
    console.log(`NFT contract address: ${contractAddress}`)

    // Append or overwrite the SPG_NFT_CONTRACT_ADDRESS in the .env file
    const envFilePath = '.env'
    const envContent = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf8') : ''
    const updatedEnvContent = envContent.replace(
        /^(SPG_NFT_CONTRACT_ADDRESS=.*)$/m,
        `SPG_NFT_CONTRACT_ADDRESS=${contractAddress}`
    )

    const finalEnvContent = updatedEnvContent.includes('SPG_NFT_CONTRACT_ADDRESS')
        ? updatedEnvContent
        : `${envContent.trim()}\nSPG_NFT_CONTRACT_ADDRESS=${contractAddress}`

    fs.writeFileSync(envFilePath, finalEnvContent, 'utf8')
    console.log('Updated .env file with SPG_NFT_CONTRACT_ADDRESS')
}

main().catch((error) => {
    console.error('Error:', error)
})
