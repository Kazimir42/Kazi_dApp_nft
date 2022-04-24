import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import Contract from '../artifacts/contracts/Character.sol/Character.json'

const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //address of contract

function Admin() {
    //CONTRACT DATA
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

    //INFO
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    //CONTRACT CONSTRUCTOR
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [contractForWatch, setContractForWatch] = useState();
    const [contractForUpdate, setContractForUpdate] = useState();


    useEffect(() => {
        getData();
    }, [])


    //little security to check if app realy try to connect to MM
    window.ethereum.addListener('connect', async (response) => {
        getData();
    });

    //refresh page if user switch account
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    });

    //refresh page if user switch network
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });

    //refresh page if user disconnect
    window.ethereum.on('disconnect', () => {
        window.location.reload();
    });


    async function getData() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

                //provider and signer need to watch / update contract data
                const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
                const tempSigner = tempProvider.getSigner();

                //save in state
                setProvider(tempProvider);
                setSigner(tempSigner);

                //get the contract for watch and update
                const tempWatchContract = new ethers.Contract(address, Contract.abi, tempProvider);
                const tempUpdateContract = new ethers.Contract(address, Contract.abi, tempSigner);

                //save in state
                setContractForWatch(tempWatchContract);
                setContractForUpdate(tempUpdateContract);

                try {
                    //call functions to gets data in contract
                    const totalNft = await tempWatchContract.MAX_SUPPLY();
                    const maxMint = await tempWatchContract.max_mint_allowed();
                    const step = await tempWatchContract.sellingStep();
                    const pricePresale = await tempWatchContract.pricePresale();
                    const priceSale = await tempWatchContract.priceSale();
                    const merkleRoot = await tempWatchContract.merkleRoot();
                    const paused = await tempWatchContract.paused();
                    const baseURI = await tempWatchContract.baseURI();
                    const notRevealedURI = await tempWatchContract.notRevealedURI();
                    const baseExtension = await tempWatchContract.baseExtension();
                    const revealed = await tempWatchContract.revealed();

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

                    //success
                    setSuccess(true);

                } catch (error) {
                    setError(error)
                }
            }
        }
    }


    async function pausedContract(boolean) {
        try {
            contractForUpdate.setPaused(boolean)
        } catch (error) {
            setError(error)
        }
    }


    function uploadFile(event) {
        setTokensFile(event.target.files[0]);
    }

    async function newMerkleRoot() {

        //convert to json data of upload file
        let tokens = JSON.parse(await tokensFile.text())

        //map in array
        let tab = [];
        tokens.map((token) => {
            tab.push(token.address);
        });

        //create merkle tree
        const leaves = tab.map((address) => keccak256(address));
        const tree = new MerkleTree(leaves, keccak256, {sort: true});
        const root = tree.getHexRoot();

        try {
            contractForUpdate.changeMerkleRoot(root)
        } catch (error) {
            setError(error)
        }

    }

    async function updateMaxMint() {
        let newValue = document.getElementById('inputMaxMint').value
        try {
            contractForUpdate.changeMaxMintAllowed(newValue)
        } catch (error) {
            setError(error)
        }
    }

    async function updatePrice(type) {

        try {
            const decimals = 18;
            if (type === 'presale') {//PRESALE
                let newValue = document.getElementById('inputPricePresale').value
                contractForUpdate.changePricePresale(ethers.utils.parseUnits(newValue, decimals)) //need that else error with big number
            } else if (type === 'sale') {//SALE
                let newValue = document.getElementById('inputPriceSale').value
                contractForUpdate.changePriceSale(ethers.utils.parseUnits(newValue, decimals)) //need that else error with big number
            }
        } catch (error) {
            setError(error)
        }

    }

    async function updateUri(type) {
        try {
            if (type === 'baseURI') { //URI of the NFTs when revealed
                let newValue = document.getElementById('inputBaseUri').value
                contractForUpdate.setBaseUri(newValue)
            } else if (type === 'notRevealedURI') { //URI of the NFTs when not revealed
                let newValue = document.getElementById('inputNotRevealedUri').value
                contractForUpdate.setNotRevealURI(newValue)
            }
        } catch (error) {
            setError(error)
        }
    }

    async function updateExtension() {
        let newValue = document.getElementById('inputBaseExtension').value
        try {
            //update contract
            contractForUpdate.setBaseExtension(newValue)
        } catch (error) {
            setError(error)
        }
    }

    async function reveal() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                //update contract
                contractForUpdate.reveal()
            } catch (error) {
                setError(error)
            }
        }
    }

    async function setUpPresale() {
        try {
            //update contract
            contractForUpdate.setUpPresale()
        } catch (error) {
            setError(error)
        }
    }

    async function setUpSale() {
        try {
            //update contract
            contractForUpdate.setUpSale().catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e) //get the MM error

            })
        } catch (error) {
            //other error
            setError(error)
        }
    }

    async function makeGift() {
        let addressToGift = document.getElementById('inputGift').value
        try {
            //update contract
            contractForUpdate.gift(addressToGift)
        } catch (error) {
            setError(error)
        }
    }

    function StepOnString()
    {
        switch (currentStep)
        {
            case 0:
                return 'Before'
            case 1:
                return 'Presale'
            case 2:
                return 'Sale'
            case 3:
                return 'SoldOut'
            case 4:
                return 'Reveal'
        }
    }

    function NiceAddress() {
        return(
            <div>
                <div className="mt-10">
                    <h2 className="text-2xl font-bold underline">Contract Infos</h2>
                    <p>Contract address : {address}</p>
                    <p>Contract paused : {paused ? 'true' : 'false'}</p>
                    <p>Whitelist Merkle root : {merkleRoot}</p>
                    <p>NTFs number : {totalNft}</p>
                    <p>Max mint : {maxMint}</p>
                    <p>Current step : <StepOnString /></p>
                    <p>Price presale : {pricePresale} ETH</p>
                    <p>Price sale : {priceSale} ETH</p>
                    <p>baseURI : {baseURI}</p>
                    <p>notRevealedURI : {notRevealedURI}</p>
                    <p>baseExtension : {baseExtension}</p>
                    <p>nft revealed : {revealed ? 'true' : 'false'}</p>
                </div>

                <div className="mt-10 grid grid-cols-12">
                    <div className="col-span-6">
                        <h2 className="text-2xl font-bold underline">Update contract data</h2>

                        <div className="my-4">
                            <p>Whitelist Merkle root :</p>
                            <input type="file" name="file" onChange={uploadFile}/>

                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={newMerkleRoot}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>Max mint allowed :</p>
                            <input id="inputMaxMint" type="number" className="border border-black w-32 mr-2 p-1"
                                   placeholder="number"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={updateMaxMint}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>Price presale :</p>
                            <input id="inputPricePresale" type="number" className="border border-black w-32 mr-2 p-1"
                                   placeholder="in ETH"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={() => updatePrice('presale')}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>Price sale :</p>
                            <input id="inputPriceSale" type="number" className="border border-black w-32 mr-2 p-1"
                                   placeholder="in ETH"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={() => updatePrice('sale')}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>baseURI :</p>
                            <input id="inputBaseUri" type="text" className="border border-black w-32 mr-2 p-1"
                                   placeholder="ipfs://URI/"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={() => updateUri('baseURI')}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>notRevealedURI :</p>
                            <input id="inputNotRevealedUri" type="text" className="border border-black w-32 mr-2 p-1"
                                   placeholder="ipfs://URI/"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={() => updateUri('notRevealedURI')}>valider
                            </button>
                        </div>
                        <div className="my-4">
                            <p>baseExtension :</p>
                            <input id="inputBaseExtension" type="text" className="border border-black w-32 mr-2 p-1"
                                   placeholder=".json"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={updateExtension}>valider
                            </button>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <h2 className="text-2xl font-bold underline">Act on contract</h2>
                        <div className="my-4">
                            <p>Contract status:</p>

                            {
                                paused
                                    ?
                                    <button
                                        className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                        onClick={() => pausedContract(false)}>Unpause</button>
                                    :
                                    <button
                                        className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                        onClick={() => pausedContract(true)}>Pause</button>
                            }
                        </div>

                        <div className="my-4">
                            <p>Contract step:</p>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={setUpPresale}>start presale
                            </button>
                            <button
                                className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500 ml-2"
                                onClick={setUpSale}>start public sale
                            </button>
                        </div>
                        <div className="my-4">
                            <p>Reveal nft ?</p>
                            {
                                paused
                                    ?
                                    <p>already revealed</p>
                                    :
                                    <button
                                        className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                        onClick={reveal}>reveal</button>
                            }
                        </div>
                        <div className="my-4">
                            <p>make a gift (1 nft) :</p>
                            <input id="inputGift" type="text" className="border border-black w-32 mr-2 p-1"
                                   placeholder="address"/>
                            <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 p-1 border border-blue-500"
                                    onClick={makeGift}>send
                            </button>
                        </div>


                        {
                            error ?
                                <div className="my-4 bg-red-100">
                                    {error}
                                </div>
                                :
                                <br/>
                        }


                    </div>
                </div>

            </div>
        )

    }

    function BadAddress() {
        return(
            <div>
                <div className="mt-10">
                    Check your connected address and the network
                </div>

            </div>
        )
    }

    function Render() {
        if (success) {
            return <NiceAddress/>;
        }
        return <BadAddress/>;
    }

    return (

        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold">Admin dashboard</h1>

            <Render />
        </div>
    );

}

export default Admin