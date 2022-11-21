import React, { useState } from 'react';
import { RegisterWrapper, RegisterContainer } from '../styles/SignElement';
import registerImg from '../../img/register.gif';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  const [state, setState] = useState(initialState);

  const { email, password, username } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (username && email && password) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: `${username}` });
    } else {
       return toast.error("Please all fields are required!");
    }
    navigate('/');
  };
  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <h1>Register Here</h1>
          <article>
            <div>
              <img src={registerImg} alt="church" />
            </div>
            <form onSubmit={handleAuth}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <button type="submit">Register</button>
              <div>
                <Link to="/login">
                  <p>Already a user ?</p>
                </Link>
              </div>
            </form>
          </article>
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
};
export default Register;
