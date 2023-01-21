import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HatsList from './HatsList';
import HatForm from './HatForm';
import MainPage from './MainPage';
import Nav from './Nav';
import { useEffect , useState } from 'react';

function App(props) {
  const [hats, setHats] = useState([])

  const getHats = async () => {
    const hatUrl = 'http://localhost:8090/api/hats'
    const hatResponse = await fetch(hatUrl)

    if (hatResponse.ok) {
      const data = await hatResponse.json()
      const hats = data.hats
      setHats(hats)
    }
  }

  useEffect(() => {
    getHats();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats">
            <Route path="" element={<HatsList hats={hats} getHats={getHats} />} />
            <Route path="new" element={<HatForm getHats={getHats}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
