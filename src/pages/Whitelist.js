import {useEffect, useState} from "react";
import {ethers} from 'ethers';
import ButtonExternal from "../components/ButtonExternal";
import { db } from "../firebase"
import {collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


function Whitelist() {
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getCount()
    }, [])


    //get number of user whitelisted in firebase db
    async function getCount() {
        await getDocs(query(collection(db, 'whitelist'))).then(function (querySnapshot) {
            setCount(querySnapshot.size);
        });
    }

    async function beWhitelist()
    {
        //get account
        if (typeof window.ethereum !== 'undefined') {
            //get the chain id to check if nice network
            let chainId = await window.ethereum.request({method: 'eth_chainId'})

            //CHANGE BY THE CHAINID OF MAINNET IN PRODUCTION
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                setAccounts(accounts);

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //get the eth balance in WEI of connected account

                const balance = await provider.getBalance(accounts[0]);

                // balance WEI -> ETH
                const balanceInEth = ethers.utils.formatEther(balance)
                setBalance(balanceInEth);

                //CHECK IF ADDRESS ALREADY IN DB
                await getDocs(query(collection(db, 'whitelist'), where('address', '==', accounts[0]))).then(async function (querySnapshot) {

                    if (querySnapshot.size === 0) {
                        if (balanceInEth >= 0) //set if u want a min price to be whitelisted
                        {
                            //create an object to pass
                            const docData = {
                                address: accounts[0],
                                id: uuidv4(),
                                balance: balanceInEth
                            };
                            await setDoc(doc(db, "whitelist", docData.id), docData);

                            setCount(Number(count) + 1)
                            setSuccess('You are now whitelist')
                            setError('');

                        } else {
                            setSuccess('');
                            setError('Not enougth ETH');
                        }
                    } else {
                        setSuccess('');
                        setError('Already whitelisted');
                    }
                });

            } else {
                setSuccess('');
                setError('Wrong network')
            }
        } else {
            setSuccess('');
            setError('Not connected')
        }
    }

    return (
        <div className="">
            <section id="whitelist2" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-32 max-w-3xl">
                    <div className="bg-background bg-opacity-70 backdrop-blur-sm h-fit w-fit p-12 max-w-full rounded mx-auto shadow-md max-w-3xl rounded-sm">
                        <h1 className="text-5xl font-black text-white text-center uppercase mb-8 leading-tight px-32">Whitelist</h1>
                        <p className="text-3xl font-bold text-white text-center mb-16">To be whitelisted you can juste click on the button bellow</p>
                        <div className="text-white text-center mb-16">
                            <p className="text-4xl font-black"><span className="text-primary">{count}</span>/100*</p>
                            <p className="text-xl ">already whitelisted</p>
                        </div>

                        <p className="text-primary text-2xl text-center mb-8 font-bold">
                            {error}
                            {success}
                        </p>
                        <ButtonExternal title="Be Whitelist" onClick={beWhitelist} class="mx-auto" />
                        <p className="text-white text-sm">*working but no scalable / care i think an user can read all contract in db</p>
                    </div>
                </div>
            </section>

            <section id="whitelist1" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-32">
                    <div className="bg-background bg-opacity-70 backdrop-blur-sm h-fit w-fit p-12 rounded mx-auto shadow-md max-w-3xl rounded-sm">
                        <h1 className="text-5xl font-black text-white text-center uppercase mb-8 leading-tight px-32">Whitelist</h1>
                        <p className="text-3xl font-bold text-white text-center mb-16">To get a chance to be Whitelisted join us on</p>
                        <ButtonExternal title="Discord" where="https://google.fr/" class="mx-auto" />
                    </div>
                </div>
            </section>

        </div>

    )
}
export default Whitelist;