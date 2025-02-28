
import { useState,useContext } from 'react';
import './Login.scss'
import { LoginUser } from '../../services/UserService';
import { toast} from 'react-toastify';
import { useNavigate } from "react-router";
import { UserContext } from '../../context/UserContext';
function Login() {

  const {loginContext} = useContext(UserContext)

  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('');

  const [loading,setLoading] = useState(false);
  const  navigate = useNavigate();


  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true)
    let res = await LoginUser(email.trim(),password)
    if (res && res.token){
      loginContext(email,res.token)
      toast.success("welcome")
      navigate("/")
    }else{
      if(res && res.status === 400){
        toast.error(res.data.error)
      }
    }
    setLoading(false)
  }
  
  const handleKeyDown= (e)=>{
      if(e && e.key ==="Enter"){
        handleSubmit()
      }
  }

  const [showPassword,setShowPassword] = useState(false)
    return ( 
        <div className="container col-12 col-sm-4">
            <div className="align content">

              <div className="grid align__item">

                  <div className="register ">

                    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="site__logo" 
        width="56" 
        height="84" 
        viewBox="77.7 214.9 274.7 412"
        >
        <defs>
        <linearGradient 
            id="a" 
            x1="0%" 
            y1="0%" 
            y2="0%">
            <stop offset="0%" />
            <stop offset="100%" />
        </linearGradient>
        </defs>
            <path 
                fill="url(#a)" 
                d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
    />
                    </svg>

                    <h2>Sign in</h2>


                      <div className="form__field">
                          <input 
                            type="email" 
                            placeholder="eve.holt@reqres.in"
                            value={email}
                            onChange={(e) =>{setEmail(e.target.value)}}
                            />
                      </div>

                      <div className="form__field input_p">
                        <input 
                          type={ showPassword === true ? "text" : "password" } 
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) =>{setPassword(e.target.value)}}
                          onKeyDown={(e)=>handleKeyDown(e)}
                          />
                          <i 
                            className={ showPassword === true ? "fa-regular fa-eye" :"fa-regular fa-eye-slash"}
                            onClick = {()=> setShowPassword(!showPassword)}
                            
                          ></i>
                      </div>

                      <div className="form__field">
                        <button 
                          className={email && password ? " btn-confirm active" :"btn-confirm"}
                          disabled={email && password ? false : true}
                          onClick={handleSubmit}
                          >
                          {loading && <i className="fa fa-spinner fa-spin"></i>}  
                          &nbsp;Sign in
                        </button>
                      </div>



                  </div>

              </div>

            </div>
        </div>
     );
}

export default Login;