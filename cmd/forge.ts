import { Fk } from "../main";
import { Tezos, ForgeParams, Signer } from "@taquito/taquito";
import { InMemorySigner, importKey } from "@taquito/signer";
import { localForger } from "@taquito/local-forging";

export let forge = async (txs: ForgeParams, faucetKey: Fk) => {
  Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/carthagenet" });
  Tezos.setProvider({ forger: localForger });

  await Tezos.importKey(
    faucetKey.email,
    faucetKey.password,
    faucetKey.mnemonic.join(" "),
    faucetKey.secret
  );
  let forgedBytes = await localForger.forge(txs);
  //sign
  let signer = InMemorySigner.fromFundraiser(
    faucetKey.email,
    faucetKey.password,
    faucetKey.mnemonic.join(" ")
  );
  // //Kludge to get libsodium loaded
  await signer.publicKeyHash()
  return (await signer.sign(forgedBytes, new Uint8Array([0x03]))).sbytes;
};
