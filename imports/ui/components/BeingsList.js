import React from 'react';
import { browserHistory } from 'react-router';
// import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (_id) => {
  browserHistory.push(`/beings/${_id}`);
}

const BeingsList = ({ beings }) => (
  beings.length > 0 ? <ListGroup className="BeingsList">
    {beings.map(({ _id, title }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { title }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No Beings yet.</Alert>
);

BeingsList.propTypes = {
  beings: React.PropTypes.array,
};

export default BeingsList;
