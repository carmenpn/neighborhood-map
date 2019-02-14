import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import windowSize from 'react-window-size';
import {DebounceInput} from 'react-debounce-input';

class ParkList extends Component {

	state = {
		menuClicked: false
	}

	displayMenu = () => {
	    this.setState({
	      menuClicked: !this.state.menuClicked
	    });
	}

	render() {

		//filter the parks and display them on the list
		let displayedLocations;
		if (this.props.query) {
			const match = new RegExp(escapeRegExp(this.props.query), 'i')
			displayedLocations = this.props.locations.filter(location => match.test(location.name))
		} else {
			displayedLocations = this.props.locations;
		}

		//check if the menu button has been clicked or not - mobile menu
		let menuClass = this.state.menuClicked ? "park-list clicked" : "park-list"

		//handle aria-hidden attribute
		let ariaHidden = "false";
		if ((this.props.windowWidth < "600") && (menuClass !== "park-list clicked")) {
			ariaHidden = "true";
		}

		return (
			
			<div>
				<i  
					role="button"
					tabIndex="1"
					aria-label="Display or hide menu"
				    className="mobile-list fas fa-align-justify"
			        onClick={this.displayMenu}
			        onChange={this.hideMenu}>
			    </i>

				<div className="park-list-container">
					<ul 
						aria-label="A list of parks from Bucharest"
						role="menu"
						aria-hidden={ariaHidden}
						className={menuClass}
					>
						<DebounceInput
							minLength={3}
							debounceTimeout={250}
							className="filter-parks"
							type="text"
							placeholder="Filter parks"
							value={this.props.query}
							onChange={this.props.onUpdatedQuery}
							tabIndex="1"
							aria-label="Filter and find the best parks in the city"
						/>
						<i
							tabIndex="1"
							role="button"
							aria-label="Delete selected input"
							className="fas fa-times delete-input"
							onClick={this.props.onDeleteInput}>
						</i>
						{displayedLocations.map((location) => (
							<li
								role="button"
								tabIndex="1"
								key={location.id}
								onClick={this.props.onParkClick}
								aria-label={location.name}
								aria-hidden={ariaHidden}
							>
								{location.name}
							</li>
						))}
					</ul>
				</div>
				

				<div tabIndex="1" className="infoWindow">
					<h3>{this.props.parkInformation.name}</h3>
					<p>{this.props.parkInformation.address}</p>
				</div>
			</div>
			
		)
	}
}

export default windowSize(ParkList)