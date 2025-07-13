import {useEffect, useRef, useState} from "react";

//usage
//<LineChartCustom velocity={1530.1} peakX={0.3} downX={2.4} durationPeak={1.8}/>

const LineChartCustom = ({
                             velocity,
                             downX,
                             peakX,
                             durationPeak,
                         }: {
    
    velocity: number,
    downX: number,
    peakX: number,
    durationPeak: number,
    drag: boolean
}) => {
    
    const isEnoughData = velocity > 0 && downX > 0 && peakX > 0 && durationPeak > 0
    if (!isEnoughData) {
        velocity = 889
        downX = 0.5
        peakX = 0.5
        durationPeak = 2
    }
    
    let fixedNumberY = 0
    const fixedNumberX = peakX % 0.1 > 0 ? 2 : 1
    
    let stepX = peakX
    let stepY
    
    if (velocity <= 1) {
        stepY = Number((velocity / 5).toFixed(2))
        fixedNumberY = 2
    } else if (
        velocity <= 10 &&
        velocity > 1
    ) {
        stepY = Number((velocity / 5).toFixed(1))
        fixedNumberY = 1
        
    } else if (
        velocity < 300 &&
        velocity > 10
    ) {
        stepY = Number((velocity / 5).toFixed(0))
        fixedNumberY = 0
        
    } else {
        stepY = Number((Number((velocity / 6).toFixed(0)) / 50).toFixed(0)) * 50
        fixedNumberY = 0
    }
    
    const totalTime = durationPeak + peakX + downX
    
    let lengthX = totalTime / stepX + 1
    
    if (lengthX > 15) {
        lengthX = 10
        stepX = totalTime / lengthX
    }
    const lengthY = (velocity / stepY) + 1
    
    const points = [
        {x: 0, y: 0},
        {x: peakX, y: velocity},
        {x: durationPeak + peakX, y: velocity},
        {x: durationPeak + peakX + downX, y: 0},
    ]
    
    const maxX = stepX * lengthX
    const maxY = stepY * lengthY
    
    const dataX = () => Array.from({length: lengthX + 1}, (_, i) => i * stepX)
    const dataY = () => Array.from({length: lengthY + 1}, (_, i) => i * stepY)
    
    const getPercentX = (x: number) => {
        return (x / maxX) * 100
    }
    const getPercentY = (y: number) => {
        return (y / maxY) * 100
    }
    
    // function renderMarker() {
    //     return points.map(d => {
    //         const cx = getSvgX(d.x)
    //         const cy = getSvgY(d.y)
    //
    //         return <g key={`key-marker-${d.x}-${d.y}`}>
    //             <text x={cx + 10} y={cy - 5} textAnchor="middle" fontWeight={500}
    //                   className={'2xl:text-[14px] xl:text-[13px] lg:text-[12px] md:text-[11px]'}
    //                   fill="#000">
    //                 {d.y}
    //             </text>
    //         </g>
    //
    //
    //     })
    // }
    //
    // function mathPath() {
    // if (!isEnoughData) return null
//
//         const pathPoints = points.map(point => ({
//             x: getPercentX(point.x),
//             y: getPercentY(point.y)
//         }))
//
//         // Tạo path string cho SVG
//         let pathString = `M ${pathPoints[0].x} ${100 - pathPoints[0].y}`
//         for (let i = 1 ; i < pathPoints.length;  i++) {
//             pathString += ` L ${pathPoints[i].x} ${100 - pathPoints[i].y}`
//         }
//
//         return (
//             <div className="absolute inset-0">
//                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path
//                         d={pathString}
//                         fill="none"
//                         stroke="#3b82f6"
//                         strokeWidth="1"
//                         vectorEffect="non-scaling-stroke"
//                     />
//
//                 </svg>
//             </div>
//         )
    // }
    
    function renderAxisHorizontal() {
        return dataY().map((d, i) => {
            
            return <div key={`key-horizontal-${d}`}
                        className={`w-full h-[0.5px] bg-gray-600  absolute left-0 `} style={{
                bottom: (i) * 0.5 + 1 / 7,
            }}>
            </div>
        })
    }
    
    // function renderAxisVertical() {
    //     return dataX().map((d, i) => {
    //         return <div key={`key-horizontal-${d}`}
    //                     className={`w-[0.5px]    bg-gray-600 absolute bottom-0`} style={{
    //             // left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),
    //             // height: containerHeight + 4,
    //         }}>
    //         </div>
    //     })
    // }
    
    return <div
        className={'flex-grow flex   2xl:pl-20 md:pl-14 sm:pl-14 my-auto pr-2 pb-20 h-full '}>
        <div
            className="w-full max-w-md max-h-lg relative"
            style={{aspectRatio: '2/3'}}
        >
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm ">
                Velocity
            </div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm">
                Time
            </div>
            <div className="relative w-full h-full border-l-2 border-b-2 border-black"></div>
            
            {/*<div className={'w-[0.5px] bg-black absolute bottom-0 left-0'} style={{*/}
            {/*    // height: containerHeight + 15,*/}
            {/*}}/>*/}
            {/*<div className={'h-[0.5px] bg-black absolute bottom-0 left-0'} style={{*/}
            {/*    // width: containerWidth + 15,*/}
            {/*}}/>*/}
            
            
            {/*/!*{*!/*/}
            {/*/!*    renderAxisVertical()*!/*/}
            {/*/!*}*!/*/}
            
            {/*{isEnoughData &&*/}
            {/*    dataX().map((d, i) => {*/}
            
            {/*        return <div key={`key-horizontal-number-${d}`}*/}
            {/*                    className={`absolute -bottom-7 -translate-x-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}*/}
            {/*                    style={{*/}
            {/*                        // left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),*/}
            {/*                        bottom: (lengthX > 8) ? ((i % 2 == 0) ? -20 : -40) : -20*/}
            {/*                    }}>*/}
            {/*            {d.toFixed(fixedNumberX)}*/}
            {/*        </div>*/}
            {/*    })*/}
            {/*}*/}
            
            {/*{*/}
            {/*    renderAxisHorizontal()*/}
            {/*}*/}
            {/*{*/}
            {/*    isEnoughData &&*/}
            {/*    dataY().map((d, i) => {*/}
            
            {/*        return <div key={`key-horizontal-${d}`}*/}
            {/*                    className={`absolute -left-10 translate-y-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}*/}
            {/*                    style={{*/}
            {/*                        // bottom: (i) * 0.1 + 1 / lengthY * containerHeight * (i),*/}
            {/*                    }}>*/}
            {/*            {d.toFixed(fixedNumberY)}*/}
            
            {/*        </div>*/}
            {/*    })*/}
            {/*}*/}
        
        </div>
    </div>
    
}

export default LineChartCustom