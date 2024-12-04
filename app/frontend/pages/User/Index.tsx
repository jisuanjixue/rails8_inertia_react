
import { Tabs } from "@/components/ui/tabs";
import DefaultLayout from "../DefaultLayout";

const UserSetting = () => {
    const tabs = [
        {
            title: "Product",
            value: "product",
            content: (
                <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Product Tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Services",
            value: "services",
            content: (
                <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Services tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Playground",
            value: "playground",
            content: (
                <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Playground tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Content",
            value: "content",
            content: (
                <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Content tab</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Random",
            value: "random",
            content: (
                <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Random tab</p>
                    <DummyContent />
                </div>
            ),
        },
    ];

    return (
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start my-20">
                <Tabs tabs={tabs}  />
        </div>
    );
}

UserSetting.layout = (page: any) => <DefaultLayout children={page} />
export default UserSetting;

const DummyContent = () => {
    return (
        <div
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
