import './App.css'
import LineChartCustom from "./LineChartCustom.tsx";
import {useState} from "react";


function App() {
    const [velocity, setVelocity] = useState(0)
    const [peakX, setPeakX] = useState(0)
    const [downX, setDownX] = useState(0)
    const [durationPeak, setDurationPeak] = useState(0)

    return <div className={'flex justify-center items-center bg-white text-black  '}>
        <div className={'bg-blue-50 h-screen flex flex-col gap-4 *:p-4 p-4 max-w-[1300px] w-full'}>
            <input onChange={(e) => setVelocity(Number(e.target.value))} value={velocity} type="number"
                   placeholder={'Velocity'}/>
            <input onChange={(e) => setPeakX(Number(e.target.value))} value={peakX} type="number"
                   placeholder={'Peak X'}/>
            <input onChange={(e) => setDownX(Number(e.target.value))} value={downX} type="number" placeholder={'Time'}/>
            <input onChange={(e) => setDurationPeak(Number(e.target.value))} value={durationPeak} type="number"
                   placeholder={'Duration Peak'}/>

        </div>


            <LineChartCustom velocity={velocity} peakX={peakX } downX={downX} durationPeak={durationPeak}/>

        {/*<div className={' col-span-4 flex items-center justify-center  '}>*/}
        {/*    <LineChartCustom velocity={300.7} peakX={0.3} time={2.4} durationPeak={1.8}*/}

        {/*    />*/}
        {/*</div>*/}
    </div>
        ;
}

export default App
