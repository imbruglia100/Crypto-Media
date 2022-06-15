import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoAPIHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '699bcbd3e6msh2e191c511d29987p132ec2jsn5bb54351c4f8'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';


const createRequest = (url) => ({url: url, headers: cryptoAPIHeaders})
 
export const cryptoAPI = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
        getExchanges: builder.query({
            query: (count) => createRequest(`/exchanges?limit=${count}`)
        }),
    })
});



export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoAPI;
