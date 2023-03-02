import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/main.ts', 'src/lint.ts'],
  output: {
		dir: 'dist',
		format: 'cjs'
	},
  	plugins: [
    	typescript({
      		tsconfig: './tsconfig.json'
    	})
  	]
};