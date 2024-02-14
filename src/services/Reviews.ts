
import axios, { AxiosResponse } from 'axios'

import { GetResponseOneReview, GetResponseReviews } from '@/types/models/Review'
import { CreateTripDTO } from '@/types/Trip'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

const getAll = async (): Promise<AxiosResponse<GetResponseReviews>> => {
  return await axios.get(`${baseUrl}/review/viewReviews/1`)
}

const getOne = async ({ id }: any): Promise<AxiosResponse<GetResponseOneReview>> => {
  return await axios.get(`${baseUrl}/review/viewReview/${id as string}`)
}

const create = async (payload: CreateTripDTO): Promise<AxiosResponse<any>> => {
  return await axios.post(`${baseUrl}/review/createReview`, payload)
}

export const reviewService = {
  getAll,
  getOne,
  create
}
