
function ButtonExternal(props) {

    return <a onClick={props.onClick}
        className={"h-fit shadow-md rounded-sm font-semibold block px-8 py-5 block bg-primary cursor-pointeur hover:bg-dark-primary transition duration-200 text-xl cursor-pointer text-white w-fit text-center mb-1 " + props.class}
        target="_blank" href={props.where}>{props.title}</a>
}
export default ButtonExternal;