import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";
import {ethers} from 'ethers';

function Whitelist() {
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        //SET NUMBER OF WHITELISTED ADDRESSES (call to api after)
        setCount((Math.random(1,20) * 100).toFixed(0))
    }, [])



    async function beWhitelist()
    {
        //get account
        if (typeof window.ethereum !== 'undefined') {
            //get the chain id to check if nice network
            let chainId = await window.ethereum.request({method: 'eth_chainId'})

            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setAccounts(accounts);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //get the eth balance in WEI of connected account
                const balance = await provider.getBalance(accounts[0]);
                // balance WEI -> ETH
                const balanceInEth = ethers.utils.formatEther(balance)
                setBalance(balanceInEth);

                //FETCH POST TO DB AND IF NOT ALREADY IN ADD OR RETURN 'already in whitelist'
                setCount(Number(count) + 1)
                alert('u are now whitelist')

            } else {
                setError('Wrong network')
                alert('failed cuz : Wrong network')
            }
        } else {
            setError('Not connected')
            alert('failed cuz : Not connected')
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-6xl font-black text-center mb-8 mt-6">Characters NFT</h1>
            <ExampleNtfContainer/>

            <p className="text-lg text-center mx-20 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat euismod imperdiet.<br />
                Morbi
                scelerisque, nunc luctus malesuada porta.
            </p>

            <div className="mx-auto block text-center mt-10 mb-10">
                <p className="text-4xl font-bold">{count}/100</p>
                <p>already whitelisted</p>
            </div>
            <button className="mx-auto px-6 py-2  block bg-amber-600 text-lg text-white" onClick={beWhitelist}>Be whitelist</button>
        </div>
    )
}
export default Whitelist;