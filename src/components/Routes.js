import React from 'react'

import { Switch, Route } from 'react-router-dom'

import GlobalFeed from './pages/globalFeed/globalFeed'
import Article from './pages/article/article'
import Authentication from './pages/authentication';
import TagFeed from './pages/tagFeed/tagFeed';
import YourFeed from './pages/tagFeed/tagFeed';
import CreateArticle from "./pages/createArticle";
import EditArticle from './pages/editArticle/editArticle'
import Settings from './pages/settings/index.js'

export default () => { 
    return (
        <Switch>
            <Route exact path='/' component={GlobalFeed} />
            <Route path='/settings' component={Settings} />
            <Route path='/articles/new' component={CreateArticle} />
            <Route path='/articles/:slug/edit' component={EditArticle} />
            <Route path='/feed' component={YourFeed} />
            <Route exact path='/tags/:slug' component={TagFeed} />
            <Route path='/login' component={Authentication} />
            <Route path='/register' component={Authentication} />
            <Route path='/articles/:slug' component={Article} />
        </Switch>
    )
}
