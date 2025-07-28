import './App.css'
import {useState} from "react";
import Split from "@uiw/react-split";
import LineChartCustom from "./LineChartCss.tsx";

function App() {
    const [velocity, setVelocity] = useState(0)
    const [peakX, setPeakX] = useState(0)
    const [downX, setDownX] = useState(0)
    const [durationPeak, setDurationPeak] = useState(0)
    const [drag, setDrag] = useState(false)

//     <div className={'flex justify-center  bg-white  h-screen '}>
//         <Split
//     className={' flex justify-center   bg-pink-50 text-black w-full max-w-[1146px]  h-[800px] overflow-hidden'}
//     onDragEnd={() => setDrag(!drag)}>
// <div className={'bg-blue-50  flex flex-col gap-4 *:p-4 p-4  max-w-[900px] w-full '}>
//         <input onChange={(e) => setVelocity(Number(e.target.value))} value={velocity} type="number"
//     placeholder={'Velocity'}/>
//     <input onChange={(e) => setPeakX(Number(e.target.value))} value={peakX} type="number"
//            placeholder={'Peak X'}/>
//     <input onChange={(e) => setDownX(Number(e.target.value))} value={downX} type="number"
//            placeholder={'Time'}/>
//     <input onChange={(e) => setDurationPeak(Number(e.target.value))} value={durationPeak} type="number"
//            placeholder={'Duration Peak'}/>
//
// </div>
//
//     <div className={' col-span-4 flex items-center justify-center  '}>
//
//         <LineChartCustom timeValue={[0.3, 0.9, 1]} velocityValue={[1530.1, 1539.1, 0]}/>
//
//
//     </div>
// </Split>


// </div>
    return <div className={'flex justify-center  bg-white  h-screen '}>
        <Split
            className={' flex justify-center   bg-pink-50 text-black w-full max-w-[1146px]  h-[800px] overflow-hidden'}
            onDragEnd={() => setDrag(!drag)}>
            <div className={'bg-blue-50  flex flex-col gap-4 *:p-4 p-4  max-w-[900px] w-full '}>
                <input onChange={(e) => setVelocity(Number(e.target.value))} value={velocity} type="number"
                       placeholder={'Velocity'}/>
                <input onChange={(e) => setPeakX(Number(e.target.value))} value={peakX} type="number"
                       placeholder={'Peak X'}/>
                <input onChange={(e) => setDownX(Number(e.target.value))} value={downX} type="number"
                       placeholder={'Time'}/>
                <input onChange={(e) => setDurationPeak(Number(e.target.value))} value={durationPeak} type="number"
                       placeholder={'Duration Peak'}/>

            </div>
            <div className={' col-span-4 flex items-center justify-center  '}>
                <LineChartCustom velocityValue={[300.6, 300.6, 0]} timeValue={[0.3, 0.6, 0.3]}/>
            </div>
            {/*<div className={'w-2/3'}></div>*/}
            {/*<CircleChart data={[30, 60, 90]} listSec={[0.123, -0.345, 0.986]}  radius={3} totalAngle={100}/>*/}
        </Split>


    </div>
}

export default App
