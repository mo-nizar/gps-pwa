'use client'
import React from "react";
import '@styles/CustomDropdown.scss';

export default function CustomDropdown({
  title,
  optionsList
}) {
  return (
  <div class="dropdown">
      <button class="dropdown-button">{title}
        <img src='/icons/caret-down.svg' style={{color: 'white'}}/>
      </button>
      <div class="dropdown-content">
      {optionsList.map(
        (obj) =>(
          <a key={obj.key} href="#">
          <span>
          {obj.label}
          </span>
        </a>
        )
      )}

        <a key={2222} href="#" className="viewAll">
          <span>
          {'View all'}
            <img src='/icons/long-arrow-right.svg' />
          </span>
        </a>
      </div>
  </div>
  );
}
