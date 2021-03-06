import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import ButtonExternal from "../components/ButtonExternal";
import {address} from '../contract' //address of contract
import Contract from '../contracts/Character.sol/Character.json'

function Premint() {
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


    async function preMint() {
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
                const pricePresale = await contractRead.pricePresale();

                //contract when update
                const contractUpdate = new ethers.Contract(address, Contract.abi, signer);


                try {
                    let overrides = {
                        from: accounts[0],
                        value: pricePresale
                    }

                    /**
                     * I NOT REALLY UNDERSTAND THE MERKLE TREE AND THE PROOF FOR THE MOMENT / SO NOT WORKING YET
                     */

                    //call function presale mint of contract
                    const transaction = await contractUpdate.presaleMint(accounts[0], 1, overrides)
                    await transaction.wait();
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
            <section id="premint" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-32 pb-16 px-8">
                    <div className="bg-background bg-opacity-70 backdrop-blur-sm p-12 rounded shadow-md rounded-sm mx-auto max-w-3xl max-w-3xl">
                        <h1 className="text-5xl font-black text-white text-center uppercase mb-8 leading-tight">Premint</h1>
                        <p className="text-3xl font-bold text-white text-center mb-16">If you are whitelisted you can premint now for <span className="text-primary"> 0.00025 ETH</span>/nft</p>
                        <div className="text-white text-center mb-16">
                            <p className="text-4xl font-black"><span className="text-primary">{count}</span>/100*</p>
                            <p className="text-xl ">already premint</p>
                        </div>

                        <p className="text-primary text-2xl text-center mb-8 font-bold">
                            {error}
                            {success}
                        </p>
                        <ButtonExternal title="Premint" onClick={preMint} class="mx-auto" />
                        <p className="text-white text-sm">*not working yet</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Premint;