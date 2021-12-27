import PropTypes from 'prop-types';
import UserModel from './user';

const MessageModel = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  author: UserModel.isRequired,
});

export default MessageModel;
