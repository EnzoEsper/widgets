import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Search = () => {

  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);
  
  // THIS IS A BETTER WAY FOR DOING THE SEARCH AND THE TRHOTTLING, AND PREVENTS: # THE WARNING IN THE CONSOLE
  // # A SEARCH WHENEVER A USER TYPES QUICKLY THE SAME TERM 

  // term that handles the changes of the term in the period stablished in the set timeout function
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000)

    // if the user changes the term too quickly (types faster than one letter per second) the previous timeot 
    // is cleared and another one is triggered
    return () => {
      clearTimeout(timerId);
    }
  }, [term])

  // when a change to the debouncedTerm occurs (the above timeout in the useEffect function whenever the timeout is completed)
  // this useEffect is triggered to make the search and update the corresponding piece of state
  useEffect(() => {

    const searchTerm = async () => {
      const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm
        }
      });

      setResults(data.query.search);
    };

    searchTerm();

  }, [debouncedTerm])

  // THIS WAS THE FIRST APPROACH TO MAKE THE SEARCH, BUT GENERATES A WARNING IN THE CONSOLE (NOT A BIG PROBLEM THOUGH)
  // IT STILLS VALID TO USE THIS APPROACH TO MAKE THE SEARCH
  // useEffect(() => {
  //   const searchTerm = async () => {
  //     const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: term
  //       }
  //     });

  //     setResults(data.query.search);
  //   };

  //   if (term && !results.length) {
  //     // first time that the component is rendered, so the timeout is not applied
  //     searchTerm();
  //   } else {
  //     // delay between the term changes for execute the search
  //     const timeoutId = setTimeout(() => {
  //       if (term) {
  //         searchTerm();
  //       }
  //     }, 700);

  //     // if the time between changes of the term is under 0.7 secs the last timer is cleared and another new one is created
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [term]);

  const renderedResults = results.map((result) => {
    return(
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">GO</a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
        </div>
      </div>
    );
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input type="text" className="input" value={term} onChange={(e) => setTerm(e.target.value)}/>
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;