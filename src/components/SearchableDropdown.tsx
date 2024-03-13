import React, { useEffect, useRef, useState, ChangeEvent, MouseEventHandler } from "react";
import '@styles/components/SearchableDropdown.scss';

interface Option {
  [key: string]: string;
}

interface SearchableDropdownProps {
  options: Option[];
  label: string;
  id: string;
  selectedVal: string | number;
  searchable: boolean;
  labelText: string;
  placeholder: string,
  
  handleInputChange: (value: string | null) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  label,
  id,
  selectedVal,
  searchable,
  labelText,
  placeholder,
  handleInputChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: Option) => {
    setQuery(() => "");
    handleInputChange(option[id]);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  function toggle(e: any) {
    setIsOpen(!!(e && inputRef.current && e.target === inputRef.current));
  }
  
  const getDisplayValue = (): string => {    
    if (query) return query;
    if (selectedVal) return selectedVal as string;
    if (!isOpen) return placeholder;
    return "";
  };

  const filter = (options: Option[]): Option[] => {
    return options.filter(
      (option) =>
        option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
  <div className="searchable">
    <span className='label'>{labelText}</span>
    <div className="dropdown w-full">
      <div className="control">
        <div className={`selected-value ${getDisplayValue() == placeholder ? 'placeholder' : ''}`}>
          {searchable &&(<input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              handleInputChange(null);
            }}
            onClick={toggle}
          />)}
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => (
          <div
            onClick={() => selectOption(option)}
            className={`option ${
              option[label] === selectedVal ? "selected" : ""
            }`}
            key={`${id}-${index}`}
          >
            {option[label]}
          </div>
        ))}
      </div>
    </div>
  </div>

  );
};

export default SearchableDropdown;

