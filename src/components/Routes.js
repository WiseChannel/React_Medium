import React from 'react'

//import  Components
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './pages/globalFeed/globalFeed'
import Article from './pages/article/article'
import Authentication from "./pages/authentication";

export default () => {
    return (
        <Switch>
            <Route exact path='/' component={GlobalFeed} />
            <Route path='/login' component={Authentication} />
            <Route path='/register' component={Authentication} />
            <Route path='/articles/:slug' component={Article} />
        </Switch>
    )
}