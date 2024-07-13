import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { ChakraProvider } from "@chakra-ui/react";
import Hero from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Hero />
        <Router />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
