import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import Contract from '../contracts/Character.sol/Character.json'
import {useAuthValue} from '../context/AuthContext'
import ButtonExternal from "../components/ButtonExternal";
import ContractUpdate from "../components/ContractUpdate";
import ContractUpdateButton from "../components/ContractUpdateButton";
import {db} from "../firebase"
import {doc, updateDoc} from "firebase/firestore";
import {address} from '../contract' //address of contract

const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");


function Admin() {
    //USER
    const {currentUser} = useAuthValue()
    const [accounts, setAccounts] = useState([]);

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
    const [soldOut, setSoldOut] = useState(false)

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
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setAccounts(accounts);

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
            contractForUpdate.setPaused(boolean).catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })
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

        const leaf = keccak256(accounts[0]);

        const root = tree.getHexRoot();

        try {
            contractForUpdate.changeMerkleRoot(root).catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })
        } catch (error) {
            setError(error)
        }

    }

    async function updateMaxMint() {
        let newValue = document.getElementById('inputMaxMint').value
        try {
            contractForUpdate.changeMaxMintAllowed(newValue).catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })
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
                    .catch(function (e) {
                        e.data ?
                            setError(e.data.message)//get the contract error
                            :
                            setError(e.message) //get the MM error
                    })
            } else if (type === 'sale') {//SALE
                let newValue = document.getElementById('inputPriceSale').value
                contractForUpdate.changePriceSale(ethers.utils.parseUnits(newValue, decimals)) //need that else error with big number
                    .catch(function (e) {
                        e.data ?
                            setError(e.data.message)//get the contract error
                            :
                            setError(e.message) //get the MM error
                    })
            }
        } catch (error) {
            setError(error)
        }

    }

    async function updateUri(type) {
        try {
            if (type === 'baseURI') { //URI of the NFTs when revealed
                let newValue = document.getElementById('inputBaseUri').value
                contractForUpdate.setBaseUri(newValue).catch(function (e) {
                    e.data ?
                        setError(e.data.message)//get the contract error
                        :
                        setError(e.message) //get the MM error
                })
            } else if (type === 'notRevealedURI') { //URI of the NFTs when not revealed
                let newValue = document.getElementById('inputNotRevealedUri').value
                contractForUpdate.setNotRevealURI(newValue).catch(function (e) {
                    e.data ?
                        setError(e.data.message)//get the contract error
                        :
                        setError(e.message) //get the MM error
                })
            }
        } catch (error) {
            setError(error)
        }
    }

    async function updateExtension() {
        let newValue = document.getElementById('inputBaseExtension').value
        try {
            //update contract
            contractForUpdate.setBaseExtension(newValue).catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })
        } catch (error) {
            setError(error)
        }
    }

    async function reveal() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                //update contract
                contractForUpdate.reveal().catch(function (e) {
                    e.data ?
                        setError(e.data.message)//get the contract error
                        :
                        setError(e.message) //get the MM error
                })

                //update DB
                let newCollection = {
                    Reveal: true,
                }
                await updateDoc(doc(db, "steps", "eyZMZF6NREwvHwMLsDJb"), newCollection);
            } catch (error) {
                setError(error)
            }
        }
    }

    async function setUpPresale() {
        try {
            //update contract
            contractForUpdate.setUpPresale().catch(function (e) {

                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })

            //update DB
            let newCollection = {
                Before: false,
                Presale: true,
            }
            await updateDoc(doc(db, "steps", "eyZMZF6NREwvHwMLsDJb"), newCollection);

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
                    setError(e.message) //get the MM error
            })

            //update DB
            let newCollection = {
                Presale: false,
                Sale: true,
            }
            await updateDoc(doc(db, "steps", "eyZMZF6NREwvHwMLsDJb"), newCollection);

        } catch (error) {
            //other error
            setError(error)
        }
    }

    async function makeGift() {
        let addressToGift = document.getElementById('inputGift').value

        try {
            //update contract
            contractForUpdate.gift(addressToGift).catch(function (e) {
                e.data ?
                    setError(e.data.message)//get the contract error
                    :
                    setError(e.message) //get the MM error
            })
        } catch (error) {
            setError(error)
        }
    }

    async function soldout() {
        try {

            //update DB
            let newCollection = {
                Before: false,
                Presale: false,
                Sale: false,
                SoldOut: true,
            }
            await updateDoc(doc(db, "steps", "eyZMZF6NREwvHwMLsDJb"), newCollection);

        } catch (error) {
            setError(error)
        }
    }


    function StepOnString() {
        switch (currentStep) {
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
        return (
            <div>
                <div className="py-10">
                    <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">Contract <span
                        className="text-primary">Infos</span></h2>
                    <ul className="text-xl text-white">
                        <li><span className="underline font-bold">Contract paused :</span> {paused ? 'true' : 'false'}
                        </li>
                        <li><span className="underline font-bold">Contract address :</span> {address}</li>
                        <li><span className="underline font-bold">Whitelist Merkle root :</span> {merkleRoot}</li>
                        <li><span className="underline font-bold">NTFs number :</span> {totalNft}</li>
                        <li><span className="underline font-bold">Max mint :</span> {maxMint}</li>
                        <li><span className="underline font-bold">Current step :</span> <StepOnString/></li>
                        <li><span className="underline font-bold">Price presale :</span> {pricePresale} ETH</li>
                        <li><span className="underline font-bold">Price sale :</span> {priceSale} ETH</li>
                        <li><span className="underline font-bold">BaseURI :</span> {baseURI}</li>
                        <li><span className="underline font-bold">NotRevealedURI :</span> {notRevealedURI}</li>
                        <li><span className="underline font-bold">BaseExtension :</span> {baseExtension}</li>
                        <li><span className="underline font-bold">Nft revealed :</span> {revealed ? 'true' : 'false'}
                        </li>
                    </ul>
                </div>

                <div className="py-10 grid grid-cols-12 gap-16">
                    <div className="col-span-12 lg:col-span-6">
                        <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">Update
                            contract <span className="text-primary">data</span></h2>

                        <ContractUpdate title="Whitelist Merkle root :" description="Lorem ipsum dolor sit amet."
                                        type="file" inputClass="text-white" buttonTitle="Validate" onChange={uploadFile}
                                        onClick={newMerkleRoot}/>

                        <ContractUpdate title="Max mint allowed :" description="Lorem ipsum dolor sit amet."
                                        id="inputMaxMint" type="number" placeholder="number" buttonTitle="Validate"
                                        onClick={updateMaxMint}/>

                        <ContractUpdate title="Price presale :" description="Lorem ipsum dolor sit amet."
                                        id="inputPricePresale" type="number" placeholder="in ETH" buttonTitle="Validate"
                                        onClick={() => updatePrice('presale')}/>

                        <ContractUpdate title="Price sale :" description="Lorem ipsum dolor sit amet."
                                        id="inputPriceSale" type="number" placeholder="in ETH" buttonTitle="Validate"
                                        onClick={() => updatePrice('sale')}/>

                        <ContractUpdate title="baseURI :" description="Lorem ipsum dolor sit amet." id="inputBaseUri"
                                        type="text" placeholder="ipfs://URI/" buttonTitle="Validate"
                                        onClick={() => updateUri('baseURI')}/>

                        <ContractUpdate title="notRevealedURI :" description="Lorem ipsum dolor sit amet."
                                        id="inputNotRevealedUri" type="text" placeholder="ipfs://URI/"
                                        buttonTitle="Validate" onClick={() => updateUri('notRevealedURI')}/>

                        <ContractUpdate title="baseExtension :" description="Lorem ipsum dolor sit amet."
                                        id="inputBaseExtension" type="text" placeholder=".json" buttonTitle="Validate"
                                        onClick={updateExtension}/>

                    </div>

                    <div className="col-span-12 lg:col-span-6">
                        <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">Act on <span
                            className="text-primary">contract</span></h2>

                        {
                            paused
                                ?
                                <ContractUpdateButton title="Contract status :" description="already paused"
                                                      buttonTitle="Unpause" onClick={() => pausedContract(false)}/>
                                :
                                <ContractUpdateButton title="Contract status :"
                                                      description="Lorem ipsum dolor sit amet." buttonTitle="Pause"
                                                      onClick={() => pausedContract(true)}/>
                        }


                        <ContractUpdateButton title="Contract step :" description="Change step of contract"
                                              buttonTitle="Start presale" onClick={setUpPresale}
                                              buttonTitle2="Start public sale" onClick2={setUpSale}/>


                        {
                            revealed
                                ?
                                <ContractUpdateButton title="Reveal nft ?" description="already revealed"/>
                                :
                                <ContractUpdateButton title="Reveal nft ?" description="Lorem ipsum dolor sit amet."
                                                      buttonTitle="Reveal" onClick={reveal}/>
                        }

                        <ContractUpdate title="Make a gift (1 nft) :" description="Lorem ipsum dolor sit amet."
                                        id="inputGift" type="text" placeholder="address" buttonTitle="Send"
                                        onClick={makeGift}/>

                        {
                            error ?
                                <div
                                    className="my-4 bg-dark-background text-red-600 p-4 text-xl rounded-sm border border-red-600">
                                    {error}
                                </div>
                                :
                                <br/>
                        }

                    </div>

                    <div className="col-span-6">
                        <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">Act on <span
                            className="text-primary">website</span></h2>


                        {
                            soldOut
                                ?
                                <ContractUpdateButton title="nft soldOut ?" description="already revealed"/>
                                :
                                <ContractUpdateButton title="nft soldOut ?" description="Lorem ipsum dolor sit amet."
                                                      buttonTitle="soldOut" onClick={soldout}/>
                        }

                    </div>

                </div>

            </div>
        )

    }

    function BadAddress() {
        return (
            <div>
                <div className="text-primary text-2xl text-center mb-8 font-bold">
                    Check your connected address and network
                </div>
                <ButtonExternal title="Connect" onClick={getData} class="mx-auto"/>
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
        <div>
            <section id="" className="min-h-screen bg-background">
                <div className="container mx-auto px-8 pt-32">
                    <h1 className="text-6xl font-black text-white text-center uppercase mb-16 leading-tight ">Admin
                        dashboard</h1>
                    <Render/>
                </div>
            </section>
        </div>
    );

}

export default Admin