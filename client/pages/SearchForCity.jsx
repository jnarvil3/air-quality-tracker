import React from 'react';

// This component represents the module that allows a user to search for a city that isn't their default
const SearchForCity = props =>  {

    let newCityCapitalized = props.capitalizeCity(props.newCity)

    return (
    <div className='newCitySearchContainer'>
        <h1 className='textItem'>No longer in {props.city}? 🌎 </h1>
        <h3 className='textItem'>Search the air quality in a different city.</h3>
        <input id='newCitySearchBar' type='text' placeholder='city name' name='newCity' onChange={props.handleChange}></input>
        <button id='newCitySearchButton' className='normalButton' onClick={props.grabAPIData}>Search for your new city</button>

        {/* {Conditional rendering based on whether a user has searched for a new city's air quality} */}
        {props.newCityAirQuality != '' && props.newCityAirQuality != undefined &&
            <p className='textItem'>The air quality in {newCityCapitalized} is currently {props.newCityAirQuality} AIQ.</p>
        }
        {props.newCityAirQuality === undefined &&
            <p className='textItem'>Sorry! {newCityCapitalized} isn't in our database yet. Feel free to try another city.</p>
        }
    </div>
    )
}

export default SearchForCity;