import {LogoSvg} from "../icons/LogoSvg.tsx";
import SearchSvg from "../icons/SearchSvg.tsx";
import MenuBarSvg from "../icons/MenuBarSvg.tsx";
import {useState} from "react";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    return <header
        className={'sticky z-50 top-0 flex items-center lg:pl-11     px-4 lg:px-0 font-mono h-[70px] text-[17px]  bg-white border-b border-gray-400'}>

        <LogoSvg color={'#ff4438'} classContent={'w-[80px]'}/>
        <div className={'flex items-center grow mx-4  gap-6  h-full '}>
            <div
                className={'lg:flex  hidden group px-4 py-1 rounded-full border hover:border-red-500 cursor-pointer shrink-0 border-gray-500 '}>
                <span><img src={'star.svg'} alt={'logo'} color={'#fff'}/> </span>
                <span className={'group-hover:font-bold'}>Redis for AI</span>
            </div>
            <div
                className={'hidden lg:flex xl:gap-4 lg:gap-0 *:flex *:items-center *:justify-center *:gap-2 *:px-2 h-full *:font-medium  grow-0'}>
                <div className={' group cursor-pointer'}>
                    <span className={'group-hover:font-bold'}>Products</span>
                    <span className={'group-hover:rotate-180 transform transition duration-300'}>
                        <img src={'arrow_down.svg'} alt={'arrow_down'}/> </span>
                    <div
                        className={'hidden group-hover:flex absolute top-[70px] border border-gray-400  gap-10 ml-[80px]  bg-white z-50 cursor-auto'}>
                        <div className={'px-10 pt-8 pb-5 flex group-hover:grow items-center'}>
                            <div className={'flex flex-col max-w-80 gap-4'}>
                                <div
                                    className={'border-b uppercase text-gray-400 pb-2 text-[14px] font-normal'}>Products
                                </div>
                                <Item title={'Redis Cloud'}
                                      description={'Fully managed and integrated with Google Cloud, Azure, and AWS.'}/>
                                <Item title={'Redis Software'}
                                      description={'Self-managed software with enterprise-grade compliance and reliability.'}/>
                                <Item title={'Redis Open Source'}
                                      description={'In-memory database for caching & streaming.'}/>
                            </div>

                        </div>
                        <div className={'flex flex-col max-w-80  gap-4 pt-8 pb-5 bg-neutral-100'}>
                            <div className={'px-10 flex flex-col gap-4'}>
                                <div
                                    className={'border-b uppercase text-gray-400 pb-2 text-[14px] font-normal '}>Tools
                                </div>
                                <div className={'flex flex-col gap-4'}>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis LangCache</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis Insight</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis Data Integration</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Clients & Connectors</div>
                                </div>
                            </div>
                            <div className={'px-10 flex flex-col gap-2'}>
                                <div
                                    className={' uppercase text-gray-400 pb-2 text-[15px] font-normal '}>Get redis
                                </div>
                                <div
                                    className={'rounded-sm cursor-pointer duration-100 bg-red-600 hover:bg-red-900 text-white h-16 flex items-center justify-center font-semibold'}>Downloads
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={'  group cursor-pointer'}>
                    <span className={'group-hover:font-bold'}>Resources</span>
                    <span className={'group-hover:rotate-180 transform transition duration-300'}><img
                        src={'arrow_down.svg'}/> </span>
                    <div
                        className={'hidden group-hover:flex absolute z-50 top-[70px] border border-gray-400  gap-10 ml-[80px] bg-white'}>
                        <div className={' px-10 pt-8 pb-5 flex group-hover:grow items-center'}>
                            <div className={'flex flex-col max-w-80 gap-4 '}>
                                <div
                                    className={'border-b uppercase text-gray-400 pb-2 text-[14px] font-normal'}>Products
                                </div>
                                <Item title={'Redis Cloud'}
                                      description={'Fully managed and integrated with Google Cloud, Azure, and AWS.'}/>
                                <Item title={'Redis Software'}
                                      description={'Self-managed software with enterprise-grade compliance and reliability.'}/>
                                <Item title={'Redis Open Source'}
                                      description={'In-memory database for caching & streaming.'}/>
                            </div>

                        </div>
                        <div className={'flex flex-col max-w-80  gap-4 pt-8 pb-5 bg-neutral-100'}>
                            <div className={'px-10 flex flex-col gap-4'}>
                                <div
                                    className={'border-b uppercase text-gray-400 pb-2 text-[14px] font-normal   '}>Tools
                                </div>
                                <div className={'flex flex-col gap-4'}>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis LangCache</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis Insight</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Redis Data Integration</div>
                                    <div className={'font-semibold text-black/80 cursor-pointer'}>Clients & Connectors</div>
                                </div>
                            </div>
                            <div className={'px-10 flex flex-col gap-2'}>
                                <div
                                    className={' uppercase text-gray-400 pb-2 text-[15px] font-normal '}>Get redis
                                </div>
                                <div
                                    className={'rounded-sm bg-red-600 duration-100 hover:bg-red-900 text-white h-16 flex items-center justify-center font-semibold'}>Downloads
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={' hover:font-bold  cursor-pointer'}>Docs</div>
                <div className={' hover:font-bold  cursor-pointer'}>Pricing</div>
            </div>

        </div>
        <div className={'flex gap-4'}>
            <div  ><SearchSvg classContent={'h-full hover:text-red-600 mx-4 cursor-pointer'}/></div>
            <div onClick={toggleMenu}>
                <MenuBarSvg classContent={'h-full lg:hidden flex hover:text-red-600 cursor-pointer'}/>
            </div></div>

        <div
            className={'lg:flex gap-4 xl:gap-8 h-full *:flex *:items-center *:justify-center *:cursor-pointer  hidden max-md:flex-col'}>
            <div className={'hover:font-bold'}>Login</div>
            <div className={'hover:font-bold'}>Book a meeting</div>
            <button className={'bg-red-600 duration-100 hover:bg-red-900 text-lg font-bold px-5 text-white  '}>Try
                Redis
            </button>
        </div>
        {
            showMenu && <div className={'absolute top-[70px] left-0 w-full h-full bg-white'}>

            </div>
        }
    </header>
}
export default Header;
const Item = ({title, description}: { title: string, description?: string }) => {
    return <div className={'flex flex-col  pt-2'}>
        <div className={'font-semibold  cursor-pointer text-black/80'}>{title}</div>
        <div className={'text-sm   cursor-pointer text-gray-600'}>{description}
        </div>
    </div>
}