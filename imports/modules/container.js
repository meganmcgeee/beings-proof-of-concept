import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';

const getTrackerLoader = reactiveMapper => (
(props, onData, env) => {
  let trackerCleanup = null;

  const handler = Tracker.nonreactive(() => Tracker.autorun(() => {
    trackerCleanup = reactiveMapper(props, onData, env);
  }));

  return () => {
    if (typeof trackerCleanup === 'function') trackerCleanup();
    return handler.stop();
  };
});

export default function container(composer, Component, options = {}) {
  return compose(getTrackerLoader(composer), options)(Component);
}