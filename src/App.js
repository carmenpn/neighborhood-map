import React, { Component } from 'react';
import './App.css';
import ParkMap from './components/GoogleMap.js';
import ParkList from './components/ParkList.js'

class App extends Component {

  state = {
    locations: [],
    query: "",
    parkInformation: {},
    clickedMarker: {},
    clickedLocation: {},
    openInfoWindow: false
  }

  // fetch Foursquare API and handle responses
  componentDidMount() {
    fetch("https://api.foursquare.com/v2/venues/search?ll=44.4267674,26.1025384&query=parcul&client_id=UFITYTZTHM1L4H02U4NRUPWCWSUA4A4HJ505IW4K1CF040XO&client_secret=POVLYLEIRHL0TKM53V04QN5UCLNS1VNM11MXJFGLMCMCH4NR&v=20180805")
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(data => {
      console.log(data.response.venues);
      console.log(data.response);
      const locations = data.response.venues.map(park => {
        return {
          position: {lat: park.location.lat, lng: park.location.lng},
          address: park.location.address,
          name: park.name,
          city: park.location.city,
          country: park.location.country,
          id: park.id
        }
      })
      this.setState({locations});
      console.log(this.state.locations);
    })
    .catch(err => {
      alert("Oops! Something went wrong.");
      console.log(err);
    })
  }

  //handle click on list item
  onParkClick = e => {
    for (var i = 0; i < this.state.locations.length; i++) {
      if (e.target.textContent === this.state.locations[i].name) {
        this.setState({
          query: e.target.textContent,
          parkInformation: this.state.locations[i],
          openInfoWindow: false
        })
        // console.log(this.state.parkInformation)
      }
    }
  }

  //delete input from filter
  onDeleteInput = e => {
    this.setState({
      query: "",
      parkInformation: {},
      openInfoWindow: false
    })
  }

  //update query when clicked on item
  updateQuery = e => {
    this.setState({
      query: e.target.value
    })
  }

  // handle the click on a specific marker
  onMarkerClick = (props, marker, event) => {
    this.setState({
      clickedLocation: props,
      clickedMarker: marker,
      openInfoWindow: true,
      parkInformation: {}
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bucharest Map</h1>
        </header>
        <ParkList
          locations={this.state.locations}
          query={this.state.query}
          onParkClick={this.onParkClick}
          onUpdatedQuery={this.updateQuery}
          onDeleteInput={this.onDeleteInput}
          parkInformation={this.state.parkInformation}
        />
        <ParkMap
          locations={this.state.locations}
          query={this.state.query}
          parkInformation={this.state.parkInformation}
          clickedLocation={this.state.clickedLocation}
          clickedMarker={this.state.clickedMarker}
          openInfoWindow={this.state.openInfoWindow}
          onMarkerClick={this.onMarkerClick}
        />
        <footer className="footer">
          <h5>Developed by Carmen Paun</h5>
        </footer>
      </div>
    );
  }
}

export default App;
