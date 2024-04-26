import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 120px);
    display: flex;

    align-items: center;
    flex-direction: column; 

    opacity: ${props => (props.visible ? '1' : '0')};
    transition: opacity 0.5s ease;
`;

const TitleInput = styled.div`
    font-family: 'Poppins';
    font-size: 20px;
    padding-top: 50px;
    width: 500px;
    border: none;
    border-bottom: 2px solid #000000;
    outline: none;
    &::placeholder {
        font-weight: 300;
        color: #d7d7d7; 
    }
`;

const ContentInput = styled.div`
    font-family: 'Poppins';
    font-weight: 300;
    font-size: 18px;
    margin-top: 50px;
    width: 500px;
    height: 400px;
    resize: none;
    border: none;
    /* border-bottom: 2px solid #000000; */
    outline: none;
    
    &::placeholder {
        color: #d7d7d7; 
    }
`;

const Back = styled.button`
    position: fixed;
    bottom:30px;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    background: #000000;
    border-radius: 100px;
`;


const Text = () => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/text/" + id);

                setText(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };
        fetchText();

        const timeout = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Container visible={visible}>
            <TitleInput>{text.title}</TitleInput>
            <ContentInput>{text.content}</ContentInput>

            <Back onClick={() => window.history.back()}>Back</Back>
        </Container>
    );
};

export default Text;
