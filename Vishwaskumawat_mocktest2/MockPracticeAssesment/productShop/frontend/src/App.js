// App.js inside frontend/src

import ProductCard from "./components/ProductCard";
import LoginControlled from "./components/LoginControlled";
import UserStatus from "./components/UserStatus";
import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: 20 }}>
      
      <h2>Product shop Demo</h2>
      <ul>
        <li><Link to="/users/1">Open UserDetails </Link></li>
        <li><Link to="/formik-login">Open Formik Login</Link></li>
      </ul> 
       <LoginControlled />
    

      <ProductCard title="Shoes" price={2000} discount={300} />
      <ProductCard title="Watch" price={1500} discount={200} />
     
      <UserStatus userId={101} />
      
    </div>
  );
}

export default App;
