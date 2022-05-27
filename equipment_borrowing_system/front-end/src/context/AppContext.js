import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useCookies } from 'react-cookie';

const ME_QUERY = gql`
query{
    me{
      _id
      studentId
      email
      role
      fullname
    }
  }`;
const LOGIN_MUTATION = gql`
mutation ($email: String!) {
  login(email: $email) {
    status
    message
    token
  }
}
`;

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [loadMe, { data, loading, refetch }] = useLazyQuery(ME_QUERY, { fetchPolicy: 'network-only' })
  const [loginMutation] = useMutation(LOGIN_MUTATION)
  const login = useCallback(
    async (email) => {
      const { data: loginData } = await loginMutation({ variables: { email } })
      if (loginData?.login?.token) {
        setCookie('token', loginData.login.token, { maxAge: 86400, path: '*' })
        await loadMe()
      } else {
        throw new Error(loginData?.login?.message)
      }
    },
    [loadMe, loginMutation, setCookie],
  )
  const logout = useCallback(
    () => {
      removeCookie('token', { maxAge: 86400, path: '*' })
      setUser(null)
    },
    [removeCookie],
  )
  useEffect(
    () => {
      if (data?.me) {
        setUser(data.me ?? null)
      }
    },
    [data],
  )
  useEffect(
    () => {
      const loadData = async () => {
        try {
          await loadMe()
        } catch (err) {
          setUser(null)
          throw err
        }
      }
      if (cookies.token) {
        loadData().catch(console.error)
      }
    },
    [cookies.token, loadMe],
  )
  const value = useMemo(
    () => ({
      refetch,
      loading,
      user,
      login,
      logout,
      loadMe,
      data
    }),
    [refetch,loading, login, logout, user, loadMe, data],
  )
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export const useApp = () => useContext(AppContext)