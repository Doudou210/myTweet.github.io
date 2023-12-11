import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div>
            <header style={container}>
                <div style={headerStyle} className="header">
                    <Link to={"/"} style={navA}>Accueil</Link>
                    <Link to={"/"} style={navA}>posts</Link>
                </div>
                <nav style={nav}>
                    <Link to={"/login"} style={nav}>Se connecter</Link>
                    <Link to={"/register"} style={nav}>S'inscription</Link>
                    <Link to={"/"} style={nav}>Mon compte</Link>
                    <Link to={"/"} style={nav}>Déconnexion</Link>
                </nav>
            </header>
        </div>
    )
}
export default Header;

const container ={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:10,
    with:100,
    boxShadow:"0 5px 15px rgba(0, 0, 0, 0.15",
}
const headerStyle = {
    marginRight:10,
}
const navA = {
    marginRight:10,
    textDecoration:"none",
}
const nav = {
    marginRight:10,
    textDecoration:"none",
}