import React from 'react';
import useAxios from 'axios-hooks';
import AddCatalogTable from '../tables/add-catalog';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const AddCatalog = () => {
  const requestConfig = {
    url: 'http://localhost:5000/api/v1/ebay',
    method: 'get',
    params: {
      maxPrice: 100.00,
      minPrice: 90.00,
      keywords: 'wheels'
    }
  };
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
      <h1>Add items to your catalog</h1>
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
      <AddCatalogTable ebayResponse={data} loading={loading} />
    </div>
  );
}

export default AddCatalog;