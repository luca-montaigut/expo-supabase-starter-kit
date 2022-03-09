import React from 'react';
import { Text, Input, Title } from 'src/components';
import { Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'src/contexts/AuthProvider';

export const LoginScreen = () => {
  const { loginWithEmailAndPassword, registerWithEmailAndPassword } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const register = ({ email, password }: { email: string; password: string }) =>
    registerWithEmailAndPassword(email, password);

  const login = ({ email, password }: { email: string; password: string }) =>
    loginWithEmailAndPassword(email, password);

  return (
    <>
      <Title>Welcome</Title>
      <Text>Please register or login</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Login" color={'red'} onPress={handleSubmit(login)} />
      <Button
        title="Register"
        color={'blue'}
        onPress={handleSubmit(register)}
      />
    </>
  );
};
