export default {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)'],
  setupFiles: ['./tests/setup.js'], // si usas uno
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  }
}
