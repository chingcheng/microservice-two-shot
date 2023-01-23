function ShoesList(props) {
    const deleteShoe = async (shoe) => {
        const shoesUrl = `http://localhost:8080/api/shoes/${shoe.id}/`
        const fetchConfig = {method: "delete"}
        const response = await fetch(shoesUrl, fetchConfig)
        if (response.ok) {
            props.getShoes()
        }
    }

    if (props.shoes === undefined) {
        return null;
    }

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Manufacturer</th>
                <th>Model Name</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Closet Name</th>
                <th>Bin Number</th>
            </tr>
            </thead>
            <tbody>
            {props.shoes.map(shoe => {
                return (
                <tr key={shoe.id}>
                    <td>{ shoe.manufacturer }</td>
                    <td>{ shoe.model_name }</td>
                    <td>{ shoe.color }</td>
                    <td>
                        <img
                            src={shoe.picture_url}
                            alt=""
                            width="75px"
                            height="75px"
                        />
                    </td>
                    <td>{ shoe.bin.closet_name }</td>
                    <td>{ shoe.bin.bin_number }</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => deleteShoe(shoe)}>Delete</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}
export default ShoesList;
