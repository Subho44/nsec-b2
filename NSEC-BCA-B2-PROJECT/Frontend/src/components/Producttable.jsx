import React from "react";
import { Table, Badge, Image } from "react-bootstrap";

const Producttable = ({ products = [] }) => {
  const base = "http://localhost:5600";

  return (
    <Table striped bordered hover responsive className="align-middle mt-2">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th className="text-end">Price</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        {products.map((x, index) => (
          <tr key={x._id}>
            <td>{index + 1}</td>

            <td style={{ width: 90 }}>
              {x.image ? (
                <Image
                  src={base + x.image}
                  alt={x.name}
                  rounded
                  width={60}
                  height={40}
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                "-"
              )}
            </td>

            <td>{x.name}</td>
            <td>{x.category}</td>
            <td className="text-end">$ {Number(x.price)}</td>

            <td>
              {x.inStock ? (
                <Badge bg="success">In Stock</Badge>
              ) : (
                <Badge bg="danger">Out Of Stock</Badge>
              )}
            </td>

            <td>{x.createdAt ? new Date(x.createdAt).toLocaleString() : "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Producttable;
