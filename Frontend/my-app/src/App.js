import styled from 'styled-components';
import './App.css';

import Games from "./Pages/Games"
import Movies from './Pages/Movies';
import Navbar from './Components/Navbar';
import Cart from './Pages/Cart';
import { MainRoutes } from './Pages/MainRoutes';

function App() {
  return (


    <DIV className="App">
      <Navbar/>
      <MainRoutes/>
     {/* <Games/> */}
     {/* <Cart/> */}
    </DIV>

   




  );
}

export default App;
const DIV= styled.div`
text-align: center;
`