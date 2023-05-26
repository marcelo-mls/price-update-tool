import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState(null)

  const [isFileValid, setIsFileValid] = useState(true);
  const [isDataValid, setIsDataValid] = useState(true);
  
  const [feedbackType, setFeedbackType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const context = useMemo(() => ({
    tableData, //table
    setTableData,
    selectedFile, //feedback
    setSelectedFile,
    isFileValid,
    setIsFileValid,
    feedbackType, //feedback
    setFeedbackType,
    isDataValid,
    setIsDataValid,
    isLoading,  //loading
    setIsLoading,
  }), [tableData, selectedFile, isFileValid, feedbackType, isDataValid, isLoading]);

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