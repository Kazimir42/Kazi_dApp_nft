import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";

function Whitelist() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        //SET NUMBER OF WHITELISTED ADDRESSES (call to api after)
        setCount((Math.random(1,20) * 100).toFixed(0))
    }, [])

    function beWhitelist()
    {

    }

    return (
        <div className="container mx-auto">
            <h1 className="text-6xl font-black text-center mb-8 mt-16">Characters NFT</h1>
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
            <button className="mx-auto px-6 py-2  block bg-amber-600 text-lg text-white">Be whitelist</button>
        </div>
    )
}

export default Whitelist;