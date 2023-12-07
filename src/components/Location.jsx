import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMapEvents } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import iconCar from './../car-icon.jpg';
import L from 'leaflet';


const icon = new L.icon({
  iconUrl: iconCar,
  iconSize: [28, 46],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});
const Location = () => {
  const [position, setPosition] = useState(null);

  const moveMarker = () => {
    if (position) {
      const lat = position.lat + 0.01; 
      const lng = position.lng + 0.01;
      setPosition({ lat, lng });
    }
  };

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
export default Location