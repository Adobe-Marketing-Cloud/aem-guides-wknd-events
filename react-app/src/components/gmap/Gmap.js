
import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import GoogleMapReact from 'google-map-react';

import "./Gmap.scss";

/**
 * Map Edit Config
 * 
 * @type EditConfig
 */
const GmapEditConfig = {

    emptyLabel: 'Google Map',

    isEmpty: function(props) {
        return !props || !props.lat || !props.lng;
    }
};

const Label = ({ text }) => (
    <div className="Gmap-label">
      {text}
    </div>
  );
 

/**
 * Map React component
 */
export default class Gmap extends Component {

    get isReady() {

        if(this.props.apiKey && this.props.lat && this.props.lng) {
            return true;
        }
        return false;
    }

    get map() {
        
        if(this.isReady) {
            let zoom = this.props.zoom || 11;
            let params = {
                center: {
                    lat: this.props.lat,
                    lng: this.props.lng
                },
                zoom: zoom
            };
            let label;

            if(this.props.label != null) {
                label = <Label lat={params.center.lat} lng={params.center.lng} text={this.props.label} />;
            }

            return (  
                <div className="Gmap">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.props.apiKey }}
                        defaultCenter={params.center}
                        defaultZoom={params.zoom}>
                        {label}
                </GoogleMapReact>
                </div>
              
            );
        }

        if(!this.props.apiKey) {
            return <div>No api key defined! Map cannot be rendered</div>;
        }

        return null;
        
    }

    render() {
        return this.map;
    }
}

MapTo('wknd-events/components/content/gmap')(Gmap, GmapEditConfig);
