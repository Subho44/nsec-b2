import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Card } from 'react-bootstrap'
import api from './services/api';
import Adminlayout from './layout/Adminlayout';
import Productform from './components/Productform';
import Producttable from './components/Producttable';

const App = () => {
  const [products,setProducts] = useState([]);
  const [editprodut,setEditproduct] = useState(null); 

  const fetchproducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchproducts();
  },[]);

  //add data
  const ad = async(data) =>{
    const res = await api.post('/products',data);
    setProducts((prev)=>[res.data,...prev]);
  };
  
  return <>
  <Adminlayout>
  <Container fluid>
    <Row className='mb-3'>
    <Col>
      <h3 className='fw-bold'>Dashboard</h3>
      <p>
        Add & view product
      </p>
    </Col>
    </Row>
    <Row>
      <Col md={4} className='mb-3'>
       <Card className='shadow-sm'>
       <Card.Body>
        <Card.Title className='mb-3'>Add New Product</Card.Title>
        <Productform onSubmit={ad}/>
       </Card.Body>
       </Card>
      </Col>
    </Row>

    <Row>
      <Col md={8} className='mb-3'>
       <Card className='shadow-sm'>
       <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'> Product List</Card.Title>
        <Producttable products={products}/>
       </Card.Body>
       </Card>
      </Col>
    </Row>

  </Container>
  </Adminlayout>
    
  </>
}

export default App