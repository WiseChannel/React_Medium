import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import useFetch from '../../Hooks/useFetch'

const UserProfile = ({match}) => {
    const slug = match.params.slug
    const apiUrl = `/profiels/${slug}`
    const [{response}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    },[doFetch])

    if(!response) return null

    return (
        <div className='profile-page'>
            <div className='user-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-10 offset-md-1'>
                            <img className='user-img' alt='' src={response.profile.image}/>
                            <h4>{response.profile.username}</h4>
                            <p>{response.profile.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-md-10 offset-md-1'>
                        <div className='articles-toggle'>
                            <ul className='nav nav-pills outline-active'>
                                <li className='nav-item'>
                                    <NavLink 
                                    to={`/profiles/${response.profile.username}`} className='nav-link' exact>
                                        My Post
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink 
                                    to={`/profiles/${response.profile.username}/favorites`}
                                    className='nav-link'
                                    >
                                        Favortires Post
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        User Articles
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile