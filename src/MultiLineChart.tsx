import React, {useState} from 'react';

type Data = {
    x: number;
    y: number;
}
type LineChartProps = {
    data?: Data[][];
    color?: string[];
    dashedColor?: string;
    normalDashColor?: string;
    svgHeight?: number;
    svgWidth?: number;
    dashedArray?: number[];
    labelArray?: string[];

};

const LineChart: React.FC<LineChartProps> = ({
                                                 data = [],
                                                 color = ['#23aa3a', '#ff4500'],
                                                 svgHeight = 500,
                                                 dashedColor = '#000',
                                                 normalDashColor = "#6E6E6EFF",
                                                 svgWidth = 600,
                                                 labelArray = ['item 1', 'item 2'],
                                                 dashedArray = [5, 5]
                                             }) => {

    const padding = 50;
    const height = svgHeight - padding;
    const width = svgWidth - padding;

    const maxX = getMax(data.map(d => getMax(d.map(d1 => d1.x))))
    const maxY = getMax(data.map(d => getMax(d.map(d1 => d1.y))))


    const getMinY = () => {
        return 0
    }

    function getMax(arr: number[]) {
        return Math.max(...arr)
    }


    const getSvgX = (x: number) => {
        return (x / maxX) * width
    }
    const getSvgY = (y: number) => {
        if (data == undefined) {
            return 0
        }
        return height - ((y / maxY) * height)
    }

    function mathPath(data: Data[]) {
        let pathD = ''
        if (data[0].x != 0) {
            pathD += `M 0 ${getSvgY(getMinY())} `
        } else {
            pathD += `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `
        }
        for (let i = 0; i < data.length; i++) {
            pathD += ` L ${getSvgX(data[i].x)} ${getSvgY(data[i].y)} `
        }
        // pathD += 'z'
        return pathD;
    }


    function mathAxis() {
        return (
            <g className="stroke-black stroke-2">
                <line x1={0}
                      x2={getSvgX(maxX) + 20}
                      y1={getSvgY(getMinY())} y2={getSvgY(getMinY())}
                      markerEnd="url(#arrow)"/>

                <line x1={0} x2={0} y1={getSvgY(getMinY())}
                      y2={getSvgY(maxY) - 20}
                      markerEnd="url(#arrow)"/>


            </g>
        )
    }

    function showInfo(data: Data) {
        console.log(data)
        return <div
            style={{
                position: 'absolute',
                left: (hoveredPointCoords?.x ?? 0) + 10,
                top: (hoveredPointCoords?.y ?? 0) + 10,
                backgroundColor: '#fff',
                color: 'black',
                padding: '8px 12px',
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 10,
                transform: `translate(${data.x}px, ${data.y}px)`,

            }}
        >
            {labelArray[index]} : {hoverData?.x}, {hoverData?.y}

        </div>
    }

    const [hover, setHover] = useState(false)
    const [index, setIndex] = useState(0)
    const [hoverData, setHoverData] = useState<Data | null>(null)
    const [hoveredPointCoords, setHoveredPointCoords] = useState<Data | null>(null);

    function renderMarker(data: Data[], index: number) {
        return data.map((d, i) => {
            const cx = getSvgX(d.x)
            const cy = getSvgY(d.y)
            return <g key={`key-marker-${d.x}-${i}`}>

                <circle cx={cx} cy={cy} r={4}
                        fill={(d.x == hoverData?.x && d.y == hoverData?.y) ? color[index] : '#fff'}
                        stroke={color[index]}
                        strokeWidth={2}
                        style={{transition: 'all 0.2s ease-out'}}
                        onMouseEnter={() => {
                            setHover(true)
                            setHoverData(d)
                            setHoveredPointCoords({x: cx, y: cy});
                            setIndex(index)
                        }}
                        onMouseLeave={() => {
                            setHover(false)
                            setHoverData(null)
                            setHoveredPointCoords(null);
                            setIndex(0)
                        }}
                />


            </g>
        })
    }

    function renderAxisHorizontal(data: Data[]) {
        return data.map((d, i) => {
            const cx = getSvgX(d.x)
            const cyMark = getSvgY(getMinY())
            const cyValue = getSvgY(getMinY() - 9)
            return <g key={`key-horizontal-${d.x}-${i}`}>
                <rect x={cx} y={cyMark} width="1" height="8" fill="#000"/>
                <line x1={getSvgX(d.x)} y1={getSvgY(getMinY())} x2={getSvgX(d.x)} y2={getMinY()}
                      stroke={normalDashColor}
                      strokeDasharray={dashedArray.join(',')}/>

                <text x={cx} y={cyValue} textAnchor="middle" fontSize={12}
                      fill="#000">{d.x}</text>
            </g>
        })
    }

    function renderAxisVertical(data: Data[]) {
        return data.map(d => {
            const cx = getSvgX(0)
            const cy = getSvgY(d.y)

            return <g key={`key-vertical-${d.x}`}>
                <rect x={cx - 4} y={cy} width="8" height="1" fill="#000"/>


                <line x1="0" y1={getSvgY(d.y)} x2={getSvgX(maxX)} y2={getSvgY(d.y)} stroke={normalDashColor}
                      strokeDasharray={dashedArray.join(',')}/>


                <text
                    x={cx - 8}
                    y={cy + 4}
                    textAnchor="end"
                    fontSize={12}
                    fill="#000"
                >
                    {d.y}
                </text>
            </g>
        })
    }

    return <div className={'relative '}>
        <svg viewBox={`-20 -30 ${svgWidth} ${svgHeight + 10}`} width={svgWidth} height={svgHeight}
             className="bg-white p-2">
            <defs>
                <marker
                    id="arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path d="M 0 0 L 6 3 L 0 6 z" fill="black"/>
                </marker>
            </defs>

            {
                data.map((d, i) => {
                    return <>
                        <path d={mathPath(d)} className={`fill-none  stroke-2 `}
                              stroke={color[i]}/>

                        {mathAxis()} {renderAxisHorizontal(d)} {renderAxisVertical(d)} {renderMarker(d, i)}
                    </>
                })
            }

            {hoveredPointCoords && (
                <g>

                    <line
                        x1={0}
                        y1={hoveredPointCoords.y}
                        x2={hoveredPointCoords.x}
                        y2={hoveredPointCoords.y}
                        stroke={dashedColor}
                        strokeDasharray={dashedArray.join(",")}
                    />

                    <line
                        x1={hoveredPointCoords.x}
                        y1={getSvgY(getMinY())}
                        x2={hoveredPointCoords.x}
                        y2={hoveredPointCoords.y}
                        stroke={dashedColor}
                        strokeDasharray={dashedArray.join(",")}
                    />
                </g>
            )}
        </svg>

        {hover && showInfo(hoverData!)}

        <div className={'px-4 relative'}>

            {
                labelArray.map((label, i) => {
                    return <div key={`label-${i}`} className={'flex justify-end items-center  flex flex-row gap-4 '}>
                        <p className={'text-[12px] font-normal'}>{label}</p>
                        <svg viewBox={`0 0 30 20`} width={50} height={30}>

                            <path d="M 0 10 L 30 10" stroke={color[i]} strokeWidth={2}/>
                            <circle cx={15} cy={10} r={3} fill={'#fff'}
                                    stroke={color[i]} strokeWidth={1}/>
                        </svg>
                    </div>

                })
            }
        </div>
    </div>;
};

export default LineChart;
