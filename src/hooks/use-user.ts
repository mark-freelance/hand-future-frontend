import { skipToken } from "@reduxjs/toolkit/query"
import { useEffect, useState } from "react"

import type { IUserWithId } from "../schema/user"
import { useGetUserQuery } from "../store/states/api/userApi"

/**
 * todo: clerk
 */
export const useUserId = (): string | undefined => {
  return "demo"
}

export const useUser = (): IUserWithId | null => {
  const [user, setUser] = useState<IUserWithId | null>(null)
  const userId = useUserId()

  const { data: userData } = useGetUserQuery(userId ? { id: userId } : skipToken)
  // console.log({ userData })

  useEffect(() => {
    if (!userData) return
    setUser(userData)
  }, [userData])

  return user
}

export const useSelf = (id: string | undefined): boolean => {
  const yourId = useUserId()
  return id ? yourId === id : false
}

export const useAdmin = (): boolean => {
  const user = useUser()

  return user?.email === "877210964@qq.com" || user?.role === "admin"
}
