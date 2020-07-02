import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Auth, { Group } from 'Components/Auth';
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <Auth title="Change Password" subTitle="Please set a new password">
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
        <Link href="/admin/auth/login">
          <a>Back to Log In</a>
        </Link>
        <Link href="/admin/auth/register">
          <a>Register</a>
        </Link>
      </Group>
    </Auth>
  );
}
