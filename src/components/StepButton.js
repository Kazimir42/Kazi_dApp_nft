import {Link} from "react-router-dom";
import {useStepValue} from "../context/StepContext";


function StepButton(props) {
    const {currentStep} = useStepValue()

    switch (currentStep)
    {
        case 'Before':
            return <Link className="h-fit block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/whitelist'>Be whitelist</Link>
            break
        case 'Presale':
            return <Link className="h-fit block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/premint'>Premint</Link>
            break
        case 'Sale':
            return <Link className="h-fit block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to='/mint'>Mint</Link>
            break
        case 'SoldOut':
            return <Link className="h-fit block px-6 py-2 block bg-amber-600 text-lg text-white w-fit text-center mb-1" to=''>View on OpenSea</Link>
            break
    }
}
export default StepButton;