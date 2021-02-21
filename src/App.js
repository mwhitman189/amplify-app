import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listShips } from './graphql/queries';
import { createShip as createShipMutation, deleteShip as deleteShipMutation } from './graphql/mutations';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';


const initialFormState = { name: '', description: '', location: { lat: '', lng: '' } };

const containerStyle = {
  width: '90vw',
  height: '90vh',
  maxWidth: '1200px',
  maxHeight: '900px'
};

function App() {

  const [ ships, setShips ] = useState([]);
  const [ formData, setFormData ] = useState(initialFormState);
  const [ weatherData, setWeatherData ] = useState([]);
  const [ map, setMap ] = useState(null);

  const center = {
    lat: 35.12,
    lng: 36.14
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBWOahmnAYJ-8MrFRlPeQAmN05vcTVvjz4"
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);


  useEffect(() => {
    fetchShips();
  }, []);

  async function fetchShips() {
    const apiData = await API.graphql({ query: listShips });
    setShips(apiData.data.listShips.items);
    ships.forEach(ship => {
      return fetchWeather(ship.location);
    });
  }

  async function fetchWeather(latLng) {
    const { lat, lng } = latLng;
    const locQueryUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${lat},${lng}&apikey=6s93tX9pbjwq0hR23EKxHLNm7CRACZx6&toplevel=false`;
    let locKey;
    await fetch(locQueryUrl)
      .then(response => response.json())
      .then(data => {
        return locKey = data.Key;
      });

    await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locKey}?language=en-us&apikey=6s93tX9pbjwq0hR23EKxHLNm7CRACZx6`)
      .then(response => response.json())
      .then(data => setWeatherData([ ...weatherData, data ]));
  }

  async function createShip() {
    const { name, description, location = {} } = formData;
    const { lat, lng } = location;

    if (!(name && description && lat && lng)) return;

    await API.graphql({
      query: createShipMutation,
      variables: {
        input: {
          ...formData,
          location: {
            ...location,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          }
        }
      }
    });

    setShips([ ...ships, formData ]);
    setFormData(initialFormState);
  }

  async function deleteShip({ id }) {
    const newShipsArray = ships.filter(ship => ship.id !== id);
    await API.graphql({
      query: deleteShipMutation,
      variables: {
        input: { id }
      }
    });
    setShips(newShipsArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ship Router</h1>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {ships.map(({ id, name, location }) => {
              return <Marker key={id || name} label={name} position={location} />;
            }
            )}
          </GoogleMap>
        )}
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value })}
          placeholder="Ship name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value })}
          placeholder="Ship description"
          value={formData.description}
        />
        <input
          onChange={e => setFormData({ ...formData, 'location': { ...formData.location, 'lat': e.target.value } })}
          placeholder="Latitude"
          value={formData.location.lat}
        />
        <input
          onChange={e => setFormData({ ...formData, 'location': { ...formData.location, 'lng': e.target.value } })}
          placeholder="Longitude"
          value={formData.location.lng}
        />
        <button onClick={createShip}>Create Ship</button>
        <div style={{ marginBottom: 30 }}>
          {
            ships.map(ship => (
              <div key={ship.id || ship.name}>
                <h2>{ship.name}</h2>
                <p>{ship.description}</p>
                <p>Latitude: {ship.location.lat}</p>
                <p>Longitude: {ship.location.lng}</p>
                <button onClick={() => deleteShip(ship)}>Delete Ship</button>
              </div>
            ))
          }
        </div>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
