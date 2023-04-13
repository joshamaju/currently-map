import MapboxDraw, { MapboxDrawOptions } from "@mapbox/mapbox-gl-draw";
import { forwardRef, useState, useImperativeHandle } from "react";
import { ControlPosition, useControl } from "react-map-gl";

export type DrawControlProps = MapboxDrawOptions & {
  position: ControlPosition;
};

export type DrawControlRef = Pick<MapboxDraw, "getAll">;

export const DrawControl = forwardRef<DrawControlRef, DrawControlProps>(
  function DrawControl(props, ref) {
    const [control] = useState(() => new MapboxDraw(props));

    useImperativeHandle(
      ref,
      () => {
        return {
          getAll() {
            return control.getAll();
          },
        };
      },
      [control]
    );

    useControl(() => control, {
      position: props.position,
    });

    return null;
  }
);
