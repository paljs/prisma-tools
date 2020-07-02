import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { ButtonLink } from '@paljs/ui/Button';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;
export default function Error() {
  const router = useRouter();
  return (
    <Card>
      <CardBody>
        <ErrorStyle>
          <h1>404 Page Not Found</h1>
          <small>The page you were looking for doesn&apos;t exist</small>
          <ButtonLink fullWidth appearance="hero" onClick={() => router.push('/')} shape="Rectangle">
            Take me home
          </ButtonLink>
        </ErrorStyle>
      </CardBody>
    </Card>
  );
}
