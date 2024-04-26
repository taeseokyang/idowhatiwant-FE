import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;

    align-items: center;
    flex-direction: column; 

    opacity: ${props => (props.visible ? '1' : '0')};
    transition: opacity 0.5s ease;

    overflow: scroll;
`;

const Month = styled.div`
   text-align: center;
   margin-top: 30px;
   & a{
    color: #000000;
    text-decoration: none;
   }
`;

const Months = styled.div`
   padding-top: 20px;
   font-size: 20px;
   font-weight: 300;
   padding-bottom: 200px;
`;

const MonthTitle = styled.div`
    margin-top: 20px;
`;

const Text = styled.div`
    width: 500px;
    font-size: 18px;
    font-weight: 200;
    display: flex;
    justify-content: space-evenly;
    text-align: left;
`;

const Title = styled.div`
    flex-grow: 1;
`;

const DateText = styled.div`
    margin-left: 5px;
`;

const Week = styled.div`
`;


const Wrote = () => {

    const [visible, setVisible] = useState(false);
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/text/all");

                setTexts(response.data.data);

   


                console.log(response.data.data);
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchTexts();

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop === 0) {
                setVisible(true);
                const scrollBox = document.getElementById('scrollBox');
                scrollBox.scrollTop = scrollBox.scrollHeight - scrollBox.clientHeight;
            } else {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function getDayOfWeek(dateString) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(dateString);
        const dayOfWeekIndex = date.getDay();
        const dayOfWeekEnglish = daysOfWeek[dayOfWeekIndex];
        return dayOfWeekEnglish;
      }

      function formatDate(dateString) {
        // 주어진 날짜 문자열을 Date 객체로 변환
        const date = new Date(dateString);
        
        // Date 객체에서 월과 일을 추출
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        // 월을 문자열로 변환
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[monthIndex];
      
        // 변환된 형식으로 반환
        return `${day} ${monthName} ${year}`;
      }


    return (
        <Container visible={visible} id="scrollBox">
            <Months>
                {texts.map((text, index) => (
                    <Month>
                        <Link to={"/text/" + text.id}>
                            <Text>
                                <Title>{text.title}</Title>
                                <Week>{getDayOfWeek(text.date)}</Week>
                                <DateText>{formatDate(text.date)}</DateText>
                            </Text>
                        </Link>
                    </Month>
                ))}
            </Months>
        </Container>
    );
};

export default Wrote;
