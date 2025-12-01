// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Certifica que o Babel usa o preset correto para transpilar o código,
    // incluindo TypeScript (que é o que está causando o erro de sintaxe).
  };
};