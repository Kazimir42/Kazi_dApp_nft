import ButtonAdmin from "./ButtonAdmin";

function ContractUpdateButton(props){

    return (
        <div className="my-12">
            <h3 className="text-3xl font-black text-white mb-2">{props.title}</h3>
            <p className="text-white text-xl mb-2">
                {props.description}
            </p>
            <div className="flex flex-row items-baseline gap-2">
                {props.buttonTitle ?
                    <ButtonAdmin title={props.buttonTitle} onClick={props.onClick} />
                    :
                    <span></span>
                }
                {props.buttonTitle2 ?
                    <ButtonAdmin title={props.buttonTitle2} onClick={props.onClick2} />
                    :
                    <span></span>
                }
            </div>
        </div>
    );

}export default ContractUpdateButton;