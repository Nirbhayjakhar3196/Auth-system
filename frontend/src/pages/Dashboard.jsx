// Dashboard page component
import { useNavigate ,Navigate ,Link } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate()

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
        return <Navigate to="/" />;
    }

    const handleLogout= () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        alert("Logout Successfully")

        navigate("/")
    }

    return(

        <div>
            <h2>Dashboard</h2>

            <p>Welcome , {user.name}</p>

            <p>Email : {user.email}</p>

            <p>Role : {user.role}</p>


            <button onClick={handleLogout}>Logout</button>
            <br />
            <Link to="/admin">
                Go to Admin Panel
            </Link>
        </div>
    )
}

export default Dashboard;