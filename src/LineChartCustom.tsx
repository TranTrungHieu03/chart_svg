import {useEffect, useRef, useState} from "react";

const LineChartCustom = ({

                             velocity,
                             time,
                             peakX,
                             durationPeak,
                         }: {

    velocity: number;
    time: number;
    peakX: number;
    durationPeak: number;
}) => {

    const stepX = peakX;
    const stepY = Number((Number((velocity / 6).toFixed(0)) / 50).toFixed(0)) * 50

    const lengthX = time / stepX + 1;
    const lengthY = velocity / stepY + 1;

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(300);
    const [containerHeight, setContainerHeight] = useState(450);
    const points = [
        {x: 0, y: 0},
        {x: peakX, y: velocity},
        {x: durationPeak + peakX, y: velocity},
        {x: time, y: 0},
    ]
    const maxX = stepX * lengthX
    const maxY = stepY * lengthY

    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                if (containerRef.current.offsetWidth) {
                    setContainerWidth(containerRef.current.offsetWidth - 40);
                    setContainerHeight((containerRef.current.offsetWidth - 40) * 3 / 2);
                } else {
                    setContainerWidth(300);
                    setContainerHeight(450);
                }

            }
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    console.log(containerWidth, containerHeight)
    const dataX = () => Array.from({length: lengthX + 1}, (_, i) => i * stepX);

    const dataY = () => Array.from({length: lengthY + 1}, (_, i) => i * stepY);

    const getSvgX = (x: number) => {
        return (x / maxX) * containerWidth
    }
    const getSvgY = (y: number) => {
        return (containerHeight) - ((y / maxY) * (containerHeight))
    }

    function renderMarker() {
        return points.map(d => {
            const cx = getSvgX(d.x)
            const cy = getSvgY(d.y)

            return <g key={`key-marker-${d.x}-${d.y}`}>
                <text x={cx + 10} y={cy - 5} textAnchor="middle" fontSize={14} fontWeight={500}
                      fill="#000">
                    {d.y}
                </text>
            </g>


        })
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


    return <div
        className={'h-screen lg:w-full md:w-full   lg:px-20  md:pr-5 pb-20 relative flex items-center justify-center'}>
        <div
            className={`  w-full      items-center self-center relative  `} style={{height: containerHeight}}
            ref={containerRef}>
            <div
                className={'absolute -left-20 -rotate-90 -translate-y-1/2  top-1/2 font-semibold'}>Velocity
            </div>
            <div className={'absolute -bottom-16 -translate-x-1/2 left-1/2   font-semibold'}>Time</div>
            <div className={'w-[0.5px] h-full bg-black absolute bottom-0 left-0'}/>
            <div className={'w-full h-[0.5px] bg-black absolute bottom-0 left-0'}/>

            <svg className="absolute inset-0  z-10 w-full h-full overflow-visible ">
                <defs>
                    <marker
                        id="arrow1"
                        markerWidth="20"
                        markerHeight="20"
                        refX="10"
                        refY="10"
                        orient="auto"
                    >
                        <path d="M 0 0 L 20 10 L 0 20 z" fill="black"/>
                    </marker>
                </defs>
                <path d={mathPath()} className={`fill-none `} strokeWidth={4}
                      stroke={'#3e5efa'}/>
                {renderMarker()}
                <line
                    x1="0"
                    y1="90%"
                    x2="0"
                    y2="0"
                    stroke="#000"
                    strokeWidth="0.5"
                    markerEnd="url(#arrow1)"
                />


                <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="transparent"
                    strokeWidth="0.5"
                    markerEnd="url(#arrow1)"
                />
            </svg>

            {
                dataX().map((d, i) => {

                    return <div key={`key-horizontal-${d}`}
                                className={`w-[0.5px] h-full  bg-black absolute bottom-0`} style={{
                        left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),
                    }}>


                    </div>
                })
            }
            {
                dataX().map((d, i) => {

                    return <div key={`key-horizontal-number-${d}`}
                                className={`absolute -bottom-7 -translate-x-2 lg:text-[13px] md:text-[12px]`} style={{
                        left: (i) * 0.1 + 1 / lengthX * containerWidth * (i),
                    }}>
                        {d.toFixed(1)}

                    </div>
                })
            }
            {
                dataY().map((d, i) => {

                    return <div key={`key-horizontal-${d}`}
                                className={`w-full h-[0.5px] bg-black absolute left-0 `} style={{
                        bottom: (i) * 0.5 + 1 / lengthY * containerHeight * (i),
                    }}>


                    </div>
                })
            }
            {
                dataY().map((d, i) => {

                    return <div key={`key-horizontal-${d}`}
                                className={`absolute -left-10 translate-y-2 text-[14px]`} style={{
                        bottom: (i) * 0.1 + 1 / lengthY * containerHeight * (i),
                    }}>
                        {d.toFixed(0)}

                    </div>
                })
            }


        </div>

    </div>


}

export default LineChartCustom;