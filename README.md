# Signing a document on Ethereum (Depecrated)
(This is a concept demo for the full project at https://github.com/TaroAndMulan/VCsignAlpha)

[explanation PDF ](public/DEMO.pdf)

This project support a text to PDF editor.
The user can initiate a contract by signing a document with Ethereum private keys and send it to the recipient.
Once the recipient recieve a document and sign it, the hash of the document and all transaction will be permanently record and verifiable on the blockchain.


Draft a contract
![First Screen](https://github.com/TaroAndMulan/EthereumMetamaskDocuSign/blob/main/public/demopic.png)

(Both party) Sign a contract with ethereum private key
![2](https://github.com/TaroAndMulan/EthereumMetamaskDocuSign/blob/main/public/1.png)

A hash of a signed document is permanent stored on the Ethereum blockchain with timestamp
![3](https://github.com/TaroAndMulan/EthereumMetamaskDocuSign/blob/main/public/2.png)

### install

git clone https://github.com/taroandmulan/thesis_blockchain.git

cd thesis_blockchain

npm install

npm start
