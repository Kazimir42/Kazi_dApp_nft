import ExampleNtf from "./ExampleNtf";


function ExampleNtfContainer() {
    return (
        <div className="border border-black grid grid-cols-10">
            <ExampleNtf image={4} />
            <ExampleNtf image={2} />
            <ExampleNtf image={98} />
            <ExampleNtf image={1} />
            <ExampleNtf image={99} />
        </div>
    )
}export default ExampleNtfContainer;