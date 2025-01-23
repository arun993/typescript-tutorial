# ⚡️Register IP On Story and Resiter Music 🎶 on Story 

### Get Started

   First of all Open any Ubunbtu Terminal: 
   
1. Install the dependencies:

    Clone Repo:
    ```
    git clone https://github.com/arun993/typescript-tutorial.git && cd typescript-tutorial
    ```
    Install Node.js if not :
    ```
    sudo apt update
    sudo apt install -y nodejs npm
    ```

    ```
    npm install
    ```


## 📄 "Simple Mint and Register IP on story"

1.  Open editor : ``` nano.env```
   
    Now add following credentials:
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
   `npm run mint-and-register`

   **⚡️If You get a url Done you have registred IP on Story!**

## 🎵🎧 "NOW let's Register Music on Story"

1. Got to [SUNO](https://suno.com/) > Signup
3. GO to Create Tab > Enter Song Prompt or Upload a song that you wanna register then Create .
4. Click on copy song link and you got a  URL like - https://suno.com/song/dcd3076f-3aa5-400b-ba5d-87d30f27c311
   Copy the the SONG_ID in the URL And save  (dcd3076f-3aa5-400b-ba5d-87d30f27c311)

5. Now go back to terminal and run this command by replacing `Replace_with_Your_Song_ID` with you actual Song ID that 
   you got at step 4.

   ```
   sed -i 's/SONG_ID/Replace_with_Your_Song_ID/g' scripts/registerMusic.ts
   ```
6. Finnaly Run this command to register your Song on IP :

   ```
   npm run register-music
   ```

   **Done ! YOU can see a link open it in the browser and enjoy your muscin on IP 🎶**

   Scrit written by [jacobmtucker](https://x.com/jacobmtucker).
   
   Don't Forget to Follow [0xGareeb](https://x.com/Arun__993) For more . Thanks !
