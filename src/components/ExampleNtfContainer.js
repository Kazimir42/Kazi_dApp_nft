import ExampleNtf from "./ExampleNtf";
import Glide from '@glidejs/glide'
import {useEffect} from "react";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import { Autoplay } from '@glidejs/glide/dist/glide.modular.esm'


function ExampleNtfContainer() {

    useEffect(() => {

        new Glide(".glide", {
            perView: 4,
            type: "carousel",
            autoplay: 3000
        }).mount({ Autoplay });

    }, [])


    return (
        <div className="glide">
            <div className="" data-glide-el="controls">
                <svg data-glide-dir="<" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 absolute left-4 top-1/2 z-10" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
            </div>
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    <ExampleNtf image="4.png" class="glide__slide" />
                    <ExampleNtf image="2.png" class="glide__slide" />
                    <ExampleNtf image="98.png" class="glide__slide" />
                    <ExampleNtf image="1.png" class="glide__slide" />
                </ul>
            </div>
            <div className="" data-glide-el="controls">
                <svg data-glide-dir=">" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 absolute text-background right-4 top-1/2 z-10" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
            </div>
        </div>
    )
}export default ExampleNtfContainer;