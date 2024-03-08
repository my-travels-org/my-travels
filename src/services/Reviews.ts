
import axios, { AxiosResponse } from 'axios'

import { GetResponseOneReview, GetResponseReviews } from '@/types/models/Review'
import { CreateTripDTO } from '@/types/Trip'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

const getAll = async (): Promise<AxiosResponse<GetResponseReviews>> => {
  return await axios.get(`${baseUrl}/review/viewReviews`)
}

const getOne = async ({ id }: any): Promise<AxiosResponse<GetResponseOneReview>> => {
  return await axios.get(`${baseUrl}/review/viewReview/${id as string}`)
}

const create = async (payload: CreateTripDTO): Promise<AxiosResponse<any>> => {
  return await axios.post(`${baseUrl}/review/createReview`, payload)
}

const saveOneReview = async ({ id, token }: { id: number, token: string }): Promise<AxiosResponse<any>> => {
  return await axios.post(`${baseUrl}/review/saveUserReview/${id}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const reviewService = {
  getAll,
  getOne,
  create,
  saveOneReview
}
