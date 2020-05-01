import React from 'react';
import { InputGroup, Button } from 'oah-ui';
import { Link } from 'gatsby';

import SEO from '../../components/SEO';
import Auth, { Group } from '../../components/Auth';

export default function ResetPassword() {
  return (
    <Auth title="Change Password" subTitle="Please set a new password">
      <SEO title="Change Password" keywords={['OAH', 'application', 'react']} />
      <form>
        <InputGroup fullWidth>
          <input type="password" placeholder="New Password" />
        </InputGroup>
        <InputGroup fullWidth>
          <input type="password" placeholder="Confirm Password" />
        </InputGroup>
        <Button status="Success" type="button" shape="SemiRound" fullWidth>
          Change Password
        </Button>
      </form>
      <Group>
        <Link to="/auth/login">Back to Log In</Link>
        <Link to="/auth/register">Register</Link>
      </Group>
    </Auth>
  );
}
