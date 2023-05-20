import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInvalidFile, setIsInvalidFile] = useState(true);
  const [feedbackType, setFeedbackType] = useState(null);
  const [tableData, setTableData] = useState(null)
  const [isInvalidData, setIsInvalidData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const context = useMemo(() => ({
    tableData,
    setTableData,
    selectedFile,
    setSelectedFile,
    isInvalidFile,
    setIsInvalidFile,
    feedbackType,
    setFeedbackType,
    isInvalidData,
    setIsInvalidData,
    isLoading,
    setIsLoading,
  }), [tableData, selectedFile, isInvalidFile, feedbackType, isInvalidData, isLoading]);

  useEffect(() => {
    
  }, []);

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;