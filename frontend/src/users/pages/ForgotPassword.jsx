import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email:""
    });
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/forgotpassword", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                console.log("send link for reset !");
                setFormData({
                    email:""
                })
                navigate("/login")
            }
        } catch (error) {
            console.error("Error to send link for reset password!", error);
        }
    }
    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="p-3 bg-primary w-25">
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Forgot Password</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="username">Email</label>
                        <input type="Email" placeholder="Email" name="email" className="form-control" 
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-success w-100" >Send Me</button>
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword