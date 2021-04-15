import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Link } from 'gatsby';

import SEO from '../../../components/SEO';
import Auth, { Group } from '../../../components/Auth';

export default function RequestPassword() {
  return (
    <Auth title="Forgot Password" subTitle="Enter your email address and we’ll send a link to reset your password">
      <SEO title="Forgot Password" keywords={['OAH', 'application', 'react']} />
      <form>
        <InputGroup fullWidth>
          <input type="email" placeholder="Email Address" />
        </InputGroup>
        <Button status="Success" type="button" shape="SemiRound" fullWidth>
          Request Password
        </Button>
      </form>
      <Group>
        <Link to="/admin/auth/login">Back to Log In</Link>
        <Link to="/admin/auth/register">Register</Link>
      </Group>
    </Auth>
  );
}
