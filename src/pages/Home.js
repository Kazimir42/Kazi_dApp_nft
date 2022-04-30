import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect} from "react";
import StepButton from "../components/StepButton";
import ExampleNtf from "../components/ExampleNtf";
import TeamContainer from "../components/TeamContainer";
import Member from "../components/Member";
import ButtonExternal from "../components/ButtonExternal";


function Home() {

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        if (typeof window.ethereum !== 'undefined') {
            let chainId = await window.ethereum.request({method: 'eth_chainId'})
            if (chainId === "0x1" || chainId === "0x3" || chainId === "0x4" || chainId === "0x5" || chainId === "0x2a" || chainId === "0x539") {

            }
        }
    }


    return (
        <div className="">

            <section id="home" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-64">
                    <h1 className="text-6xl font-black text-white text-center uppercase mb-16 leading-tight px-32">Lorem ipsum dolor sit amet cursus, consectetur adipiscing elit.</h1>
                    <StepButton />
                </div>
            </section>

            <section id="intro" className="bg-background">
                <div className="container mx-auto grid grid-cols-3 pb-20 pt-32 gap-4">
                    <div className="col-span-2 my-auto">
                        <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">A big <span className="text-primary">community</span></h2>

                        <div className="text-white text-xl mb-8">

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id
                                nibh pretium, cursus ligula a, sollicitudin est.
                            </p>

                            <p className="mb-4">
                                Quisque facilisis egestas ex, a varius
                                justo efficitur ut. Sed vehicula eleifend mauris, sed facilisis velit imperdiet ac. Ut
                                venenatis neque vel mi ornare rhoncus. Integer id sapien est. Duis elementum justo quis erat
                                molestie efficitur.
                            </p>

                            <p>
                                Suspendisse sit amet nibh posuere enim accumsan fringilla. Morbi a lectus tristique, sodales
                                mi ultricies, vestibulum dolor. Donec ipsum sem, laoreet eu sagittis eget, pretium et erat.
                                Sed placerat tellus id pulvinar rhoncus.
                            </p>

                        </div>
                        <ButtonExternal title="Discord" where="https://google.fr/" />
                    </div>
                    <div>
                        <ExampleNtf image={3} class="ml-auto" />
                    </div>
                </div>
                <div className="container mx-auto grid grid-cols-3 pt-20 pb-32 gap-4">
                    <div>
                        <ExampleNtf image={3} class="mr-auto" />
                    </div>
                    <div className="col-span-2 my-auto">
                        <h2 className="text-5xl font-black text-white leading-tight uppercase mb-12">Why should I buy <span className="text-primary">Character</span> ?</h2>

                        <div className="text-white text-xl ">

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id
                                nibh pretium, cursus ligula a, sollicitudin est.
                            </p>

                            <p className="mb-4">
                                Quisque facilisis egestas ex, a varius
                                justo efficitur ut. Sed vehicula eleifend mauris, sed facilisis velit imperdiet ac. Ut
                                venenatis neque vel mi ornare rhoncus. Integer id sapien est. Duis elementum justo quis erat
                                molestie efficitur.
                            </p>

                            <p>
                                Suspendisse sit amet nibh posuere enim accumsan fringilla. Morbi a lectus tristique, sodales
                                mi ultricies, vestibulum dolor. Donec ipsum sem, laoreet eu sagittis eget, pretium et erat.
                                Sed placerat tellus id pulvinar rhoncus.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            <section id="collection">
                <ExampleNtfContainer/>
            </section>

            <section id="third" className="bg-background">
                <div className="container mx-auto py-32 gap-4">
                    <h2 className="text-5xl font-black text-white text-center uppercase mb-8">Road<span className="text-primary">map</span></h2>
                    <div className="mt-32">
                        <p className="text-xl font-bold text-white text-center">February - March 22’</p>
                        <h3 className="text-4xl font-black text-primary text-center">Phase 1 - The title</h3>
                        <p className="text-white text-center text-xl mt-8">
                            Lorem ipsum dolor sit amet.<br />
                            Consectetur adipiscing elit.<br />
                            Donec ac rutrum orci.<br />
                            Maecenas id nibh pretium.
                        </p>
                    </div>
                    <div className="mt-32">
                        <p className="text-xl font-bold text-white text-center">February - March 22’</p>
                        <h3 className="text-4xl font-black text-primary text-center">Phase 2 - The title</h3>
                        <p className="text-white text-center text-xl mt-8">
                            Lorem ipsum dolor sit amet.<br />
                            Consectetur adipiscing elit.<br />
                            Donec ac rutrum orci.<br />
                            Maecenas id nibh pretium.
                        </p>
                    </div>
                    <div className="mt-32">
                        <p className="text-xl font-bold text-white text-center">February - March 22’</p>
                        <h3 className="text-4xl font-black text-primary text-center">Phase 3 - The title</h3>
                        <p className="text-white text-center text-xl mt-8">
                            Lorem ipsum dolor sit amet.<br />
                            Consectetur adipiscing elit.<br />
                            Donec ac rutrum orci.<br />
                            Maecenas id nibh pretium.
                        </p>
                    </div>
                </div>
            </section>

            <section id="separator" className="h-96" style={{backgroundImage: 'url(./images/background.jpg)'}}> </section>

            <section id="fourth" className="bg-background">
                <div className="container mx-auto py-32 gap-4">
                    <h2 className="text-5xl font-black text-white text-center uppercase mb-16">The <span className="text-primary">Team</span></h2>
                    <TeamContainer />
                </div>
            </section>



        </div>
    )
}

export default Home;