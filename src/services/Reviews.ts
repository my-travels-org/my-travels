
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

const saveOneReview = async ({ id }: { id: number }): Promise<AxiosResponse<any>> => {
  return await axios.post(`${baseUrl}/review/saveUserReview/${id}`, { id }, {
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbXktdHJhdmVscy1hcGktcHJvZHVjdGlvbi51cC5yYWlsd2F5LmFwcC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTcwOTYwNDkxNSwiZXhwIjoxNzA5NjA4NTE1LCJuYmYiOjE3MDk2MDQ5MTUsImp0aSI6IkhyVzRtRGpYSnkxVWc0Z3EiLCJzdWIiOiIzMCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IM574ag27ElII_JBpvBEJpWRm0ydnXWA1GhgD8O4SVY'
    }
  })
}

export const reviewService = {
  getAll,
  getOne,
  create,
  saveOneReview
}
