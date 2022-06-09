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
            query: () => createRequest('/coins')
        })
    })
});

export const { useGetCryptosQuery } = cryptoAPI;
