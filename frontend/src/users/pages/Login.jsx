import React, { useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"

const Login = ()=>{
    const [formData, setFormData] = useState({
        id: "",
        username:"",
        password:"",
        email: ""
    });
    const [messages, setMessages] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // response.redirected("/tweet");
                console.log(formData);
                const username = formData.username;
                let id = formData._id;
                Cookies.set('id', id);
                Cookies.set("username", username);
                navigate("/tweet");
                setMessages("Vous êtes connecté!!!");
                console.log("Connexion reussir");
            } else {
                setMessages("Connexion échoué!!!")
                console.log("Connexion échouer");
            }
        } catch (error) {
            console.error("Erreur lors de la comminication avec le serveur:", error)
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }
    // const [loading, setLoading] = useState(true); // État de chargement initial
    // const [progress, setProgress] = useState(0); // État de progression initial
  
    useEffect(() => {
    //   const simulateLoading = () => {
    //     for (let i = 0; i <= 100; i++) {
    //       setTimeout(() => {
    //         setProgress(i);
    //         if (i === 100) {
    //           setLoading(true); // Chargement terminé
    //         }
    //       }, i * 80); // Réglez la vitesse de remplissage ici (20ms par exemple)
    //     }
    //   };
  
    //   simulateLoading();
    }, []); // Utilisation de useEffect pour simuler le chargement au chargement du composant
  
    return(
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="p-3 bg-white w-25">
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Login</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" name="username" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" placeholder="Password" name="password" className="form-control" 
                        onChange={handleChange}
                        />
                    </div>
                    <Link to={"/forgot"}>Réinitialisé</Link>
                    <button className="btn btn-success w-100" >Log In</button>
                    {/* <ion-icon name="chatbox-ellipses-outline"></ion-icon> */}
                    {messages && 
                    <p>{messages}</p>
                    }
                            <hr />
                    <Link to="/register"><button className="btn btn-default bg-light border w-100">Create Account</button></Link>
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
};

export default Login;