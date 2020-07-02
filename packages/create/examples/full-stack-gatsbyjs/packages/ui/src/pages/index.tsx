import * as React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
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
