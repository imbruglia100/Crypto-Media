import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography} from 'antd'
import Chart from 'chart.js/auto';

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName}) => {

    const coinPrice = [];
    const coinTimestamp = [];

    const len = coinHistory?.data?.history?.length;
    const yLen = coinHistory?.data?.history?.length;
  for (let i = len-1; i > 0; i--) {
    let price = coinHistory?.data?.history[i].price;
    coinPrice.push(price);
  }
  for (let i = yLen-1; i > 0; i--) {
    let date = new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString("en-US")
    coinTimestamp.push(date);
  }

console.log({coinTimestamp})
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        elements: {
            point:{
            radius: 2
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
  return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>
                {coinName} Price Chart
            </Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>
                    {coinHistory?.data?.change}%
                </Title>
                
                <Title level={5} className='current-price'>
                    Current {coinName} Price: ${currentPrice}
                </Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}

export default LineChart