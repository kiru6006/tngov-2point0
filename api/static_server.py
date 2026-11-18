import http.server
import socketserver
import os
import sys

OUT_DIR = '/Users/apple/projects/tngov-2point0/web/out'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3005

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUT_DIR, **kwargs)

    def translate_path(self, path):
        p = path.split('?', 1)[0].split('#', 1)[0]
        if p.startswith('/tngov-2point0'):
            p = p[len('/tngov-2point0'):]
        if not p or p == '/':
            p = '/index.html'
        full = os.path.join(OUT_DIR, p.lstrip('/'))
        if not os.path.exists(full):
            if os.path.exists(full + '.html'):
                return full + '.html'
            if os.path.exists(os.path.join(full, 'index.html')):
                return os.path.join(full, 'index.html')
        elif os.path.isdir(full) and os.path.exists(os.path.join(full, 'index.html')):
            return os.path.join(full, 'index.html')
        elif os.path.isdir(full) and os.path.exists(full + '.html'):
            return full + '.html'
        return full

if __name__ == '__main__':
    with socketserver.TCPServer(('', PORT), CleanUrlHandler) as httpd:
        print(f"Serving {OUT_DIR} on http://localhost:{PORT}")
        httpd.serve_forever()
