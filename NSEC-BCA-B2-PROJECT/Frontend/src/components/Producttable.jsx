import React from 'react'
import { Table,Badge } from 'react-bootstrap'
const Producttable = ({products}) => {

  return <>
  <Table striped bordered hover responsive  className='align-middle mt-2'>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Category</th>
    <th className='text-end'>Price</th>
    <th>Status</th>
    <th>Created At</th>
    
  </tr>
  {
    products.map((x,index)=>(
      <tr key={x._id}>
      <td>{index +1}</td>
      <td>{x.name}</td>
      <td>{x.category}</td>
      <td>$ {Number(x.price)}</td>
      <td>
        {x.inStock ? (
        <Badge bg='success'>In Stock</Badge>
        ): (
        <Badge bg='danger'>Out Of Stock</Badge>
        )}
      </td>
      <td>
        {
          x.createdAt ? new Date(x.createdAt).toLocaleString(): '-'
        }
      </td>
      </tr>
    ))
  }

  </Table>
    
  </>
}

export default Producttable