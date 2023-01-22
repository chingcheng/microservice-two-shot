import React, { useEffect , useState } from 'react';

function ShoeForm(props){
    const [bins, setBins] = useState([])
    const [manufacturer, setManufacturer] = useState('')
    const [model_name, setModelName] = useState('')
    const [color, setColor] = useState('')
    const [picture, setPicture] = useState('')
    const [bin, setBin] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setModelName(value)
    }
    const handleManufacturer = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }
    const handleColor = (event) => {
        const value = event.target.value
        setColor(value)
    }
    const handlePicture = (event) => {
        const value = event.target.value
        setPicture(value)
    }
    const handleBin = (event) => {
        const value = event.target.value
        setBin(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.manufacturer = manufacturer
        data.model_name = model_name
        data.color = color
        data.picture_url = picture
        data.bin = bin

        const shoesURL='http://localhost:8080/api/shoes/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(shoesURL, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json()
            console.log(newShoe)
            setModelName('')
            setManufacturer('')
            setColor('')
            setPicture('')
            setBin('')
            props.getShoes()
        }
    }

    const fetchData = async() => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }
        useEffect(() => {
            fetchData();
        }, []);

    return (
        <div className="container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a shoe</h1>
                <form onSubmit={handleSubmit} id="create-shoe-form"> 
                    <div className="form-floating mb-3">
                    <input onChange={handleManufacturer} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={model_name} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                    <label htmlFor="model_name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleColor} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handlePicture} value={picture} placeholder="Picture" required type="url" name="picture" id="picture" className="form-control"/>
                    <label htmlFor="picture">Picture URL</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleBin} value={bin} required id="bin" name="bin" className="form-select">
                        <option value="">Choose a bin</option>
                        {bins.map(bin => {
                        return (
                        <option key={bin.id} value={bin.href}>
                            {bin.closet_name}
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
export default ShoeForm