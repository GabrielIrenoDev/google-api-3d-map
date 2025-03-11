import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Props {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
	const [placeAutocomplete, setPlaceAutocomplete] = useState<Node | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const places = useMapsLibrary("places");

	useEffect(() => {
		if (!places) return;
		// @ts-expect-error
		setPlaceAutocomplete(new places.PlaceAutocompleteElement());
	}, [places]);

	useEffect(() => {
		if (!placeAutocomplete) return;

		placeAutocomplete.addEventListener(
			"gmp-placeselect",
			// @ts-expect-error
			async ({ place }: { place: google.maps.places.Place }) => {
				await place.fetchFields({
					fields: ["displayName", "formattedAddress", "location", "viewport"],
				});

				onPlaceSelect(place.toJSON());
			},
		);

		containerRef.current?.appendChild(placeAutocomplete);
	}, [onPlaceSelect, placeAutocomplete]);

	return <div className="autocomplete-container" ref={containerRef} />;
};
