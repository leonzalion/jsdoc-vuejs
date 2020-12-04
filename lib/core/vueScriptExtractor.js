const fs = require('fs');
const compiler = require('vue-template-compiler');
const babel = require('@babel/core');

module.exports = function extractVueScript(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const parsedComponent = compiler.parseComponent(source);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';
  if (parsedComponent.script.lang === 'ts') {
    const transpiledTypescript = babel.transform(scriptContent, {
      filename,
      plugins: [['@babel/plugin-transform-typescript', {
        sourceMaps: true,
      }]],
    });
    return transpiledTypescript.code;
  }
  return scriptContent;
};
