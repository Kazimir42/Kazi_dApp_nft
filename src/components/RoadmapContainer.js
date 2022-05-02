import RoadmapElement from "./RoadmapElement";


function RoadmapContainer() {
    return (
        <div className="small-container mx-auto pt-16 pb-16">
            <h2 className="text-5xl font-black text-big-content-color text-center uppercase mb-32">The <span className="text-primary">ROADMAP</span></h2>

            <ol className="relative border-l-4 border-dark-primary">
                <RoadmapElement key={0} title="Phase 1 - The title" date="February - March 22’" description={[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet euismod ligula tincidunt faucibus." ,
                    <br /> ,
                    "Ut rutrum fermentum justo, eget eleifend neque cursus eget. Nulla non feugiat diam.",
                    <br /> ,
                    "Nunc at aliquet mi. Maecenas vulputate lacus in felis elementum, quis aliquet lacus consequat. Nulla mi ligula, aliquet quis blandit et, fringilla at elit. Nam consequat accumsan dapibus."
                ]} />
                <RoadmapElement key={1} title="Phase 2 - The title" date="February - March 22’" description={[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet euismod ligula tincidunt faucibus." ,
                    <br /> ,
                    "Ut rutrum fermentum justo, eget eleifend neque cursus eget. Nulla non feugiat diam.",
                    <br /> ,
                    "Nunc at aliquet mi. Maecenas vulputate lacus in felis elementum, quis aliquet lacus consequat. Nulla mi ligula, aliquet quis blandit et, fringilla at elit. Nam consequat accumsan dapibus."
                ]} />
                <RoadmapElement key={2} title="Phase 3 - The title" date="February - March 22’" description={[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet euismod ligula tincidunt faucibus." ,
                    <br /> ,
                    "Ut rutrum fermentum justo, eget eleifend neque cursus eget. Nulla non feugiat diam.",
                    <br /> ,
                    "Nunc at aliquet mi. Maecenas vulputate lacus in felis elementum, quis aliquet lacus consequat. Nulla mi ligula, aliquet quis blandit et, fringilla at elit. Nam consequat accumsan dapibus."
                ]} />
            </ol>
        </div>
    )
}
export default RoadmapContainer;