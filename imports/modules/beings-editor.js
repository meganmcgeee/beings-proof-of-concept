/* eslint-disable no-undef */

import './validation.js';

import { browserHistory } from 'react-router';
import { upsertBeing } from '../api/documents/methods.js';

let component;

const handleUpsert = () => {
  const { being } = component.props;
  const confirmation = beingInstance && beingInstance._id ? 'Being updated!' : 'Being added!';
  const upsert = {
    title: being.querySelector('[name="title"]').value.trim(),
    body: being.querySelector('[name="body"]').value.trim(),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertBeing.call(upsert, (error, response) => {
    if (error) {
      console.log('ERR');
      // Bert.alert(error.reason, 'danger');
    } else {
      component.beingEditorForm.reset();
      console.log('sucess!!')
      browserHistory.push(`/beings/${response.insertedId || beingInstance._id}`);
    }
  });
};

const validate = () => {
  $(component.beingEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Need a title in here, Seuss.',
      },
      body: {
        required: 'This thneeds a beingbody, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function being(options) {
  component = options.component;
  validate();
}
