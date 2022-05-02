import FaqElement from "./FaqElement";

function FaqContainer() {
    return (
        <div className="small-container mx-auto pt-16 pb-32 gap-4">
            <h2 className="text-5xl font-black text-big-content-color text-center uppercase mb-16">FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span></h2>
            <div className="flex flex-col gap-10">
                <FaqElement title="ame i a question ?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla. Nunc elit lorem, tincidunt vel tortor nec, ultricies euismod dui. Curabitur eu mauris dictum, varius tortor vel, placerat dui." />
                <FaqElement title="ame i a question ?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla. Nunc elit lorem, tincidunt vel tortor nec, ultricies euismod dui. Curabitur eu mauris dictum, varius tortor vel, placerat dui." />
                <FaqElement title="ame i a question ?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla. Nunc elit lorem, tincidunt vel tortor nec, ultricies euismod dui. Curabitur eu mauris dictum, varius tortor vel, placerat dui." />
                <FaqElement title="ame i a question ?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla. Nunc elit lorem, tincidunt vel tortor nec, ultricies euismod dui. Curabitur eu mauris dictum, varius tortor vel, placerat dui." />
                <FaqElement title="ame i a question ?" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ullamcorper nibh. Aliquam id eleifend nulla. Nunc elit lorem, tincidunt vel tortor nec, ultricies euismod dui. Curabitur eu mauris dictum, varius tortor vel, placerat dui." />
            </div>
        </div>
    )
}export default FaqContainer;