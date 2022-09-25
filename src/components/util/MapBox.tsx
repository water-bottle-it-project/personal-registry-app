// needs this import for the map box UI and marker
import 'mapbox-gl/dist/mapbox-gl.css';

import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

interface MapBoxProps {
  locQuery: string;
}

export function MapBox({ locQuery }: MapBoxProps) {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const mapContainer = useRef<any>(null);
  const map = useRef<Map | null>(null);
  // needs to be placed inside .env file
  const mapBoxToken =
    'pk.eyJ1IjoieXN0YW4xMSIsImEiOiJjbDhlamVxamEwMHVxM25uejVtNnFtejJpIn0.xWmchj1VO5fEGEDLIi4AvQ';
  mapboxgl.accessToken = mapBoxToken;
  const geoCoder = mapBoxToken && mbxGeocoding({ accessToken: mapBoxToken });

  useEffect(() => {
    async function getLocation() {
      const geoData =
        geoCoder &&
        (await geoCoder
          .forwardGeocode({
            query: locQuery,
            limit: 1,
          })
          .send());
      if (geoData) {
        setLng(geoData.body.features[0].geometry.coordinates[0]);
        setLat(geoData.body.features[0].geometry.coordinates[1]);
      }
    }
    getLocation();
  }, [geoCoder, locQuery]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (lng === 0 && lat === 0) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12,
    });
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ minWidth: '300px', minHeight: '300px' }} />;
}
