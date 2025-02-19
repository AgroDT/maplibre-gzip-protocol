# maplibre-gzip-protocol

A MapLibre plugin to allow loading of statically gzipped sources.
See a full [example](./example).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MapLibre geojson.gz Example</title>
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" />
    <style>
      body { margin: 0; padding: 0; }
      html, body, #map { height: 100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script type="importmap">
      {
        "imports": {
          "@agrodt/maplibre-gzip-protocol": "https://unpkg.com/@agrodt/maplibre-gzip-protocol/dist/index.js"
        }
      }
    </script>
    <script src='https://unpkg.com/maplibre-gl'></script>
    <script type="module">
      import {gzipProtocol} from '@agrodt/maplibre-gzip-protocol';

      maplibregl.addProtocol('gzip', gzipProtocol);

      new maplibregl.Map({
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
    </script>
  </body>
</html>
```
