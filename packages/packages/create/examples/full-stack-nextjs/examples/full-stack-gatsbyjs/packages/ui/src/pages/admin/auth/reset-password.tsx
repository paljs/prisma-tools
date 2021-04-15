import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Link } from 'gatsby';

import SEO from '../../../components/SEO';
import Auth, { Group } from '../../../components/Auth';

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
        <Link to="/admin/auth/login">Back to Log In</Link>
        <Link to="/admin/auth/register">Register</Link>
      </Group>
    </Auth>
  );
}
