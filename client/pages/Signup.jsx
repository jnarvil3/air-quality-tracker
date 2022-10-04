import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Signup = props =>  {

    // Declare navigate hook
    let navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        const res = await props.onSignupSubmit(event);
        
        // Send user to dashboard upon successful sign-up
        if (res.status === 200) return navigate('../dashboard');
        // Or let the user know their response was invalid
       else return console.log(`invaid response, status ${res.status}`); 
      }

    return (
        <div>
        <h1>Welcome to our community!</h1>
        <div className='signUpContainer'>
          <div className='signUpInfoContainer'>
          <h3>Please fill in your details below.</h3>
              <form className='signUpForm'>
              <p><input id='usernameSignUpInput' className='inputTextForm' name='username' type='text' placeholder='username' onChange={props.handleChange}/></p>
              <p><input id='passwordSignUpInput' className='inputTextForm' name='password' type='password' placeholder='password' onChange={props.handleChange}/></p>
              <p><input id='citySignUpInput' className='inputTextForm' name='city' type='text' placeholder='city' onChange={props.handleChange}/></p>
              <p><input id= 'thresholdSignUpInput' className='inputTextForm' name='threshold' type='text' placeholder='air quality (AIQ) limit' onChange={props.handleChange}/></p>
              <button id='signUpSubmitButton' className='submitFormButton' onClick={submit}>Join our community</button>
              <p className='allFieldsRequiredText'>⚠️ Please note that all fields must be filled in for the app to work properly 🙂</p>
              <Link to="/">Back to login</Link>
              </form>
            </div>  
            <div className='AIQScaleImgContainer'>
              <figure>
                <figcaption>Use this scale to determine what AIQ {'(air quality level)'} you can tolerate.</figcaption>
                <img id='AIQScaleImg' alt='AIQ Scale' src='https://www.deq.ok.gov/wp-content/uploads/air-division/aqi_mini-768x432.png'></img>
              </figure>
            </div>
        </div>

      </div>
    )
}

export default Signup;