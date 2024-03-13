
function Alerts(props) {
    return (
        <div className="alert alert-danger alert-dismissible" role="alert">
            <div>{props.erros}</div>
        </div>
    )
}

export default Alerts;