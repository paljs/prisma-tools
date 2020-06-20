import * as React from 'react';
import { Button, Card, CardBody } from '@paljs/ui';
import { navigate } from 'gatsby';

const Index = () => {
  return (
    <Card>
      <CardBody style={{ textAlign: 'center' }}>
        <Button onClick={() => navigate('/admin')}>Go To Admin Pages</Button>
      </CardBody>
    </Card>
  );
};

export default Index;
