function FaqElement(props) {
    return (

        <div>
            <h3 className="mb-2 text-2xl lg:text-3xl font-bold tracking-tight text-big-content-color">{props.title}</h3>
            <p className="mb-3 font-normal text-xl text-content-color">{props.description}</p>
        </div>
    )
}export default FaqElement;