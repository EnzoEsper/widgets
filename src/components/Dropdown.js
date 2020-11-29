import React, { useEffect, useRef, useState } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  
  // state for manage the open/close of the dropdown
  const [open, setOpen] = useState(false);
  // ref to the most parent element for the dropdown component
  const ref = useRef();

  // runs one time, only when the component renders on the screen (argument with [])
  useEffect(() => {

    const onBodyClick = (event) => {
      /* THIS LOGIC ALLOWS TO CLOSE THE DROPDOWN WHEN THE USER CLICKS OUTSIDE THE DROPDOWN */
      // if the element that was clicked is inside the dropdown most partent element, then return early
      // The null propagation operator allows to avoid the error when the toggle botton is pressed and
      // ref.current becomes null because the dropdown was deleted (first is called the event handler and last the clean up function)
      if (ref.current?.contains(event.target)) {
        return;
      };
      // otherwise (if the element that was clicked is outside the dropdown most parent element), then
      // te dropdown is closed
      setOpen(false);
    }

    document.body.addEventListener('click', onBodyClick);

    // this will we invoked right before the next time that this function (useEffect) is called AND when we stop showing the 
    // dropdown component to the screen
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);


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
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
          {/* i tag is not really for an icon, its just a convention that semantic ui makes use of for show an icon inside an i tag */}
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;