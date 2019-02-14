import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp';
import tree from './icons/tree.png'

export class ParkMap extends Component {

  state = {
    foundError: false
  }

  // catch errors if something crashes
  componentDidCatch(err, displayError) {
    this.setState({
      foundError: true
    });
    console.log("There seems to be a problem. Refresh the page!");
  }

  render() {

    //filter the parks and display them on the map
    let displayedLocations;
    if (this.props.query) {
      const match = new RegExp(escapeRegExp(this.props.query), 'i')
      displayedLocations = this.props.locations.filter(location => match.test(location.name))
    } else {
      displayedLocations = this.props.locations;
    }

    //adjust the center of the map
    const bound = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.props.locations.length; i++) {
      bound.extend(this.props.locations[i].position);
    }

    //display message if it finds error
    if (this.state.foundError) {
      return <h2 className="error">There seems to be an error with the map. Refresh the page!</h2>
    }

    return (
      <div role="application">
        <Map
          google={this.props.google}
          zoom={13}
          initialCenter={{
            lat: 44.4267674, 
            lng: 26.1025384 
          }}
          bounds={bound}
          style={{height: "100vh"}}
        >
         
         {/*display markers based on the query*/}
         {displayedLocations.map(park => {
          return (
              <Marker position={{lat: park.position.lat, lng: park.position.lng}}
                      onClick={this.props.onMarkerClick}
                      name={park.name}
                      address={park.address}
                      city={park.city}
                      country={park.country}
                      key={park.id}
                      animation={this.props.google.maps.Animation.DROP}
                      icon={{
                        url: tree
                      }}
              />

            )
         })
         }

          {/*display infowindow for a specific marker*/}
          <InfoWindow marker={this.props.clickedMarker}
                      location={this.props.clickedLocation}
                      visible={this.props.openInfoWindow}
          >
              <div tabIndex="1">
                <h3>{this.props.clickedLocation.name}</h3>
                <p>{this.props.clickedLocation.address}</p>
                <p>{this.props.clickedLocation.city}</p>
                <p>{this.props.clickedLocation.country}</p>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDqdl4hxC1rAmilItl2KyGyIz-SmWqcODE")
})(ParkMap)