import React, { useEffect, useContext, useState } from 'react'
import { Link, Redirect } from "react-router-dom";

import useFetch from "../../Hooks/useFetch";
import Loading from "../components/loading";
import ErrorMessage from "../components/errorMessage";
import TagList from "../components/tagList";
import {CurrentUserContext} from '../../context/currentUser'

const Article = (props) => {
    const slug = props.match.params.slug;
    const apiUrl =  `/articles/${slug}`;

    const [
        {
            response: fetchArticleResponse, 
            error: fetchArticleError, 
            isLoading: fetchArticleIsLoading
        }, doFetch] = useFetch(apiUrl);

    const [isSuccessfullDelet, setIsSuccessfullDelet] = useState(false)
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)

    const isAuthor = () => {
        if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false

        return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
    }

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete'
        })
    }


    useEffect(() => {
        doFetch()
    }, [doFetch])

    useEffect(() => {
        if(!deleteArticleResponse) return 

        setIsSuccessfullDelet(true)
    }, [deleteArticleResponse])

    if(isSuccessfullDelet) return <Redirect to='/' />

    return (
        <div className='article-page'>
            <div className='banner'>
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='container'>
                        <h1>{fetchArticleResponse.article.title}</h1>
                        <div className='article-meta'>
                            <Link to={`/profiels/${fetchArticleResponse.article.author.username}`}>
                                <img src={fetchArticleResponse.article.author.image} alt='' />
                            </Link>
                            <div className='info'>
                                <Link to={`/profiels/${fetchArticleResponse.article.author.username}`}>
                                    {fetchArticleResponse.article.author.username}
                                </Link>
                                <span className='data'>{fetchArticleResponse.article.createdAt}</span>
                            </div>
                            {isAuthor() && (
                                <span>
                                    <Link 
                                    lassName='btn btn-outline-secondery btn-small' 
                                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
                                        <i className='ion-edit'></i>
                                        Edit Article
                                    </Link>
                                    <button 
                                    className='btn btn-outline-danger btn-sm' 
                                    onClick={deleteArticle}>
                                        <i className='ion-thash-a'></i>
                                        Delete
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className='container page'>
                {fetchArticleIsLoading && <Loading/>}
                {fetchArticleError && <ErrorMessage/>}
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='row article-content'>
                        <div className='col-xs-12'>
                            <div>
                                <p>{fetchArticleResponse.article.body}</p>
                            </div>
                            <TagList tags={fetchArticleResponse.article.tagList} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Article
