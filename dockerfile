FROM node:23-slim

WORKDIR /app
EXPOSE 3000

# npm をバージョン 11.3.0 にアップデート
RUN npm install -g npm@11.3.0

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm i

# アプリケーションのソースコードをコピー
COPY . .

ENTRYPOINT [""]
CMD ["/bin/sh"]