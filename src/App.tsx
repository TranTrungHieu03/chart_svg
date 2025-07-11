import './App.css'
import LineChartCustom from "./LineChartCustom.tsx";
import {useState} from "react";
import Split from '@uiw/react-split';
import LineChartCss from "./LineChartCss.tsx";

function App() {
    const [velocity, setVelocity] = useState(0)
    const [peakX, setPeakX] = useState(0)
    const [downX, setDownX] = useState(0)
    const [durationPeak, setDurationPeak] = useState(0)
    const [drag, setDrag] = useState(false)



    return <div className={'flex justify-center  bg-white  h-screen '}>
        <Split
            className={' flex justify-center   bg-pink-50 text-black w-full max-w-[1146px]  h-[800px] overflow-hidden'}
            onDragEnd={() => setDrag(!drag)}>
            <div className={'bg-blue-50  flex flex-col gap-4 *:p-4 p-4  max-w-[800px] w-full '}>
                <input onChange={(e) => setVelocity(Number(e.target.value))} value={velocity} type="number"
                       placeholder={'Velocity'}/>
                <input onChange={(e) => setPeakX(Number(e.target.value))} value={peakX} type="number"
                       placeholder={'Peak X'}/>
                <input onChange={(e) => setDownX(Number(e.target.value))} value={downX} type="number"
                       placeholder={'Time'}/>
                <input onChange={(e) => setDurationPeak(Number(e.target.value))} value={durationPeak} type="number"
                       placeholder={'Duration Peak'}/>

            </div>


            <LineChartCss velocity={velocity} peakX={peakX} downX={downX} durationPeak={durationPeak} drag={drag}/>
        </Split>

        {/*<div className={' col-span-4 flex items-center justify-center  '}>*/}
        {/*    <LineChartCustom velocity={300.7} peakX={0.3} time={2.4} durationPeak={1.8}*/}

        {/*    />*/}
        {/*</div>*/}
    </div>
}

export default App
