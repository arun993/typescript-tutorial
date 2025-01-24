import { zeroAddress } from 'viem';
import { client } from './utils';
import * as fs from 'fs';
import * as path from 'path';

const updateEnvFile = (key: string, value: string) => {
    const envFilePath = path.resolve(__dirname, '.env');
    let envContent = '';

    // Check if the .env file exists
    if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf-8');
    }

    // Format key=value
    const formattedEntry = `${key}=${value}`;
    const regex = new RegExp(`^${key}=.*`, 'm');

    // Replace if key exists, otherwise append
    if (regex.test(envContent)) {
        envContent = envContent.replace(regex, formattedEntry);
    } else {
        if (envContent.trim() !== '') {
            envContent += '\n';
        }
        envContent += formattedEntry;
    }

    // Write the updated content back to .env
    fs.writeFileSync(envFilePath, envContent, 'utf-8');
    console.log(`Updated .env with ${formattedEntry}`);
};

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
    });

    console.log(`New SPG NFT collection created at transaction hash ${newCollection.txHash}`);
    console.log(`NFT contract address: ${newCollection.spgNftContract}`);

    // Update the .env file with the new NFT contract address
    updateEnvFile('SPG_NFT_CONTRACT_ADDRESS', newCollection.spgNftContract);
};

main();
