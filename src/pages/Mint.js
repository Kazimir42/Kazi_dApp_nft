import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import ButtonExternal from "../components/ButtonExternal";
import {address} from '../contract'
import Contract from "../contracts/Character.sol/Character.json"; //address of contract

function Mint() {
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setAccounts(accounts);

                //provider and signer need to watch / update contract data
                const tempProvider = new ethers.providers.Web3Provider(window.ethereum);

                const tempWatchContract = new ethers.Contract(address, Contract.abi, tempProvider);

                let totalCount = await tempWatchContract.totalSupply()

                setCount(parseFloat(totalCount).toFixed(0))

            }
        }
    }

    async function mint() {
        //get account
        if (typeof window.ethereum !== 'undefined') {
            //get the chain id to check if nice network
            let chainId = await window.ethereum.request({method: 'eth_chainId'})

            //CHANGE BY THE CHAINID OF MAINNET IN PRODUCTION
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

                //user
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                //contract when read
                const contractRead = new ethers.Contract(address, Contract.abi, provider);

                //get the price
                const priceSale = await contractRead.priceSale();

                //contract when update
                const contractUpdate = new ethers.Contract(address, Contract.abi, signer);


                try {
                    let overrides = {
                        from: accounts[0],
                        value: priceSale
                    }

                    //call function presale mint of contract
                    const transaction = await contractUpdate.saleMint(1)
                    await transaction.wait();

                    getData();
                }catch(error) {
                    console.log(error)
                }



            } else {
                setError('Wrong network')
            }
        } else {
            setError('Not connected')
        }

    }

    return (
        <div className="">
            <section id="mint" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-32 px-8 pb-16 max-w-3x">
                    <div className="bg-background bg-opacity-70 backdrop-blur-sm p-12 rounded shadow-md rounded-sm max-w-full mx-auto max-w-3xl">
                        <h1 className="text-5xl font-black text-white text-center uppercase mb-8 leading-tight">Mint</h1>
                        <p className="text-3xl font-bold text-white text-center mb-16">You can mint now for <span className="text-primary"> 0.0003 ETH</span>/nft</p>
                        <div className="text-white text-center mb-16">
                            <p className="text-4xl font-black"><span className="text-primary">{count}</span>/100*</p>
                            <p className="text-xl ">already minted</p>
                        </div>

                        <p className="text-primary text-2xl text-center mb-8 font-bold">
                            {error}
                            {success}
                        </p>
                        <ButtonExternal title="Mint" onClick={mint} class="mx-auto" />
                        <p className="text-white text-sm">*not working yet</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Mint;