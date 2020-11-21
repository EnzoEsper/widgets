import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Search = () => {

  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchTerm = async () => {
      const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    };

    if (term && !results.length) {
      // first time that the component is rendered, so the timeout is not applied
      searchTerm();
    } else {
      // delay between the term changes for execute the search
      const timeoutId = setTimeout(() => {
        if (term) {
          searchTerm();
        }
      }, 700);

      // if the time between changes of the term is under 0.7 secs the last timer is cleared and another new one is created
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

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