npm run dev
开发模式
npm run build 
线上模式

   location / {
            root   C:\project\code\lbqb-static\app\dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }