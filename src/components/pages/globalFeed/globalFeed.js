import React, { useEffect, Fragment } from 'react'

import useFetch from '../../Hooks/useFetch'
import Feed from '../../feed'

const GlobalFeed = () => {

    const apiUrl = '/articles?limit=10&offset=0'
    const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
    console.log('Response from globalFeed: ', response);
    
    useEffect(() => {
        doFetch()
    }, [doFetch])

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