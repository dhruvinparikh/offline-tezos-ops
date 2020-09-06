# Offline Tezos Ops

This tool illustrates how to forge and sign a list of transactions in an offline/air-gapped environment.

The tool supports transfers of Tezos tokens from a single sender address. Support for transfers of asset contracts will be added.

Let's assume we have two environments, an on-line environment that has access to an active Tezos node, and an offline/air-gapped environment. We will assume that this utility is installed and operable on *both* environments.

Pre-requests for operation:

* A JSON file containing the desired transactions. See `sample-input.json`.
* Download faucet key file from [https://faucet.tzalpha.net/](https://faucet.tzalpha.net/) and paste it to root of this directory.

## Step 1

Run the 'prepare' step.

```sh
npm --silent start -- prepare \
        -f ./tz1gMXpUmAGBnGgYuzzBjrBoL93EAJeYwjLm.json \
        -i ./sample-input.json > txs_for_secure_environment.json
```

This step prepares your transactions, and estimated each one using the Tezos RPC node. It writes the prepared transactions to a file.

## Step 2

Securely copy the prepared transactions JSON file to the secured/air-gapped environment.

## Step 3

Run the `sign` step

```sh
npm --silent start -- sign \
        --signing_key edsk417kwqd67ze6DhCwtDR9PYnii5NKCmaXmgML89CvDiS1jV2EHU \
        -i ./txs_for_secure_environment.json > signed_bytes.txt
```

This step takes your private key, and your prepared transactions. It forged the transactions into a single operation and then signs that operation with your private key.

## Step 4

Securely copy the `signed_bytes.txt` file from the secured/air-gapped system to the online environment.

## Step 5

```sh
$ npm start -- inject "$(cat signed_bytes.txt)"
https://babylon.tzkt.io/oo9vRAhFamKUqbysvNqNPokjz8LWuZnYBuZDSLWU1X9K3U1Vafa
```
