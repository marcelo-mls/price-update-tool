import PropTypes from 'prop-types';

export default function Loading(props) {
  const {isLoading} = props

  return(
    <>
      {isLoading && (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
}.isRequired;