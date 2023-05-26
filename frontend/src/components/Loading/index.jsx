import PropTypes from 'prop-types';

import { Load } from './style';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';

export default function Loading() {
  const { isLoading } = useContext(AppContext)

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