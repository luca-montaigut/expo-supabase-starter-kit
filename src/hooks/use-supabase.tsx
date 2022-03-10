import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useSupabaseQuery = (query: any) => {
  const [queryState, setQueryState] = useState<{
    data: any;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await query;
        if (error) throw new Error(`Error ${error.code}: ${error.message}`);
        setQueryState(prev => ({ ...prev, data, loading: false, error: null }));
      } catch (error) {
        if (error instanceof Error) {
          setQueryState(prev => ({
            ...prev,
            data: null,
            loading: false,
            error: error as Error,
          }));
          Alert.alert('An error occured', error.message);
        }
        console.error(error);
      }
    })();
  }, []);

  return queryState;
};

export const useSupabaseMutation = () => {
  const [mutationState, setMutationState] = useState<{
    data: any;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (mutation: any) => {
    setMutationState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data, error } = await mutation;
      if (error) throw new Error(`Error ${error.code}: ${error.message}`);
      setMutationState(prev => ({
        ...prev,
        data,
        loading: false,
        error: null,
      }));
    } catch (error) {
      if (error instanceof Error) {
        setMutationState(prev => ({
          ...prev,
          data: null,
          loading: false,
          error: error as Error,
        }));
        Alert.alert('An error occured', error.message);
      }
      console.error(error);
    }
  };

  return { ...mutationState, execute };
};
