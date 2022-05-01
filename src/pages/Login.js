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
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    function handleForm(e)
    {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                navigate('/admin')
            }).catch((error) => {
            setError("login fail")
        })
    }

    return (
        <div>
            <section id="" className="min-h-screen bg-background">
                <div className="container mx-auto pt-32 mb-8">
                    <h1 className="text-6xl font-black text-white text-center uppercase mb-16 leading-tight px-32">Login</h1>
                    <form onSubmit={handleForm} className="w-96 mx-auto text-center flex flex-col gap-2">
                        <input type="email" className="p-2 rounded-sm" onChange={e => setEmail(e.target.value)} placeholder="email"/>
                        <input type="password" className="p-2 rounded-sm" onChange={e => setPassword(e.target.value)} placeholder="password"/>
                        <button className="mt-1 px-6 py-2 block bg-primary font-bold rounded-sm hover:bg-dark-primary duration-200 transition text-lg text-white">Submit</button>
                    </form>
                </div>
                <p className="text-primary text-2xl text-center mb-8 font-bold">
                    {error}
                </p>
            </section>
        </div>
    )
}
export default Login;