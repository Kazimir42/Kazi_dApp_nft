import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect, useState} from "react";
import {ethers} from 'ethers';

function Presale() {

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-6xl font-black text-center mb-8 mt-6">Presale</h1>
            <ExampleNtfContainer/>

            <p className="text-lg text-center mx-20 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat euismod imperdiet.<br />
                Morbi
                scelerisque, nunc luctus malesuada porta.
            </p>

            <button className="mt-10 mx-auto px-6 py-2  block bg-primary text-lg text-white">Presale</button>
        </div>
    )
}
export default Presale;