import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconCar from './../car-icon.jpg';
import L from 'leaflet';
const icon = new L.icon({
  iconUrl: iconCar,
  iconSize: [28, 46],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});


const MyMap2 = () => {
  const Location = () => {
    const [position, setPosition] = useState(null);
    const [isOutside, setIsOutside] = useState(false);
    const [isInside, setIsInside] = useState(false);
  
    const moveMarker = () => {
      if (position) {
        const lat = position.lat + 0.01; 
        const lng = position.lng + 0.01;
        setPosition({ lat, lng });
      }
    };
    useEffect(() => {
      if(parsedGeoJSON && position){
        const geojsonLayer = L.geoJson(parsedGeoJSON);
        const marker = L.marker(position);
        setIsInside(geojsonLayer.getBounds().contains(marker.getLatLng()));
      }
    },[position, parsedGeoJSON])
    useEffect(() => {
      if(isInside) {
        alert('Marker is in');
      }
    }, [isInside])
    useEffect(() => {
      if(parsedGeoJSON && position){
        const geojsonLayer = L.geoJson(parsedGeoJSON);
        const marker = L.marker(position);
        setIsOutside(!geojsonLayer.getBounds().contains(marker.getLatLng()));
      }
    },[position, parsedGeoJSON])
    useEffect(() => {
      if(isOutside) {
        alert('Marker is out');
      }
    }, [isOutside])

    useEffect(() => {
      const interval = setInterval(moveMarker, 1000); 
  
      return () => {
        clearInterval(interval);
      };
    }, [position]);
  
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        console.log(e.latlng);
      },
    });
  
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  const [userGeoJSON, setUserGeoJSON] = useState('');
  const [parsedGeoJSON, setParsedGeoJSON] = useState(null);
  const handleGeoJSONChange = (event) => {
        setUserGeoJSON(event.target.value);
      };
    
      const handleUpdateMap = () => {
        try {
          const parsedData = JSON.parse(userGeoJSON);
          setParsedGeoJSON(parsedData);
        } catch (error) {
          console.error('Invalid GeoJSON format', error);
        }
      }
      
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
           <div>
       <textarea
          rows="5"
          cols="50"
          placeholder="Enter GeoJSON here"
          value={userGeoJSON}
          onChange={handleGeoJSONChange}
        />
        <br />
        <button onClick={handleUpdateMap}>Update Map</button>
      </div>

      <MapContainer
        style={{
          height: '100vh',
          width: '100%',
        }}
        center={[26.897743, 75.838266]}
        zoom={10}
      >
     
        {/* <GeoJSON data={mapData.features} /> */}
        {parsedGeoJSON && <GeoJSON data={parsedGeoJSON} />}
        {/* <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        { <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        /> }
        {/* <TileLayer
 url={`https://maps.googleapis.com/maps/api/tile?size=256x256&maptype=roadmap&key=AIzaSyA0ovcxxKuhHfCE9IbSBJOKR4DFGqmNQNE`}
/> */}
      {/* <GoogleLayer googleMapsLoaderConf={{ apiKey: 'AIzaSyA0ovcxxKuhHfCE9IbSBJOKR4DFGqmNQNE' }} />
         */}
        <Location />
      </MapContainer>
 
    </div>
  );
};

export default MyMap2;


