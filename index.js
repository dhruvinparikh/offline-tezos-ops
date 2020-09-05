const { Tezos } = require("@taquito/taquito");
const axios = require("axios");

// Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/carthagenet" });

const FAUCET_KEY = {
  mnemonic: [
    "fix",
    "brass",
    "often",
    "boy",
    "craft",
    "ship",
    "woman",
    "verify",
    "vanish",
    "series",
    "letter",
    "neutral",
    "vehicle",
    "emotion",
    "elbow",
  ],
  secret: "bd8c8bbef90c1da9acfec3384b5ad2bd4f1d579b",
  amount: "2404235691",
  pkh: "tz1ZymqRMXjMP34Jnubfv3QprULZbqDHLm2y",
  password: "F9WgyXQLfF",
  email: "gvsxvust.ufmniviq@tezos.example.org",
};

console.log(`Fetching a private key...`);
// axios({
//   method: "POST",
//   url: "https://api.tez.ie/keys/carthagenet/",
//   headers: { Authorization: "Bearer taquito-example" },
// })
//   .then((response) => response.data)
//   .then((privateKey) => {
//     console.log(`Importing the private key...`);
//     // return Tezos.importKey(privateKey);
//     return Tezos.importKey(
//       FAUCET_KEY.email,
//       FAUCET_KEY.password,
//       FAUCET_KEY.mnemonic.join(" "),
//       FAUCET_KEY.secret
//     );
//   });
//   .then(() => {
//     const amount = 0.5;
//     const address = "tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY";

//     console.log(`Transfering ${amount} ꜩ to ${address}...`);
//     return Tezos.estimate.transfer({ to: address, amount: amount });
//   }). then((est) => {
//     console.log(`burnFeeMutez : ${est.burnFeeMutez},
//     gasLimit : ${est.gasLimit},
//     minimalFeeMutez : ${est.minimalFeeMutez},
//     storageLimit : ${est.storageLimit},
//     suggestedFeeMutez : ${est.suggestedFeeMutez},
//     totalCost : ${est.totalCost},
//     usingBaseFeeMutez : ${est.usingBaseFeeMutez}`);
//   })
//   .then(() => {
//     const amount = 0.5;
//     const address = "tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY";

//     console.log(`Transfering ${amount} ꜩ to ${address}...`);
//     return Tezos.contract.transfer({ to: address, amount: amount });
//   })
//   .then((op) => {
//     console.log(`Waiting for ${op.hash} to be confirmed...`);
//     return op.confirmation(1).then(() => op.hash);
//   })
//   .then((hash) => console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`))
//   .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/carthagenet" });
Tezos.importKey(
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(" "),
  FAUCET_KEY.secret
)
  .then(() => {
    const amount = 0.5;
    const address = "tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY";
    console.log(`Estimating ${amount} ꜩ to ${address}...`);
    return Tezos.estimate.transfer({ to: address, amount: amount });
  })
  .then((est) => {
    console.log(`burnFeeMutez : ${est.burnFeeMutez},
        gasLimit : ${est.gasLimit},
        minimalFeeMutez : ${est.minimalFeeMutez},
        storageLimit : ${est.storageLimit},
        suggestedFeeMutez : ${est.suggestedFeeMutez},
        totalCost : ${est.totalCost},
        usingBaseFeeMutez : ${est.usingBaseFeeMutez}`);
  });
