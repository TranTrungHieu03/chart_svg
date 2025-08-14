import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";


const RedisCloneUi = () => {
    return <div className={'h-screen w-full bg-white text-black  '}>
        <Header/>
        <main className={'flex flex-col   relative bg-white' }>
            <div className={'flex mx-4 pt-10 gap-10 h-full'}>
                <div className={'w-96 h-fit top-[110px] sticky'}>
                    <Sidebar/>
                </div>
                <div className={'flex grow overflow-y-auto bg-amber-50 text-black h-[1200px] items-end '}>Content</div>
                <div className={'w-80 h-fit top-[110px]  sticky flex flex-col font-mono '}>
                    <div className={'text-sm text-gray-600 '}>Edit this page</div>
                    <div className={'text-sm text-gray-600 '}>Create an issue</div>
                    <div className={'text-sm text-gray-900 '}>On this page</div>
                </div>
            </div>

        </main>
        <footer id={'footer'} className={'w-full min-h-96 bg-blue-300 '}>footer</footer>
    </div>
}
export default RedisCloneUi