import React from 'react'
import { Route } from 'react-router-dom'A
import { useSelector, useDispatch }
import { LinkContainer } from 'react-router-bootstrap'
//import { Navbar, Nav, Container,
const Header = () => {
  const dspatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginl 
  
  const logoutHandler - () => {
    dispatch(logout));

  }

  


  





  return (<header>
    <Container>
      <LinkContainer to="/">
        

