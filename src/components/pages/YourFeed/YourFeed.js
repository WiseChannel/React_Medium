import React, { useEffect, Fragment } from 'react'
import {stringify} from "query-string";

import useFetch from '../../Hooks/useFetch'
import Feed from '../components/feed'
import Pagination from "../../pagination/pagination";
import { getPaginator, limit } from "../../pagination/utils";
import PopularTags from "../../popularTags/popularTags";
import Loading from "../components/loading";
import ErrorMessage from "../components/errorMessage";
import FeedTogler from "../components/feedTogler";

const YourFeed = ({location, match}) => {

    const {offset, currentPage} = getPaginator(location.search)
    const stringifiedParams = stringify({
         limit,
         offset
    })
    const url = match.url
    const apiUrl = `/articles/feed?${stringifiedParams}`
    const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)

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
                    <FeedTogler/>
                    {isLoading && <Loading/>}
                    {error && <ErrorMessage/>}
                    {!isLoading && response && (
                        <Fragment>
                            <Feed articles={response.articles} />
                            <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                        </Fragment>
                        )}
                 </div>
                    <div className='col-md-3'>
                        <PopularTags/>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default YourFeed
