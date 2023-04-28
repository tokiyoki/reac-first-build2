import { useState, useEffect, useCallback } from 'react';
import API from './API.js';

export function useLoad(endpoint) {

  // State
  const [records, setRecords] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  // Methods
  const loadRecords = useCallback(async () => {
    const response = await API.get(endpoint);
    if(response.isSuccess){
      setRecords(response.result)
    } else {
      setLoadingMessage(response.message); 
      setRecords([]);
    }
  },[endpoint]);

  useEffect(() => { loadRecords() }, [loadRecords]);

  // Return
  return [records, setRecords, loadingMessage, loadRecords];
}

export default useLoad;

