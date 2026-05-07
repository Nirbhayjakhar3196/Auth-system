// Forgot Password page component
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword () {

    const [email, setemail] = useState("")

    const handleSubmit = async (e) => {
        console.log("NEW CODE RUNNING");

        e.preventDefault()

        try {

            const res = await axios.post(
                "http://localhost:3000/api/auth/forgot-password",
                {
                    email
                }

            )
            console.log(res.data);

            alert("Reset link sent ")
            
            
        } catch (error) {
            console.log(error.message);
            
            alert(
                error.response?.data?.message || "Something went wrong"
            )
        }
        
    }
    
    return(

        <div>
            <h2>Forget Password</h2>

            <form onSubmit={handleSubmit}>

                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setemail(e.target.value)}/>

                <br />

                <button type="submit">Reset link</button>

            </form>

            <Link to="/login">
                Back to Login
            </Link>
        </div>
    )
}

export default ForgotPassword;