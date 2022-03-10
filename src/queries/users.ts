import { Alert } from 'react-native';
import { supabase } from 'src/services/supabaseClient';

export type UserProfile = {
  id: string;
  email: string;
  first_name: string | undefined;
  last_name: string | undefined;
};

export const getUserProfile = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', id);
    if (error) throw new Error(`Error ${error.code}: ${error.message}`);
    if (data !== null) {
      return data[0] as UserProfile;
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('An error occured', error.message);
    }
    console.error(error);
  }
  return null;
};
