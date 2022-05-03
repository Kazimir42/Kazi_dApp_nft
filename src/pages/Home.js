import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect} from "react";
import StepButton from "../components/StepButton";
import ExampleNtf from "../components/ExampleNtf";
import TeamContainer from "../components/TeamContainer";
import ButtonExternal from "../components/ButtonExternal";
import RoadmapContainer from "../components/RoadmapContainer";
import FaqContainer from "../components/FaqContainer";
import FeaturesContainer from "../components/FeaturesContainer";


function Home() {

    useEffect(() => {
    }, [])

    return (
        <div className="">

            <section id="home" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-64">
                    <h1 className="text-6xl font-black text-big-content-color text-center uppercase mb-16 leading-tight px-32">Lorem
                        ipsum dolor sit amet cursus, consectetur adipiscing elit.</h1>
                    <StepButton/>
                </div>
            </section>

            <section id="intro" className="bg-background">
                <div className="small-container mx-auto grid grid-cols-2 pt-32 pb-36 gap-12">

                    <div>
                        <ExampleNtf image='nft.gif' class="ml-auto w-full"/>
                    </div>

                    <div className="col-span-1 my-auto">
                        <h2 className="text-5xl font-black text-big-content-color leading-tight uppercase mb-12">ABOUT THE <span
                            className="text-primary">Artist</span></h2>

                        <div className="text-content-color text-xl mb-8">

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas
                                id
                                nibh pretium, cursus ligula a, sollicitudin est.
                            </p>
                            <p className="mb-4">
                                Quisque facilisis egestas ex, a varius
                                justo efficitur ut. Sed vehicula eleifend mauris, sed facilisis velit imperdiet ac. Ut
                                venenatis neque vel mi ornare rhoncus. Integer id sapien est. Duis elementum justo quis
                                erat
                                molestie efficitur.
                            </p>
                            <p>
                                Suspendisse sit amet nibh posuere enim accumsan fringilla. Morbi a lectus tristique,
                                sodales
                                mi ultricies, vestibulum dolor.
                            </p>

                        </div>
                    </div>

                </div>
            </section>

            <section id="collection">
                <ExampleNtfContainer/>
            </section>


            <section id="community" className="bg-background" >

                <div className="container mx-auto grid grid-cols-3 pt-32 pb-32 gap-4">
                    <ExampleNtf image='3.png' class="mr-auto col-span-1"/>
                    <div className="col-span-2 my-auto">
                        <h2 className="text-5xl font-black text-big-content-color leading-tight uppercase mb-12">A large <span
                            className="text-primary">Community</span></h2>

                        <div className="text-content-color text-xl">

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas
                                id
                                nibh pretium, cursus ligula a, sollicitudin est.
                            </p>

                            <p className="mb-4">
                                Quisque facilisis egestas ex, a varius
                                justo efficitur ut. Sed vehicula eleifend mauris, sed facilisis velit imperdiet ac. Ut
                                venenatis neque vel mi ornare rhoncus. Integer id sapien est. Duis elementum justo quis
                                erat
                                molestie efficitur.
                            </p>

                            <p className="mb-8">
                                Suspendisse sit amet nibh posuere enim accumsan fringilla. Morbi a lectus tristique,
                                sodales
                                mi ultricies, vestibulum dolor. Donec ipsum sem, laoreet eu sagittis eget, pretium et
                                erat.
                                Sed placerat tellus id pulvinar rhoncus.
                            </p>
                            <ButtonExternal title="Discord" where="https://google.fr/"/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="bg-background" style={{backgroundImage: "url(/svg/tic-tac-toe.svg)"}}>
                <FeaturesContainer />
            </section>

            <section id="roadmap" className="pt-16 bg-background">
                <RoadmapContainer />
            </section>

            <section id="separator" className="h-96" style={{backgroundImage: 'url(./images/background.jpg)'}}/>

            <section id="team" className="bg-background">
                <TeamContainer/>
            </section>

            <section id="faq" className="bg-background" style={{backgroundImage: "url(/svg/tic-tac-toe.svg)"}}>
                <FaqContainer />
            </section>


        </div>
    )
}

export default Home;