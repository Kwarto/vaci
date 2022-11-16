import React from 'react'
import {RegisterWrapper,RegisterContainer } from '../styles/SignElement';
import registerImg from '../../img/register.gif'
import { Link } from 'react-router-dom';
const Register = () => {
    const handleSubmit = (e) => {

     }
  return (
    <>
     <RegisterWrapper>
        <RegisterContainer>
           <h1>Register Here</h1>
           <article>
           <div>
             <img src={registerImg} alt="church" />
            </div>
            <form onSubmit={handleSubmit}>
             <input type="text" name='displayName' placeholder='Your Name' />
             <input type="email"  name='email' placeholder='Enter Email'/>
             <input type="password" name="password" placeholder='Password' />
             <input type="file" name="file" id="avatarFile" style={{display: "none"}} />
             <label htmlFor="avatarFile">
                <p>Upload Profile</p>
             </label>
             <button>Register</button>
             <div>
                <Link to='/login'><p>Already a user ?</p></Link>
             </div>
            </form>
           </article>
        </RegisterContainer>
     </RegisterWrapper>
    </>
  )
}
export default Register