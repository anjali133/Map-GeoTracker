import React, { useEffect, useState } from 'react';
import mapData from './../data/countries.json';
import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMap, GeoJSON } from "react-leaflet"
import './MyMap.css';
  
const MyMap = () => { 
  
    const [color, setColor] = useState('#ffff00');
    useEffect(() => {
      console.log(mapData);
    }, []);

    const colors = ['green', 'yellow', 'blue', 'orange'];

const countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
   // color: "black",
    weight: 2,
    dashArray: 1,
}
let colorChange = (event) => {
    setColor(event.target.value);
    console.log(event.target.value);
  };

const changeCountryColor = (event) => {
        event.target.setStyle({color: 'green', fillColor: color, fillOpacity: 1});
        console.log(color);
        }

  
const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(countryName);
    layer.bindPopup(countryName);
     layer.options.fillOpacity = Math.random();
    // const colorIndex = Math.floor(Math.random()*colors.length)
    // layer.options.fillColor = color[colorIndex];

    layer.on({
      // click: (event) => {console.log('clicked');},
        click: changeCountryColor
    })
}
    return(
        <div>
    <h1 style={{textAlign: 'center'}}>MyMap</h1>
    <LeafletMap style={{height: "80vh"}} zoom={2} center={[20, 100]}>
        <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCountry} />
    </LeafletMap>
    <input type='color' value={color} onChange={colorChange}/>
</div>
    )
}

export default MyMap;


