import React from 'react'
import {Nav} from 'react-bootstrap';
const Sidebar = () => {

  return <>
  <div className='sidebar bg-dark text-light vh-100 d-flex flex-column'>
  <div className='p-3 border-bottom border-secondary'>
   <h4 className='m-0 text-center'>Admin Panel</h4>
   <small className='text-secondary d-block text-center'>
   Product Managment
   </small>
  </div>

  <Nav className='flex-column p-2 mt-2'>
  <Nav.Link className='text-light mb-1 sidebar-link active'>
    Dashboard
  </Nav.Link>
   <Nav.Link className='text-light mb-1 sidebar-link active'>
    Products
  </Nav.Link>
   <Nav.Link className='text-light mb-1 sidebar-link active'>
    Users
  </Nav.Link>
   <Nav.Link className='text-light mb-1 sidebar-link active'>
    Settings
  </Nav.Link>
  </Nav>
  
  </div>
    
  </>
}

export default Sidebar