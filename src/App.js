import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Header from './components/Header';
import Route from './components/Route';
import Search from './components/Search';
import Translate from './components/Translate';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end library'
  },
  {
    title: 'Why use React?',
    content: 'React is awesome'
  },
  {
    title: 'How do you use React?',
    content: 'you use it by creating components'
  }
];

const options = [
  {
    label: "The Color Red",
    value: "red"
  },
  {
    label: "The Color Green",
    value: "green"
  },
  {
    label: "A shade of Blue",
    value: "blue"
  }
];



const App = () => {

  const [selected, setSelected] = useState(options[0]);
  // const [showDropdown, setShowdropdown] = useState(true);

  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items}/>
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown 
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
      {/* <button onClick={() => setShowdropdown(!showDropdown)}>Toggle Dropdown</button>
      {showDropdown ?
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        /> : null
      } */}
      
    </div>
  );
}

export default App;
