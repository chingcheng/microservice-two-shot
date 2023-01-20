function HatsList(props) {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Fabric</th>
                <th>Style Name</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Location</th>
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
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default HatsList;
