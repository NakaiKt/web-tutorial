# 環境構築

```
docker build -t web-tutorial .

# Windows
docker run -it -p 3000:3000 -v ${PWD}:/app --name web-tutorial --rm web-tutorial
# Mac
docker run -it -p 3000:3000 -v $(pwd):/app --name web-tutorial --rm web-tutorial
```

## localhost:3000 にアクセス

```
npm run dev
```
