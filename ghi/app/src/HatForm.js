import React, { useEffect , useState } from 'react';

function HatForm() {
    const [fabric, setFabric] = useState('')
    const [styleName, setStyleName] = useState('')
    const [color, setColor] = useState('')
    const [picture, setPicture] = useState('')
    const [location, setLocation] = useState('')
    const [locations, setLocations] = useState([])

    const handleFabricChange = (event) => {
        const value = event.target.value
        setFabric(value)
    }

    const handleStyleNameChange = (event) => {
        const value = event.target.value
        setStyleName(value)
    }

    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }

    const handlePictureChange = (event) => {
        const value = event.target.value
        setPicture(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.fabric = fabric
        data.style_name = styleName
        data.color = color
        data.picture = picture
        data.location = location
        console.log(data)

        const hatURL='http://localhost:8090/api/hats/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(hatURL, fetchConfig);
        if (response.ok) {
            const newHat = await response.json()
            console.log(newHat)

            setFabric('')
            setStyleName('')
            setColor('')
            setPicture('')
            setLocation('')
        }
    }

    const fetchData = async() => {
    const url = 'http://localhost:8100/api/locations'
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        setLocations(data.locations)
    }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="my-5 container">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStyleNameChange} value={styleName} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control"/>
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureChange} value={picture} placeholder="Picture URL" required type="text" name="picture" id="picture" className="form-control"/>
                <label htmlFor="picture">Picture URL</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} value={location} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                    <option key={location.id} value={location.href}>
                        {location.closet_name}
                    </option>
                    );
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );


}

export default HatForm
