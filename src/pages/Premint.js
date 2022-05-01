import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import ButtonExternal from "../components/ButtonExternal";

function Premint() {
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function preMint() {
        //get account
        if (typeof window.ethereum !== 'undefined') {
            //get the chain id to check if nice network
            let chainId = await window.ethereum.request({method: 'eth_chainId'})

            //CHANGE BY THE CHAINID OF MAINNET IN PRODUCTION
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})






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
                <div className="container mx-auto pt-32">
                    <div className="bg-background bg-opacity-70 backdrop-blur-sm h-fit w-fit p-12 rounded mx-auto shadow-md rounded-sm max-w-3xl max-w-3xl">
                        <h1 className="text-5xl font-black text-white text-center uppercase mb-8 leading-tight px-32">Premint</h1>
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