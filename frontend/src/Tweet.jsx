import React, { useEffect, useState } from "react";
import axios from "axios";

const Tweet = ()=>{
    const [formData, setFormData] = useState({
        title:"",
        messages:"",
    });

    const [sentMessages, setSentMessages] = useState([]);
    const [time, setTime] = useState(() => true);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:3001/tweet')
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
            const response = await fetch('http://localhost:3001/poster', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setMessage("Poster réussie!!");
                setSentMessages([formData, ...sentMessages])
                setFormData({
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
        setFormData({...formData, [name] : value})
    }
    const handleDelete = (index) => {
        const deletePost = [...sentMessages];
        deletePost.splice(index,1);
        setSentMessages([...deletePost]);
    }
    return(
        <div>
            <div className="">
                <div className="d-flex vh-100 justify-content-center align-items-center bg-primary p-3">
                    <form onSubmit={handleSubmit}>
                        <h1 style={{textAlign:"center"}}>Tweet</h1>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="title">Title </label>
                            <input type="text" placeholder="title" id="title" name="title" 
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="messages">Message</label>
                            <textarea type="submit" id="messages" placeholder="Message" name="messages"
                            value={formData.messages}
                            onChange={handleChange}
                            className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-success w-100" onClick={handleSubmit} >Poster</button>
                        {time &&
                        <div style={{color:"red"}} className="text-center mt-2">{message}</div>
                        }
                        <hr />
                    </form>
                </div>
                        {sentMessages.map((item, index) => (
                            <div className="tweet" key={index} >
                                <h2> {item.title} </h2>
                                <p> {item.messages} </p>
                                <button type="button" onClick={()=>handleDelete(index)}>Supprimer</button>
                            </div>
                        ))}
                        {users.map( user => (
                            <div className="tweet" >
                                <h2> {user.title} </h2>
                                <p> {user.messages} </p>
                            </div>
                        ))}
            </div>
        </div>
    )
};

export default Tweet;