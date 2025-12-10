import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {Button, Nav} from 'react-bootstrap';


const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(token);
  
  const hl = ()=> {
    localStorage.removeItem('token');
    navigate('/login');
  }



  return <>
  <div className='sidebar bg-dark text-light vh-100 d-flex flex-column'>
  <div className='p-3 border-bottom border-secondary'>
   <h4 className='m-0 text-center'>Admin Panel</h4>
   <small className='text-secondary d-block text-center'>
   Product Managment
   </small>
  </div>

  <Nav className='flex-column p-2 mt-2'>
  <Link to="/">Register</Link>
  <Link to="/login">Login</Link>
  {
    token && (
      <>
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
  <Nav.Link className='text-light mb-1 sidebar-link'>
     <Link to="/l">Landingpage</Link>
  </Nav.Link>
  <Nav.Link className='text-light mb-1 sidebar-link'>
     <Button onClick={hl}>Logout</Button>
  </Nav.Link>

      </>
    )
  }
  
  </Nav>
  
  </div>
    
  </>
}

export default Sidebar