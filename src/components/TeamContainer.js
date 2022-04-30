import Member from "./Member";


function TeamContainer() {
    return (
        <div className="grid grid-cols-8 gap-20">
            <Member image={4} name="Kazimir42" position="Dev dApp"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
            <Member image={2} name="Kazimir42" position="Dev dApp"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
            <Member image={98} name="Kazimir42" position="Dev dApp"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
            <Member image={1} name="Kazimir42" position="Dev dApp"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac rutrum orci. Maecenas id nibh pretium."/>
        </div>
    )
}
export default TeamContainer;