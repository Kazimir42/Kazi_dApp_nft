import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useAuthValue} from "../context/AuthContext";
import {useStepValue} from "../context/StepContext";


function Welcome() {
    const {currentStep} = useStepValue()

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

            }
        }
    }

    function Step()
    {
        switch (currentStep)
        {
            case 'Before':
                return <Link className="mx-auto block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/whitelist'>Be whitelist</Link>
                break
            case 'Presale':
                return <Link className="mx-auto block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/premint'>Premint</Link>
                break
            case 'Sale':
                return <Link className="mx-auto block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/mint'>Mint</Link>
                break
            case 'SoldOut':
                return <Link className="mx-auto block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to=''>View on OpenSea</Link>
                break
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
            </div>
            <Step />
        </div>
    )
}
export default Welcome;