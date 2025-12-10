// Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // ✅ key must be a string

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar bg-dark text-light vh-100 d-flex flex-column">
      <div className="p-3 border-bottom border-secondary">
        <h4 className="m-0 text-center">Admin Panel</h4>
        <small className="text-secondary d-block text-center">
          Product Management
        </small>
      </div>

      <Nav className="flex-column p-2 mt-2">

        {/* Public links */}
        <Nav.Link as={Link} to="/register" className="text-light mb-1 sidebar-link">
          Register
        </Nav.Link>
        <Nav.Link as={Link} to="/login" className="text-light mb-1 sidebar-link">
          Login
        </Nav.Link>

        {/* Protected links (only when logged in) */}
        {token && (
          <>
            <Nav.Link as={Link} to="/" className="text-light mb-1 sidebar-link active">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-light mb-1 sidebar-link active">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="text-light mb-1 sidebar-link active">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" className="text-light mb-1 sidebar-link active">
              Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/l" className="text-light mb-1 sidebar-link">
              Landingpage
            </Nav.Link>
            <Nav.Link className="text-light mb-1 sidebar-link">
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
