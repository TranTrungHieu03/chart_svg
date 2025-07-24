
// <CircleChart data={[40, 30, 17]} listSec={[0.123, -0.345, 0.986]} radius={3}/>
const CircleChart = ({
                         data,
                         listSec,
                         radius
                     }: {
    data: number[],
    listSec: number[],
    radius: number
}) => {
    const listColor = ['#58A0C8', '#FFC107', '#EB5A3C']
    let cumulatedAngle = 0;

    return (
        <div className={'flex flex-col justify-center  items-center text-black'}>
            <div
                className={'h-[400px] w-[400px] bg-blue-50 rounded-full border-b-[#D3AF37] border-b-[18px] relative'}
                style={{
                    backgroundImage: `conic-gradient(${listColor[0]} 0deg , ${listColor[0]} ${data[0]}deg ,  ${listColor[1]} ${data[0]}deg,
                     ${listColor[1]}  ${data[0] + data[1]}deg, ${listColor[2]} ${data[0] + data[1]}deg, 
                     ${listColor[2]}  ${data[0] + data[1] + data[2]}deg,#DBDBDB ${data[0] + data[1] + data[2]}deg , #DBDBDB  360deg)`
                }}>
                {data.map((d, i) => {
                    const middleAngle = cumulatedAngle + d / 2
                    const x = (Math.cos((middleAngle - 90) * Math.PI / 180) * 50) * 0.5 + 50
                    const y = (Math.sin((middleAngle - 90) * Math.PI / 180) * 50) * 0.5 + 50
                    cumulatedAngle = cumulatedAngle + d
                    return <div key={i} className={'absolute -translate-x-1/2 -translate-y-1/2'}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                }}>
                        {d}°
                    </div>
                })}

            </div>
            <div className={'flex flex-col  pt-10'}>
                <div className={'grid grid-cols-5 gap-1 items-center '}>
                    <div></div>
                    <p className={'col-span-2 font-semibold text-center'}>각도 (Degree)</p>
                    <p className={'col-span-2 font-semibold text-center'}>시간 (sec)</p>

                </div>
                {
                    listSec.map((d, i) => {
                        return <div className={'grid grid-cols-5 gap-1 items-center '} key={`sec-${i}`}>
                            <div className={`h-[15px] w-[40px]  col-span-1`} style={{
                                backgroundColor: listColor[i],
                            }}></div>
                            <p className={'col-span-2 text-center font-thin'}>{data[i]}°</p>
                            <p className={'col-span-2 text-center font-thin'}>{d}</p>
                        </div>
                    })
                }
                <p className={'flex self-center pt-2'}>반지름 {radius}mm </p>
            </div>
        </div>
    )
}

export default CircleChart