import React from 'react';
import {RegisterWrapper,RegisterContainer } from '../styles/SignElement';
import loginImg from '../../img/login.gif'
import { Link } from 'react-router-dom';
const Login = () => {
    const handleSubmit = (e) => {
        
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
            <form onSubmit={handleSubmit}>
             <input type="email"  name='email' placeholder='Enter Email'/>
             <input type="password" name="password" placeholder='Password' />
             <div>
                <Link to='/'><p style={{float: "right", margin:"0px 20px"}}>Forget Password?</p></Link>
             </div>
             <button>Register</button>
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
