// Core
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

// Styles
import "../../App.css";
import AppRouter from "../../routes/Index";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
