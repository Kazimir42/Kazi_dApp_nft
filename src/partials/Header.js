import {Link} from "react-router-dom";
import StepButton from "../components/StepButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faDiscord, faTwitter);


function Header() {

    return (
        <header className="py-4 px-8 absolute w-full">
            <div className="flex flex-row mx-auto container justify-between items-center">
                <Link to="/">
                    <img src="logo192.png" className="h-16" />
                </Link>
                <div className="flex flex-row items-center gap-8">
                    <div className="flex flex-row items-center gap-4">
                        <Link to="/">
                            <FontAwesomeIcon className="text-white h-8 duration-200 hover:mb-2" icon="fa-brands fa-twitter" />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon className="text-white h-8 duration-200 hover:mb-2" icon="fa-brands fa-discord" />
                        </Link>
                    </div>
                    <StepButton />
                </div>
            </div>
        </header>
    )
}export default Header;