"use client";
import { useState, useEffect, useRef } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Point from "ol/geom/Point";
import { fromLonLat, useGeographic } from "ol/proj";
import { Coordinate } from "ol/coordinate";

const ToonKaart2 = () => {
  useGeographic();
  const mapContainer = useRef<HTMLDivElement>(null);

  const [coor, setCoor] = useState<Coordinate>([4.34984, 50.84535]);
  const [point, setPoint] = useState<Point>(new Point(coor));

  useEffect(() => {
    console.log(`New location: ${coor}`);
    iconFeature.getGeometry()?.setCoordinates(coor);
    map.getView().setCenter(coor);
  }, [coor]);

  const osmLayer = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  });

  const iconFeature = new Feature({
    geometry: point,
  });

  const vectorSource = new VectorSource({
    features: [iconFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const map = new Map({
    layers: [osmLayer, vectorLayer],
    view: new View({
      center: coor,
      zoom: 16,
    }),
  });

  useEffect(() => {
    map.setTarget(mapContainer.current || "");
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (
        position: GeolocationPosition
      ) {
        setCoor([position.coords.longitude, position.coords.latitude]);
      });
    }

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <h1>
        {coor[0]} {coor[1]}
      </h1>
      <div
        style={{ height: "100vh", width: "100%" }}
        ref={mapContainer}
        className="map-container"
      />
    </>
  );
};

export default ToonKaart2;
