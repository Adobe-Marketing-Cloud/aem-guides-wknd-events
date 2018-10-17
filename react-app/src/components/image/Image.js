import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';

/**
 * Default Edit configuration for the Image component that interact with the Core Image component and sub-types
 *
 * @type EditConfig
 */
const ImageEditConfig = {

    emptyLabel: 'Image',

    isEmpty: function(props) {
        return !props || !props.src || props.src.trim().length < 1;
    }
};

/**
 * Image React Component
 * 
 */
class Image extends Component {

    get content() {
        return <img src={this.props.src} alt={this.props.alt}
            title={this.props.displayPopupTitle && this.props.title}/>
    }

    render() {
        return (<div className="Image">
                {this.content}
            </div>);
    }
}

MapTo('wknd-events/components/content/image')(Image, ImageEditConfig);