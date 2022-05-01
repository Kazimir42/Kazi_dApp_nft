import RoadmapElement from "./RoadmapElement";


function RoadmapContainer() {
    return (
        <div className="small-container mx-auto pb-20">
            <h2 className="text-5xl font-black text-big-content-color text-center uppercase mb-32">The <span className="text-primary">ROADMAP</span></h2>

            <ol className="relative border-l-4 border-dark-primary">
                <RoadmapElement key={0} title="Phase 1 - The title" date="February - March 22’" description={["Lorem ipsum dolor sit amet. Consectetur adipiscing elit." , <br /> , " Donec ac rutrum orci. Maecenas id nibh pretium.", <br /> , "Lorem ipsum dolor sit amet, consectetur adipiscing elit."]} />
                <RoadmapElement key={1} title="Phase 2 - The title" date="February - March 22’" description={["Lorem ipsum dolor sit amet. Consectetur adipiscing elit." , <br /> , " Donec ac rutrum orci. Maecenas id nibh pretium.", <br /> , "Lorem ipsum dolor sit amet, consectetur adipiscing elit."]} />
                <RoadmapElement key={2} title="Phase 3 - The title" date="February - March 22’" description={["Lorem ipsum dolor sit amet. Consectetur adipiscing elit." , <br /> , " Donec ac rutrum orci. Maecenas id nibh pretium.", <br /> , "Lorem ipsum dolor sit amet, consectetur adipiscing elit."]} />
            </ol>
        </div>
    )
}
export default RoadmapContainer;