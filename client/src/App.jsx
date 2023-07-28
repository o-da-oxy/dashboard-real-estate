import { Route, Switch, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Home from "./Pages/Home.jsx";
import Diagrams from "./Pages/Diagrams.jsx";
import Tables from "./Pages/Tables.jsx";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  position: absolute;
  z-index: 999;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

function App() {
  const location = useLocation();
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route path="/tables" component={Tables} />
          <Route path="/diagrams" component={Diagrams} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
