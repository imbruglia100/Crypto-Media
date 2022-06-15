import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select} from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../Services/CryptoAPI'
import LineChart from './LineChart'

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {

  const { coinId } = useParams()
  const [timeperiod, setTimePeriod] = useState('7d')
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  const cryptoDetails = data?.data?.coin;
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod})

  if (isFetching) return 'loading...';

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aproved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>{cryptoDetails?.name} ({cryptoDetails?.symbol})</Title>
          <p>
            {cryptoDetails?.name} live price in USD.
            View value, statisics, market cap, and supply.
          </p>
        </Col>
        <Select 
          defaultValue='7d' 
          className='select-timeperiod' 
          placeholder="select time period"
          onChange={(value) => setTimePeriod(value) }
          >
            {time.map( (date) => <Option key={date}>{date}</Option>)}

          </Select>
          <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

          <Col className='stats-container'>
            <Col className='coin-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-details-heading'>
                  {cryptoDetails?.name} Value Statistics
                </Title>
                <p>An overview showing stats of {cryptoDetails?.name}</p>
              </Col>
              {stats.map( ({ icon, title, value}) => 
                (<Col className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    
                  </Col>  
                  <Text className='stats'>{value}</Text>
                </Col>)
                ) }

            </Col>
            <Col className='other-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-details-heading'>
                  Other Statistics
                </Title>
                <p>An overview showing stats of all crypto currencies</p>
              </Col>
              {genericStats.map( ({ icon, title, value}) => 
                (<Col className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    
                  </Col>  
                  <Text className='stats'>{value}</Text>
                </Col>)
                ) }

            </Col>
          </Col>
          <Col className='coin-desc-link'>
            <Row className='coin-desc'>

              <Title level={3} className='coin-details-heading'>
                  What is {cryptoDetails?.name}
                  {HTMLReactParser(cryptoDetails?.description)}
              </Title> 

            </Row>
            <Col className='coin-links'>
              <Title level={3} className='coin-details-heading'> 
                {cryptoDetails?.name} Links
              </Title>
              {cryptoDetails?.links.map((link) => (
                <Row className='coin-link' key={link.name}>
                  <Title level={5} className='link-name'>
                    {link.type}
                  </Title>
                  <a href={link.url} target='_blank' rel='noreferrer' alt='dwda'>
                    {link.name}
                  </a>
                </Row>
              ))}
            </Col>
          </Col>
      </Col>
    </>
  )
}

export default CryptoDetails