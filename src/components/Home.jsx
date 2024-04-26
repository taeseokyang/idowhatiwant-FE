import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

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

    opacity: ${({ visible }) => (visible ? '1' : '0')};
    animation: ${({ visible }) => (visible ? 'none' :fadeOut )} 1s ease forwards;

    cursor: pointer;
    & a{
        color: #000000;
        text-decoration: none;
    }
`;



const Home = () => {
    const [cookies, setCookies] = useCookies();
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(false);
        setTimeout(() => {
            // 페이드 아웃 애니메이션이 완료된 후에 페이지 이동
            window.location.href = "/idowhatiwant"; // 페이지 URL에 따라 변경
          }, 1000);

    };
    useEffect(() => {
    }, []);


    return (
        <Container>
            <CenterText visible={visible} onClick={handleClick}>
                idowhatiwant
            </CenterText>
        </Container>
    );
};

export default Home;
