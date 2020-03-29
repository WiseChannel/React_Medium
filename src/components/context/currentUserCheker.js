import { useEffect, useContext } from 'react'

import useFetch from '../Hooks/useFetch'
import { CurrentUserContext } from './currentUser'
import useLocalStorage from '../Hooks/useLocalStorage'

const CurrentUserChecker = ({children}) => {
    const [, dispatch] = useContext(CurrentUserContext)
    const [{response}, doFetch] = useFetch('/user')
    const [token] = useLocalStorage('token')

    useEffect(() => {
      if (!token) {
        dispatch({type: 'SET_UNAUTHORIZED'})
        return
      }

      doFetch();
        dispatch({type: 'LOADING'})
    }, [doFetch, dispatch, token])

    useEffect(() => {
      if (!response) {
        return
      }

      dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, dispatch])
    return children
  }

export default CurrentUserChecker
