// needs this import for the map box UI and marker
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { useMantineTheme } from '@mantine/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { useEffect, useMemo, useRef, useState } from 'react';

interface MapBoxControlProps {
  setLocation: any;
  locationQuery?: string;
  name: string;
}

export function MapBoxControl({ setLocation, locationQuery, name }: MapBoxControlProps) {
  const theme = useMantineTheme();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const mapContainer = useRef<any>(null);
  const map = useRef<Map | null>(null);

  // needs to be placed inside .env file
  const mapBoxToken =
    'pk.eyJ1IjoieXN0YW4xMSIsImEiOiJjbDhlamVxamEwMHVxM25uejVtNnFtejJpIn0.xWmchj1VO5fEGEDLIi4AvQ';
  mapboxgl.accessToken = mapBoxToken;
  // for forward geocoding
  const geoCoder = mapBoxToken && mbxGeocoding({ accessToken: mapBoxToken });
  // for reverse geocoding
  const geoCoderControl = useMemo(
    () =>
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
    [],
  );

  useEffect(() => {
    async function getLocation() {
      const geoData =
        geoCoder &&
        (await geoCoder
          .forwardGeocode({
            query: locationQuery || 'Melbourne, Victoria, Australia',
            limit: 1,
          })
          .send());
      if (geoData.body.features[0]) {
        setLng(geoData.body.features[0].geometry.coordinates[0]);
        setLat(geoData.body.features[0].geometry.coordinates[1]);
      }
    }
    getLocation();
  }, [geoCoder, locationQuery]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (lng === 0 && lat === 0) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: 12,
    });
    // for editing, place existing location marker
    if (locationQuery) {
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    }
    map.current.addControl(geoCoderControl);
  }, [geoCoderControl, lat, lng, locationQuery, setLocation]);

  map.current?.setStyle(
    theme.colorScheme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v10'
      : 'mapbox://styles/mapbox/light-v10',
  );

  // Save the location string
  geoCoderControl.on('result', function (result) {
    setLocation(name, result.result.place_name);
  });

  return <div ref={mapContainer} style={{ minWidth: '200px', minHeight: '200px' }} />;
}
