import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState(null)

  const [feedbackType, setFeedbackType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const context = useMemo(() => ({
    tableData, setTableData,
    selectedFile, setSelectedFile,
    feedbackType, setFeedbackType,
    isLoading, setIsLoading,
  }), [tableData, selectedFile, feedbackType, isLoading]);

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