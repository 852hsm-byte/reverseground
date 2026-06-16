/**
 * Token Bridge Server — port 3001
 * Figma 플러그인에서 POST /update-tokens 하면 tokens.css를 실제로 덮어씀
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, 'css', 'tokens.css');
const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  /* ── 상태 확인 ── */
  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, file: TOKENS_PATH }));
    return;
  }

  /* ── 토큰 업데이트 ── */
  if (req.method === 'POST' && req.url === '/update-tokens') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { css } = JSON.parse(body);
        if (!css || typeof css !== 'string') throw new Error('css 필드가 없습니다');

        // 백업 먼저
        const backup = TOKENS_PATH + '.bak';
        if (fs.existsSync(TOKENS_PATH)) fs.copyFileSync(TOKENS_PATH, backup);

        fs.writeFileSync(TOKENS_PATH, css, 'utf8');
        console.log('[token-bridge] tokens.css 업데이트 완료');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'tokens.css 업데이트 완료' }));
      } catch (e) {
        console.error('[token-bridge] 오류:', e.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`✅ Token Bridge 실행 중 → http://localhost:${PORT}`);
  console.log(`   대상 파일: ${TOKENS_PATH}`);
});
