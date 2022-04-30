

function ExampleNtf(props) {
    return (
        <img src={'/examples/' + props.image + '.png'} className={'border border-black col-span-2 ' + props.class} />
    )
}export default ExampleNtf;