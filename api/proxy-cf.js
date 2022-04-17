// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require("http-proxy-middleware");
const sourceHost = "ip.flares.cloud";

module.exports = (req, res) => {
  if (!req.url.startsWith("/proxy-cf/")) {
    return;
  }
  const urlMatch = url.match(/\/proxy-cf\/([^/]+)\/.*/);
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
      // /proxy-cf/104-16-0-0/img/ will be /img/
      "^/proxy-cf/[^/]+": "/",
    },
  };
  console.log(proxyOptions, "proxyOptions");
  // 创建代理对象并转发请求
  createProxyMiddleware(proxyOptions)(req, res);
};
