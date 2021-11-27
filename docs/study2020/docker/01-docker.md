# docker

[[toc]]

## docker 安装 mondodb

```sh
# 安装
docker pull mongo

# 查看下载完成的镜像
docker images
```

在镜像文档里，我们知道了该镜像映射的端口号是`27017`，配置文件的位置在`/data/configdb`，数据库文件的位置在`/data/db`

```sh
# 启动容器
docker run -d -p 27017:27017 -v mongo_configdb:/data/configdb -v mongo_db:/data/db --name mongo docker.io/mongo
```

```sh
# 创建容器
docker run --name mongodb -p 27017:27017 -d mongo
```

命令执行完后，输入命令`docker ps -a`来查看所有的容器，可以看到 `mongo` 已经成功启动

开启身份认证

现在我们关闭并删除掉刚才的容器，重新使用身份认证模式启动一个容器。

```sh
docker stop mongo
docker rm mongo
docker run -d -p 27017:27017 -v mongo_configdb:/data/configdb -v mongo_db:/data/db --name mongo docker.io/mongo --auth
```

输入命令进入容器内部的 mongo 命令行

```sh
docker exec -it mongo mongo admin
```

在 mongo 命令行输入命令创建管理员账户

```sh
db.createUser({ user: 'jsmith', pwd: 'some-initial-password', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
```

创建数据库并设置用户

目前为止我们一直都是在操作 mongo 自带的 admin 库。正常情况下是不建议直接使用这个库的。我们需要自己创建数据库并设置新库的用户。

还是先使用 docker exec -it mongo mongo admin 命令进入 mongo 的命令行页面。
使用上一步骤创建的管理员账户进行授权

```sh
db.auth("jsmith","some-initial-password");
```

切换到 test 库（如不存在会自动创建）

```sh
use test
```

创建 test 库下的用户

```sh
db.createUser({ user: 'test', pwd: '123456', roles: [{ role: "readWrite", db: "test" }] });
```
