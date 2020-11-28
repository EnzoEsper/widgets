import React from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const renderedOptions = options.map((option) => {

    // filtering the option list for not to show an item that is selected twice in the list
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div key={option.value} className="item" onClick={() => onSelectedChange(option)}>
        {option.label}
      </div>
    );
  });
  
  return(
    <div className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div className="ui selection dropdown visible active">
          {/* i tag is not really for an icon, its just a convention that semantic ui makes use of for show an icon inside an i tag */}
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className="menu visible transition">
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;