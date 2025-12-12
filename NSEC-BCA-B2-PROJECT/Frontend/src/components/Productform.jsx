import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
const Productform = ({onSubmit}) => {
  const [formdata,setFormdata] = useState({
    name:'',
    category:'',
    price:'',
    inStock:true,
    image:null,
  });
  const [submitting,setSubmitting] = useState(false);

  const hc = (e) =>{
    const {name,value,type,checked,files} = e.target;
   if (type === "file") {
  setFormdata((prev) => ({ ...prev, image: files?.[0] || null }));
  return;
}

    setFormdata((prev)=>({
      ...prev,
      [name]: type === 'checkbox' ? checked: value
    }));
  };

  const hs = async(e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
       const fd = new FormData();
       fd.append("name",formdata.name);
       fd.append("price",formdata.price);
       fd.append("category",formdata.category);
       fd.append("inStock", String(formdata.inStock));

       if(formdata.image) fd.append("image",formdata.image);

       await onSubmit(fd);

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

    <Form.Group className='mb-2'>
     <Form.Label>Product Images</Form.Label>
     <Form.Control
     type='file'
     accept='image/*'
     name='image'
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