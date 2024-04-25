import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import Write from "./Write";
import Wrote from "./Wrote";

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  /* position: absolute; */
`;

const Center = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const CenterText = styled.div`
    height: 90px;
    position: sticky;
    top: 30px;
    bottom: 30px;
`;

const TodayDate = styled.div`
    font-weight: 200;
    font-size: 35px;
    & a{
        color: #000000;
        text-decoration: none;
    }
`;

const TodayWeek = styled.div`
    font-weight: 200;
    font-size: 23px;  
    line-height: 20px;
    
`;

const Main = () => {
    const [cookies, setCookies] = useCookies();
    const [todayDate, setTodayDate] = useState('');
    const [todayWeek, setTodayWeek] = useState('');


    useEffect(() => {
        window.scrollTo(0, window.innerHeight-120);
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = date.toLocaleDateString('en-US', options).split(', ');
        setTodayDate(today[1]+' '+today[2]);
        setTodayWeek(today[0]);
    }, []);


    return (
        <Container>
            <Wrote></Wrote>
            <Center>
                <CenterText>
                    <TodayDate>{todayDate}</TodayDate>
                    <TodayWeek>{todayWeek}</TodayWeek>
                </CenterText>
            </Center>
            <Write></Write>
        </Container>
    );
};

export default Main;
