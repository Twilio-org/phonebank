import path from 'path';

function serveReactApp(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
}

export default serveReactApp;
