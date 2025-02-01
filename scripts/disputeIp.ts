import { Address, keccak256, hexToBytes } from 'viem';
import { mintNFT } from './utils/mintNFT';
import { NFTContractAddress, account, client } from './utils/utils';
import * as multiformats from 'multiformats'; // ✅ Use full import
const { CID } = multiformats; // ✅ Extract CID correctly

const main = async function () {
    // 1. Register an IP Asset
    const tokenId = await mintNFT(account.address, 'test-uri');
    const ipResponse = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId!,
        terms: [],
        ipMetadata: {
            ipMetadataURI: 'test-uri',
            ipMetadataHash: keccak256(hexToBytes('0x746573742d6d657461646174612d68617368')),
            nftMetadataHash: keccak256(hexToBytes('0x746573742d6e66742d6d657461646174612d68617368')),
            nftMetadataURI: 'test-nft-uri',
        },
        txOptions: { waitForTransaction: true },
    });

    console.log(`Root IPA created at transaction hash ${ipResponse.txHash}, IPA ID: ${ipResponse.ipId}`);
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ipResponse.ipId}`);

    // 2. Convert CID properly
    const originalCID = 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
    const cidBytes = CID.parse(originalCID).bytes; // ✅ Fix import issue
    const cidHash = keccak256(cidBytes); // ✅ Ensure 32-byte size

    console.log(`Converted CID hash (32 bytes): ${cidHash}`);

    // 3. Raise a Dispute
    const disputeResponse = await client.dispute.raiseDispute({
        targetIpId: ipResponse.ipId as Address,
        targetTag: '0x504c414749415249534d00000000000000000000000000000000000000000000',
        cid: cidHash,
    });

    console.log(`Dispute raised at transaction hash ${disputeResponse.txHash}, Dispute ID: ${disputeResponse.disputeId}`);
};

main();
