import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HatsList from './HatsList';
import HatForm from './HatForm';
import MainPage from './MainPage';
import ShoeForm from './ShoeForm';
import ShoesList from './ShoesList';
import Nav from './Nav';
import { useEffect , useState } from 'react';

function App(props) {
  const [hats, setHats] = useState([])
  const [shoes, setShoes] = useState([])

  const getHats = async () => {
    const hatUrl = 'http://localhost:8090/api/hats'
    const hatResponse = await fetch(hatUrl)

    if (hatResponse.ok) {
      const data = await hatResponse.json()
      const hats = data.hats
      setHats(hats)
    }
  }
  const getShoes = async () => {
    const shoesURL = 'http://localhost:8080/api/shoes'
    const shoesResponse = await fetch(shoesURL)

    if (shoesResponse.ok) {
      const shoesData = await shoesResponse.json()
      const shoes = shoesData.shoes
      setShoes(shoes)
    }
  }

  useEffect(() => {
    getHats();
    getShoes();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList shoes={shoes} getShoes={getShoes} />} />
            <Route path="new" element={<ShoeForm getShoes={getShoes} />} />
          </Route>
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
