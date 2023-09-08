import axios, { AxiosResponse } from 'axios'

import { GetResponseReviews } from '@/types/models/Review'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

const getAll = async (): Promise<AxiosResponse<GetResponseReviews>> => {
  return await axios.get(`${baseUrl}/review/viewReviews/1`)
}

 

export const reviewService = {
  getAll
  
}
