// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import api from "./services/api";
import Adminlayout from "./layout/Adminlayout";
import Productform from "./components/Productform";
import Producttable from "./components/Producttable";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Landingpage from "./components/Landingpage";

// small component for the dashboard UI
const Dashboard = ({ products, onAdd }) => (
  <Adminlayout>
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h3 className="fw-bold">Dashboard</h3>
          <p>Add &amp; view product</p>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Add New Product</Card.Title>
              <Productform onSubmit={onAdd} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Product List
              </Card.Title>
              <Producttable products={products} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Adminlayout>
);

const App = () => {
  const [products, setProducts] = useState([]);

  // load products
  const fetchproducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  // add product
  const addProduct = async (data) => {
    try {
      const res = await api.post("/products", data);
      setProducts((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/l" element={<Landingpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
