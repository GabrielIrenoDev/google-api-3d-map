import { APIProvider } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { Map3D, type Map3DCameraProps } from "./components/map-3d";
import { AutocompleteCustom } from "./components/autocomplete";

const INITIAL_VIEW_PROPS = {
	center: { lat: 37.72809, lng: -119.64473, altitude: 1300 },
	range: 5000,
	heading: 61,
	tilt: 69,
	roll: 0,
};

function App() {
	const [_selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);

	const [viewProps, setViewProps] = useState(INITIAL_VIEW_PROPS);

	const handleCameraChange = useCallback((props: Map3DCameraProps) => {
		setViewProps((oldProps) => ({ ...oldProps, ...props }));
	}, []);

	return (
		<APIProvider version="alpha" apiKey={import.meta.env.VITE_API_KEY}>
			<div
				style={{
					height: "90vh",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<div className="autocomplete-control">
					<AutocompleteCustom onPlaceSelect={setSelectedPlace} />
				</div>

				<Map3D
					{...viewProps}
					onCameraChange={handleCameraChange}
					defaultLabelsDisabled
				/>
			</div>
		</APIProvider>
	);
}

export default App;
