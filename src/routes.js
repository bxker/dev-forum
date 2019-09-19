import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GuestLanding from './Components/GuestLanding/GuestLanding';
import UserLanding from './Components/UserLanding/UserLanding';
import Posts from './Components/Posts/Posts';

export default (
    <Switch>
        <Route exact path="/" component={GuestLanding} />
        <Route exact path="/topics" component={UserLanding} />
        <Route exact path="/posts/:topicID" component={Posts} />
        <Route render={() => {
            return <h1>404 Not Found</h1>
        }} />
    </Switch>
)