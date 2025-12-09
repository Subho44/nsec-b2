import React,{useState,useEffect} from 'react'
import { Container,Row,Col,Card } from 'react-bootstrap'
import api from './services/api';

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

  
  return <>
    
  </>
}

export default App