import Axios from "axios";
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";


function App() {



  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Navbar />
          </div>
            <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
