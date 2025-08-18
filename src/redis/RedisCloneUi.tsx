import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {useState} from "react";


const RedisCloneUi = () => {
    const [isMinSidebar, setIsMinSidebar] = useState(false)

    return <div className={'min-h-screen  w-full bg-white text-black '}>
        <Header/>
        <main className={'flex flex-col relative bg-white'}>
            <div className={'flex mx-4 pt-10 gap-10 '}>
                <div className={'w-96 h-fit'}>
                    <Sidebar isMinSidebar={isMinSidebar} setIsMinSidebar={() => setIsMinSidebar(!isMinSidebar)}/>
                </div>
                <div className={'flex grow overflow-y-auto bg-amber-50 text-black h-[1600px] items-end   '}>
                    <div>Content</div>
                    <div className={`${isMinSidebar ? 'h-[600px]' : 'h-0'}`}></div>
                </div>
                <div className={'w-80 h-fit'}>
                    <div className={'w-80 top-[110px]   fixed flex flex-col font-mono '}>
                        <div className={'text-sm text-gray-600 '}>Edit this page</div>
                        <div className={'text-sm text-gray-600 '}>Create an issue</div>
                        <div className={'text-sm text-gray-900 '}>On this page</div>
                    </div>
                </div>
            </div>
        </main>
        <footer
            className={`w-full flex  min-h-[800px] bg-blue-300  items-end  relative  
            `}>footer
        </footer>
    </div>
}
export default RedisCloneUi