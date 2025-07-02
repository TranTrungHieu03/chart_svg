// import React, {useState} from 'react';
//
// type Data = {
//     x: number;
//     y: number;
// }
// type LineChartProps = {
//     data?: Data[];
//     color?: string;
//     dashedColor?: string;
//     normalDashColor?: string;
//     svgHeight?: number;
//     svgWidth?: number;
//     dashedArray?: number[];
//     labelArray?: string[];
// };
//
// const LineChart: React.FC<LineChartProps> = ({
//                                                  data = [],
//                                                  color = '#ff4500',
//                                                  svgHeight = 500,
//                                                  dashedColor = '#ff4500',
//                                                  normalDashColor = "#6E6E6EFF",
//                                                  svgWidth = 600,
//                                                  labelArray = ['item 1', 'item 2'],
//                                                  dashedArray = [5, 5]
//                                              }) => {
//
//     const padding = 50;
//     const height = svgHeight - padding;
//     const width = svgWidth - padding;
//     const getMaxX = () => {
//         const onlyX = data.map(d => d.x)
//         return Math.max(...onlyX)
//     }
//     const getMinY = () => {
//         return 0
//     }
//     const getMaxY = () => {
//         const onlyY = data.map(d => d.y)
//         return Math.max(...onlyY)
//
//     }
//     const getSvgX = (x: number) => {
//         return (x / getMaxX()) * width
//     }
//     const getSvgY = (y: number) => {
//         return height - ((y / getMaxY()) * height)
//     }
//
//     function mathPath() {
//         let pathD = ''
//         if (data[0].x != 0) {
//             pathD += `M 0 ${getSvgY(getMinY())} `
//         } else {
//             pathD += `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `
//         }
//         for (let i = 0; i < data.length; i++) {
//             pathD += ` L ${getSvgX(data[i].x)} ${getSvgY(data[i].y)} `
//         }
//         // pathD += 'z'
//         return pathD;
//     }
//
//     console.log(mathPath(), svgWidth, svgHeight, getMaxX(), getMaxY())
//
//     function mathAxis() {
//         return (
//             <g className="stroke-black stroke-2">
//                 <line x1={0} x2={getSvgX(getMaxX()) + 20} y1={getSvgY(getMinY())} y2={getSvgY(getMinY())}
//                       markerEnd="url(#arrow)"/>
//
//                 <line x1={0} x2={0} y1={getSvgY(getMinY())} y2={getSvgY(getMaxY()) - 20} markerEnd="url(#arrow)"/>
//
//                 {/*<line x1={getSvgX(getMaxX())} x2={getSvgX(getMaxX())} y1={getSvgY(getMinY())}*/}
//                 {/*      y2={getSvgY(getMaxY()) - 20} markerEnd="url(#arrow)"/>*/}
//             </g>
//         )
//     }
//
//     function showInfo(data: Data) {
//         console.log(data)
//         return <div
//             style={{
//                 position: 'absolute',
//                 left: (hoveredPointCoords?.x ?? 0) + 10,
//                 top: (hoveredPointCoords?.y ?? 0) + 10,
//                 backgroundColor: '#fff',
//                 color: 'black',
//                 padding: '8px 12px',
//                 borderRadius: '4px',
//                 pointerEvents: 'none',
//                 zIndex: 10,
//                 transform: `translate(${data.x}px, ${data.y}px)`,
//
//             }}
//         >
//             X: {hoverData?.x}, Y: {hoverData?.y}
//
//         </div>
//     }
//
//     const [hover, setHover] = useState(false)
//     const [hoverData, setHoverData] = useState<Data | null>(null)
//     const [hoveredPointCoords, setHoveredPointCoords] = useState<Data | null>(null);
//
//     function renderMarker() {
//         return data.map(d => {
//             const cx = getSvgX(d.x)
//             const cy = getSvgY(d.y)
//             return <g key={`key-marker-${d.x}`}>
//
//                 <circle cx={cx} cy={cy} r={4} fill={(d.x == hoverData?.x && d.y == hoverData?.y) ? color : '#fff'}
//                         stroke={color} strokeWidth={2}
//                         style={{transition: 'all 0.2s ease-out'}}
//                         onMouseEnter={() => {
//                             setHover(true)
//                             setHoverData(d)
//                             setHoveredPointCoords({x: cx, y: cy});
//                         }}
//                         onMouseLeave={() => {
//                             setHover(false)
//                             setHoverData(null)
//                             setHoveredPointCoords(null);
//                         }}
//                 />
//
//
//             </g>
//         })
//     }
//
//     function renderAxisHorizontal() {
//         return data.map(d => {
//             const cx = getSvgX(d.x)
//             const cyMark = getSvgY(getMinY())
//             const cyValue = getSvgY(getMinY() - 5)
//             return <g key={`key-horizontal-${d.x}`}>
//                 <rect x={cx} y={cyMark} width="1" height="8" fill="#000"/>
//                 <line x1={getSvgX(d.x)} y1={getSvgY(getMinY())} x2={getSvgX(d.x)} y2={getMinY()}
//                       stroke={normalDashColor}
//                       strokeDasharray={dashedArray.join(',')}/>
//
//                 <text x={cx} y={cyValue} textAnchor="middle" fontSize={12}
//                       fill="#000">{d.x}</text>
//             </g>
//         })
//     }
//
//     function renderAxisVertical() {
//         return data.map(d => {
//             const cx = getSvgX(0)
//             const cy = getSvgY(d.y)
//
//             return <g key={`key-vertical-${d.x}`}>
//                 <rect x={cx - 4} y={cy} width="8" height="1" fill="#000"/>
//
//
//                 <line x1="0" y1={getSvgY(d.y)} x2={getSvgX(getMaxX())} y2={getSvgY(d.y)} stroke={normalDashColor}
//                       strokeDasharray={dashedArray.join(',')}/>
//
//
//                 <text
//                     x={cx - 8}
//                     y={cy + 4}
//                     textAnchor="end"
//                     fontSize={12}
//                     fill="#000"
//                 >
//                     {d.y}
//                 </text>
//             </g>
//         })
//     }
//
//     return <div className={'relative '}>
//         <svg viewBox={`-20 -30 ${svgWidth} ${svgHeight + 10}`} width={svgWidth} height={svgHeight}
//              className="bg-white p-2">
//             <defs>
//                 <marker
//                     id="arrow"
//                     markerWidth="6"
//                     markerHeight="6"
//                     refX="3"
//                     refY="3"
//                     orient="auto"
//                     markerUnits="strokeWidth"
//                 >
//                     <path d="M 0 0 L 6 3 L 0 6 z" fill="black"/>
//                 </marker>
//             </defs>
//
//             <path d={mathPath()} className={`fill-none  stroke-2 `}
//                   stroke={color}/>
//
//             {mathAxis()} {renderAxisHorizontal()} {renderAxisVertical()} {renderMarker()}
//             <g>
//                 <rect x={getSvgX(0)} y={getSvgY(getMinY() + 1)} width="1" height="8" fill="#000"/>
//
//                 <text x={getSvgX(0)} y={getSvgY(getMinY() - 5)} textAnchor="middle" fontSize={12}
//                       fill="#000">0
//                 </text>
//             </g>
//
//             {hoveredPointCoords && (
//                 <g>
//
//                     <line
//                         x1={0}
//                         y1={hoveredPointCoords.y}
//                         x2={hoveredPointCoords.x}
//                         y2={hoveredPointCoords.y}
//                         stroke={dashedColor}
//                         strokeDasharray={dashedArray.join(",")}
//                     />
//
//                     <line
//                         x1={hoveredPointCoords.x}
//                         y1={getSvgY(getMinY())}
//                         x2={hoveredPointCoords.x}
//                         y2={hoveredPointCoords.y}
//                         stroke={dashedColor}
//                         strokeDasharray={dashedArray.join(",")}
//                     />
//                 </g>
//             )}
//
//         </svg>
//
//         {hover && showInfo(hoverData!)}
//
//         <div className={'px-4 relative'}>
//
//             {
//                 labelArray.map((label, __) => {
//                     return <div className={'flex justify-end items-center  flex flex-row gap-4 '}>
//                         <p className={'text-[12px] font-normal'}>{label}</p>
//                         <svg viewBox={`0 0 30 20`} width={50} height={30}>
//
//                             <path d="M 0 10 L 30 10" stroke={color} strokeWidth={2}/>
//                             <circle cx={15} cy={10} r={3} fill={'#fff'}
//                                     stroke={color} strokeWidth={1}/>
//                         </svg>
//                     </div>
//
//                 })
//             }
//         </div>
//     </div>;
// };
//
// export default LineChart;
