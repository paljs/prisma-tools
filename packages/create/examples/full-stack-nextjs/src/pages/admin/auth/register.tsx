import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useContext, useState } from 'react';

import Auth from 'Components/Auth';
import Socials from 'Components/Auth/Socials';
import { useSignupMutation } from 'generated';
import { LayoutContext } from 'Layouts/Admin';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const { refetch } = useContext(LayoutContext);
  const [signup] = useSignupMutation();
  const router = useRouter();
  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    checkbox: false,
  });

  const onChange = (value: any, name: string) => {
    setState({ ...state, [name]: value });
  };

  let disabled = false;

  (Object.keys(state) as (keyof typeof state)[]).forEach((key) => {
    if (!disabled) {
      disabled = !state[key];
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({
      variables: {
        email: state.email,
        password: state.password,
        name: state.name,
      },
    }).then(({ data, errors }) => {
      if (!errors && data?.signup && refetch) {
        refetch().then(() => router.push('/admin'));
      }
    });
  };

  return (
    <Auth title="Create new account">
      <form onSubmit={onSubmit}>
        <InputGroup fullWidth>
          <input
            type="text"
            placeholder="Username"
            required
            value={state.name}
            onChange={(event) => onChange(event.target.value, 'name')}
          />
        </InputGroup>
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
        <InputGroup fullWidth style={{ flexDirection: 'column' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={state.confirmPassword}
            onChange={(event) => onChange(event.target.value, 'confirmPassword')}
          />
          {state.confirmPassword && state.password !== state.confirmPassword && (
            <span className="caption-2 status-Danger">Password and Confirm Password must be match</span>
          )}
        </InputGroup>
        <Checkbox checked={state.checkbox} onChange={(value) => onChange(value, 'checkbox')}>
          Agree to{' '}
          <Link href="/">
            <a>Terms & Conditions</a>
          </Link>
        </Checkbox>
        <Button disabled={disabled} status="Success" shape="SemiRound" fullWidth>
          Register
        </Button>
      </form>
      <Socials />
      <p>
        Already have an account?{' '}
        <Link href="/admin/auth/login">
          <a>Log In</a>
        </Link>
      </p>
    </Auth>
  );
}
