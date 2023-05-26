import PropTypes from 'prop-types';

import { Load } from './style';

export default function Loading(props) {
  const {isLoading} = props

  return(
    <>
      {isLoading && (
        <Load>
          <div className="loading"></div>
        </Load>
      )}
    </>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
}.isRequired;