import { useEffect, useContext } from 'react'

import useFetch from '../Hooks/useFetch'
import { CurrentUserContext } from './currentUser'
import useLocalStorage from '../Hooks/useLocalStorage'

const CurrentUserChecker = ({children}) => {
    const [, setCurrentUserState] = useContext(CurrentUserContext)
    const [{response}, doFetch] = useFetch('/user')
    const [token] = useLocalStorage('token')
  
    useEffect(() => {
      if (!token) {
        setCurrentUserState(state => ({
          ...state,
          isLoggedIn: false
        }))
        return
      }
  
      doFetch()
      setCurrentUserState(state => ({
        ...state,
        isLoading: true
      }))
    }, [doFetch, setCurrentUserState, token])
  
    useEffect(() => {
      if (!response) {
        return
      }
  
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: response.user
      }))
    }, [response, setCurrentUserState])
    return children
  }

export default CurrentUserChecker