

function Member(props) {
    return (
        <div className="col-span-2">
            <img src={'/examples/' + props.image + '.png'} className="" />
            <h3 className="text-4xl font-black text-white text-center uppercase mt-4">{props.name}</h3>
            <h4 className="text-2xl font-light text-white text-center">{props.position}</h4>
            <p className="text-white text-center text-lg mt-4">
                {props.description}
            </p>
        </div>

    )
}export default Member;