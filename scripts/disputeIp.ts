import { Address, toHex } from 'viem';
import { mintNFT } from './utils/mintNFT';
import { NFTContractAddress, account, client } from './utils/utils';

const main = async function () {
    // 1. Register IP Asset (unchanged)
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

    // 2. Fix Dispute Call - CORRECTED VERSION
    const disputeResponse = await client.dispute.raiseDispute({
        targetIpId: ipResponse.ipId as Address,
        // PROPER 32-BYTE ENCODING:
        targetTag: toHex(
            // Remove "0x" prefix and use raw bytes
            '504c414749415249534d00000000000000000000000000000000000000000000',
            { size: 32 }
        ),
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'
    });
    console.log(`Dispute raised at tx hash ${disputeResponse.txHash}`);
}

main();
