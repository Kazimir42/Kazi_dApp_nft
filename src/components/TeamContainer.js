import Member from "./Member";


function TeamContainer() {
    return (
        <div className="container mx-auto py-16 lg:py-32 px-8 gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-big-content-color text-center uppercase mb-16">The <span className="text-primary">Team</span></h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 lg:gap-20">
                <Member image="4.png" name="Kazimir42" position="Dev dApp"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
                <Member image="2.png" name="Kazimir42" position="Dev dApp"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
                <Member image="98.png" name="Kazimir42" position="Dev dApp"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
                <Member image="1.png" name="Kazimir42" position="Dev dApp"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
            </div>
        </div>
    )
}
export default TeamContainer;