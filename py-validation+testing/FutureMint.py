import os
from web3 import Web3, HTTPProvider
from dotenv import load_dotenv
load_dotenv()

CHAIN_ID = 3  # Testnet
GAS_AMOUNT = 65000
GAS_PRICE = 10  # gwei
Contract_address = '0x9cFd2c3Dc20c164bd1468DAf6e21234eF6aD4eF0'
SC_OWNER_ADDR = os.getenv('SC_OWNER_ADDR')
SC_OWNER_ADDR_PRIV_KEY_FILE_PATH = '/opt/.priv_key.txt'


def change_contract_state(wallet):
    # web3 must be called locally
    w3 = Web3(HTTPProvider(
        f'https://ropsten.infura.io/v3/{os.getenv("INFURA")}'))
    assert True is w3.isConnected()

    nonce = w3.eth.getTransactionCount(SC_OWNER_ADDR)
    private_key = os.getenv('PRIVATE_KEY')
    with open('abi.json', 'r') as f:
        abi = f.read()
        print(type(abi), nonce)

    contract = w3.eth.contract(address=Contract_address, abi=abi)
    print(dir(contract.functions))
    # transac = contract.functions.MintMore().call()

    transaction = contract.functions.MintMore().buildTransaction(
        {
            'chainId': CHAIN_ID,
            'gas': GAS_AMOUNT,
            'gasPrice': Web3.toWei(GAS_PRICE, 'gwei'),
            'from': SC_OWNER_ADDR,
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


change_contract_state(SC_OWNER_ADDR)
