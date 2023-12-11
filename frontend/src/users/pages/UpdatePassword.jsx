import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
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
            const response = await fetch("http://localhost:5000/updatepass", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                console.log("Password reset !");
                setFormData({
                    email:"",
                    password:"",
                });
                navigate("/login")
            }
        } catch (error) {
            console.error("Error reset password!", error);
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 bg-primary w-25">
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Update Password</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="name" placeholder="Email" name="email" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-success w-100" >Reset password</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword;