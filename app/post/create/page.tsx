'use client'
import dynamic from "next/dynamic"
import EditableTitleBox from "@/components/EditableTitleBox";
import {useState} from "react";
import FloatingActionButton from "@/components/FloatingActionButton";
const InitializeMDXEditor = dynamic(
    () => import("@/components/InitializeMDXEditor").then((mod) => mod.default),
    { ssr: false }
);


function HomePage() {
    const markdown = `
    Hello **world**!
    `
    const [editable, setEditable] = useState(true);
    const [title, setTitle] = useState('Title Box');
    return (
        <div className={"h-full w-full"}>
            <EditableTitleBox
                editable={editable}
                title={title}
                onChange={(value) => setTitle(value)}
            />
            <InitializeMDXEditor markdown={markdown}/>
            <FloatingActionButton
                onAdd={() => {
                    console.log('on add')
                }}
            />
        </div>
    );
}

export default HomePage;