import React from 'react'
import { Table } from 'antd';
import { useGetExchangesQuery } from '../Services/CryptoAPI';


const { Column } = Table;


const Exchanges = () => {

  //const {data, isFetching} = useGetExchangesQuery(50);
  //console.log({data})
  
  const dataFake = [
    {
      key: '1',
      exchange: 'Binance',
      volume: '230.8b',
      markets: 3289,
      change: '124%',
    },
    {
      key: '2',
      exchange: 'Coinbase',
      volume: '208.3b',
      markets: 1290,
      change: '89%',
    },
    {
      key: '3',
      exchange: `FTX`,
      volume: '20.4b',
      markets: 1093,
      change: '123%',
    },
  ];

  return (
    <>
      <p>Due to this api costing $50/mo, here is a template of what it would look like</p>
      <Table dataSource={dataFake}>
        <Column title="Exchange" dataIndex='exchange' key={dataFake.key} />
        <Column title="24h Volume" dataIndex="volume" key={dataFake.key} />
        <Column title="Markets" dataIndex="markets" key={dataFake.key} />
        <Column title="Change" dataIndex="change" key={dataFake.key} />
      </Table>
    </>
  )
}

export default Exchanges