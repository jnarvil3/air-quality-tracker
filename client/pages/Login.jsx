import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Login = props =>  {

    // Declare navigate hook
    let navigate = useNavigate();

    const submit = async (event) => {
      event.preventDefault();
      // Refers to previous login function
      const res = await props.onLoginSubmit(event);
      if (res.status === 200){
        //Send user to dashboard upon successful login
        return navigate('../dashboard');
      } else if (res.status === 504) alert('Please fill out both the username and password fields.')
      else if(res.status === 505) alert("Your username or password was incorrect. Please try again or sign up for an account.")
      return console.log(`invaid response, status ${res.status}`);
    }

    return (
    <div>
        <h1 className='textItem'>Welcome back to your favorite air pollution tracker.</h1>
        {/* {Attribution required by API team - do not remove} */}
        <p id='attribution' className='textItem'>Powered by our friends at the <a href="https://aqicn.org/"> World Air Quality Index project</a>.</p>
        <div className='loginPage'>
            <header className='LoginHeader'>
            <h4 className='textItem'>Please login below ⤵️</h4>
            </header>
        <div className='loginContainer'>
          <form className='loginForm'>
            <input id='usernameLoginInput' className='inputTextForm loginItems' name='username' type='text' placeholder='username' onChange={props.handleChange}/>
            <input id='passwordLoginInput' className='inputTextForm loginItems' name='password' type='password' placeholder='password' onChange={props.handleChange}/>
            <button id='loginSubmitButton' className='submitFormButton' onClick={submit}>Login</button>
          </form>
          <div id='dontHaveAccountText'>
            <Link to='/signup'>Don't have an account?</Link>
          </div>
        </div>
        </div>
    </div>
    )
}

export default Login;