import { ModelManager } from '@adobe/cq-spa-page-model-manager';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import OfflineBanner from './OfflineBanner';

let onLineGetter;

describe('OfflineBanner ->', () => {
  const ROOT_NODE_CLASS_NAME = 'route-node';
  const CONTENT_PATH = '/content/test/cq/path';

  let rootNode;

  let sandbox = sinon.createSandbox();

  const renderComponent = () => {
    ReactDOM.render(<OfflineBanner />, rootNode);
  };

  const querySpan = () => {
    return rootNode.querySelector('.offline-banner-title');
  };

  const fireWindowEvent = eventType => {
    let evt = new Event(eventType);
    window.dispatchEvent(evt);
  };

  beforeEach(() => {
    sandbox
      .stub(ModelManager, 'getData')
      .withArgs({ pagePath: CONTENT_PATH })
      .resolves({ test: true });

    rootNode = document.createElement('div');
    rootNode.className = ROOT_NODE_CLASS_NAME;
    document.body.appendChild(rootNode);

    ModelManager.initialize();

    expect(document.querySelector('.' + ROOT_NODE_CLASS_NAME)).not.toBeNull();

    onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get');
  });

  afterEach(() => {
    window.location.hash = '';

    if (rootNode) {
      document.body.removeChild(rootNode);
    }

    sandbox.restore();
  });

  it('does not render when online', () => {
    // Start online
    onLineGetter.mockReturnValue(true);

    // Banner should not render
    renderComponent();
    const span = rootNode.querySelector('.offline-banner-title');
    expect(span).toBeNull();
  });

  it('renders when offline', () => {
    // Start offline
    onLineGetter.mockReturnValue(false);

    // Banner should render
    renderComponent();
    const span = querySpan();
    expect(span.innerHTML).toBe('You are offline.');
  });

  it('does not render after going online', () => {
    // Start offline
    onLineGetter.mockReturnValue(false);

    // Render banner
    renderComponent();

    // Go online
    onLineGetter.mockReturnValue(true);
    fireWindowEvent('online');

    // Banner should not render
    const span = querySpan();
    expect(span).toBeNull();
  });

  it('renders after going offline', () => {
    // Start online
    onLineGetter.mockReturnValue(true);

    // Render banner
    renderComponent();

    // Go offline
    onLineGetter.mockReturnValue(false);
    fireWindowEvent('offline');

    // Banner should render
    const span = querySpan();
    expect(span.innerHTML).toBe('You are offline.');
  });
});
