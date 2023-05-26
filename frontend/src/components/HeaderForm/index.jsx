import { useContext, useEffect, useRef } from 'react';
import AppContext from '../../contexts/AppContext';
import { fetchAndValidateProducts, updateProducts } from '../../utils/api';
import csvReader from '../../utils/csvReader';
import toast from 'react-hot-toast';
import { StyledHeader, FileInput } from './style';

export default function HeaderForm() {
  const inputRef = useRef(null);

  const {
    tableData,
    setTableData,
    selectedFile,
    setSelectedFile,
    isInvalidFile,
    setIsInvalidFile,
    setFeedbackType,
    isInvalidData,
    setIsInvalidData,
    setIsLoading,
  } = useContext(AppContext)

  const fetchApi = () => {
    setFeedbackType(null)
    setTableData(null)
    setIsLoading(true)
    setTimeout(async () => {
      const response = await fetchAndValidateProducts(selectedFile.data);
      if (response.status !== 200) {
        setIsLoading(false)
        return toast.error('Ops! Algo deu errado.')
      }
      handleDataValidation(response.data)
      setTableData(response.data)
      setIsLoading(false)
      toast.success('Validação Concluída!')
    }, Math.floor(Math.random() * 1500));
  };

  const handleUpdate = async () => {
    setIsLoading(true)
    setTimeout(async () => {
      const response = await updateProducts(tableData);
      inputRef.current.value = null;
      resetComponents();
      setIsLoading(false)
      if (response.status === 200) {
        toast.success('Atualização Concluída!')
      } else {
        toast.error('Ops! Algo deu errado.')
      }
    }, Math.floor(Math.random() * 1500));
  };

  const handleFileSelect = async (event) => {
    resetComponents();
    const file = event.target.files[0]
    const csvData = await csvReader(file)
    setSelectedFile(csvData)
  };

  const handleFileValidation = () => {
    if (!selectedFile) {
      setIsInvalidFile(true)
    } else if (selectedFile.headers.length !== 2
        || selectedFile.data.length === 0
        || !selectedFile.headers.includes('product_code')
        || !selectedFile.headers.includes('new_price')
      ) {
      setIsInvalidFile(true)
      setFeedbackType('error')
    } else {
      setIsInvalidFile(false)
      setFeedbackType('success')
    }
  };

  const resetComponents = () => {
    setTableData(null)
    setIsInvalidData(true)
  };

  const handleDataValidation = (data) => {
    const isValidData = data.every((row) => row.validation.length === 0)
    setIsInvalidData(!isValidData)
  };

  useEffect(() => {
    handleFileValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <StyledHeader>
      <h1>Ferramenta de Atualização de Preços</h1>
      <div>
        <FileInput type="file" accept=".csv" ref={inputRef} onChange={handleFileSelect}/>
        <button type='button' disabled={isInvalidFile} onClick={fetchApi}>Validar</button>
        <button type='button' disabled={isInvalidData} onClick={handleUpdate}>Atualizar</button>
      </div>
    </StyledHeader>
  );
}