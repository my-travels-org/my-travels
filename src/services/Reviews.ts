
import axios, { AxiosResponse } from 'axios'

import { GetResponseOneReview, GetResponseReviews } from '@/types/models/Review'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

const getAll = async (): Promise<AxiosResponse<GetResponseReviews>> => {
  return await axios.get(`${baseUrl}/review/viewReviews/1`)
}

const getOne = async ({id} : any): Promise<AxiosResponse<GetResponseOneReview>> => {

  return await axios.get(`${baseUrl}/review/viewReview/${id}`)
}

 

export const reviewService = {
  getAll,
  getOne
  
}
