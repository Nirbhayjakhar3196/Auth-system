// Reset Password page component

import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function ResetFunction () {


    const {token} = useParams()
    const navigate = useNavigate();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        if(password !== confirmPassword){
            alert("Password do not match")
            return
        }

        try {
            
            const res = await axios.post(
                `http://localhost:3000/api/auth/reset-password/${token}`,
                {
                    password
                }
            )
            console.log("Reset password response:", res);

            alert("Password reset successful")
            navigate("/", { replace: true });

        } catch (error) {
            console.log(error.message)

            alert(
                error.response?.data?.message || "Something went wrong"
            )
        }

        console.log("New password: ", password)
    }

    return (

        <div>

            <h2>Reset Password</h2>
            
            <form onSubmit={handleSubmit}>

                <input type="password" placeholder="Enter new Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />

                <input type="password" placeholder="Enter confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

                
                <br></br>
                <button type="submit"> Reset Password</button>

            </form>
        </div>
    )
}

export default ResetFunction