import { useState } from 'react';
import axios from 'axios';

import { Container, Form, Button } from 'react-bootstrap';

import '@Styles/Search.css';

const Search = ({ setSearchResults }) => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedTerm, setDisplayedTerm] = useState<string>("");

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setDisplayedTerm(searchTerm);

    try {
      const res = await axios.get(`/api/search/${searchTerm}`)
      const data = res.data;
      const results = data.search_results;
      setSearchResults(results);
    } catch (err) {
      console.log(err);
    }
    setSearchTerm("");
  }

    return (
        <Container className='show-sm mt-5'>
          <Form className='d-flex' onSubmit={handleSearch}>
            <Form.Control
              type='search'
              placeholder='Search Hearing Examiner decisions by keyword...'
              className='searchbar me-2 shadow-sm'
              aria-label='Search'
              onChange={(e) => setSearchTerm(e.target.value)}
              value = {searchTerm}
            >
            </Form.Control>
            <Button 
              className='shadow-sm search-btn' 
              variant='primary' 
              type='submit'
              >
              Search
            </Button>
          </Form>
          {( displayedTerm && displayedTerm !== '' ) && (
            <Container className='mt-3 displayed-term-container'>
              <span className='displayed-term-text'>
                The following decisions contain the keyword: {displayedTerm ? `"${displayedTerm}"` : ''}
              </span>
            </Container>
          )}
        </Container>
    )
}

export default Search;

