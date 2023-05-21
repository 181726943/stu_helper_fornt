# stu_helper_fornt
[后端项目地址](https://github.com/181726943/stu_helper_backend.git)
stu_helper front Wechat Mini Program
- 若是本地调试，host不需要更改。
- 若是在手机或是其他移动端调试，需要修改config.js中的baseUrl和staticUrl
此处Host是后端项目接口base url
```javaScript
const baseUrl = 'http://你的Host/main/';
const staticUrl = 'http://你的Host/static/';
```
- 若需要修改页面，则找到对应页面文件夹内的wxml和wxss进行修改。corlorui和static文件夹内存放的是corlorUI和图鸟UI库提供的样式及图标
## 页面文件分布
首页中所有页面文件存放在名为homepackage的分包中，我的页面中包含两个分包页面存放在modifyinfo文件夹中