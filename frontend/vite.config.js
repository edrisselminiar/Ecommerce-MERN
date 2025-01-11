import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],

  	server: {
    		host: '0.0.0.0',
    		port: 5173,
    		watch: {
      		usePolling: true
    	}
  	},


	// build: {
	// rollupOptions: {
	// 	output: {
	// 	assetFileNames: 'assets/[name].[ext]',
	// 	chunkFileNames: 'assets/[name].[hash].js',
	// 	entryFileNames: 'assets/[name].[hash].js',
	// 	}
	// }
	// },

	// assetsInclude: {
	// query: '?url',
	// import: 'default'
	// }

	// build: {
	// 	assetsDir: 'assets',
	// 	rollupOptions: {
	// 	  output: {
	// 		assetFileNames: (assetInfo) => {
	// 		  const info = assetInfo.name.split('.');
	// 		  const ext = info[info.length - 1];
	// 		  return `assets/${info[0]}.[hash].${ext}`;
	// 		}
	// 	  }
	// 	}
	//   }



})