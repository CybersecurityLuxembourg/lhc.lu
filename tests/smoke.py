"""Check the deployed static site: python3 tests/smoke.py http://127.0.0.1:18087."""
import json
import sys
import urllib.error
import urllib.request

base = sys.argv[1].rstrip('/')


def get(path):
    try:
        return urllib.request.urlopen(base + path, timeout=15)
    except urllib.error.HTTPError as error:
        return error


with get('/') as response:
    assert response.status == 200, response.status
    homepage = response.read()
    assert b'Luxembourg House of Cybersecurity' in homepage
    assert response.headers['X-Content-Type-Options'] == 'nosniff'
    assert response.headers['X-Frame-Options'] == 'DENY'
    assert 'https://api.cybersecurity.lu' in response.headers['Content-Security-Policy']
    assert 'no-cache' in response.headers.get('Cache-Control', '')
for route in ['/about', '/news/smoke-test', '/services', '/legal']:
    with get(route) as response:
        assert response.status == 200, (route, response.status)
        assert response.read() == homepage, route
with get('/healthz') as response:
    assert response.status == 200
    assert response.read().strip() == b'True'
with get('/asset-manifest.json') as response:
    manifest = json.load(response)
for asset in manifest['entrypoints'] + ['css/bootstrap.min.css', 'js/leaflet.js', '.well-known/security.txt']:
    with get('/' + asset.lstrip('/')) as response:
        assert response.status == 200, (asset, response.status)
        assert response.read() != homepage, asset
for path in ['/static/js/missing.js', '/.env', '/.git/config']:
    with get(path) as response:
        assert response.status == 404, (path, response.status)
print('PASS: homepage, SPA routes, health, assets, headers and missing/private files')
