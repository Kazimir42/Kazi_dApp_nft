import ButtonAdmin from "./ButtonAdmin";

function ContractUpdate(props){

    return (
        <div className="my-12">
            <h3 className="text-3xl font-black text-white mb-2">{props.title}</h3>
            <p className="text-white text-xl mb-2">
                {props.description}
            </p>
            <div className="flex flex-row items-baseline">
                <input id={props.id} type={props.type} className={"text-xl rounded-sm w-full mr-2 px-6 py-3 " + props.inputClass} placeholder={props.placeholder} onChange={props.onChange} />
                <ButtonAdmin title={props.buttonTitle} onClick={props.onClick} />
            </div>
        </div>
    );

}export default ContractUpdate;