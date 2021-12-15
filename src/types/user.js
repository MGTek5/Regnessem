import PropTypes from 'prop-types';

const UserModel = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileGif: PropTypes.string.isRequired,
});

export default UserModel;
