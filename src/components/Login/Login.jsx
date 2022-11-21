import React, {useState} from 'react';
import {RegisterWrapper,RegisterContainer } from '../styles/SignElement';
import loginImg from '../../img/login.gif'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword} from 'firebase/auth';
const initialState = {
   email: '',
   password: '',
};
 
const Login = () => {
    const [state, setState] = useState(initialState);
    const { email, password } = state;
    
    const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };

   const navigate = useNavigate();
   
   const handleAuth = async (e) => {
      e.preventDefault();
      if (email && password) {
         const { user } = await signInWithEmailAndPassword(auth, email, password);
         console.log(user);
      } else {
         toast.error("Invalid email or password");
      }
      navigate("/members_and_families");
   }
  return (
    <>
       <RegisterWrapper>
        <RegisterContainer>
           <h1>Welcome Back</h1>
           <article>
           <div>
             <img src={loginImg} alt="church" />
            </div>
            <form onSubmit={handleAuth}>
             <input type="email" name='email' placeholder='Enter Email' value={email} onChange={ handleChange} />
             <input type="password" name="password" placeholder='Password' value={password} onChange={ handleChange} />
             <div>
                <Link to='/'><p style={{float: "right", margin:"0px 20px"}}>Forget Password?</p></Link>
             </div>
             <button>Login</button>
             <div>
                <Link to='/register'><p>Don't have account ?</p></Link>
             </div>
            </form>
           </article>
        </RegisterContainer>
     </RegisterWrapper>
    </>
  );
};


export default Login;
