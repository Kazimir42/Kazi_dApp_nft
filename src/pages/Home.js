import ExampleNtfContainer from "../components/ExampleNtfContainer";
import {useEffect} from "react";
import StepButton from "../components/StepButton";
import ExampleNtf from "../components/ExampleNtf";
import TeamContainer from "../components/TeamContainer";
import Member from "../components/Member";


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

            <section id="first" className="min-h-screen" style={{backgroundImage: 'url(./images/background.jpg)'}}>
                <div className="container mx-auto pt-64">
                    <h1 className="text-6xl font-black text-white text-center uppercase mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                    <StepButton position="center"/>
                </div>
            </section>

            <section id="second" className="bg-neutral-900">
                <div className="container mx-auto grid grid-cols-2 py-32 gap-4">
                    <div>
                        <h2 className="text-5xl font-black text-white uppercase mb-8">Lorem ipsum dolor sit amet.</h2>

                        <div className="text-white text-lg font-light">

                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id
                                nibh pretium, cursus ligula a, sollicitudin est. Quisque facilisis egestas ex, a varius
                                justo efficitur ut. Sed vehicula eleifend mauris, sed facilisis velit imperdiet ac. Ut
                                venenatis neque vel mi ornare rhoncus. Integer id sapien est. Duis elementum justo quis erat
                                molestie efficitur.
                            </p>

                            <p>
                                Suspendisse sit amet nibh posuere enim accumsan fringilla. Morbi a lectus tristique, sodales
                                mi ultricies, vestibulum dolor. Donec ipsum sem, laoreet eu sagittis eget, pretium et erat.
                                Sed placerat tellus id pulvinar rhoncus. Ut neque metus, finibus eget facilisis quis,
                                ullamcorper sed velit. Donec porttitor consectetur faucibus. Curabitur id massa non erat
                                pharetra pulvinar vel eget lorem. Sed orci dui, faucibus at vulputate ut, tempor ut est.
                            </p>

                        </div>
                    </div>
                    <div>
                        <ExampleNtf image={3} />
                    </div>
                </div>
            </section>

            <section id="third" className="bg-neutral-900">
                <div className="container mx-auto py-32 gap-4">
                    <h2 className="text-5xl font-black text-white text-center uppercase mb-8">Roadmap</h2>
                </div>
            </section>

            <section id="fourth" className="bg-neutral-900">
                <div className="container mx-auto py-32 gap-4">
                    <h2 className="text-5xl font-black text-white text-center uppercase mb-16">Team</h2>
                    <TeamContainer />

                </div>
            </section>

            <section id="fifth">
                <ExampleNtfContainer/>
            </section>

        </div>
    )
}

export default Home;