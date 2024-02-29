// import './App.css';
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Router from "./routes";
import { ContextValue } from "./utils/context/contexts";


function App() {
  return (
    <ContextValue>
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </ContextValue>
  );
}

export default App;
