import React from 'react';
import '@styles/components/CustomDropdown.scss';

interface Option {
  key: number | string;
  label: string;
  link?: string;
}

interface CustomDropdownProps {
  title: string;
  viewMore?: boolean;
  link?: string,
  optionsList: Option[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ title,viewMore, link, optionsList }) => {
  return (
    <div className="dropdown">
      <button className="dropdown-button">
        {title}
        <img src="/icons/caret-down.svg" style={{ color: 'white' }} alt="caret-down" />
      </button>
      <div className="dropdown-content">
        {optionsList.map((obj) => (
          <a key={obj.key} href={obj.link}>
            <span>{obj.label}</span>
          </a>
        ))}

        {viewMore &&
          <a key={2222} href={link} className="viewAll">
            <span>
              {'View all'}
              <img src="/icons/long-arrow-right.svg" alt="long-arrow-right" />
            </span>
          </a>}
      </div>
    </div>
  );
};

export default CustomDropdown;
