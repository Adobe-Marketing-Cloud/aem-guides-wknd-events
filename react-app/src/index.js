import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import './index.scss';
import App from './App';
import "./components/MappedComponents";
import ScrollToTop from './utils/RouteHelper';
import {BrowserRouter} from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import isPublishInstance from './utils/is-publish-instance';
import { register } from 'register-service-worker';

function render(model) {
    ReactDOM.render((
        <BrowserRouter>
            <ScrollToTop>
            <Route path="/content/wknd-events/react.html" render={() => (
                <Redirect to="/content/wknd-events/react/home.html"/>
            )}/>
                <App cqChildren={ model[Constants.CHILDREN_PROP] } cqItems={ model[Constants.ITEMS_PROP] } cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
                    cqPath={ ModelManager.rootPath } locationPathname={ window.location.pathname }/>
            </ScrollToTop>
        </BrowserRouter>),
        document.getElementById('root'));
}

ModelManager.initialize().then(render);

// Register service worker if on publish instance (caching is undesirable during development)
if (isPublishInstance()) {
  register(`${process.env.PUBLIC_URL}/service-worker.js`, {
    registrationOptions: { scope: process.env.REACT_APP_AEM_ROOT }
  });
}
