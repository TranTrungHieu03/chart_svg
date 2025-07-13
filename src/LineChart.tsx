import React, {useEffect, useState} from 'react';


type LineChartProps = {
    color?: string;
    normalDashColor?: string;
    velocity: number;
    time: number;
    peakX: number;
    widthPercent?: number;
    minWidth?: number;
    durationPeak : number;
    // ref: RefObject<HTMLDivElement>

};

// <LineChart data={rd} velocity={700} peakX={0.3} time={2.4} widthPercent={1 / 4}/>
const LineChart: React.FC<LineChartProps> = ({
                                                 color = '#3e5efa',
                                                 normalDashColor = "#000",
                                                 velocity,
                                                 time,
                                                 peakX,
                                                 durationPeak,
                                                 // ref,
                                                 widthPercent = 1 / 4,
                                                 minWidth = 300
                                             }) => {

    const padding = 50;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const svgWidth = windowWidth * widthPercent < minWidth ? minWidth : windowWidth * widthPercent;
    const svgHeight = 7 / 5 * svgWidth

    const height = svgHeight - padding;
    const width = svgWidth - padding - 30;

    const stepX = peakX;
    const stepY = Number((Number((velocity / 6).toFixed(0)) / 50).toFixed(0)) * 50

    const lengthX = time / stepX + 1;
    const lengthY = velocity / stepY + 1;


    const dataX = () => Array.from({length: lengthX + 1}, (_, i) => i * stepX);

    const dataY = () => Array.from({length: lengthY + 1}, (_, i) => i * stepY);

    const maxX = stepX * lengthX
    const maxY = stepY * lengthY

    const points = [
        {x: 0, y: 0},
        {x: peakX, y: velocity},
        {x: durationPeak + peakX, y: velocity},
        {x: time , y: 0},
    ]

    const getSvgX = (x: number) => {
        return (x / maxX) * width
    }
    const getSvgY = (y: number) => {
        return height - ((y / maxY) * height)
    }

    function mathPath() {
        let pathD = ''
        if (points[0].x != 0.0) {
            pathD += `M 0 ${getSvgY(0)} `
        } else {
            pathD += `M ${getSvgX(points[0].x)} ${getSvgY((points[0].y))} `
        }
        for (let i = 0; i < points.length; i++) {
            pathD += ` L ${getSvgX(points[i].x)} ${getSvgY(points[i].y)} `
        }

        return pathD;
    }


    function mathAxis() {

        return (
            <g className="stroke-black stroke-1">
                <line x1={0} x2={getSvgX(maxX) + 20} y1={getSvgY(0)} y2={getSvgY(0)}
                      markerEnd="url(#arrow)"/>
                <line x1={0} x2={0} y1={getSvgY(0)} y2={getSvgY(maxY) - 20} markerEnd="url(#arrow)"/>
            </g>
        )
    }


    function renderMarker() {
        return points.map(d => {
            const cx = getSvgX(d.x)
            const cy = getSvgY(d.y)

            return <g key={`key-marker-${d.x}-${d.y}`}>
                <text x={cx + 10} y={cy - 5} textAnchor="middle" fontSize={15} fontWeight={500}
                      fill="#000">
                    {d.y}
                </text>
            </g>


        })
    }

    function renderAxisHorizontal() {
        return dataX().map(d => {
            const cx = getSvgX(d)
            const cyMark = getSvgY(0)
            const cyValue = getSvgY(0 - 5)
            return <g key={`key-horizontal-${d}`}>
                <rect x={cx} y={cyMark} width="1" height="5" fill="#000"/>
                <line x1={getSvgX(d)} y1={getSvgY(0)} x2={getSvgX(d)} y2={getSvgY(maxY)}
                      stroke={normalDashColor}
                />

                <text x={cx} y={cyValue + 15} textAnchor="middle" fontSize={15} fontWeight={400}
                      fill="#000">{d.toFixed(1)}</text>
            </g>
        })
    }

    function renderAxisVertical() {
        return dataY().map(d => {
            const cx = getSvgX(0)
            const cy = getSvgY(d)
            return <g key={`key-vertical-${d}`}>
                <rect x={cx - 3} y={cy} width="6" height="1" fill="#000"/>
                <line x1="0" y1={getSvgY(d)} x2={getSvgX(maxX)} y2={getSvgY(d)} stroke={normalDashColor}/>
                <text
                    x={cx - 40}
                    y={cy + 5}
                    textAnchor="start"
                    fontSize={15} fontWeight={400}
                    fill="#000"
                >
                    {d}
                </text>
            </g>
        })
    }


    return <div className={'relative bg-white self-center mx-auto pl-10'}>
        <svg viewBox={`-50 -30 ${svgWidth + 50} ${svgHeight + 10}`} width={svgWidth} height={svgHeight}
             className="">
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M 0 0 L 10 5 L 0 10  z" fill="black"/>
                </marker>
            </defs>

            <path d={mathPath()} className={`fill-none `} strokeWidth={4}
                  stroke={color}/>

            {mathAxis()}
            {renderAxisHorizontal()}
            {renderAxisVertical()}
            {renderMarker()}


        </svg>

        <div className={'    absolute left-1/2 -translate-x-1/2  bottom-0  font-semibold'}>Time</div>
        <div className={'absolute top-1/2 -translate-y-1/2 -rotate-90 left-0  font-semibold'}> Velocity</div>
    </div>;
};

export default LineChart;

//
// import {useEffect, useRef, useState} from "react"
//
// //usage
// //<LineChartCustom velocity={1530.1} peakX={0.3} downX={2.4} durationPeak={1.8}/>
//
// const LineChartCss = ({
//                           velocity,
//                           downX,
//                           peakX,
//                           durationPeak,
//                       }: {
//     velocity: number,
//     downX: number,
//     peakX: number,
//     durationPeak: number,
// }) => {
//
//     const isEnoughData = velocity > 0 && downX > 0 && peakX > 0 && durationPeak > 0
//     if (!isEnoughData) {
//         velocity = 889
//         downX = 0.5
//         peakX = 0.5
//         durationPeak = 2
//     }
//
//     let fixedNumberY = 0
//     const fixedNumberX = peakX % 0.1 > 0 ? 2 : 1
//
//     let stepX = peakX
//     let stepY
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
//     const totalTime = durationPeak + peakX + downX
//
//     let lengthX = totalTime / stepX + 1
//
//     if (lengthX > 15) {
//         lengthX = 10
//         stepX = totalTime / lengthX
//     }
//     const lengthY = (velocity / stepY) + 1
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
//     const dataX = () => Array.from({length: lengthX + 1}, (_, i) => i * stepX)
//     const dataY = () => Array.from({length: lengthY + 1}, (_, i) => i * stepY)
//
//     const getPercentX = (x: number) => {
//         return (x / maxX) * 100
//     }
//     const getPercentY = (y: number) => {
//         return (y / maxY) * 100
//     }
//
//     function renderMarkers() {
//         return points.map((d, index) => {
//             const leftPercent = getPercentX(d.x)
//             const bottomPercent = getPercentY(d.y)
//
//             return (
//                 <div
//                     key={`marker-${index}`}
//                     className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
//                     style={{
//                         left: `${leftPercent}%`,
//                         bottom: `${bottomPercent}%`,
//                     }}
//                 >
//                     <div
//                         className="absolute w-2 h-2 -top-1 -left-1 bg-blue-600 rounded-full border-2 border-white"></div>
//                     <div
//                         className="absolute -top-4  left-1/2 transform -translate-x-1/2 text-xs font-medium text-black whitespace-nowrap">
//                         {d.y.toFixed(fixedNumberY)}
//                     </div>
//                 </div>
//             )
//         })
//     }
//
//     function renderPath() {
//         if (!isEnoughData) return null
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
//     }
//
//     function renderGridLines() {
//         return (
//             <>
//                 {dataY().map((d, i) => (
//                     <div
//                         key={`h-grid-${i}`}
//                         className="absolute w-full border-t border-gray-300"
//                         style={{
//                             bottom: `${getPercentY(d)}%`,
//                         }}
//                     />
//                 ))}
//
//                 {dataX().map((d, i) => (
//                     <div
//                         key={`v-grid-${i}`}
//                         className="absolute h-full border-l border-gray-300"
//                         style={{
//                             left: `${getPercentX(d)}%`,
//                         }}
//                     />
//                 ))}
//             </>
//         )
//     }
//
//     function renderAxisLabels() {
//         return (
//             <>
//                 {isEnoughData && dataX().map((d, i) => (
//                     <div
//                         key={`x-label-${i}`}
//                         className="absolute text-xs transform -translate-x-1/2"
//                         style={{
//                             left: `${getPercentX(d)}%`,
//                             bottom: '-30px',
//                             marginBottom: lengthX > 8 ? (i % 2 === 0 ? '0px' : '-20px') : '0px'
//                         }}
//                     >
//                         {d.toFixed(fixedNumberX)}
//                     </div>
//                 ))}
//
//                 {isEnoughData && dataY().map((d, i) => (
//                     <div
//                         key={`y-label-${i}`}
//                         className="absolute text-xs transform translate-y-1/2"
//                         style={{
//                             left: '-40px',
//                             bottom: `${getPercentY(d)}%`,
//                         }}
//                     >
//                         {d.toFixed(fixedNumberY)}
//                     </div>
//                 ))}
//             </>
//         )
//     }
//
//     function renderArrows() {
//         return (
//             <>
//                 <div className="absolute -bottom-1 -right-2 w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-black border-t-transparent border-b-transparent"></div>
//
//                 <div className="absolute -left-1 -top-2 w-0 h-0 border-b-8 border-t-0 border-l-4 border-r-4  border-b-black border-l-transparent border-r-transparent"></div>
//             </>
//         )
//     }
//
//     return (
//         <div className="flex-grow flex items-center justify-center pl-4 md:pl-14 lg:pl-16 xl:pl-20 my-auto pr-2 pb-20">
//             <div
//                 className="w-full max-w-md max-h-lg relative"
//                 style={{aspectRatio: '2/3'}}
//             >
//                 <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium">
//                     Velocity
//                 </div>
//                 <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm font-medium">
//                     Time
//                 </div>
//
//                 <div className="relative w-full h-full border-l-2 border-b-2 border-black">
//                     {renderGridLines()}
//
//                     {renderPath()}
//
//                     {isEnoughData && renderMarkers()}
//
//                     {renderAxisLabels()}
//
//                     {renderArrows()}
//
//
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default LineChartCss