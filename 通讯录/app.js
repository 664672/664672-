// app.js
App({})
App({
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'g664672-1g79vnrxbafc8a64', // 替换为你的云开发环境 ID
        traceUser: true,
      });
    }
  }
});
