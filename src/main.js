// 引入css | less 文件
import './style/common.less';
import './style/base.css';
// import css from './style/base.css';
// console.log(css);
console.log('main');

// let body = document.getElementsByTagName('body')[0];
// let style = document.createElement('style');
// style.innerText = css[0][1];
// body.appendChild(style);


function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1234);
    }, 0);
  });
}

async function main() {
  const result = await test();
  console.log(result);
}

main();
