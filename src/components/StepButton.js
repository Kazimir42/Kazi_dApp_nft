import {Link} from "react-router-dom";
import {useStepValue} from "../context/StepContext";


function StepButton() {
    const {currentStep} = useStepValue()

    switch (currentStep)
    {
        case 'Before':
            return <Link className="h-fit shadow-md rounded-sm mx-auto font-semibold block px-8 py-5 block bg-primary hover:bg-dark-primary transition duration-200 text-xl text-white w-fit text-center mb-1" to='/whitelist'>Be Whitelist</Link>
            break
        case 'Presale':
            return <Link className="h-fit shadow-md rounded-sm mx-auto font-semibold block px-8 py-5 block bg-primary hover:bg-dark-primary transition duration-200 text-xl text-white w-fit text-center mb-1" to='/premint'>Premint</Link>
            break
        case 'Sale':
            return <Link className="h-fit shadow-md rounded-sm mx-auto font-semibold block px-8 py-5 block bg-primary hover:bg-dark-primary transition duration-200 text-xl text-white w-fit text-center mb-1" to='/mint'>Mint</Link>
            break
        case 'SoldOut':
            return <a className="h-fit shadow-md rounded-sm mx-auto font-semibold block px-8 py-5 block bg-primary hover:bg-dark-primary transition duration-200 text-xl text-white w-fit text-center mb-1" target="_blank" href='https://opensea.io/collection/collectibles'>View on OpenSea</a>
            break
    }
}
export default StepButton;