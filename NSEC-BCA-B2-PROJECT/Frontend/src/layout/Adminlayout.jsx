import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const Adminlayout = ({children}) => {

  return <>
   <div className='admin-layout'>
    <Container fluid>
        <Row>
            <Col xs={12} md={3} lg={2} className='sidebar-col p-0'>
             <Sidebar/>
            </Col>
            <Col xs={12} md={9} lg={10} className='main-col p-3'>
             {children}
            </Col>
        </Row>
    </Container>
   </div>
   
  </>
}

export default Adminlayout