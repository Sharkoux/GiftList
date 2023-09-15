const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const name = 'Norman Block';

async function main() {
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  // if the name is in the list, get the proof
  if (index !== -1) {
    const proof = merkleTree.getProof(index);

    // send the proof and name to the server
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name, proof
    });

    console.log({ gift });
  }
  else {
    console.log("You are not on the list :(");
  }
}

main();