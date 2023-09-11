import React from 'react';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
    return(
        <div className='navbar'>

<Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link className="nav-bar" href="/home">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link className="nav-bar" eventKey="link-1">Sign-up</Nav.Link>
      </Nav.Item>
    </Nav>

        </div>
    )
}

export default Navbar