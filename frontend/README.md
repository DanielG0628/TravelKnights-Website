npm install axios moment react-file-base64 redux redux-thunk

npm install @mui/material @mui/styled-engine-sc styled-components
npm install @emotion/react @emotion/styled
npm install react-redux

For mui frontend errors, try deleting package-lock + node_modules, then npm install
npm install --force for upstream dependencies

Fix for invalid options object:
npm ci --force
npm audit fix --force
