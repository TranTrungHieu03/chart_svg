const LineChartCustom = ({
                             timeValue,
                             velocityValue,
                         }: {
    timeValue?: Array<number | null>,
    velocityValue?: Array<number | null>,
}) => {
    const isEnoughTime = timeValue?.length == 3
    const isEnoughVelocity = velocityValue?.length == 3
    const isEnoughData = isEnoughTime && isEnoughVelocity
    const hasNullValue = timeValue?.some(d => d == null) || velocityValue?.some(d => d == null)
    const isValidData = isEnoughData && !hasNullValue

    let velocityMax = 1
    let downX: number | null = 0.5
    let peakX: number | null = 0.5
    let durationPeak: number | null = 1
    let velocityFirst: number | null = 1
    let velocityAtPeak: number | null = 1
    let velocityDown: number | null = 1

    if (isValidData) {
        velocityMax = Math.max(...velocityValue.filter((v): v is number => v !== null))
        downX = timeValue[2]
        peakX = timeValue[0]
        durationPeak = timeValue[1]
        velocityFirst = velocityValue[0]
        velocityAtPeak = velocityValue[1]
        velocityDown = velocityValue[2]
    }
    downX = downX ?? 0.5
    peakX = peakX ?? 0.5
    durationPeak = durationPeak ?? 1
    velocityFirst = velocityFirst ?? 1
    velocityAtPeak = velocityAtPeak ?? 1
    velocityDown = velocityDown ?? 0
    velocityMax = velocityMax ?? 1

    function countDecimal(number: number) {
        if (!Number.isFinite(number)) return 0
        const decimalPart = number.toString().split('.')[1]
        return decimalPart ? decimalPart.length : 0
    }

    let fixedNumberY = 0

    const fixedNumberX = countDecimal(peakX)

    let stepX = peakX
    let stepY

    if (velocityMax <= 1) {
        stepY = Number((velocityMax / 5).toFixed(2))
        fixedNumberY = 2
    } else if (
        velocityMax <= 10 &&
        velocityMax > 1
    ) {
        stepY = Number((velocityMax / 5).toFixed(1))
        fixedNumberY = 1

    } else if (
        velocityMax < 300 &&
        velocityMax > 10
    ) {
        stepY = Number((velocityMax / 5).toFixed(0))
        fixedNumberY = 0

    } else {
        stepY = Number((Number((velocityMax / 6).toFixed(0)) / 50).toFixed(0)) * 50
        fixedNumberY = 0
    }

    const totalTime = durationPeak + peakX + downX

    let lengthX = totalTime / stepX + 1

    if (lengthX > 15) {
        lengthX = 10
        stepX = totalTime / lengthX
    }
    const lengthY = (velocityMax / stepY) + 1

    const points = [
        {x: 0, y: 0},
        {x: peakX, y: velocityFirst},
        {x: durationPeak + peakX, y: velocityAtPeak},
        {x: durationPeak + peakX + downX, y: velocityDown},
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

    function renderMarker() {
        return points.map(d => {
            return <div className={'absolute transform -translate-x-1/2 translate-y-1/2'}
                        key={`key-marker-${d.x}-${d.y}`} style={{
                left: `${getPercentX(d.x)}%`,
                bottom: `${getPercentY(d.y)}%`,
            }}>
                <div className={'w-2 h-2 rounded-full bg-blue-600'}></div>
                <div className={'absolute text-sm -top-5 left-2  '}>
                    {d.y}
                </div>
            </div>


        })
    }

    function renderPath() {
        if (!isEnoughData) return null

        const pathPoints = points.map(point => ({
            x: getPercentX(point.x),
            y: getPercentY(point.y)
        }))

        let pathString = `M ${pathPoints[0].x} ${100 - pathPoints[0].y}`
        for (let i = 1; i < pathPoints.length; i++) {
            pathString += ` L ${pathPoints[i].x} ${100 - pathPoints[i].y}`
        }

        return (
            <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d={pathString}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />

                </svg>
            </div>
        )
    }

    function renderAxisHorizontal() {
        return dataY().map((d) => {

            return <div key={`key-horizontal-${d}`}
                        className={`w-full h-[0.5px] bg-gray-600  absolute left-0 `} style={{
                bottom: `${getPercentY(d)}%`,
            }}>
            </div>
        })
    }

    function renderAxisVertical() {
        return dataX().map((d) => {
            return <div key={`key-horizontal-${d}`}
                        className={`w-[0.5px]  h-full  bg-gray-600 absolute bottom-0`} style={{
                left: `${getPercentX(d)}%`,
            }}>
            </div>
        })
    }

    function renderArrow() {
        return <>
            <div
                className={'absolute -right-2 w-0 h-0 -bottom-1  border-l-[10px] border-t-[5px] border-b-[5px] border-l-black border-t-transparent border-b-transparent'}></div>
            <div
                className={'absolute -top-2 w-0 h-0 -left-1  border-b-[10px] border-r-[5px] border-l-[5px] border-b-black border-r-transparent border-l-transparent'}></div>
        </>
    }

    function renderAxisValue() {
        return <>
            {dataX().map((d, i) => {

                return <div key={`key-horizontal-number-${d}`}
                            className={`absolute -bottom-7 -translate-x-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}
                            style={{
                                left: `${getPercentX(d)}%`,
                                bottom: (lengthX > 8) ? ((i % 2 == 0) ? -30 : -50) : -30
                            }}>
                    {d.toFixed(fixedNumberX)}

                </div>
            })}
            {
                dataY().map((d) => {

                    return <div key={`key-horizontal-${d}`}
                                className={`absolute -left-10 translate-y-2  2xl:text-[14px]  xl:text-[13px] lg:text-[12px] md:text-[11px]`}
                                style={{
                                    bottom: `${getPercentY(d)}%`,
                                }}>
                        {d.toFixed(fixedNumberY)}

                    </div>
                })
            }

        </>
    }

    return <div
        className={'flex-grow flex 2xl:pl-20 md:pl-14 sm:pl-14 my-auto pb-20 pr-4'}>
        <div
            className="w-full max-w-md relative min-w-52"
            style={{aspectRatio: '2/3'}}
        >
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm ">
                Velocity
            </div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm">
                Time
            </div>
            <div className="relative w-full h-full border-l-2 border-b-2 border-black">

            </div>

            {
                renderAxisVertical()
            }

            {
                renderArrow()
            }

            {
                isValidData && renderPath()

            }
            {
                isValidData && renderMarker()
            }
            {isValidData &&
                renderAxisValue()
            }

            {
                renderAxisHorizontal()
            }


        </div>
    </div>

}

export default LineChartCustom