import ExampleNtf from "./ExampleNtf";


function ExampleNtfContainer() {
    return (
        <div className="grid grid-cols-8 gap-8 bg-background">
            <ExampleNtf image="4.png" class="w-full col-span-2" />
            <ExampleNtf image="2.png" class="w-full col-span-2" />
            <ExampleNtf image="98.png" class="w-full col-span-2" />
            <ExampleNtf image="1.png" class="w-full col-span-2" />
        </div>
    )
}export default ExampleNtfContainer;