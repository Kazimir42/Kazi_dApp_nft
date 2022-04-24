import {useEffect, useState} from "react";
import {BigNumber, ethers} from 'ethers';
import Contract from '../artifacts/contracts/Character.sol/Character.json'
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //address of contract

function Admin() {
    const [totalNft, setTotalNft] = useState(0)
    const [maxMint, setMaxMint] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [pricePresale, setPricePresale] = useState(0)
    const [priceSale, setPriceSale] = useState(0)
    const [merkleRoot, setMerkleRoot] = useState(0)
    const [tokensFile, setTokensFile] = useState(0)
    const [paused, setPaused] = useState(false)
    const [baseURI, setBaseURI] = useState(0)
    const [notRevealedURI, setNotRevealedURI] = useState(0)
    const [baseExtension, setBaseExtension] = useState('')
    const [revealed, setRevealed] = useState(false)

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
                    const merkleRoot = await contract.merkleRoot();
                    const paused = await contract.paused();
                    const baseURI = await contract.baseURI();
                    const notRevealedURI = await contract.notRevealedURI();
                    const baseExtension = await contract.baseExtension();
                    const revealed = await contract.revealed();

                    setTotalNft(Number(totalNft));
                    setMaxMint(Number(maxMint));
                    setCurrentStep(step);
                    setPricePresale(ethers.utils.formatEther(Number(pricePresale)));
                    setPriceSale(ethers.utils.formatEther(Number(priceSale)));
                    setMerkleRoot(merkleRoot);
                    setPaused(paused);
                    setBaseURI(baseURI);
                    setNotRevealedURI(notRevealedURI);
                    setBaseExtension(baseExtension);
                    setRevealed(revealed);

                }catch(error) {
                    console.log(error)
                }
            }
        }
    }


    async function pausedContract(boolean) {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.setPaused(boolean)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }



    function uploadFile(event) {
        setTokensFile(event.target.files[0]);
    }

    async function newMerkleRoot() {

        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);

                //convert to json data of upload file
                let tokens = JSON.parse(await tokensFile.text())

                //map in array
                let tab = [];
                tokens.map((token) => {
                    tab.push(token.address);
                });

                //create merkle tree
                const leaves = tab.map((address) => keccak256(address));
                const tree = new MerkleTree(leaves, keccak256, { sort: true });
                const root = tree.getHexRoot();

                try {
                    //update contract
                    contract.changeMerkleRoot(root)
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

    async function updateUri(type)
    {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    if (type === 'baseURI') { //URI of the NFTs when revealed
                        let newValue = document.getElementById('inputBaseUri').value
                        contract.setBaseUri(newValue)
                    }else if(type === 'notRevealedURI'){ //URI of the NFTs when not revealed
                        let newValue = document.getElementById('inputNotRevealedUri').value
                        contract.setNotRevealURI(newValue)
                    }
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function updateExtension()
    {
        let newValue = document.getElementById('inputBaseExtension').value
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.setBaseExtension(newValue)
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function reveal()
    {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.reveal()
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function setUpPresale()
    {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.setUpPresale()
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function setUpSale()
    {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.setUpSale()
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }

    async function makeGift()
    {
        let addressToGift = document.getElementById('inputGift').value
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, signer);
                try {
                    //update contract
                    contract.gift(addressToGift)
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
                <p>Contract paused : {paused?'true':'false'}</p>
                <p>Whitelist Merkle root : {merkleRoot}</p>
                <p>NTFs number : {totalNft}</p>
                <p>Max mint : {maxMint}</p>
                <p>Current step : {currentStep}</p>
                <p>Price presale : {pricePresale} ETH</p>
                <p>Price sale : {priceSale} ETH</p>
                <p>baseURI : {baseURI}</p>
                <p>notRevealedURI : {notRevealedURI}</p>
                <p>baseExtension : {baseExtension}</p>
                <p>nft revealed : {revealed?'true':'false'}</p>
            </div>

            <div className="mt-10 grid grid-cols-12">
                <div className="col-span-6">
                <h2 className="text-2xl font-bold underline">Update contract data</h2>

                <div className="my-4">
                    <p>Whitelist Merkle root :</p>
                    <input type="file" name="file" onChange={uploadFile} />

                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={newMerkleRoot}>valider</button>
                </div>
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
                <div className="my-4">
                    <p>baseURI :</p>
                    <input id="inputBaseUri" type="text" className="border border-black w-32 mr-2 p-1" placeholder="ipfs://URI/"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => updateUri('baseURI')}>valider</button>
                </div>
                <div className="my-4">
                    <p>notRevealedURI :</p>
                    <input id="inputNotRevealedUri" type="text" className="border border-black w-32 mr-2 p-1" placeholder="ipfs://URI/"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => updateUri('notRevealedURI')}>valider</button>
                </div>
                <div className="my-4">
                    <p>baseExtension :</p>
                    <input id="inputBaseExtension" type="text" className="border border-black w-32 mr-2 p-1" placeholder=".json"/>
                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={updateExtension}>valider</button>
                </div>
                </div>
                <div className="col-span-6">
                    <h2 className="text-2xl font-bold underline">Act on contract</h2>
                    <div className="my-4">
                        <p>Contract status:</p>

                        {
                            paused
                                ?
                                <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => pausedContract(false)}>Unpause</button>
                                :
                                <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={() => pausedContract(true)}>Pause</button>
                        }
                    </div>

                    <div className="my-4">
                        <p>Contract step:</p>
                        <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={setUpPresale}>start presale</button>
                        <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500 ml-2" onClick={setUpSale}>start public sale</button>
                    </div>
                    <div className="my-4">
                        <p>Reveal nft ?</p>
                        {
                            paused
                                ?
                                <p>already revealed</p>
                                :
                                <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={reveal}>reveal</button>
                        }
                    </div>
                    <div className="my-4">
                        <p>make a gift (1 nft) :</p>
                        <input id="inputGift" type="text" className="border border-black w-32 mr-2 p-1" placeholder="address"/>
                        <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500" onClick={makeGift}>send</button>
                    </div>
                </div>
            </div>


        </div>
    );

}
export default Admin