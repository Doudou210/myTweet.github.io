import React, { useEffect, useState } from "react";
import { Footer } from "./users/components/Footer";
import Cookies from "js-cookie";
import axios from "axios"

const Tweet = ()=>{
    const [formPoster, setFormPoster] = useState({
        title:"",
        messages:"",
    });
    const username = Cookies.get("username");
    const [sentMessages, setSentMessages] = useState([]);
    const [time, setTime] = useState(() => true);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    // const [username, setUsername] = useState([]);

    useEffect(() => {
            // axios.get('http://localhost:3001/user')
            // const fetchUsername = async () => {
            //     try {
            //       const response = await axios.get('http://localhost:3001/user');
            //       const data = response.data;
            //       console.log("Ca marche");
            //       setUsername(data.user.username); // Assuming the username is in the response data
            //     } catch (error) {
            //       console.error("Error fetching username:", error);
            //     }
            //   };
            // fetchUsername();
        setTimeout(() => {
            axios.get('http://localhost:5000/tweet')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err));
        }, 1000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInterval(() => {
            setTime(() => false);
        }, 1000);
        try {
            const response = await fetch('http://localhost:5000/poster', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formPoster)
            });
            if (response.ok) {
                setMessage("Poster réussie!!");
                setSentMessages([formPoster, ...sentMessages])
                setFormPoster({
                    title:"",
                    messages:"",
                });
                console.log("Poster réussie!!");
            } else {
                setMessage("Poster échouer!")
                console.log("Connexion échouer");
            }
        } catch (error) {
            console.error("Erreur lors de la comminication avec le serveur:", error)
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormPoster({...formPoster, [name] : value})
    }
    const handleDelete = (index) => {
        const deletePost = [...sentMessages];
        deletePost.splice(index,1);
        setSentMessages([...deletePost]);
    }
    return(
        <div>
            {/* <Header/> */}
            <h1>Connecté en tant que {username}:</h1>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className="bg-primary p-3 w-25 mt-5">
                    <h1 style={{textAlign:"center", color:"white"}}>Tweet</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="title">Title </label>
                        <input type="text" placeholder="title" id="title" name="title" 
                        value={formPoster.title}
                        onChange={handleChange}
                        className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="messages">Message</label>
                        <textarea type="submit" id="messages" placeholder="Message" name="messages"
                        value={formPoster.messages}
                        onChange={handleChange}
                        className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-success w-100" onClick={handleSubmit} >Poster</button>
                    {time &&
                    <div style={{color:"red"}} className="text-center mt-2">{message}</div>
                    }
                </form>
            </div>
                {sentMessages.map((item, index) => (
                    <div className="tweet" key={index} >
                        <h1> {username} </h1>
                        {/* <h1> {email} </h1> */}
                        <h2> {item.title} </h2>
                        <p> {item.messages} </p>
                        <button type="button" onClick={()=>handleDelete(index)}>Supprimer</button>
                    </div>
                ))}
                {users.map( user => (
                    <div className="tweet" >
                        <h1> {username} </h1>
                        {/* <h1> {email} </h1> */}
                        <h2> {user.title} </h2>
                        <p> {user.messages} </p>
                    </div>
                ))}
            <Footer/>
        </div>
    )
};

export default Tweet;