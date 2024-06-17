import React,{useState} from 'react';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import Modal from './Modal';

const Button = styled.button`
background-color:blue;
//background-image:url("https://i.pinimg.com/564x/a5/2e/3e/a52e3ead549f0fef288d9d074b979df2--computer.jpg");
//background-image:url('assets/graphics/meta/background.jpg');
//top:${(props) => props.top};
//background-image:url('${(props)=>props.background}');
background-repeat: no-repeat;
background-size: cover;
width:3rem;
height:3rem;
cursor:pointer;
border:1px solid;
`

const Marker = ({ children, feature, background, onClick }) => {

    const _onClick = (e) => {
    //   setModal(true);
    };
  
    return (
      <>     
      <Button onClick={_onClick} className="marker" background={'white'}>
        {children}
      </Button>
      </>
    );
};

export default Marker