import React, { useEffect, Fragment } from 'react'
import { stringify } from 'query-string'

import { getPaginator, limit } from '../../pagination/utils'
import useFetch from '../../Hooks/useFetch'
import Loading from './loading'
import ErrorMessage from './errorMessage'
import Feed from './feed'
import Pagination from '../../pagination/pagination'

const getApiUrl = ({username, offset, isFavorites}) => {
    const params = isFavorites
    ? {
        limit,
        offset,
        favorited: username
      }
    : {
        limit,
        offset,
        author: username
      }

    return `/articles/${stringify(params)}`
}

const UserArticles = ({username, location, isFavorites, url}) => {
    const {offset, currentPage} = getPaginator(location.search)
    const apiUrl = getApiUrl({username, offset, isFavorites})
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch, isFavorites])

    return (
        <div className=''>
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response (
                <Fragment>
                    <Feed articles={response.articles} />
                    <Pagination 
                        total={response.articlesCount}
                        limit={limit} 
                        url={url} 
                        currentPage={currentPage} />
                </Fragment>
            )}
        </div>
    )
}

export default UserArticles