function RoadmapElement(props) {
    return (
        <li className="mb-20 ml-8 ">
            <span className="flex absolute mt-2 -left-4 justify-center items-center w-7 h-7 rounded-full ring-8 ring-primary bg-primary">
            </span>
            <h3 className="flex items-center mb-1 text-big-content-color text-4xl font-black text-big-content text-center">
                {props.title}
            </h3>
            <time
                className="block mb-2 text-lg text-gray-500">
                {props.date}
            </time>
            <p className="mb-4 text-xl text-content-color">
                {props.description}
            </p>
        </li>

    )
}export default RoadmapElement;