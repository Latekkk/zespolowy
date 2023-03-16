import React from 'react'
import {GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '584px',
    height: '384px'
};

const center = {
    lat: 52.000,
    lng: 19.000
};

const locations = [
    { lat: 52.56391, lng: 18.154312 },
    { lat: 52.718234, lng: 19.363181 },
]


console.log(import.meta.env.VITE_GOOGLEMAPSAPIKEY)

const options = {
    imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
    return location.lat + location.lng
}

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLEMAPSAPIKEY}
        >
            <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
                <MarkerClusterer options={options}>
                    {(clusterer) =>
                        locations.map((location) => (
                            <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)
