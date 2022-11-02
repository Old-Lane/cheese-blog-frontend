// vite.config.ts
import { defineConfig } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { createSvgIconsPlugin } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import WindiCSS from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/vite-plugin-windicss/dist/index.mjs";
import * as path from "path";
var __vite_injected_original_dirname = "E:\\HTML\\Vue-Project\\solitary-blog2\\solitary-blog2";
var pathSrc = resolve(__vite_injected_original_dirname, "./src");
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
      ],
      dts: resolve(pathSrc, "auto-imports.d.ts")
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";'
      }
    }
  },
  server: {
    port: 5e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxIVE1MXFxcXFZ1ZS1Qcm9qZWN0XFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHNvbGl0YXJ5LWJsb2cyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxIVE1MXFxcXFZ1ZS1Qcm9qZWN0XFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9IVE1ML1Z1ZS1Qcm9qZWN0L3NvbGl0YXJ5LWJsb2cyL3NvbGl0YXJ5LWJsb2cyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHtOYWl2ZVVpUmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7Y3JlYXRlU3ZnSWNvbnNQbHVnaW59IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCBXaW5kaUNTUyBmcm9tIFwidml0ZS1wbHVnaW4td2luZGljc3NcIlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5jb25zdCBwYXRoU3JjID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIFdpbmRpQ1NTKCksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgICAgICd2dWUnLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ25haXZlLXVpJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZURpYWxvZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlTm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VMb2FkaW5nQmFyJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGR0czogcmVzb2x2ZShwYXRoU3JjLCAnYXV0by1pbXBvcnRzLmQudHMnKSxcbiAgICAgICAgfSksXG4gICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldXG4gICAgICAgIH0pLFxuICAgICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHBhdGhTcmNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNjc3M6IHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvaW5kZXguc2Nzc1wiOydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDUwMDBcbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVSxTQUFRLG9CQUFtQjtBQUMxVyxPQUFPLFNBQVM7QUFDaEIsU0FBUSxlQUFjO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVEsdUJBQXNCO0FBQzlCLFNBQVEsNEJBQTJCO0FBQ25DLE9BQU8sY0FBYztBQUNyQixZQUFZLFVBQVU7QUFSdEIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxVQUFVLFFBQVEsa0NBQVcsT0FBTztBQUMxQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxVQUNJLFlBQVk7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsTUFDQSxLQUFLLFFBQVEsU0FBUyxtQkFBbUI7QUFBQSxJQUM3QyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxJQUNqQyxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUVqQixVQUFVLENBQU0sYUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLE1BRTFELFVBQVU7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLO0FBQUEsSUFDVDtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
