import React, { Component } from 'react';
import './OfflineBanner.scss';

/**
 * Banner which warns the user when they are not connected to the internet. The component is only
 * rendered when the user is not online
 */
export default class OfflineBanner extends Component {
  // Hide banner on initial render
  state = {
    isOnline: true
  };

  componentDidMount() {
    // Show banner if browser is offline
    this.setState({
      isOnline: navigator.onLine
    });

    // Update the state when "online"/"offline" events are fired
    window.addEventListener('online', () => this.setState({ isOnline: true }));
    window.addEventListener('offline', () =>
      this.setState({ isOnline: false })
    );
  }

  render() {
    const { isOnline } = this.state;

    // If online: Do not render component
    if (isOnline) {
      return null;
    }

    // If offline: Render banner with warning
    return (
      <div className="offline-banner-outer">
        <div className="offline-banner-inner">
          <p className="offline-banner-content">
            <span role="img" aria-label="Warning">
              ⚠️
            </span>
            &nbsp;
            <span className="offline-banner-title">You are offline.</span>
            &nbsp;
            <span className="offline-banner-msg">
              Please connect to the internet to see the latest information.
            </span>
          </p>
        </div>
      </div>
    );
  }
}
