import { Address, keccak256, hexToBytes } from 'viem';
import { mintNFT } from './utils/mintNFT';
import { NFTContractAddress, account, client } from './utils/utils';
import { CID } from 'multiformats/cid';

// BEFORE YOU RUN THIS FUNCTION: Make sure to read the README which contains
// instructions for running this "Dispute" example.

const main = async function () {
    // 1. Register an IP Asset
    //
    // Docs: https://docs.story.foundation/docs/register-an-nft-as-an-ip-asset
    const tokenId = await mintNFT(account.address, 'test-uri');
    const ipResponse = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId!,
        terms: [],
        ipMetadata: {
            ipMetadataURI: 'test-uri',
            ipMetadataHash: keccak256(hexToBytes('0x746573742d6d657461646174612d68617368')), // Hash example
            nftMetadataHash: keccak256(hexToBytes('0x746573742d6e66742d6d657461646174612d68617368')), // Hash example
            nftMetadataURI: 'test-nft-uri',
        },
        txOptions: { waitForTransaction: true },
    });

    console.log(`Root IPA created at transaction hash ${ipResponse.txHash}, IPA ID: ${ipResponse.ipId}`);
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ipResponse.ipId}`);

    // 2. Convert CID properly
    const originalCID = 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
    const cidBytes = CID.parse(originalCID).bytes; // Convert CID to bytes
    const cidHash = keccak256(cidBytes); // Hash it to 32 bytes

    console.log(`Converted CID hash (32 bytes): ${cidHash}`);

    // 3. Raise a Dispute
    const disputeResponse = await client.dispute.raiseDispute({
        targetIpId: ipResponse.ipId as Address,
        targetTag: '0x504c414749415249534d00000000000000000000000000000000000000000000',
        cid: cidHash, // ✅ Properly converted and hashed
    });

    console.log(`Dispute raised at transaction hash ${disputeResponse.txHash}, Dispute ID: ${disputeResponse.disputeId}`);
};

main();
