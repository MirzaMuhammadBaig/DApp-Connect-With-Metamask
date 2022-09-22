import metamaskConfig from './connectionWithMetamask.js'

const network = document.getElementById('networkId')
const chainId = document.getElementById('chainId')
const account = document.getElementById('accountId')
const balance = document.getElementById('balance')

const connect = document.getElementById('connectToWallet')

if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!')
}
else {
    alert('Install Metamask extension to connect with DApp!')
}

const checkOnLoad = async () => {
    if (metamaskConfig.isMetamaskConnected) {
        ethereum.autoRefreshOnNetworkChange = false
        network.innerHTML = await metamaskConfig.getNetworkId()
        chainId.innerHTML = await metamaskConfig.getChainId()
        await metamaskConfig.connectToAccount()
        console.log('Metamask connected:', await metamaskConfig.isMetamaskConnected())
    } else {
        alert('Connect to available ethereum network!')
        console.log('Connect to available ethereum network!')
    }
}

checkOnLoad()

ethereum.on('accountsChanged', async (accounts) => {
    console.log('Account changed from', account)
    account.innerHTML = await metamaskConfig.getAccount()
    balance.innerHTML = await metamaskConfig.getBalance()
})

ethereum.on('connect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
})

ethereum.on('disconnect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
    alert('Metamask is not connected to ethereum network. Retry!')
})

connect.addEventListener('click', async (e) => {
    e.preventDefault()

    let getAccountAddress = await metamaskConfig.getAccount()
    if (getAccountAddress.length < 1) {
        getAccountAddress = await metamaskConfig.connectToAccount()
        account.innerHTML = getAccountAddress
        balance.innerHTML = await metamaskConfig.getBalance()
    } else {
        account.innerHTML = getAccountAddress
        balance.innerHTML = await metamaskConfig.getBalance()
    }
    console.log(getAccountAddress)
})







