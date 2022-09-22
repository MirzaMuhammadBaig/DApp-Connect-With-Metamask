import { ethers } from './ethers-5.1.esm.min.js'

const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
const signer = provider.getSigner()

var isMetamaskInstalled = () => ethereum.isMetamaskInstalled

var isMetamaskConnected = () => ethereum.isConnected()

const getChainId = async () => {
    return await ethereum.request({method: 'eth_chainId'})
}

const getNetworkId = async () => {
    return await ethereum.request({method: 'net_version'})
}

const getAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_accounts'})
        return account
    } catch (error) {
        console.log('Error getting account:\n', error)
        return error
    }
}

const connectToAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_requestAccounts'})
        return account
    } catch (error) {
        console.log('Error connecting to metamask account:\n',error)
        return error
    }
}

const getBalance = async () => {
    try {
        let account = await getAccount()
        if (account.length === 0) {
            return 'Connect to account first!'
        }
    
        let balance = await signer.getBalance()
        return ethers.utils.formatEther(balance) + ' ETH'
    } catch (error) {
        console.log('Error getting balance:\n',error)
        return error
    }
}

export default {
    signer,
    isMetamaskInstalled,
    isMetamaskConnected,
    getChainId,
    getNetworkId,
    getAccount,
    connectToAccount,
    getBalance
}