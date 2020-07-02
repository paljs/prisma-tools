import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useContext, useState } from 'react';
import Auth, { Group } from 'Components/Auth';
import Socials from 'Components/Auth/Socials';
import { useLoginMutation } from 'generated';
import { LayoutContext } from 'Layouts/Admin';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [login] = useLoginMutation();
  const { refetch } = useContext(LayoutContext);
  const router = useRouter();
  const [state, setState] = useState({
    email: '',
    password: '',
    checkbox: false,
  });

  const onChange = (value: any, name: string) => {
    setState({ ...state, [name]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      variables: {
        email: state.email,
        password: state.password,
      },
    }).then(({ data, errors }) => {
      if (!errors && data?.login && refetch) {
        refetch().then(() => router.push('/admin'));
      }
    });
  };

  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <form onSubmit={onSubmit}>
        <InputGroup fullWidth>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={state.email}
            onChange={(event) => onChange(event.target.value, 'email')}
          />
        </InputGroup>
        <InputGroup fullWidth>
          <input
            type="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={(event) => onChange(event.target.value, 'password')}
          />
        </InputGroup>
        <Group>
          <Checkbox checked={state.checkbox} onChange={(value) => onChange(value, 'checkbox')}>
            Remember me
          </Checkbox>
          <Link href="/admin/auth/request-password">
            <a>Forgot Password?</a>
          </Link>
        </Group>
        <Button disabled={!state.email || !state.password} status="Success" shape="SemiRound" fullWidth>
          Login
        </Button>
      </form>
      <Socials />
      <p>
        Don&apos;t have account?{' '}
        <Link href="/admin/auth/register">
          <a>Register</a>
        </Link>
      </p>
    </Auth>
  );
}
