import Card from "./Card";

function FeaturesContainer() {
    return (
        <div className="container mx-auto py-16 gap-4">
            <h2 className="text-5xl font-black text-big-content-color text-center uppercase mb-16">THE <span className="text-primary">FEATURES</span></h2>

            <div className="flex flex-row gap-8">
                <Card image="images/background.jpg" title="One feature" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla." />
                <Card image="images/background.jpg" title="One feature" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla." />
                <Card image="images/background.jpg" title="One feature" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla." />
            </div>
        </div>
    )
}export default FeaturesContainer;