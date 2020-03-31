import React from 'react'
import classnames from 'classnames'

import useFetch from '../../Hooks/useFetch';

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {

    const apiUrl = `/articles/${articleSlug}/favorite`;
    const [{response}, doFetch] = useFetch(apiUrl)

    const favoritesCountWithResponse = response 
    ? response.article.favoritesCount 
    : favoritesCount

    const isFavoritedWithResponse = response 
    ? response.article.favorited 
    : isFavorited

    const buttonClasses = classnames({
        btn: true,
        'btn-small': true,
        'btn-primary': isFavoritedWithResponse,
        'btn-outline-primary': !isFavoritedWithResponse
    })

    const handleLike = e => {
        e.preventDefault()        

        doFetch({
            method: isFavoritedWithResponse ? 'delete' : 'post'
        })
    }

    return (
        <button className={buttonClasses} onClick={handleLike}>
            <i>❤️</i>
            <span className=''>&nbsp; {favoritesCountWithResponse}</span>
        </button>
    )
}

export default AddToFavorites