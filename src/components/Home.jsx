import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterText = styled.div`
    font-weight: 200;
    font-size: 50px;
    & a{
        color: #000000;
        text-decoration: none;
    }
`;



const Home = () => {
    const [cookies, setCookies] = useCookies();


    useEffect(() => {
    }, []);


    return (
        <Container>
            <CenterText>
                <Link to="/idowhatiwant">idowhatiwant</Link>
            </CenterText>
        </Container>
    );
};

export default Home;
