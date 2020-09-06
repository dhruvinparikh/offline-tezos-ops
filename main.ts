import * as program from "commander";
import { prepare } from "./cmd/prepare";
import { forge } from "./cmd/forge";
import { inject } from "./cmd/inject";
import { readFileSync } from "fs";

program.version("0.0.1");

export interface Tx {
  dst: string;
  type: TX_TYPE;
  assetContract?: string;
  amount: number;
}

export interface Fk {
  mnemonic: [string];
  secret: string;
  amount: number;
  pkh: string;
  password: string;
  email: string;
}

enum TX_TYPE {
  TEZOS,
  // TODO: implement asset contract support
  // FA12,
  // FA2,
}

program
  .command("prepare")
  .description(
    "Takes a list of transactions and prepares them for signing. Requires a synced RPC node"
  )
  .option("-f, --faucet_key <key>", "The faucet key file for source")
  .option("-i, --input <file>", "Input JSON file containing transactions")
  .action(async (command) => {
    //TODO, get src from command line arg
    let faucetKey = JSON.parse(readFileSync(command.faucet_key).toString("utf-8"));
    let input = JSON.parse(readFileSync(command.input).toString("utf-8"));
    let preppedTransactions = await prepare(faucetKey, input);
    console.log(JSON.stringify(preppedTransactions, null, 2));
  });

program
  .command("sign")
  .description("Takes prepared transaction input, forges and signs an operation")
  .option("-f, --faucet_key <key>", "The faucet key file for source")
  .option(
    "-i, --input <file>",
    "JSON file of prepared transactions as produced by the `prepare` stage"
  )
  .action(async (command) => {
    let faucetKey = JSON.parse(readFileSync(command.faucet_key).toString("utf-8"));
    let preparedInput = JSON.parse(readFileSync(command.input).toString("utf-8"));
    let signedOps = await forge(preparedInput, faucetKey);
    console.log(signedOps);
  });

program
  .command("inject <operation_bytes>")
  .description("Taking a signed operation, validate and inject the operation")
  .action(async (content, command) => {
    let opHash = await inject(content);
    console.log(`https://babylon.tzkt.io/${opHash}`);
  });
program.parse(process.argv);
