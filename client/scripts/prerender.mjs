// Pre-render: after `react-scripts build`, opens every page of build/ in a headless Chrome
// (Puppeteer) and saves the finished HTML as build/<address>/index.html.
// Google, Facebook and others then get each page's text, title and tags without running
// JavaScript. Visitors get the same site: React loads and redraws the page as before.
//
// Run by `npm run build`. Pages come from src/config/routes.json (live pages, both languages).

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const CLIENT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BUILD_DIR = path.join(CLIENT_DIR, 'build');
const PORT = 45678;
const ORIGIN = `http://localhost:${PORT}`;

const TYPES = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2',
};

const routes = JSON.parse(await readFile(path.join(CLIENT_DIR, 'src/config/routes.json'), 'utf8')).pages;
const addresses = Object.values(routes).filter((p) => p.live).flatMap((p) => [p.fr, p.en]);

// 1. Keep the empty app shell: nginx serves it for unknown addresses (deploy/nginx), and the
//    local server below serves it for every page, so each page is rendered from scratch.
const shellPath = path.join(BUILD_DIR, 'app.html');
await copyFile(path.join(BUILD_DIR, 'index.html'), shellPath);
const shell = await readFile(shellPath);

// 2. A tiny local server, like nginx: real files (scripts, images...) as they are, a missing file -> 404,
//    every page address -> the shell
const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, ORIGIN).pathname);
    const file = path.join(BUILD_DIR, urlPath);
    if (path.extname(urlPath) === '') {
        res.writeHead(200, { 'Content-Type': TYPES['.html'] });
        return res.end(shell);
    }
    if (!file.startsWith(BUILD_DIR) || !existsSync(file)) {
        res.writeHead(404);
        return res.end();
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream' });
    res.end(await readFile(file));
});
await new Promise((resolve) => server.listen(PORT, resolve));

// 3. Render each page
const browser = await puppeteer.launch();
const problems = [];
try {
    for (const address of addresses) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 }); // desktop layout (the site switches to mobile at 768 px)
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            // Only our own files. The API (videos) is left waiting, so the page is saved in its
            // "loading" state instead of calling the live API or saving an error message.
            if (request.url().startsWith(ORIGIN)) request.continue();
            else if (request.url().includes('/api/')) return;
            else request.abort();
        });
        page.on('pageerror', (error) => problems.push(`${address}: ${error.message}`));
        // A missing image or script (e.g. a path without its leading "/", which breaks under /en/)
        page.on('response', (response) => {
            if (response.url().startsWith(ORIGIN) && response.status() === 404) problems.push(`${address}: missing file ${response.url().slice(ORIGIN.length)}`);
        });

        await page.goto(ORIGIN + address, { waitUntil: 'load', timeout: 60000 });
        await new Promise((resolve) => setTimeout(resolve, 1500)); // let React, the slider and the head tags settle

        const { html, title, h1, lang } = await page.evaluate(() => {
            // The page's main image (marked fetchpriority="high", e.g. the first home banner) is preloaded
            // from <head>, so the browser fetches it before the scripts and the images further down.
            const hero = document.querySelector('img[fetchpriority="high"]');
            if (hero && !document.querySelector('link[rel="preload"][as="image"]')) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = hero.getAttribute('src');
                link.setAttribute('fetchpriority', 'high');
                document.head.prepend(link);
            }
            return {
            html: '<!DOCTYPE html>\n' + document.documentElement.outerHTML,
            title: document.title,
            h1: document.querySelector('h1')?.textContent?.trim() ?? '',
            lang: document.documentElement.lang,
            };
        });
        if (!h1) problems.push(`${address}: no <h1> on the page`);

        const outDir = path.join(BUILD_DIR, address);
        await mkdir(outDir, { recursive: true });
        await writeFile(path.join(outDir, 'index.html'), html);
        console.log(`  ${address.padEnd(26)} ${lang}  ${title}`);
        await page.close();
    }
} finally {
    await browser.close();
    server.close();
}

if (problems.length) {
    console.error('\nPre-render problems:\n  ' + problems.join('\n  '));
    process.exit(1);
}
console.log(`\nPre-rendered ${addresses.length} pages into build/.`);
