import styled from "styled-components";
import { useState, useEffect } from 'react';
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

const TitleInput = styled.input`
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

const ContentInput = styled.textarea`
    font-family: 'Poppins';
    font-weight: 300;
    font-size: 18px;
    margin-top: 50px;
    width: 500px;
    min-height: calc(100vh - 350px);
    resize: none;
    border: none;
    /* border-bottom: 2px solid #000000; */
    outline: none;
    
    &::placeholder {
        color: #d7d7d7; 
    }
`;

const Summit = styled.button`
    margin-top: 30px;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    background: #000000;
    border-radius: 100px;
    
`;

const Write = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const bottomThreshold = documentHeight - windowHeight;

            if (scrollTop + 100 >= bottomThreshold) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleAddText = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8080/text",
                {
                    title,
                    content
                }
            );

            if (response.data.code == 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };


    return (
        <Container visible={visible}>
            <TitleInput
                placeholder="What did you do today?"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></TitleInput>
            <ContentInput
                placeholder="How was it?"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            >
            </ContentInput>
            <Summit onClick={handleAddText}>Summit</Summit>
        </Container>
    );
};

export default Write;
