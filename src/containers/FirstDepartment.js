import React from 'react';

import Plot from 'react-plotly.js';

const BarChart = (props) => {
    console.log(props);
    const dataset = props.dataset;
    const aboba = dataset.map((data) => <p>{data.Document_number}</p>);
        return (
            <div>
                <Plot
                data= {[
                    {type: 'bar',
                        x: ['one', 'two'],
                        y: [48, 60]}
                    ]}
                layout= { {width: 1000, title: 'graph' }}
                />
                <h6>
                    {aboba}
                </h6>
            </div>
        )
}

export default BarChart;

