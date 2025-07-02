import './App.css'
import MultiLineChart from "./MultiLineChart.tsx";

function App() {
    // const rdArray = (total = 10) => {
    //     const data = []
    //     for (let i = 0; i < total; i++) {
    //         const y = Math.floor(Math.random() * 50) + 50
    //         const obj = {
    //             x: i,
    //             y
    //         }
    //         data.push(obj)
    //     }
    //     return data;
    // }
    const rd = [
        {x: 0, y: 30},
        {x: 1, y: 20},
        {x: 2, y: 50},
        {x: 3, y: 30},
        {x: 4, y: 40},
        {x: 5, y: 150},
        {x: 9, y: 90},
        {x: 12, y: 50},
        {x: 13, y: 80},
        {x: 15, y: 90},
        {x: 18, y: 60},
        {x: 19, y: 70},
        {x: 25, y: 0},

    ]
    const temp = [
        // {x: 0, y: 30},
        {x: 3, y: 20},
        {x: 4, y: 50},
        {x: 7, y: 30},
        {x: 9, y: 40},
        {x: 12, y: 50},
        {x: 13, y: 50},
        {x: 15, y: 80},
        {x: 18, y: 90},
        {x: 19, y: 180},
        {x: 25, y: 50},

    ]


    return (
        <div className={' flex justify-center items-start bg-white text-black h-screen w-screen'}>
            <div className={'w-1/2 h-1/3'}>
                <MultiLineChart data={[rd,temp]} svgHeight={500} svgWidth={600} color={['#23aa3a', '#ff4500']}
                                dashedColor={'#3e5efa'} normalDashColor={'#515f68'} labelArray={['Clothes', 'Food']}/>
            </div>
        </div>
    )
}

export default App
