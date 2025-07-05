import './App.css'

import LineChartCustom from "./LineChartCustom.tsx";


function App() {


    return <div className={'grid grid-cols-12 justify-center items-start bg-white text-black h-screen w-screen '}>
        <div className={'col-span-4 w-full h-screen'}></div>
        <div className={'col-span-4 w-full h-screen'}></div>
        <div className={'col-span-4   items-center justify-center flex'}>
            <LineChartCustom velocity={1031.7} peakX={0.3} time={2.7} durationPeak={2.1}/>
        </div>

        {/*<div className={'col-span-4  items-center self-center '}>*/}
        {/*    <LineChart velocity={931.7} peakX={0.3} time={2.4} durationPeak={1.8}*/}

        {/*    />*/}
        {/*</div>*/}
    </div>
        ;
}

export default App
