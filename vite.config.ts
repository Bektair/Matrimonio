import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  if(mode =="development"){
    return {
    
      plugins:[
        basicSsl()
      ],
      define: {
        'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
      }
     
    } 
  } 
  else {
    return { 
      define: {
        'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
      }
    } 
  }
})

