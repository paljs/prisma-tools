import { InputGroup, Checkbox, Button } from 'oah-ui';
import React from 'react';
import { Link } from 'gatsby';

import Auth, { Group } from '../../components/Auth';
import Socials from '../../components/Auth/Socials';
import SEO from '../../components/SEO';

export default function Login() {
  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <SEO title="Login" keywords={['OAH', 'application', 'react']} />
      <form>
        <InputGroup fullWidth>
          <input type="email" placeholder="Email Address" />
        </InputGroup>
        <InputGroup fullWidth>
          <input type="password" placeholder="Password" />
        </InputGroup>
        <Group>
          <Checkbox onChange={onCheckbox}>Remember me</Checkbox>
          <Link to="/auth/request-password">Forgot Password?</Link>
        </Group>
        <Button status="Success" type="button" shape="SemiRound" fullWidth>
          Login
        </Button>
      </form>
      <Socials />
      <p>
        Don&apos;t have account? <Link to="/auth/register">Register</Link>
      </p>
    </Auth>
  );
}
