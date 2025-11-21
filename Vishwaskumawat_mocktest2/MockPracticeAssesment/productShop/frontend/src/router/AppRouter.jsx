import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import UserDetails from "../pages/UserDetails";
import FormikLogin from "../pages/FormikLogin";  

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<App />} />

        
        <Route path="/users/:id" element={<UserDetails />} />

       
        <Route path="/formik-login" element={<FormikLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
