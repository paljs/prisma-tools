import { generateSchema } from './nexusSchema';
import { join } from 'path';

describe('test generate Nexus inputs', () => {
  it('should inputs as string', () => {
    expect(generateSchema()).toMatchSnapshot();
  });
  it('should back with admin table types and inputs as string', () => {
    expect(
      generateSchema({ includeAdmin: true, adminSchemaPath: './packages/nexus/tests/adminSettings.json' }),
    ).toMatchSnapshot();
  });
  it('should back with admin table types and inputs as string using absolute path', () => {
    expect(
      generateSchema({ includeAdmin: true, adminSchemaPath: join(__dirname, './adminSettings.json') }),
    ).toMatchSnapshot();
  });
  it('should back without admin table types and inputs if the schema path not correct', () => {
    expect(generateSchema({ includeAdmin: true })).toMatchSnapshot();
  });
  it('should back without Json and Decimal scalar  as string', () => {
    expect(generateSchema({ excludeScalar: ['Json', 'Decimal'] })).toMatchSnapshot();
  });
});
