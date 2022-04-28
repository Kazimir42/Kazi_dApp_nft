import {useState} from "react";
import {auth} from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../context/AuthContext'


function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setTimeActive} = useAuthValue();

    function handleForm(e)
    {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log('login success');
                navigate('/admin')
            }).catch((error) => {
            console.log('login fail');
        })
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-6xl font-black text-center mb-8 mt-6">Login</h1>
                <form onSubmit={handleForm} className="w-64 mx-auto text-center flex flex-col gap-1">
                    <input type="email" className="p-1 border border-gray-400" onChange={e => setEmail(e.target.value)} placeholder="email"/>
                    <input type="password" className="p-1 border border-gray-400" onChange={e => setPassword(e.target.value)} placeholder="password"/>
                    <button className="mt-1 px-6 py-1 block bg-amber-600 hover:bg-amber-700 duration-200 transition text-lg text-white">Submit</button>
                </form>
        </div>
    )
}
export default Login;