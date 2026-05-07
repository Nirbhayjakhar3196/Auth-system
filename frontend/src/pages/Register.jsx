// Register page component

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:3000/api/auth/register",
            {
                name,
                email,
                password
            })

            console.log(res.data);

            alert("User Registered successful!");
            
            
        } catch (error) {
            console.log(error.message)

            alert(
                error.response?.data?.message || "Something went wrong. Please try again later."
            )
            
        }

        
    }

    return(

        <div>
            <h2>Register Page</h2>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} />

                <br></br>

                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <br></br>
                
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <br></br>

                <button type="submit">Register</button>
            </form>

            <Link to="/">
                Already have a account?
            </Link>
        </div>
    )
}

export default Register;