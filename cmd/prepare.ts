import { Tx,Fk } from "../main";
import { Tezos, ForgeParams, Signer } from "@taquito/taquito";
import { OperationContentsTransaction, OpKind } from "@taquito/rpc";

export let prepare = async (faucetKey: Fk, input: Tx[]): Promise<ForgeParams> => {
  Tezos.setProvider({
    rpc: "https://api.tez.ie/rpc/carthagenet",
  });

  await Tezos.importKey(
    faucetKey.email,
    faucetKey.password,
    faucetKey.mnemonic.join(" "),
    faucetKey.secret
  );

  // we need the public key and pkh of sender
  // we need to inject a custom signer
  let pkh = await Tezos.signer.publicKeyHash();
  // Get counter for source address
  let { counter } = await Tezos.rpc.getContract(pkh);

  if (!counter) {
    throw new Error(`Got undefined counter for source address ${pkh}`);
  }

  // Get latest block hash (aka branch id)
  let hash = (await Tezos.rpc.getBlockHeader()).hash;
  let count = Number.parseInt(counter, 10);
  let transactions: OperationContentsTransaction[] = [];

  for (const tx of input) {
    let est = await Tezos.estimate.transfer({ amount: tx.amount, to: tx.dst, source: pkh });

    const result: OperationContentsTransaction = {
      kind: OpKind.TRANSACTION,
      source: pkh,
      amount: tx.amount.toString(),
      destination: tx.dst,
      counter: (++count).toString(),
      gas_limit: est.gasLimit.toString(),
      fee: est.suggestedFeeMutez.toString(),
      storage_limit: est.storageLimit.toString(),
    };
    transactions.push(result);
  }

  return {
    branch: hash,
    //TODO pending refactor of types
    contents: transactions as any,
  };
};
