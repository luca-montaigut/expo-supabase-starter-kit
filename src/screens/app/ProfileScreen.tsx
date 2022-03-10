import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from 'react-native';
import { Layout, Text, Switch, Input, Title } from 'src/components';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { useSupabaseMutation } from 'src/hooks/use-supabase';
import { supabase } from 'src/services/supabaseClient';

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { logout, updateCurrentUser } = useAuth();
  const user = useCurrentUser();

  const { loading, execute } = useSupabaseMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
    },
  });
  const watchFirstName = watch('first_name');
  const watchLastName = watch('last_name');

  const updateProfile = async ({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) => {
    await execute(
      supabase
        .from('profile')
        .update({ first_name, last_name })
        .eq('id', user.id),
    );
    updateCurrentUser({ first_name, last_name });
    Alert.alert(t('profileUpdated'));
  };

  const username = user.first_name
    ? user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.first_name
    : user.email;

  return (
    <Layout>
      <Title>{t('common:helloWorld')}</Title>
      <Text>{username}</Text>
      <Switch />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="first_name"
        defaultValue={user.first_name}
      />
      {errors.first_name && <Text>{t('common:required')}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="last_name"
        defaultValue={user.last_name}
      />
      {errors.last_name && <Text>{t('common:required')}</Text>}
      <Button
        title={t('common:update')}
        color={'blue'}
        onPress={handleSubmit(updateProfile)}
        disabled={
          loading ||
          (watchFirstName === user.first_name &&
            watchLastName === user.last_name)
        }
      />
      <Button title={t('common:logout')} color={'red'} onPress={logout} />
    </Layout>
  );
};
