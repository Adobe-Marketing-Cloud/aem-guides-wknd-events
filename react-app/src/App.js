import React from 'react';
import { Page, withModel} from '@adobe/cq-react-editable-components';
import Header from './components/header/Header';

// This component is the application entry point
class App extends Page {

    render() {
        return (
            <div className="App">
                <Header navigationRoot="/content/wknd-events/react/home" />
                    { this.childComponents }
                    { this.childPages }
            </div>
          );
    }
}

export default withModel(App);