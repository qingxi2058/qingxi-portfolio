const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_SITE_URL = 'https://qingxihub.com';

const EXCLUDED_DIRS = new Set([
  '.agents',
  '.edgeone',
  '.git',
  '.playwright-cli',
  '.vercel',
  'api',
  'assets',
  'functions',
  'memory',
  'node-functions',
  'output',
]);

const EXCLUDED_ROUTES = new Set(['/home/']);

const EXTRA_PAGES = [
  {
    urlPath: '/drama/en/',
    filePath: path.join(ROOT_DIR, 'drama', 'en', 'index.html'),
  },
];

const ALTERNATE_LINKS = {
  '/drama/': [
    { hreflang: 'zh-CN', href: '/drama/' },
    { hreflang: 'en', href: '/drama/en/' },
    { hreflang: 'x-default', href: '/drama/en/' },
  ],
  '/drama/en/': [
    { hreflang: 'zh-CN', href: '/drama/' },
    { hreflang: 'en', href: '/drama/en/' },
    { hreflang: 'x-default', href: '/drama/en/' },
  ],
};

const XML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (char) => XML_ESCAPE_MAP[char]);
}

function normalizeBaseUrl(baseUrl = DEFAULT_SITE_URL) {
  return String(baseUrl).trim().replace(/\/+$/, '') || DEFAULT_SITE_URL;
}

function isPublicPageDir(entry) {
  return (
    entry.isDirectory() &&
    !EXCLUDED_DIRS.has(entry.name) &&
    /^[a-z0-9-]+$/i.test(entry.name) &&
    fs.existsSync(path.join(ROOT_DIR, entry.name, 'index.html'))
  );
}

function buildUrlPath(dirName) {
  return dirName === 'index' ? '/' : `/${dirName}/`;
}

function collectPages() {
  const pages = [
    {
      urlPath: '/',
      filePath: path.join(ROOT_DIR, 'index.html'),
    },
  ];

  const rootEntries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });

  for (const entry of rootEntries) {
    if (!isPublicPageDir(entry)) {
      continue;
    }

    const urlPath = buildUrlPath(entry.name);

    if (EXCLUDED_ROUTES.has(urlPath)) {
      continue;
    }

    pages.push({
      urlPath,
      filePath: path.join(ROOT_DIR, entry.name, 'index.html'),
    });
  }

  pages.push(...EXTRA_PAGES);
  pages.push(...collectNestedPages(path.join(ROOT_DIR, 'drama', 'en'), '/drama/en/'));

  return pages
    .filter((page) => fs.existsSync(page.filePath))
    .filter((page, index, allPages) => allPages.findIndex((item) => item.urlPath === page.urlPath) === index)
    .sort((a, b) => a.urlPath.localeCompare(b.urlPath, 'en'));
}

function collectNestedPages(dirPath, urlPrefix) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const pages = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name) || entry.name === 'assets') {
        continue;
      }

      pages.push(...collectNestedPages(entryPath, `${urlPrefix}${entry.name}/`));
      continue;
    }

    if (entry.name === 'index.html') {
      pages.push({ urlPath: urlPrefix, filePath: entryPath });
      continue;
    }

    if (entry.name.endsWith('.html')) {
      pages.push({ urlPath: `${urlPrefix}${entry.name}`, filePath: entryPath });
    }
  }

  return pages;
}

function getLastModified(filePath) {
  return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
}

function buildAlternateNodes(page, baseUrl) {
  const links = ALTERNATE_LINKS[page.urlPath] || [];

  return links
    .map(
      (link) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(link.hreflang)}" href="${escapeXml(
          `${baseUrl}${link.href}`
        )}" />`
    )
    .join('\n');
}

function buildSitemapXml(options = {}) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const pages = collectPages();

  const urlNodes = pages
    .map((page) => {
      const alternateNodes = buildAlternateNodes(page, baseUrl);

      return `  <url>
    <loc>${escapeXml(`${baseUrl}${page.urlPath}`)}</loc>
    <lastmod>${getLastModified(page.filePath)}</lastmod>${alternateNodes ? `\n${alternateNodes}` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes}
</urlset>`;
}

function buildRobotsTxt(options = {}) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);

  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n');
}

module.exports = {
  DEFAULT_SITE_URL,
  buildRobotsTxt,
  buildSitemapXml,
  collectPages,
  normalizeBaseUrl,
};
