const config = {
  local: {
    /// local environment
    API_URL: 'https://backend-payroll-gt-eyhe.onrender.com',
  },
  test: {
    // test environment
    API_URL: 'https://backend-payroll-gt-eyhe.onrender.com',
  },
  production: {
    // production environment
    API_URL: '', 
  },
}

const nodeEnv = import.meta.env.VITE_NODE_ENV || 'local'
export default config[nodeEnv]
