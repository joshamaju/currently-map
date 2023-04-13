import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import { DrawControl, DrawControlRef } from "$app/controls/draw";
import { useEffect, useState } from "react";
import Map, { MapRef } from "react-map-gl";

const api_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

declare var environment: "web" | "native";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export default function Home() {
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const [drawRef, setDrawRef] = useState<DrawControlRef | null>(null);

  useEffect(() => {
    const map = mapRef;
    const draw = drawRef;

    const onDraw = () => {
      const data = draw!.getAll();

      // if (environment === "native") {
      //   window.ReactNativeWebView.postMessage(JSON.stringify(data));
      // }
    };

    if (map && draw) {
      map.on("draw.create", onDraw);
      map.on("draw.delete", onDraw);
      map.on("draw.update", onDraw);
    }

    return () => {
      map?.off("draw.create", onDraw);
      map?.off("draw.delete", onDraw);
      map?.off("draw.update", onDraw);
    };
  }, [mapRef, drawRef]);

  return (
    <main className="h-full">
      <Map
        ref={setMapRef}
        mapboxAccessToken={api_key}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        initialViewState={{ longitude: -91.874, latitude: 42.76, zoom: 12 }}
      >
        <DrawControl
          ref={setDrawRef}
          position="top-right"
          defaultMode="draw_polygon"
          displayControlsDefault={false}
          controls={{ polygon: true, trash: true }}
        />
      </Map>
    </main>
  );
}
