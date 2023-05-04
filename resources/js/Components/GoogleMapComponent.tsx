import React from 'react'
import {GoogleMap, LoadScript, MarkerClusterer, Marker} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '584px',
    height: '384px'
};

const center = {
    lat: 52.000,
    lng: 19.000
};

const options = {
    imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
    return location.lat + location.lng
}


export default function GoogleMapComponent(props) {

    const handleMapClick = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        props.setMarkers(event, 'markers', [newMarker]);
    };
    const zoom = props?.markers[0] === undefined? 8 : 13;
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLEMAPSAPIKEY}
        >
            <GoogleMap id='marker-example'
                       mapContainerStyle={mapContainerStyle}
                       zoom={zoom}
                       center={props?.lastPoint ===undefined? (props?.markers[0] === undefined? center : props?.markers[0]) : {'lat': Number(props?.lastPoint.lat) , 'lng': Number(props?.lastPoint.lng)} }
                       onClick={handleMapClick}>
                <MarkerClusterer options={options}>
                    {(clusterer) =>
                        props?.markers?.map((marker) => (
                            <Marker key={createKey(marker)} position={marker} clusterer={clusterer}/>
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </LoadScript>
    )
}

