import * as colors from 'colors';

export const ifPrismaExitAndGenerated = async () => {
  try {
    const { dmmf } = await import('@prisma/client');
    if (!dmmf?.schema) {
      console.error(
        `${colors.red('Error:')} please run ${colors.blue(
          'prisma generate',
        )} before ${colors.blue('pal generate')}`,
      );
      process.exit();
    }
  } catch (e) {
    console.error(
      `${colors.red('Error:')} ${colors.blue('@prisma/client')} is not found`,
    );
    process.exit(e.code);
  }
};
