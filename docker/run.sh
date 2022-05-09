docker stop sep6-frontend
docker rm sep6-frontend
docker run -itd --name sep6-frontend \
    --restart always \
    --env-file ./../.env \
    --net=host \
    sep6-frontend:latest