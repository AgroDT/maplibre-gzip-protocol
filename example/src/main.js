import {Map, addProtocol} from 'maplibre-gl';
import {gzipProtocol} from '@agrodt/maplibre-gzip-protocol';
import 'maplibre-gl/dist/maplibre-gl.css';

import './style.css';


addProtocol('gzip', gzipProtocol);

new Map({
  container: 'map',
  center: [40.31165385, 56.46397425],
  zoom: 11,
  style: {
    version: 8,
    sources: {
      fields: {
        type: 'geojson',
        data: 'gzip://https://agrodt.github.io/maplibre-gzip-protocol/fields.geojson.gz'
      },
    },
    layers: [{
      id: 'fields',
      type: 'fill',
      source: 'fields',
      paint: {
        'fill-color': 'green',
        'fill-opacity': 0.8
      }
    }],
  },
});
