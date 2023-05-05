import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import { AppProvider } from './context/AppProvider';

function App() {

  return (
    <AppProvider>
      <Router>
       <Header/>
       <main>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/country/:id' element={<CountryPage/>} />
          </Routes>
       </main>
      </Router>
    </AppProvider>
  );
}

export default App;
