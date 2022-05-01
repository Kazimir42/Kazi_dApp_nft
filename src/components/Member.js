function Member(props) {
    return (
        <div className="col-span-2">
            <img src={'/examples/' + props.image} className="rounded-sm" />
            <h3 className="text-3xl font-black text-big-content-color text-center mt-4">{props.name}</h3>
            <h4 className="text-2xl font-bold text-primary text-center">{props.position}</h4>

        </div>

    )
}export default Member;