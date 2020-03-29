import React, { useEffect, Fragment } from 'react'
import {stringify} from "query-string";

import useFetch from '../../Hooks/useFetch'
import Feed from '../../feed'
import Pagination from "../../pagination/pagination";
import { getPaginator, limit } from "../../pagination/utils";

const GlobalFeed = ({location, match}) => {

    const {offset, currentPage} = getPaginator(location.search)
    console.log('off, currP: ', currentPage, offset)
    const stringifiedParams = stringify({
         limit,
         offset
    })
    const url = match.url
    const apiUrl = `/articles?${stringifiedParams}`
    const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
    console.log('Response from globalFeed: ', response);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>
                    <h1>Medium clone</h1>
                    <p>A place to share</p>
                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                <div className="col-md-9">
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Some error happened</div>}
                    {!isLoading && response && (
                        <Fragment>
                            <Feed articles={response.articles} />
                            <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                        </Fragment>
                        )}
                 </div>
                    <div className='col-md-3'>
                        Popular tags
                    </div>
                </div>
            </div>
        </div>
        )
}

export default GlobalFeed
