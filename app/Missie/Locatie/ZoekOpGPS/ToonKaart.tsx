"use client";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { useGeographic } from "ol/proj";
import { Style, Circle, Fill, Icon, Stroke } from "ol/style";
import Geolocation from "ol/Geolocation";
import { Coordinate } from "ol/coordinate";

const ToonKaart = () => {
  useGeographic();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [locatie, setLocatie] = useState<[latitude: number,longitude: number]>([0,0])

  const [feature,setFeature]=useState<Feature>(new Feature({geometry:new Point(locatie)}))


    useEffect(()=>{

  })

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position:any) {
      setLocatie([position.coords[1], position.coords[0]])
    });
  }




  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     // navigator.geolocation.getCurrentPosition(
  //     //   (position) => {
  //     //     const { latitude, longitude } = position.coords;

  //     //     setLocatie({ latitude, longitude });
  //     //   },

  //     //   (error) => {
  //     //     console.error("Error get user location: ", error);
  //     //   }
  //     // );

  //   } else {
  //     console.log("Geolocation is not supported by this browser");
  //   } 
  // };

  let punt = new Point( [0,0]);
  const view = new View({
    center: punt.getCoordinates(), // Longitude, Latitude
    zoom: 18,
  });

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          // source: new VectorSource({
          //   features:[punt]
          // }),
          style: new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({ color: "black" }),
              stroke: new Stroke({
                color: "white",
                width: 2,
              }),
            }),
          }),
        }),
      ],
      view: view,
    });
    map.setTarget(mapContainer.current || "");
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div
        ref={mapContainer}
        className="map"
        style={{ width: "700px", height: "100vh" }}
      ></div>
    </>
  );
};

export default ToonKaart;
