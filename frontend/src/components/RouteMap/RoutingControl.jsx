import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = (props) => {
  var userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/256/5216/5216456.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
    iconSize: [40, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var mechanicIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/5695/5695646.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
    iconSize: [40, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const instance = L.Routing.control({
    position: "bottomright", // Where to place control on the map
    waypoints: [props.startpoint, props.endpoint],
    createMarker: function (i, wp, nWps) {
      if (i === 0) {
        return L.marker(wp.latLng, {
          icon: mechanicIcon,
        }).bindPopup(props.mechanicmessage);
      } else if (i === nWps - 1) {
        return L.marker(wp.latLng, {
          icon: userIcon,
        }).bindPopup(props.usermessage);
      }
    },
    lineOptions: {
      // Options for the routing line
      styles: [
        {
          color: "#4169E1",
          opacity: 1,
          weight: 5,
        },
      ],
    },
  });

  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;
