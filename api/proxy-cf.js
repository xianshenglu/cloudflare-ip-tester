// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require("http-proxy-middleware");
const sourceHost = "ip.flares.cloud";
console.log('outer started!')

module.exports = (req, res) => {
  console.log('started!',req.url)
  if (!req.url.startsWith("/proxy/")) {
    return;
  }
  const urlMatch = url.match(/\/proxy\/([^/]+)\/.*/);
  const cloudflareIp = urlMatch[1];
  const path = urlMatch[2];
  const target = `http://${urlMatch[1]}.${sourceHost}`;
  const proxyOptions = {
    target,
    changeOrigin: true,
    headers: {
      Referer: `http://${sourceHost}`,
    },
    pathRewrite: {
      // /proxy/104-16-0-0/img/ will be /img/
      "^/proxy/[^/]+": "/",
    },
  };
  console.log(proxyOptions, "proxyOptions");
  // 创建代理对象并转发请求
  createProxyMiddleware(proxyOptions)(req, res);
};
