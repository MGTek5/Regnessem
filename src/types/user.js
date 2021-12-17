import PropTypes from 'prop-types';

const UserModel = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileGif: PropTypes.string,
});

export default UserModel;
