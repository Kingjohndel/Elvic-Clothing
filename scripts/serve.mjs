import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';

const directory = fileURLToPath(new URL('../out/', import.meta.url));
const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);

if (!existsSync(`${directory}/index.html`)) {
  throw new Error('Production output is missing. Run npm run build before npm start.');
}
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('Use a valid port number between 0 and 65535.');
}

const server = createServer((request, response) => {
  handler(request, response, { public: directory, cleanUrls: true }).catch((error) => {
    console.error('Static request failed:', error.message);
    if (!response.headersSent) response.writeHead(500);
    response.end('Unable to serve this page.');
  });
});

server.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, () => {
  const address = server.address();
  if (address && typeof address !== 'string') {
    console.log(`ELVIC available at http://localhost:${address.port}`);
  }
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close());
}
