import './App.css';
// import Home from './Home';
// import Register from './Register';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import Tweet from './Tweet';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        {/* <Route path="/home" element={<Home/>}/> */}
        <Route path="/tweet" element={<Tweet/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
