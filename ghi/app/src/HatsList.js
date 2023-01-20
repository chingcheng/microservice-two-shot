function HatsList(props) {
    const deleteHat = async (hat) => {
        const hatUrl = `http://localhost:8090/api/hats/${hat.id}/`
        const fetchConfig = {method: "delete"}
        const response = await fetch(hatUrl, fetchConfig)
        if (response.ok) {
            props.getHats()
        }
    }

    if (props.hats === undefined) {
        return null
    }

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Fabric</th>
                <th>Style Name</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Location</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {props.hats.map(hat => {
                console.log(hat);
                return (
                <tr key={hat.id}>
                    <td>{ hat.fabric }</td>
                    <td>{ hat.style_name }</td>
                    <td>{ hat.color }</td>
                    <td>
                        <img
                            src={hat.picture}
                            alt=""
                            width="75px"
                            height="75px"
                        />
                    </td>
                    <td>{ hat.location }</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => deleteHat(hat)}>
                        Delete
                        </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default HatsList;
