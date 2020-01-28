// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData
// } = require("worker_threads");

// if (isMainThread) {
//   module.exports = function parseJSAsync(script) {
//     return new Promise((resolve, reject) => {
//       const worker = new Worker(__filename, {
//         workerData: script
//       });
//       worker.on("message", resolve);
//       worker.on("error", reject);
//       worker.on("exit", (code: number) => {
//         if (code !== 0) reject(new Error(`工作线程使用退出码 ${code} 停止`));
//       });
//     });
//   };
// } else {
//   const { parse } = require("一些 js 解析库");
//   const script = workerData;
//   parentPort.postMessage(parse(script));
// }
