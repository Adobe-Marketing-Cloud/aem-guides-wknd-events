import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
import Header from './components/header/Header';

// This component is the application entry point
class App extends Page {

    render() {
        return (
            <div className="App">
                <Header />
                <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>
            </div>
          );
    }
}

export default withModel(App);