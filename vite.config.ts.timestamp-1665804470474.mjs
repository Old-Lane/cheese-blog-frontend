// vite.config.ts
import { defineConfig } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { createSvgIconsPlugin } from "file:///E:/HTML/Vue-Project/solitary-blog2/solitary-blog2/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import * as path from "path";
var __vite_injected_original_dirname = "E:\\HTML\\Vue-Project\\solitary-blog2\\solitary-blog2";
var pathSrc = resolve(__vite_injected_original_dirname, "./src");
var vite_config_default = defineConfig({
  plugins: [
    vue(),
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
        additionalData: '@import "./src/assets/styles/index.scss";'
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxIVE1MXFxcXFZ1ZS1Qcm9qZWN0XFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHNvbGl0YXJ5LWJsb2cyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxIVE1MXFxcXFZ1ZS1Qcm9qZWN0XFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHNvbGl0YXJ5LWJsb2cyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9IVE1ML1Z1ZS1Qcm9qZWN0L3NvbGl0YXJ5LWJsb2cyL3NvbGl0YXJ5LWJsb2cyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHtOYWl2ZVVpUmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7Y3JlYXRlU3ZnSWNvbnNQbHVnaW59IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcblxuY29uc3QgcGF0aFNyYyA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSgpLFxuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICduYWl2ZS11aSc6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VEaWFsb2cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZU1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZU5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlTG9hZGluZ0JhcidcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdHM6IHJlc29sdmUocGF0aFNyYywgJ2F1dG8taW1wb3J0cy5kLnRzJyksXG4gICAgICAgIH0pLFxuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXVxuICAgICAgICB9KSxcbiAgICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXG4gICAgICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xuICAgICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBwYXRoU3JjXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL3N0eWxlcy9pbmRleC5zY3NzXCI7J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogNTAwMFxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStVLFNBQVEsb0JBQW1CO0FBQzFXLE9BQU8sU0FBUztBQUNoQixTQUFRLGVBQWM7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUSx1QkFBc0I7QUFDOUIsU0FBUSw0QkFBMkI7QUFDbkMsWUFBWSxVQUFVO0FBUHRCLElBQU0sbUNBQW1DO0FBU3pDLElBQU0sVUFBVSxRQUFRLGtDQUFXLE9BQU87QUFDMUMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsVUFDSSxZQUFZO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLE1BQ0EsS0FBSyxRQUFRLFNBQVMsbUJBQW1CO0FBQUEsSUFDN0MsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsSUFDakMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFFakIsVUFBVSxDQUFNLGFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSztBQUFBLElBQ1Q7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsRUFDVjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
