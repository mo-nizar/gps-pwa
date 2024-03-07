/* eslint no-use-before-define: 0 */  // --> OFF

import { useEffect, useRef, useState } from "react";
import "@styles/components/googlePlaces.scss";
import 'dotenv/config';
import { ENVS } from "@/constants";

interface GooglePlacesProps {}


let autoComplete: google.maps.places.Autocomplete;

const loadScript = (url: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";

  // if (script.readyState) {
  //   script.onreadystatechange = function () {
  //     if (script.readyState === "loaded" || script.readyState === "complete") {
  //       script.onreadystatechange = null;
  //       callback();
  //     }
  //   };
  // } else {
    script.onload = () => callback();
  // }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const GooglePlaces: React.FC<GooglePlacesProps> = () => {
  const [query, setQuery] = useState<string>("");
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);

  const selectedLocation: { lat: number; lng: number } = {
    lat: 28.7041,
    lng: 77.1025,
  };

  const handleScriptLoad = (
    updateQuery: (value: string) => void,
    autoCompleteRef: React.RefObject<HTMLInputElement>
  ) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current as HTMLInputElement,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "UK" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery: (value: string) => void) => {
    const addressObject: google.maps.places.PlaceResult = await autoComplete.getPlace();

    const newQuery = addressObject.formatted_address || "";
    updateQuery(newQuery);
    console.log({ newQuery });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat() || 0,
      lng: addressObject?.geometry?.location?.lng() || 0,
    };

    console.log(addressObject);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${ENVS.GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <label>{"Select Hospital"}</label>
      <input
        ref={autoCompleteRef}
        className="form-control"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type Name or Post Code"
        value={query}
      />
    </div>
  );
};

export default GooglePlaces;
