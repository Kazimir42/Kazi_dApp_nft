
function ButtonAdmin(props) {

    return <button onClick={props.onClick} className={"h-fit shadow-md rounded-sm font-semibold inline px-6 py-3 block bg-primary cursor-pointeur hover:bg-dark-primary transition duration-200 text-xl cursor-pointer text-white w-fit text-center mb-1 " + props.class}>{props.title}</button>
}
export default ButtonAdmin;