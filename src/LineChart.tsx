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
