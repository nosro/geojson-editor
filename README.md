# GeoJSON editor

This project is a very simple editor to perform union and intersect operations on shapes within GeoJSON files.

It uses two sample sets called "Solution 1" and "Solution 2". These are hard coded into a mock "data provider".

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses the [Mapbox GL React wrapper](https://github.com/visgl/react-map-gl).
## How to use.

The application is meant to run locally in dev mode (see npm scripts below).

Once running, The viewport provides navigation links on the left. Click one to load the map. On the right hand side are statistics and an edit mode. When selecting shapes on the map, this mode will determine what operation will be used, union or intersection. When the next shape is active, it will get combined into the first, using that mode.

## Installation

In the project directory:

### `npm install`

Installs dependencies.\
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Known Issues:

The outcome of shape operations are not always correct. I have noticed occasional bugs when doing a union. I have tried two solutions [Turf JS](https://turfjs.org) and [Polygon Clipping](https://github.com/mfogel/polygon-clipping) with the same results.