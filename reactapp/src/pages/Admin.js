import {useEffect, useState} from "react";
import {BigNumber, ethers} from 'ethers';
import Contract from '../artifacts/contracts/Character.sol/Character.json'

const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function Admin() {
    const [totalNft, setTotalNft] = useState(0)
    const [maxMint, setMaxMint] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [pricePresale, setPricePresale] = useState(0)
    const [priceSale, setPriceSale] = useState(0)

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, provider);
                try {
                    //call functions to gets data in contract
                    const totalNft = await contract.MAX_SUPPLY();
                    const maxMint = await contract.max_mint_allowed();
                    const step = await contract.sellingStep();
                    const pricePresale = await contract.pricePresale();
                    const priceSale = await contract.priceSale();

                    setTotalNft(Number(totalNft))
                    setMaxMint(Number(maxMint))
                    setCurrentStep(step)
                    setPricePresale(ethers.utils.formatEther(Number(pricePresale)))
                    setPriceSale(ethers.utils.formatEther(Number(priceSale)))

                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function updateMaxMint()
    {
        let newValue = document.getElementById('inputMaxMint').value
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.changeMaxMintAllowed(newValue)
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function updatePrice(type)
    {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    const decimals = 18;
                    //update contract
                    if (type === 'presale') {//PRESALE
                        let newValue = document.getElementById('inputPricePresale').value
                        contract.changePricePresale(ethers.utils.parseUnits(newValue, decimals)) //need that else error with big number
                    }else if(type === 'sale'){//SALE
                        let newValue = document.getElementById('inputPriceSale').value
                        contract.changePriceSale(ethers.utils.parseUnits(newValue, decimals)) //need that else error with big number
                    }
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }


    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold">Admin dashboard</h1>

            <div className="mt-10">
                <h2 className="text-2xl font-bold underline">Infos</h2>
                <p>NTFs number : {totalNft}</p>
                <p>Max mint : {maxMint}</p>
                <p>Current step : {currentStep}</p>
                <p>Price presale : {pricePresale} ETH</p>
                <p>Price sale : {priceSale} ETH</p>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold underline">Update contract</h2>
                <div className="my-4">
                    <p>Max mint allowed :</p>
                    <input id="inputMaxMint" type="number" className="border border-black w-32 mr-2 p-1" placeholder="number"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={updateMaxMint}>valider</button>
                </div>
                <div className="my-4">
                    <p>Price presale :</p>
                    <input id="inputPricePresale" type="number" className="border border-black w-32 mr-2 p-1" placeholder="in ETH"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => updatePrice('presale')}>valider</button>
                </div>
                <div className="my-4">
                    <p>Price sale :</p>
                    <input id="inputPriceSale" type="number" className="border border-black w-32 mr-2 p-1" placeholder="in ETH"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => updatePrice('sale')}>valider</button>
                </div>

            </div>
        </div>
    );

}
export default Admin