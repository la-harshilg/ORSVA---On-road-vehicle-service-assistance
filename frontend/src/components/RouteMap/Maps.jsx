import React from "react";
import { TileLayer, MapContainer, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import RoutingControl from "./RoutingControl";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = (props) => {
  return (
    <>
      <div style={{ width: "70%", margin: "auto", border: "3px solid black" }}>
        <MapContainer
          center={props.userpoint}
          zoomControl={true}
          style={{ height: "500px", width: "100%", padding: 0 }}
          scrollWheelZoom={false}
        >
          <RoutingControl
            startpoint={props.mechanicpoint}
            endpoint={props.userpoint}
            usermessage={props.user}
            mechanicmessage={props.mechanic}
          />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
