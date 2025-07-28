// import {useEffect, useRef, useState} from "react";
//
// //usage
// //<LineChartCustom velocity={1530.1} peakX={0.3} downX={2.4} durationPeak={1.8}/>
//
// const LineChartCustom = ({
//                              velocity,
//                              downX,
//                              peakX,
//                              durationPeak,
//                          }: {
//
//     velocity: number,
//     downX: number,
//     peakX: number,
//     durationPeak: number,
// }) => {
//
//
//     const isEnoughData = velocity > 0 && downX > 0 && peakX > 0 && durationPeak > 0
//     if (!isEnoughData) {
//         velocity = 889
//         downX = 0.5
//         peakX = 0.5
//         durationPeak = 2
//     }
//
//     let fixedNumberY = 0;
//     const fixedNumberX = peakX % 0.1 > 0 ? 2 : 1
//
//     let stepX = peakX
//     let stepY;
//
//     if (velocity <= 1) {
//         stepY = Number((velocity / 5).toFixed(2))
//         fixedNumberY = 2
//     } else if (
//         velocity <= 10 &&
//         velocity > 1
//     ) {
//         stepY = Number((velocity / 5).toFixed(1))
//         fixedNumberY = 1
//
//     } else if (
//         velocity < 300 &&
//         velocity > 10
//     ) {
//         stepY = Number((velocity / 5).toFixed(0))
//         fixedNumberY = 0
//
//     } else {
//         stepY = Number((Number((velocity / 6).toFixed(0)) / 50).toFixed(0)) * 50
//         fixedNumberY = 0
//     }
//
//
//     const totalTime = durationPeak + peakX + downX;
//
//     let lengthX = totalTime / stepX + 1
//
//     if (lengthX > 15) {
//         lengthX = 10
//         stepX = totalTime / lengthX
//     }
//     const lengthY = (velocity / stepY) + 1
//
//     const containerRef = useRef<HTMLDivElement>(null)
//     const [containerWidth, setContainerWidth] = useState(300)
//     const [containerHeight, setContainerHeight] = useState(450)
//
//     const points = [
//         {x: 0, y: 0},
//         {x: peakX, y: velocity},
//         {x: durationPeak + peakX, y: velocity},
//         {x: durationPeak + peakX + downX, y: 0},
//     ]
//
//     const maxX = stepX * lengthX
//     const maxY = stepY * lengthY
//
//     useEffect(() => {
//         const update = () => {
//             if (containerRef.current) {
//                 if (containerRef.current.offsetWidth) {
//                     setContainerWidth(containerRef.current.offsetWidth - 20)
//                     setContainerHeight((containerRef.current.offsetWidth - 20) * 3 / 2)
//                 } else {
//                     setContainerWidth(300)
//                     setContainerHeight(450)
//                 }
//             }
//         }
//
//         update()
//         window.addEventListener("resize", update)
//         return () => window.removeEventListener("resize", update)
//     }, [])
//
//     useEffect(() => {
//         if (containerRef.current) {
//             setContainerWidth(containerRef.current.offsetWidth - 20)
//             setContainerHeight((containerRef.current.offsetWidth - 20) * 3 / 2)
//         }
//     }, [drag])
//
//     const dataX = () => Array.from({length: lengthX + 1}, (_, i) => i * stepX)
//
//     const dataY = () => Array.from({length: lengthY + 1}, (_, i) => i * stepY)
//
//     const getSvgX = (x: number) => {
//         return (x / maxX) * containerWidth
//     }
//     const getSvgY = (y: number) => {
//         return (containerHeight) - ((y / maxY) * (containerHeight))
//     }
//
//     function renderMarker() {
//         return points.map(d => {
//             const cx = getSvgX(d.x)
//             const cy = getSvgY(d.y)
//
//             return <g key={`key-marker-${d.x}-${d.y}`}>
//                 <text x={cx + 10} y={cy - 5} textAnchor="middle" fontWeight={500}
//                       className={'2xl:text-[14px] xl:text-[13px] lg:text-[12px] md:text-[11px]'}
//                       fill="#000">
//                     {d.y}
//                 </text>
//             </g>
//
//
//         })
//     }
//
//     function mathPath() {
//         let pathD = ''
//         if (points[0].x != 0.0) {
//             pathD += `M 0 ${getSvgY(0)} `
//         } else {
//             pathD += `M ${getSvgX(points[0].x)} ${getSvgY((points[0].y))} `
//         }
//         for (let i = 1; i < points.length - 1; i++) {
//             pathD += ` L ${getSvgX(points[i].x)} ${getSvgY(points[i].y) - 2} `
//         }
//
//         pathD += ` L ${getSvgX(points[points.length - 1].x)} ${getSvgY(points[points.length - 1].y)} `
//         return pathD
//     }
//
//     function renderAxisHorizontal() {
//         return dataY().map((d, i) => {
//
//             return <div key={`key-horizontal-${d}`}
//                         className={`w-full h-[0.5px] bg-gray-600  absolute left-0 `} style={{
//                 bottom: (i) * 0.5 + 1 / lengthY * containerHeight * (i),
//             }}>
//             </div>
//         })
//     }
//
//     function renderAxisVertical() {
//         return dataX().map((d, i) => {
//             return <div key={`key-horizontal-${d}`}
//                         className={`w-[0.5px]    bg-gray-600 absolute bottom-0`} style={{
//                 left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),
//                 height: containerHeight + 4,
//             }}>
//             </div>
//         })
//     }
//
//     return <div
//         className={'flex-grow flex items-center justify-center 2xl:pl-20 md:pl-14 sm:pl-14 my-auto pr-2 pb-20 '}>
//         <div
//             className={`w-full items-center self-center relative max-w-lg`} style={{height: containerHeight}}
//             ref={containerRef}
//         >
//             <div
//                 className={'absolute -left-20 -rotate-90 -translate-y-1/2  top-1/2   xl:text-[14px] lg:text-[13px] md:text-[12px]'}>Velocity
//             </div>
//             <div
//                 className={'absolute -bottom-16 -translate-x-1/2 left-1/2     xl:text-[14px] lg:text-[13px] md:text-[12px]'}>Time
//             </div>
//             <div className={'w-[0.5px] bg-black absolute bottom-0 left-0'} style={{
//                 height: containerHeight + 15,
//             }}/>
//             <div className={'h-[0.5px] bg-black absolute bottom-0 left-0'} style={{
//                 width: containerWidth + 15,
//             }}/>
//
//             <svg className="absolute inset-0 h-full z-10 w-full overflow-visible ">
//                 <defs>
//                     <marker
//                         id="arrow1"
//                         markerWidth="20"
//                         markerHeight="20"
//                         refX="10"
//                         refY="10"
//                         orient="auto"
//                     >
//                         <path d="M 0 0 L 20 10 L 0 20 z" fill="black"/>
//                     </marker>
//                 </defs>
//                 {
//                     isEnoughData && <path d={mathPath()} className={`fill-none `} strokeWidth={4}
//                                           stroke={'#3e5efa'}/>
//                 }
//                 {isEnoughData && renderMarker()}
//                 <line
//                     x1="0"
//                     y1="99%"
//                     x2="0"
//                     y2="-15"
//                     stroke="#000"
//                     strokeWidth="0.5"
//                     markerEnd="url(#arrow1)"
//                 />
//
//
//                 <line
//                     x1="0"
//                     y1="100%"
//                     x2="100%"
//                     y2="100%"
//                     stroke="transparent"
//                     strokeWidth="0.5"
//                     markerEnd="url(#arrow1)"
//                 />
//             </svg>
//
//             {
//                 renderAxisVertical()
//             }
//
//             {isEnoughData &&
//                 dataX().map((d, i) => {
//
//                     return <div key={`key-horizontal-number-${d}`}
//                                 className={`absolute -bottom-7 -translate-x-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}
//                                 style={{
//                                     left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),
//                                     bottom: (lengthX > 8) ? ((i % 2 == 0) ? -20 : -40) : -20
//                                 }}>
//                         {d.toFixed(fixedNumberX)}
//                     </div>
//                 })
//             }
//
//             {
//                 renderAxisHorizontal()
//             }
//             {
//                 isEnoughData &&
//                 dataY().map((d, i) => {
//
//                     return <div key={`key-horizontal-${d}`}
//                                 className={`absolute -left-10 translate-y-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}
//                                 style={{
//                                     bottom: (i) * 0.1 + 1 / lengthY * containerHeight * (i),
//                                 }}>
//                         {d.toFixed(fixedNumberY)}
//
//                     </div>
//                 })
//             }
//
//         </div>
//     </div>
//
// }
//
// export default LineChartCustom