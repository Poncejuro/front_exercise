import {LoginPage, HomePage} from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components";

const Layout = ({ children }) => (
  <>
    <Navbar />  
    {children}  
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
