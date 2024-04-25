import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Main from "./components/Main";

const Container = styled.div`
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/idowhatiwant" Component={Main} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
