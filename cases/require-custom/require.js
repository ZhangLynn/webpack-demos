/**
 * created by LynnZhang on 2018/12/23
 */
// 模拟require的实现
function _require(path) {
    // 定义一个Module对象
    var module = {
        exports: {}
    }

    // 引入nodejs 文件模块 下面是nodejs中原生的require方法
    var fs = require('fs');

    // 同步读取该文件，utf8表示当前是以字符串编码提取的
    var sourceCode = fs.readFileSync(path, 'utf8');

    var packFunc = new Function('exports', '_require', 'module', '__filename', '__diranme',
        sourceCode + '\n return module.exports;')

    // 把module和module.exports作为参数传进去
    // 并得到挂在到module.exports 或 exports上的功能
    var res = packFunc(module.exports, _require, module, __filename, __dirname);

    // 然后返回包装过的内容
    return res;
}
var test = _require('./test.js');
console.log(test) // 'I am test'
