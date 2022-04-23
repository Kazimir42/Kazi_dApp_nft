import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import Contract from '../artifacts/contracts/Character.sol/Character.json'

const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


function Admin() {
    const [totalNft, setTotalNft] = useState(0)
    const [maxMint, setMaxMint] = useState(0)

    useEffect(() => {
        getTotalNft()
        getMaxMint()
    }, [])

    async function getTotalNft() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, provider);
                try {
                    //call function getPrice of contract
                    const data = await contract.MAX_SUPPLY();
                    setTotalNft(Number(data))
                }catch(error) {
                    console.log(error)
                }
            }
        }
    }


    async function getMaxMint() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //get the contract
                const contract = new ethers.Contract(address, Contract.abi, provider);
                try {
                    //call function getPrice of contract
                    const data = await contract.max_mint_allowed();
                    setMaxMint(Number(data))
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
            </div>
        </div>
    );

}
export default Admin