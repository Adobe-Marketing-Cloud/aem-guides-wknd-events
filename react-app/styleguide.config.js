const path = require('path')
module.exports = {
    components: 'src/components/**/[A-Z]*.js',
    assetsDir: 'public/images',
    require: [
        path.join(__dirname, 'src/index.scss')
      ],
    ignore:  ['src/components/**/Page.js','src/components/**/MappedComponents.js','src/components/**/Header.js','**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']
}