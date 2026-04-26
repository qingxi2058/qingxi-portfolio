const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildRobotsTxt,
  buildSitemapXml,
  collectPages,
} = require('./sitemap.cjs');

test('collectPages includes current public pages and excludes duplicate home route', () => {
  const pages = collectPages().map((page) => page.urlPath);

  assert.ok(pages.includes('/'));
  assert.ok(pages.includes('/tools/'));
  assert.ok(pages.includes('/guide/'));
  assert.ok(pages.includes('/timer/'));
  assert.ok(!pages.includes('/home/'));
});

test('buildSitemapXml outputs qingxihub urls', () => {
  const xml = buildSitemapXml({ baseUrl: 'https://qingxihub.com' });

  assert.match(xml, /<urlset/);
  assert.match(xml, /https:\/\/qingxihub\.com\/tools\//);
  assert.match(xml, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  assert.match(xml, /https:\/\/qingxihub\.com\/drama\/en\/tools\/hook-generator\//);
  assert.match(xml, /https:\/\/qingxihub\.com\/drama\/en\/blog\/signed-reelshort-writing-stack\//);
  assert.match(xml, /hreflang="en"/);
});

test('buildRobotsTxt points to sitemap.xml', () => {
  const robots = buildRobotsTxt({ baseUrl: 'https://qingxihub.com' });

  assert.equal(robots, 'User-agent: *\nAllow: /\n\nSitemap: https://qingxihub.com/sitemap.xml');
});
