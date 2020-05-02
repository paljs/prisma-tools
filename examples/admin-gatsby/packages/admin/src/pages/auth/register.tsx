import { InputGroup, Checkbox, Button } from 'oah-ui';
import React, { useContext, useState } from 'react';
import { Link, navigate } from 'gatsby';

import Auth from '../../components/Auth';
import SEO from '../../components/SEO';
import Socials from '../../components/Auth/Socials';
import { useSignupMutation } from '../../generated';
import { LayoutContext } from '../../Layouts';

export default function Register() {
  const { refetch } = useContext(LayoutContext);
  const [signup] = useSignupMutation();
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
        localStorage.setItem('token', data.signup.token);
        refetch().then(() => navigate('dashboard'));
      }
    });
  };

  return (
    <Auth title="Create new account">
      <SEO title="Register" keywords={['OAH', 'application', 'react']} />
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
          Agree to <Link to="/">Terms & Conditions</Link>
        </Checkbox>
        <Button disabled={disabled} status="Success" shape="SemiRound" fullWidth>
          Register
        </Button>
      </form>
      <Socials />
      <p>
        Already have an account? <Link to="/auth/login">Log In</Link>
      </p>
    </Auth>
  );
}
