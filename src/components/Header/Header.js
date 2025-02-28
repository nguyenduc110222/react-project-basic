import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import imagesLogo from '../assets/images/logo192.png'
import { useNavigate } from "react-router";
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
function Header() {

  const {logout, user} = useContext(UserContext)

  const  navigate = useNavigate();

  const handleLogout=()=>{
    logout()
    navigate("/")
  }
    return (  
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand >
              <NavLink className="nav-link " to="/">
                <img
                  src={imagesLogo}
                  alt="Logo"
                  height="30"
                  width="30"
                  className="d-inline-block align-top"
                />
                  &nbsp; Basic App
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                      className="me-auto my-2 my-lg-0 "
                      style={{ maxHeight: '100px' }}
                      navbarScroll
                  >
                  {user && user.auth 
                       &&<NavLink className="nav-link " to="/user">Management</NavLink>
                  }
                  </Nav>
                  <Nav>
                  {user && user.email && <Nav className="nav-link ">Welcom: <b>  &nbsp;{user.email}&nbsp;&nbsp;</b></Nav>}

                  {user && user.auth 
                  ?
                  // <NavDropdown.Item>
                  <Button 
                      variant="danger"
                      onClick={handleLogout}
                  >Logout</Button>
                  // </NavDropdown.Item>
                  :
                 
                  <NavLink to="/login">
                      <Button 
                          variant="info"
                      >Login</Button>
                  </NavLink>
                 
                  }
                    
                
                <NavDropdown.Divider />
                </Nav>
                 
                
                
             </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    )
}

export default Header;

