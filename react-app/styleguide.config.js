const path = require('path')
module.exports = {
    components: 'src/components/**/[A-Z]*.js',
    skipComponentsWithoutExample: true,
    assetsDir: 'public/images',
    require: [
        path.join(__dirname, 'src/index.scss')
      ],
    ignore:  ['src/components/**/Page.js','src/components/**/MappedComponents.js','**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts']
}