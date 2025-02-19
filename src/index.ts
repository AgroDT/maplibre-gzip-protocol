import type {AddProtocolAction} from 'maplibre-gl';

export const gzipProtocol: AddProtocolAction = async ({
  url,
  type,
  collectResourceTiming,
  ...init
}) => {
  const [schema, protocol, url2] = url.split(/:?\/\//);
  if (schema !== 'gzip') {
    throw new Error(`Invalid protocol "${schema}", "gzip" expected`);
  }

  const resp = await fetch(`${protocol}://${url2}`, init);
  if (!resp.ok) {
    throw new Error(`Fetch error: ${resp.statusText}`);
  }

  const dec = new DecompressionStream('gzip');
  const reader = resp.body?.pipeThrough(dec)?.getReader();
  if (!reader) {
    throw new Error('Failed to read the response body');
  }

  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const {done, value} = await reader.read();
    if (value) {
      chunks.push(value);
      length += value.length;
    }
    if (done) {
      break;
    }
  }

  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }

  switch (type) {
    case 'string':
      return {data: new TextDecoder().decode(buffer)};
    case 'json':
      return {data: JSON.parse(new TextDecoder().decode(buffer))};
    default:
      return {data: buffer};
  }
}
