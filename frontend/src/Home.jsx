import React from "react";
import { Link } from "react-router-dom";

const Home = ()=>{
    return(
        <div >
            <div className="group d-flex vh-100 justify-content-center align-items-center">
                <Link to={"/user"}>
                    <button type="button" className="btn btn-primary">User</button>
                </Link>
                <Link to={"/admin"}>
                    <button type="button" className="btn btn-danger">Admin</button>
                </Link>
            </div>
        </div>
    )
};

export default Home;