import os
from web3 import Web3, HTTPProvider
from dotenv import load_dotenv
load_dotenv()

CHAIN_ID = 3  # Testnet
GAS_AMOUNT = 65000
GAS_PRICE = 10  # gwei
Contract_address = os.getenv(
    'PNT_ADDRESS')
OWNER_ADDR = os.getenv('LIQUIDITY_PROVIDER')


def change_contract_state(wallet):
    # web3 must be called locally
    w3 = Web3(HTTPProvider(
        f'https://ropsten.infura.io/v3/{os.getenv("INFURA")}'))
    assert True is w3.isConnected()

    nonce = w3.eth.getTransactionCount(OWNER_ADDR)
    private_key = os.getenv('LIQUIDITY_PRIVATE')

    with open('abi_pnt.json', 'r') as f:
        abi = f.read()
        print(type(abi), nonce)

    contract = w3.eth.contract(address=Contract_address, abi=abi)
    # print(dir(contract.functions))
    # # transac = contract.functions.MintMore().call()

    transaction = contract.functions.transfer(
        #
        os.getenv('POOL'),
        100000000000000000000000000000000
    ).buildTransaction(
        {
            'chainId': CHAIN_ID,
            'gas': GAS_AMOUNT,
            'gasPrice': Web3.toWei(GAS_PRICE, 'gwei'),
            'from': OWNER_ADDR,
            'nonce': nonce
        }
    )

    print(transaction)
    signed_txn = w3.eth.account.signTransaction(
        transaction, private_key=private_key)

    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    print(w3.toHex(tx_hash))
    # recipt = w3.eth.get_transaction_receipt(tx_hash)
    # print(recipt)


change_contract_state(OWNER_ADDR)
