/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {OPTIMIZED_FONT_PROVIDERS} = require("next/constants");

const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["next/core-web-vitals"],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/no-non-null-assertion": OFF,
    "@typescript-eslint/no-unused-vars": WARNING,
    "@typescript-eslint/no-empty-function": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    '@typescript-eslint/dot-notation': OFF,
    '@typescript-eslint/no-unused-expressions':OFF,
    '@typescript-eslint/no-unsafe-call': WARNING,
    '@typescript-eslint/no-unsafe-assignment': WARNING,

    "react/prop-types": OFF,
    "react/display-name": OFF,
    "react/no-unescaped-entities": OFF,
    'react/no-string-refs':OFF,
    'react/no-direct-mutation-state': OFF,
    'react/require-render-return':OFF,
    'react/jsx-no-undef':OFF,
    'react/jsx-uses-react': OFF,
    'react/jsx-uses-vars': OFF,

    'import/namespace': WARNING,
    "import/no-anonymous-default-export": OFF,
    "import/no-named-as-default": OFF,
    "import/no-named-as-default-member": OFF,
    
    "no-console": WARNING,
    "no-debugger": WARNING,
    
    "no-empty-function": OFF,
    "no-unused-expressions": [
      WARNING,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
}
