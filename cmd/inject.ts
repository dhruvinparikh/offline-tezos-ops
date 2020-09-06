import { Tezos } from "@taquito/taquito";

export let inject = async (ops: string) => {
  Tezos.setProvider({ rpc: "https://api.tez.ie/rpc/carthagenet/" });
  //   console.log(Tezos.rpc);

  // console.log(Tezos.rpc.injectOperation);
  try {
    let opHash = await Tezos.rpc.injectOperation(ops);
    return opHash;
  } catch (e) {
    console.log("Error ", e);
  }
  //   return "kk";
};
