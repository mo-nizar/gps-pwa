/* eslint no-use-before-define: 0 */ // --> OFF

import { useEffect, useRef, useState } from "react";
import "@styles/components/googlePlaces.scss";
import 'dotenv/config';
import { ENVS } from "@/constants";

interface GooglePlacesProps {
  onSelect: (address: Address) => void;
  isErrored: boolean,
}

let autoComplete: google.maps.places.Autocomplete;

const loadScript = (url: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";

  script.onload = () => callback();

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

interface Address {
  [key: string]: any;
}

const GooglePlaces: React.FC<GooglePlacesProps> = ({ onSelect, isErrored }) => {
  const [query, setQuery] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<Address>({});

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

    const newQuery = addressObject.name || "";
    updateQuery(newQuery);

    const address = formatAddressDetails(addressObject as Address);

    onSelect(address);
    setSelectedAddress({ ...address });
  };

  function formatAddressDetails(addressDetails: Address) {
    const formattedAddress = {
      name: '',
      locality: '',
      street: '',
      street_number: '',
      postCode: '',
      postTown: '',
      latitude: null,
      longitude: null,
    };

    if (addressDetails.address_components) {
      addressDetails.address_components.forEach((component: any) => {
        const type = component.types[0];
        const value = component.long_name;

        switch (type) {
          case 'street_number':
            formattedAddress.street_number = value;
            break;
          case 'route':
            formattedAddress.street = value;
            break;
          case 'postal_town':
            formattedAddress.postTown = value;
            break;
          case 'administrative_area_level_1':
            formattedAddress.locality = value;
            break;
          case 'postal_code':
            formattedAddress.postCode = value;
            break;
          default:
            break;
        }
      });
    }

    formattedAddress.name = addressDetails.name ?? addressDetails?.formatted_address ?? '';

    if (addressDetails.geometry && addressDetails.geometry.location) {
      formattedAddress.latitude = addressDetails.geometry.location.lat;
      formattedAddress.longitude = addressDetails.geometry.location.lng;
    }

    return formattedAddress;
  }

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
        className={`form-control ${isErrored ? 'errored' : ''}`}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type Name or Post Code"
        value={query}
      />
    </div>
  );
};

export default GooglePlaces;
