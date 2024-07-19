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
  const [locatie, setLocatie] = useState<Coordinate>([3.0317848131950034, 50.77247797516819]);

  let punt = new Point(locatie);
  const view = new View({
    center: locatie, // Longitude, Latitude
    zoom: 18,
  });
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: view.getProjection(),
    tracking:true,
  });
  geolocation.on("change:position", () => {
    const coor = geolocation.getPosition();
    console.log(coor);
    punt.setCoordinates(coor ? coor : [4.3415546983145505, 50.8949328089402]);
  });

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(punt)],
          }),
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

    // on component unmount remove the map refrences to avoid unexpected behaviour
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
