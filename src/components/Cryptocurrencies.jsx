import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../Services/CryptoAPI'

const Cryptocurrencies = () => {
  const {data, isFetching} = useGetCryptosQuery();
  const cryptoList = data?.data?.coins;
  const [cryptos, setCryptos ] = useState(cryptoList)

  console.log(cryptos)

  return (
    <div>
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos.map( (currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`} 
                extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
                hoverable 
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>MC: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cryptocurrencies