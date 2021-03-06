import React from 'react';
import useAxios from 'axios-hooks';
import AddCatalogTable from '../tables/add-catalog';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './add-catalog.scss';

const AddCatalog = ({ companyId, name }) => {
  const requestConfig = {     url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/ebay`,     method: 'get',   };
  const [{ loading, error, data }, refetch] = useAxios(requestConfig);

  const handleSubmit = event => {
    event.preventDefault();
    const { maxPrice, minPrice, keywords} = event.currentTarget;

    requestConfig.params = {
      maxPrice: maxPrice.value,
      minPrice: minPrice.value,
      keywords: keywords.value
    }

    refetch(requestConfig);
  }

  return (
    <div className="add-catalog">
      <h2>{name ? `Add items to ${name}'s catalog` : 'Add items to your catalog'}</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="keywords">
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" placeholder="Technology" />
          </Form.Group>

          <Form.Group as={Col} controlId="maxPrice">
            <Form.Label>Max Price</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group as={Col} controlId="minPrice">
            <Form.Label>Min Price</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          { loading ? "Loading..." : "Submit" }
        </Button>

        <Form.Text>
          { error ? "Well that didn't work" : null }
        </Form.Text>
      </Form>
      <AddCatalogTable
        ebayResponse={data}
        loading={loading}
        companyId={companyId}
        name={name}
      />
    </div>
  );
}

export default AddCatalog;