# 技术小册

<BrochureList/>

## yarn vs npm vs cnpm

测试均采用公司网络，网速极好时进行。taoche项目。网络有限制时npm安装成功率较低。

| |  npm v3.x | npm v5.x  | cnpm(5.x) | yarn|
| -------- | -------- |-------- | -------- |-------- |
| 是否锁依赖版本   | 否(手动)  | 是   |  否(手动)   | 是   |
|版本锁文件|无|package-lock.json|无|yarn.lock|
|版本锁机制|无|package-lock.json优先|无|yarn.lock优先|
|安装依赖速度|极慢|慢|极快|快|
|依赖目录结构|平铺|平铺|软链|平铺|
|初次安装(非淘宝源)|failed|failed|34s|failed|
|初次安装(node-sass源)|11m+|5m56s|34s|66s|
|重复安装|2m+|25s|19s|24s|
|项目兼容性|好|好|差|好|
|是否可更新依赖|手动|手动|否|是|

### 说明
* 完全使用`cnpm`会有以下问题:
    - 本地项目构建会将vue/react等dll模块构建进去
    - 公司内部模块升级需要手动删除node_modules下模块目录和软链接，重新cnpm
* `node-sass` 依赖包在不配源的情况下，非cnpm版本都极容易安装不了failed
* 版本锁定机制的不同，导致npm5.x一旦安装需要手动升级，才能更新lock文件, yarn执行后会同步当前package.json到yarn.lock并更换为与package.json中不同的依赖包

### 自动配置npm及yarn源[推荐]

将如下代码在命令行中执行(不支持windows cmd)

`curl -s http://git.taoche.com/npm/install_env/raw/master/install.sh | sh`

### 手动配置淘宝源
yarn:

`yarn config set registry https://registry.npm.taobao.org`

npm:

`npm config set registry https://registry.npm.taobao.org `

### 手动配置node-sass源
yarn:

`yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass`

npm:

`npm config set sass-binary-site http://cdn.npm.taobao.org/dist/node-sass`


### 更多请参考

https://sebastianblade.com/the-truly-way-to-install-upgrade-npm-dependency-in-china/
