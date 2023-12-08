import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw'; 
  
const MyMap3 = () => {
    const [editableFG, setEditableFG] = useState(null);
    const [geoJsonArray, setGeoJsonArray] = useState([]); 

    const onFeatureGroupReady = (reactFGref) => {
        // store the ref for future access to content
        setEditableFG(reactFGref);
    };

    const onCreated = (e) => {
        const newLayerGeoJson = e.layer.toGeoJSON();
        setGeoJsonArray((prev) => [...prev, newLayerGeoJson]);

        if (editableFG && editableFG.leafletElement) {
            const drawnItems = editableFG.leafletElement.getLayers();

            if (drawnItems.length > 1) {
                drawnItems.forEach((layer, index) => {
                    if (index > 0) {
                        editableFG.leafletElement.removeLayer(layer);
                    }
                });
            }
        }
    };

    const downloadGeoJSON = () => {
        const data = JSON.stringify(geoJsonArray, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'geojson_data.json';
        link.click();
    };

    return (
        <div>
            <MapContainer
                center={[37.8189, -122.4786]}
                zoom={13}
                style={{ height: '60vh' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup
                    ref={(featureGroupRef) => {
                        onFeatureGroupReady(featureGroupRef);
                    }}
                >
                    <EditControl position="topright" onCreated={onCreated} />
                </FeatureGroup>
            </MapContainer>

            <div>
                <h2>GeoJSON:</h2>
                <pre>{JSON.stringify(geoJsonArray, null, 2)}</pre>
                <button onClick={downloadGeoJSON}>Download GeoJSON</button>
            </div>
        </div>
    );
};

export default MyMap3;
