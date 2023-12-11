import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
            username:"",
            email:"",
            password:"",
    });
    const navigate = useNavigate();


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/create", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                console.log("Inscription réussie !");
                setFormData({
                    username:"",
                    email:"",
                    password:"",
                });
                navigate("/login")
            }
        } catch (error) {
            console.error("Erreur d'inscription, Veuillez réessayer!!!", error);
        }
    }
    return(
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Sign Up</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" name="username" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" name="email" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" placeholder="Password" name="password" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-success w-100" >Sign Up</button>
                            <hr />
                    <Link to="/login"><button className="btn btn-default bg-light border w-100">Sign In</button></Link>
                    {/* {loading && (
                        <div className="progress mt-3">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {progress}%
                        </div>
                        </div>
                    )} */}
                </form>
            </div>
        </div>
    )
}
export default Register;