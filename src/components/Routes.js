import React from 'react'

import { Switch, Route } from 'react-router-dom'

import GlobalFeed from './pages/globalFeed/globalFeed'
import Article from './pages/article/article'
import Authentication from "./pages/authentication";
import TagFeed from "./pages/tagFeed/tagFeed";

export default () => {
    return (
        <Switch>
            <Route exact path='/' component={GlobalFeed} />
            <Route exact path='/tags/:slug' component={TagFeed} />
            <Route path='/login' component={Authentication} />
            <Route path='/register' component={Authentication} />
            <Route path='/articles/:slug' component={Article} />
        </Switch>
    )
}
