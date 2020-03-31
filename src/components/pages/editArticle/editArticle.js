import React, { useEffect, useState, useContext } from 'react'

import ArticleForm from '../components/articleForm'
import useFetch from '../../Hooks/useFetch'
import { Redirect } from 'react-router-dom'
import {CurrentUserContext} from '../../context/currentUser'

const EditArticle = ({match}) => {
    const slug = match.params.slug
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`;
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    const handleSubmit = article => {
        console.log('handleSubmit: ', article)
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) return

        setInitialValues({
            titel: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) return
        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) return <Redirect to='/' />

    if (isSuccessfullSubmit) return <Redirect to={`/articles/${slug}`} />
    
    return (
        <ArticleForm 
        onSubmit={handleSubmit} 
        errors={(updateArticleError && updateArticleError.errors) || {} }
        initialValues={initialValues}
        ></ArticleForm>
    )
}

export default EditArticle