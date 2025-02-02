import { Address, toHex, toBytes } from 'viem'; // Import toBytes
import { mintNFT } from './utils/mintNFT';
import { NFTContractAddress, account, client } from './utils/utils';

const main = async function () {
    // 1. Register an IP Asset
    const tokenId = await mintNFT(account.address, 'test-uri');
    const ipResponse = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId!,
        terms: [],
        ipMetadata: {
            ipMetadataURI: 'test-uri',
            ipMetadataHash: toHex('test-metadata-hash', { size: 32 }),
            nftMetadataHash: toHex('test-nft-metadata-hash', { size: 32 }),
            nftMetadataURI: 'test-nft-uri',
        },
        txOptions: { waitForTransaction: true },
    });
    console.log(`Root IPA created at transaction hash ${ipResponse.txHash}, IPA ID: ${ipResponse.ipId}`);
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ipResponse.ipId}`);

    // 2. Raise a Dispute with corrected targetTag
    const disputeResponse = await client.dispute.raiseDispute({
        targetIpId: ipResponse.ipId as Address,
        targetTag: toBytes('0x504c414749415249534d00000000000000000000000000000000000000000000'), // Convert hex string to bytes
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
    });
    console.log(`Dispute raised at transaction hash ${disputeResponse.txHash}, Dispute ID: ${disputeResponse.disputeId}`);
}

main();
