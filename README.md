# ⚡️Register IP On Story and Register Music 🎶 on Story 

### Get Started

   First of all Open any Ubuntu Terminal: 
   
1.  Clone Repo:
    ```
    git clone https://github.com/arun993/typescript-tutorial.git && cd typescript-tutorial
    ```
    Install Node.js if not :
    ```
    sudo apt update
    sudo apt install -y nodejs npm
    ```
    Install Dependencies
    ```
    npm install
    ```


## 📄 "Simple Mint and Register IP on story"

1.  Open editor : ``` nano .env```
   
    Now add following credentials:

    Your Wallet private key : burner wallet recommanded (must have some $IP for gas) Do this when gwei below 100
    ```
    WALLET_PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
    ```

3. Go to [Pinata](https://pinata.cloud/) and create a new API key. Add the JWT to your `.env` file:

    ```
    PINATA_JWT=YOUR_PINATA_JWT
    ```

4. RPC URL : 
   ```
   RPC_PROVIDER_URL=https://rpc.odyssey.storyrpc.io
   ```
   Press Ctrl+X , Y Enter to save
   
4. NOW run this command :

   ```
   npm run mint-and-register
   ```

   **⚡️If You get output like this means it's  Done you have registred IP on Story!**
   
   ![image](https://github.com/user-attachments/assets/ccae89f9-9575-4943-b389-81d6adc6b4fb)


## 🎵🎧 "NOW let's Register Music on Story"

1. Got to [SUNO](https://suno.com/) > Signup
3. GO to Create Tab > Enter Song Prompt or Upload a song that you wanna register then Create .
4. Click on copy song link and you got a  URL Example - `https://suno.com/song/dcd3076f-3aa5-400b-ba5d-87d30f27c311`
   Copy the the SONG_ID from the URL And save (Song id like this : `dcd3076f-3aa5-400b-ba5d-87d30f27c311`)

5. Now go back to terminal and run this command by replacing `Replace_with_Your_Song_ID` with you actual Song ID that 
   you got at step 4.

   ```
   sed -i 's/SONG_ID/Replace_with_Your_Song_ID/g' scripts/registerMusic.ts
   ```
6. Finally Run this command to register your Song on IP :

   ```
   npm run register-music
   ```

   **Done ! YOU can see a link open it in the browser and enjoy your music on IP 🎶**

   ![image](https://github.com/user-attachments/assets/0aadf8c3-418e-4cb3-89b2-63b814bd6b47)

## 📄 "Create SPG collection"
1. Just run this command :
   ```
   npm run create-spg-collection
   ```
   ![image](https://github.com/user-attachments/assets/4eaec27d-6398-42eb-8787-f366bae00e5d)

All Done !

   🔗Raw Source Code [HERE](https://docs.story.foundation/docs/how-to-register-music-on-story) By  [jacobmtucker](https://x.com/jacobmtucker).
   
   🔗Guide Created by  [0xGareeb](https://x.com/Arun__993) DO Follow if you like my guide Thanks !
