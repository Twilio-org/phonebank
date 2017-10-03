import path from 'path';

export default function serveReactApp(req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.resolve(__dirname, '../../public/dist/index.html'));
  } else {
    res.render(path.resolve(__dirname, '../../public/index.html'));
  }
}
