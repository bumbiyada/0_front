import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = (props) => {
    //console.log(props);
    const x_axle = props.x_axle
    const x_unique = Array.from(new Set(x_axle))
    const y_axle = props.y_axle;
    const title = props.title;
    console.log(x_unique)
    for (let i of x_unique){

    }
    //const aboba = dataset.map((data) => <p key={data.id}>{data.Document_number}</p>);
        return (
            <div>
                <Plot
                data= {[
                    {type: 'bar',
                        x: ['one', 'two'],
                        y: [48, 60]}
                    ]}
                layout= { {width: 1000, title: {title} }}
                />
                <h6>
                    aboba
                </h6>
            </div>
        )
}

export default BarChart;