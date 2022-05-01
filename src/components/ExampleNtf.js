

function ExampleNtf(props) {
    return (
        <img src={'/examples/' + props.image} className={'rounded-sm border-black col-span-2 ' + props.class} />
    )
}export default ExampleNtf;