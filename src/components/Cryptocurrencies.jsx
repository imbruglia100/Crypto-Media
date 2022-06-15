import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../Services/CryptoAPI'

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const initialState = cryptosList?.data?.coins;
  const [cryptos, setCryptos ] = useState(initialState)
  const [filteredList, setFilteredList] = useState(null)
  const { Search } = Input;

  const handleChange = (value) => {
    
    if (!value) setFilteredList(null);
    
    setFilteredList(cryptos.filter( (crypto) => { 
        return crypto.name.toLowerCase().includes(value.toLowerCase())
      }))
  }

  return (
    <div>
        
        {!simplified && 
          (<div>
            <Search
              placeholder="Search crypto"
              onChange={ (e) => handleChange(e.target.value)}
              style={{
                width: 200,
                margin: '10px 0'
    
              }}
            />
          </div>)
        }

      <Row gutter={[32,32]} className='crypto-card-container'>
        {(filteredList && !simplified ? filteredList : cryptos).map( (currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
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