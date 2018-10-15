
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

    isEmpty: function() {
        return !this.props || !this.props.lat || !this.props.lng;
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

            return (  <GoogleMapReact
                bootstrapURLKeys={{ key: this.props.apiKey }}
                defaultCenter={params.center}
                defaultZoom={params.zoom}>
                {label}
              </GoogleMapReact>
            );
        }
        return <div>No api key defined! Map cannot be rendered</div>;
    }

    render() {
        return ( <div className="Gmap">
            {this.map}
            </div>);
    }
}

MapTo('wknd-events/components/content/gmap')(Gmap, GmapEditConfig);
