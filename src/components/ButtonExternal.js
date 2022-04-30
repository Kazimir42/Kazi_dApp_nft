
function ButtonExternal(props) {

    return <a
        className="h-fit shadow-md rounded-sm font-semibold block px-8 py-5 block bg-primary hover:bg-dark-primary transition duration-200 text-xl text-white w-fit text-center mb-1"
        target="_blank" href={props.where}>{props.title}</a>
}
export default ButtonExternal;