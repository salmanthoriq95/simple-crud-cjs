echo "==> pull redis <==";
docker pull redis;

echo "==> pull mysql <==";
docker pull mysql;

echo "==> build login <==";
docker build ./login -t login -f ./login/Dockerfile;

echo "==> build users <==";
docker build ./users -t users -f ./users/Dockerfile;

echo "==> running all <==";
docker-compose up -d;