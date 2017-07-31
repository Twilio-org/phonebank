import path from 'path';

export default function serveReactApp(req, res) {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
}
