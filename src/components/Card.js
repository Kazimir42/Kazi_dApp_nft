
function Card(props)
{
    return (
        <div className=" rounded-sm shadow-md  bg-light-background ">
            <img className="rounded-t-lg" src={props.image} alt=""/>
            <div className="p-5">
                <h3 className="mb-2 text-center text-3xl font-bold tracking-tight text-big-content-color">{props.title}</h3>
                <p className="mb-3 text-center font-normal text-xl text-content-color">
                    {props.description}
                </p>
            </div>
        </div>
    )

}export default Card;