import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'
import { MdMovie } from "react-icons/md";
import {FaYoutube, FaImdb} from 'react-icons/fa'

class Header extends Component {

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/"><MdMovie style={{ color:'#10ec6e' }} size={50}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Movies</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#"><FaImdb style={{ color:'#efee24' }} size={50}/></Nav.Link>
                            <Nav.Link eventKey={2} href="#"><FaYoutube style={{color:'#cf2222'}} size={50}/> </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <br/>
            </div>
        )
    }
}

export default connect()(Header)