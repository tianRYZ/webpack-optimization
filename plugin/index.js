// 输出文件名+大小
class MyPlugin {
  constructor() { }
  apply(compiler) {
    // compiler.hooks.done.tap('MyPlugin', (context, entry) => {
    //   console.log('编译完成');
    // })
    // compilation 拿到当前编译过程的内容
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      let assets = compilation.assets;
      let content = '';
      Object.entries(assets).forEach(([filename, stateObj]) => {
        content += `文件名: ${filename}  文件大小: ${stateObj.size()} \n`;
      });
      console.log(content);
    })
  }
}


module.exports = MyPlugin;