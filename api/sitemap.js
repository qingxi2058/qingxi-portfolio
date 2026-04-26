const { buildSitemapXml, DEFAULT_SITE_URL } = require('../node-functions/sitemap.cjs');

function resolveBaseUrl(req) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const forwardedHost = req.headers['x-forwarded-host'];
  const host = forwardedHost || req.headers.host;

  if (!host) {
    return DEFAULT_SITE_URL;
  }

  return `${forwardedProto || 'https'}://${host}`;
}

module.exports = function handler(req, res) {
  const xml = buildSitemapXml({ baseUrl: resolveBaseUrl(req) });

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
};
