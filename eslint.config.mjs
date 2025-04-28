import { eslintNextTs } from "ewelint";

export default [
  ...eslintNextTs, 
  {
    rules: {
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      // outras regras...
    }
  }
];
