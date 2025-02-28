
import './App.scss';
import Header from './components/Header/Header.js';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from 'react-toastify';
import {BrowserRouter} from "react-router-dom";
import { UserContext } from './context/UserContext.js';
import { useEffect,useContext } from 'react';
import AppRoutes from './routes/AppRoutes.js';
function App() {
   const {loginContext, user} = useContext(UserContext)
   console.log(user)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"),localStorage.getItem("token"));
    }
  },[])

  return (
     <BrowserRouter>
    <div className="app-container">
         <Header/>

          <AppRoutes/>
            
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
     </BrowserRouter>
  );
}

export default App;
