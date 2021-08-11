# linux 下 yum 安装 redis 以及使用

[[toc]]

## 一、安装 redis

### 1、检查是否有 redis yum 源

```sh
yum install redis
```

### 2、下载 fedora 的 epel 仓库

```sh
yum install epel-release
```

### 3、安装 redis 数据库

```sh
yum install redis
```

### 4、安装完毕后，使用下面的命令启动 redis 服务

```sh
# 启动redis
service redis start
# 停止redis
service redis stop
# 查看redis运行状态
service redis status
# 查看redis进程
ps -ef | grep redis
```

### 5、设置 redis 为开机自动启动

```sh
chkconfig redis on
```

### 6、进入 redis 服务

```sh
# 进入本机redis
redis-cli
# 列出所有key
keys *
```

### 7、防火墙开放相应端口

```sh
# 开启6379
/sbin/iptables -I INPUT -p tcp --dport 6379 -j ACCEPT
# 开启6380
/sbin/iptables -I INPUT -p tcp --dport 6380 -j ACCEPT
# 保存
/etc/rc.d/init.d/iptables save
# centos 7下执行
service iptables save
```

## 二、修改 redis 默认端口和密码

1、打开配置文件

```sh
vi /etc/redis.conf
```

2、修改默认端口，查找 port 6379 修改为相应端口即可

3、修改默认密码，查找 requirepass foobared 将 foobared 修改为你的密码

4、使用配置文件启动 redis

```sh
redis-server /etc/redis.conf &
```

5、使用端口登录

```sh
redis-cli -h 127.0.0.1 -p 6179
```

6、此时再输入命令则会报错

7、输入刚才输入的密码

```sh
auth 111
```

8、停止 redis

```sh
redis-cli -h 127.0.0.1 -p 6179
shutdown
```

进程号杀掉 redis

```sh
ps -ef | grep redis
kill -9 XXX
```

## node 服务端启动

```sh
pm2 start redis-server --name redis-server
```
