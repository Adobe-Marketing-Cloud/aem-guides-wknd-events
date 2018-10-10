import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';

// This component is the application entry point
class App extends Page {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to AEM + React</h1>
                </header>
                <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>
            </div>
          );
    }
}

export default withModel(App);