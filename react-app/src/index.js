import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import './index.scss';
import App from './App';
import "./components/MappedComponents";

function render(model) {
    ReactDOM.render((
        <App cqChildren={ model[Constants.CHILDREN_PROP] } cqItems={ model[Constants.ITEMS_PROP] } cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
            cqPath={ ModelManager.rootPath } locationPathname={ window.location.pathname }/>), document.getElementById('root'));
}

ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);