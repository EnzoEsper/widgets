import React from 'react';
import Accordion from './components/Accordion';

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
]

const App = () => {
  return(
    <div>
      <Accordion items={items}/>
    </div>
  )
}

export default App;
