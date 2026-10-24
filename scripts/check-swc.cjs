const { inspect } = require('node:util');

// Print the underlying loader errors before Strapi abbreviates the build error.
// Do not print environment variables or the full Node diagnostic report.
try {
  const header = process.report.getReport().header;
  console.log('[SWC check]', JSON.stringify({
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    glibc: header.glibcVersionRuntime || null,
    swc: require('@swc/core/package.json').version,
  }));
  const swc = require('@swc/core');
  swc.transformSync('const value: number = 1;', {
    filename: 'check.ts',
    jsc: { parser: { syntax: 'typescript' } },
  });
  console.log('[SWC check] Compiler loaded successfully.');
} catch (error) {
  console.error('[SWC check] Compiler could not load or compile:');
  console.error(inspect(error, { depth: null, colors: false }));
  process.exitCode = 1;
}
