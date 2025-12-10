import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
const Productform = ({onSubmit}) => {
  const [formdata,setFormdata] = useState({
    name:'',
    category:'',
    price:'',
    inStock:true
  });
  const [submitting,setSubmitting] = useState(false);

  const hc = (e) =>{
    const {name,value,type,checked} = e.target;
    setFormdata((prev)=>({
      ...prev,
      [name]: type === 'checkbox' ? checked: value
    }));
  };

  const hs = async(e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onSubmit({
        name:formdata.name,
        category:formdata.category,
        price:Number(formdata.price),
        inStock:formdata.inStock,

      });

      
    } catch(err) {
      console.error(err);
    }
  }

  return <>
    <Form onSubmit={hs}>
    <Form.Group className='mb-2'>
     <Form.Label>Product Name</Form.Label>
     <Form.Control
     type='text'
     placeholder='enter name'
     name='name'
     value={formdata.name}
     onChange={hc}

     />
    </Form.Group>
    <Form.Group className='mb-2'>
     <Form.Label>Category</Form.Label>
     <Form.Control
     type='text'
     placeholder='enter category'
     name='category'
     value={formdata.category}
     onChange={hc}

     />
    </Form.Group>
    <Form.Group className='mb-2'>
     <Form.Label>Product Price</Form.Label>
     <Form.Control
     type='number'
     placeholder='0'
     name='price'
     value={formdata.price}
     onChange={hc}
     />
    </Form.Group>
   <Form.Group className='mb-2' controlId='inStock'>
     <Form.Check
     type='checkbox'
     label='In Stock'
     name='inStock'
     checked={formdata.inStock}
     onChange={hc}

     />
    </Form.Group>

    <div className=''>
    <Button className='btn btn-dark' type='submit'>
      {submitting ?"Add Product" : "saved"}
    </Button>
    </div>
    </Form>
  </>
}

export default Productform