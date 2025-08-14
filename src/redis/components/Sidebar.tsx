import {useEffect, useState} from "react";

const Sidebar = () => {
    const [indexShow, setIndexShow] = useState(0);
    const [indexShow2, setIndexShow2] = useState(0);
    const [indexShow3, setIndexShow3] = useState(0);
    const [sidebarHeight, setSidebarHeight] = useState(500)


    function adjustHeight() {
        const footer = document.querySelector('footer');

        // if (!footer) {
        //     setSidebarHeight(window.innerHeight - 110);
        //     return;
        // }

        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const footerTop = footer?.offsetTop;
        console.log(footerTop)
        const height = viewportHeight - (footerTop ?? 0) - scrollY - 110
        setSidebarHeight(height);
    }

    console.log(sidebarHeight)
    useEffect(() => {
        window.addEventListener('scroll', adjustHeight)
        adjustHeight()
        return () => {
            window.removeEventListener('scroll', adjustHeight);
        }
    }, [])
    return <div className={' pb-5 flex flex-col gap-4 font-mono  min-h-[400px]'} style={{
        height: `${sidebarHeight}px`,
    }}>
        <div className={'min-h-[200px] border rounded-md border-gray-500 *:text-lg  flex flex-col '}>
            <div
                className={` hover:bg-gray-200 duration-100  border-b  cursor-pointer border-b-gray-500 p-5 ${indexShow === 1 ? 'font-semibold' : 'font-normal'}`}
                onClick={() => setIndexShow(1)}
            >Develop with Redis
            </div>
            {(indexShow === 1) && < div id={'sidebar'}
                                        className={'h-fit overflow-y-auto pb-5 border-b border-b-gray-500 snap-start duration-100'}
            >
                <div className={' mx-5 mt-4'}>
                    <p className={' cursor-pointer  hover:text-gray-600 duration-100'}
                       onClick={() => setIndexShow2(1)}>
                        What's new?
                    </p>
                    {
                        indexShow2 === 1 &&
                        <div className={'border-l-4  mt-5 '}>
                            <div className={'flex flex-col gap-2 *:pl-4'}>
                                <div className={' relative group cursor-pointer'}
                                     onClick={() => setIndexShow3(1)}>
                                    <div
                                        className={`absolute    w-1 h-full  -left-1 rounded-full ${indexShow3 == 1 ? 'bg-gray-900' : 'bg-transparent'}`}></div>
                                    <p className={' line-clamp-2 group-hover:text-gray-600'}> What is Redis?
                                        What is
                                        Redis? What is Redis? What is Redis? What is Redis? What is Redis?</p>
                                </div>
                                <div className={' relative group cursor-pointer'}
                                     onClick={() => setIndexShow3(2)}>
                                    <div
                                        className={`absolute  w-1 h-full  -left-1 rounded-full ${indexShow3 == 2 ? 'bg-gray-900' : 'bg-transparent'}`}></div>
                                    <p className={' line-clamp-2 group-hover:text-gray-600'}> What is Redis?
                                        What is
                                        Redis? </p>
                                </div>
                                <div className={'  relative group cursor-pointer'}
                                     onClick={() => setIndexShow3(3)}>
                                    <div
                                        className={`absolute w-1 h-full  -left-1 rounded-full ${indexShow3 == 3 ? 'bg-gray-900' : 'bg-transparent'}`}></div>
                                    <p className={' line-clamp-2 group-hover:text-gray-600'}> What is Redis?
                                        What is
                                        Redis?</p>
                                </div>


                            </div>
                        </div>
                    }</div>


                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100'}
                     onClick={() => setIndexShow2(2)}>Quick starts
                </div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100'}>Client tools</div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100'}>Client APIs</div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>What's new?</div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Quick starts
                </div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Client tools
                </div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Client APIs</div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Quick starts
                </div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Client tools
                </div>
                <div className={' mx-5 mt-4 cursor-pointer hover:text-gray-600 duration-100 '}>Client tools
                </div>
            </div>}

            <div
                className={'hover:bg-gray-200  duration-100  border-b  cursor-pointer border-b-gray-500 p-5  ' }
                onClick={() => setIndexShow(2)}>Libraries
                and
                tools
            </div>
            <div
                className={'hover:bg-gray-200  duration-100 border-b-0  cursor-pointer p-5  '}>Redis
                products
            </div>
        </div>
        <div
            className={'border border-gray-500 duration-100 hover:bg-gray-200 cursor-pointer rounded-md p-5 text-red-500 text-lg '}>Commands
        </div>
    </div>

}

export default Sidebar;