import React from 'react';
import SearchForCity from './SearchForCity.jsx';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = props => {

    // Declare navigate hook
    const navigate = useNavigate();

    useEffect(() => {
        if(!(props.isLoggedIn)) {
            return navigate('../');
    }

        props.grabAPIData()
      }, []);
    
    let recommendedActionText = ''
    console.log(props.threshold)

    const { currentAirQuality } = props;

    if(currentAirQuality === undefined) {
        currentAirQuality = 'unknown'
        recommendedActionText = ', please select a new city below or wait for yours to be re-added to our database.'
    }
    else if(props.threshold > currentAirQuality){
        recommendedActionText = ', have fun being outside!'
    } else {
        recommendedActionText = ', so we recommend staying inside.'
    }

    let cityCapitalized = props.capitalizeCity(props.city)

    return (
        <div>
            <div className='welcomeContainer'>
                <h1 className='textItem'>Hey {props.username}, welcome to your dashboard.</h1>
                <h3 className='textItem'>You're living in {cityCapitalized} and the highest air pollution level {'(aka AIQ)'} you can tolerate is {props.threshold}.</h3>
                <p id='recommendedActionText' className='textItem'>The air quality in {cityCapitalized} is currently {currentAirQuality} AIQ{recommendedActionText}</p>
                <button id='refreshButton' className='normalButton' onClick={props.grabAPIData}>Refresh data</button>
            </div>
            <SearchForCity 
                newCityAirQuality={props.newCityAirQuality} 
                newCity={props.newCity} 
                grabAPIData={props.grabAPIData} 
                handleChange={props.handleChange}
                capitalizeCity={props.capitalizeCity}
                city={cityCapitalized}/>
            <button id='logOutButton' className='normalButton' onClick={props.logOut}>
                <Link to="/">Log out</Link>
            </button>
        </div>
    )
}

     
  

export default Dashboard;