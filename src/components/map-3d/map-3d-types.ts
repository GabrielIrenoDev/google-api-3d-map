import type { DOMAttributes, ReactNode, RefAttributes } from "react";

declare module "@vis.gl/react-google-maps" {
	export function useMapsLibrary(
		name: "maps3d",
	): typeof google.maps.maps3d | null;
}

declare global {
	namespace google.maps.maps3d {
		interface Map3DElement extends HTMLElement {
			mode?: "HYBRID" | "SATELLITE";
		}
	}
}

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"gmp-map-3d": CustomElement<
				google.maps.maps3d.Map3DElement,
				google.maps.maps3d.Map3DElement
			>;
		}
	}
}

type CustomElement<TElem, TAttr> = Partial<
	TAttr & DOMAttributes<TElem> & RefAttributes<TElem> & { children: ReactNode }
>;
