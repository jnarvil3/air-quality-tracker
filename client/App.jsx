import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './stylesheets/styles.scss';


class App extends Component {
   constructor(props){
    super(props);
    this.state = { 
        isLoggedIn: false,
        username: '',
        password: '',
        city: '',
        threshold: '',
        currentAirQuality: '',
        newCity: '',
        newCityAirQuality: '',

    }
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.grabAPIData = this.grabAPIData.bind(this);
    this.capitalizeCity = this.capitalizeCity.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // Automatically updates state based on a characters inputted into an input field
  handleChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value})
  }

  // Handles new user sign-up / registration
  async onSignupSubmit(event){

    if (event) event.preventDefault();

    // Deconstruct username, password, city, and threshold from state
    const { username, password, city, threshold } = this.state;

    // Check to see that each input field is filled in before creating new user
    if(!username || !password || !city || !threshold){
      alert("Please fill in all fields to allow the app to work properly.")
      let badResponse = {status: 500}
      return badResponse;
    }

    // Before registering a new user, check to see if the city is exists within our database
    try {
      const res = await fetch(`https://api.waqi.info/feed/${city.toLowerCase()}/?token=078fc8c65162a2b764b773def29987ee5f4ca74f`)
      let parsedRes = await res.json();

      if(parsedRes.data === 'Unknown station') {
        alert("Sorry, that city isn't in our database yet. Please try another city.")
        // Note - this was a status number I chose to represent a failed sign-up attempt
        parsedRes.status = 504;
        return parsedRes;
      }
    } catch (err){
      // Alert user their city was not found in case of a failure
      alert("Sorry, that city isn't in our database yet. Please try another city.")
    }

    // Verify that inputted threshold value is a number
    if(isNaN(parseInt(threshold))){
      alert("Please enter an AIQ number (from 0 to 500) for your air quality limit by referring to the chart.")
      let badResponse = {status: 504}
      return badResponse;
    }
    

  // If no errors caught, register new user using current state values
    try {
      const res = await fetch('/api/signup', {
        method: 'post',
        body: JSON.stringify({
          username: username,
          password: password.toString(),
          city: city.toLowerCase(),
          threshold: threshold,
        }),
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8'
        }
      })
      if(res.status === 200) this.setState({isLoggedIn: true})
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  // Handles a user login
  async onLoginSubmit(event){

    if (event) event.preventDefault();
    
    // Deconstruct username, password, city, and threshold from event
    const { username, password } = this.state;

    // If password or username field is blank, reject login
    if(!username || !password){
      const res = {status: 504}
      return res;
    }

    const reqData = username + ' ' + password;

    // Attempt login if no errors caught
    try {
      const res = await fetch('/api/login', {
        method: 'get',
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8',
          'Authorization' : reqData
        }
      })
      let parsedResponse = await res.json();
      const { username, password, city, threshold } = parsedResponse.user;

      // Set the state after a successful login based on returned info from server
      this.setState({
        username: username,
        password: password,
        city: city.toLowerCase(),
        threshold: threshold
      })
      if(res.status === 200) this.setState({isLoggedIn: true})
      return res;
    } catch (err) {
      const res = {status: 505}
      console.log(err);
      return res;
    }
    }

  // Get city air quality (AIQ) information from the API
  async grabAPIData(){

    const { city, newCity } = this.state; 

    // Decides which city name will be fetched from the API (either the user's default or a new one they searched for)
    let cityToFetch;

    !newCity ? cityToFetch = city : cityToFetch = newCity;

    // RegEx to remove spaces from the city name to accomodate API
    cityToFetch = cityToFetch.replace(/\s/g, '');

    // Fetch air quality data from API
    try {
      const res = await fetch(`https://api.waqi.info/feed/${cityToFetch}/?token=078fc8c65162a2b764b773def29987ee5f4ca74f`)
      const parsedRes = await res.json();
      let currentAirQuality = parsedRes.data.aqi;

    // Set the air quality for the corresponding value in state
      if(!newCity){
        this.setState({
          currentAirQuality: currentAirQuality
        })
      } else {
        this.setState({
          newCityAirQuality: currentAirQuality
        })
      }
      return res;
    } catch (err) {
      console.log(err);
      alert("Sorry, your city wasn't found in our database. Please enter your longitude/latitude instead to find the air quality reported at the nearest measurement station.")
    }
  }

  // Simple function to capitalize city names for style
 capitalizeCity(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

// Logs a user out by setting state to default
async logOut(){
  
  // setState is async, so these lines of code need to be completed before logOut can be considered finalized
  await this.setState({
    isLoggedIn: false,
    username: '',
    password: '',
    city: '',
    threshold: '',
    currentAirQuality: '',
    newCity: '',
    newCityAirQuality: ''
  })
}


  render(){
      return (
      <div className="router">
        <Routes>
          <Route
            exact
            path="/"
            element={ <Login 
              onLoginSubmit={this.onLoginSubmit}
              handleChange={this.handleChange}
            />}
          />
            <Route
              exact
              path="/signup"
              element={ <Signup 
              onSignupSubmit={this.onSignupSubmit}
              handleChange={this.handleChange}         
              /> }
            />
            <Route/>
            <Route
              exact
              path="/dashboard"
              element={<Dashboard 
                threshold={this.state.threshold}
                city={this.state.city}
                newCity={this.state.newCity}
                grabAPIData={this.grabAPIData}
                handleChange={this.handleChange}
                currentAirQuality={this.state.currentAirQuality}
                newCityAirQuality={this.state.newCityAirQuality}
                capitalizeCity={this.capitalizeCity}
                username={this.state.username}
                isLoggedIn={this.state.isLoggedIn}
                logOut={this.logOut}
              /> }
            />
            <Route/>
        </Routes>
      </div>
      )
      }
  }

export default App;