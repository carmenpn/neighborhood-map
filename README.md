#Neighborhood Map

Discover the lovely parks from Bucharest in this project created for the Udacity Google Scholarship. This project was made with Create React App.

## Dependencies

- Escape String Regexp
- React Debounce Input
- Google Maps React
- Foursquare API

Install all of them using `npm install`.

It also contains two components:
- Park Map, in order to display the map on the page
- Park List, in which the user can find a list of parks and its assigned marker

## How to run the project

In order to view the project, the user can run the following:

#####npm start
The app will open immediately.
If it doesn't, no worries. Simply open your browser and type http://localhost:3000 to access it.

####npm run build
This method helps you build the app for production.
For those interested to build the app in production mode, you need to run the following command: `serve -s build`. Afterward, simply enter http://localhost:5000 into your browser.

## What about offline usage?

The service worker created with Create React App is one that works only in the production build, not in the development mode. 
In order to run the project in production build, enter the following command: `npm run serve` and then visit the url: http://localhost:5000.

## What will I see?

You will see a map of Bucharest, Romania. The app contains a map on the right and a list of places on the left. The list contains 30 of the most popular park from the city, which will then be displayed on the map.
The places will be shown using Markers. If you click on a Marker, an InfoWindow will open and you will see the address and the name of that park. Also, if you click on a random park from the list, you will see only the Marker for that specific place. 
Changed your mind and want to see another park? Click on the button next to the Input field, and all of the parks will be displayed on both the list and the map.
