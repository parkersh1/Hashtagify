import React from 'react';
import { Form } from 'react-bootstrap';

function Search(props) {
    return (
        <div className="search-container">
            <Form>
                <Form.Group controlId="searchQuery" className="m-3" >
                    <Form.Control type="text" placeholder="Search by Title" onChange={e => props.setQuery(e.target.value)} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Search;