# Simple Guide on Registering IP on the Blockchain with SDK

## 1. Clone Repo
```bash
git clone https://github.com/arun993/typescript-tutorial.git && cd typescript-tutorial
```

## 2. Edit .env
Create a burner wallet and extract the private key, then send some $IP to the address. Go to [Pinata](https://pinata.cloud/) > log in with Google > create API > copy and save the JWT address > {secret access token}.

Now add your details in the .env file:
```bash
nano .env
```

## 3. RUN
```bash
npm install
```

## 4. RUN (this will take 5-10 minutes)
```bash
npm run non-commercial
```

## 5. Connect Wallet
Go to this website: [StoryScan](https://testnet.storyscan.xyz/address/0x91f6F05B08c16769d3c85867548615d270C42fC7?tab=write_contract#40c10f19)
- Connect the wallet.
- Address = your MetaMask address.
- unit256 = 10
- ENTER WRITE

## 6. Connect Wallet Again
Go to: [StoryScan](https://testnet.storyscan.xyz/address/0x91f6F05B08c16769d3c85867548615d270C42fC7?tab=write_contract#095ea7b3)
- Connect the same wallet.
- Spender address = `0x4074CEC2B3427f983D14d0C5E962a06B7162Ab92`
- unit256 = 1
- Enter Write

## 7. RUN
```bash
npm run commercial
```

## 8. RUN 
```bash
npm run create-spg-collection
```
Copy and save the NFT contract address. Save it to the .env file (`NFT_CONTRACT_ADDRESS=Your_nft_address`)

## 9. RUN FINAL COMMAND
```bash
npm run metadata
```

Done! If you see a transaction hash, IPA ID, and transaction link, you're all set!
