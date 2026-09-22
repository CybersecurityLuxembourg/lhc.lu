"""The container's localhost health probe must work even behind a build proxy."""
import json
import subprocess
import sys

project = sys.argv[1]
container = subprocess.check_output(
    ['docker', 'compose', '-p', project, 'ps', '-q', 'web'], text=True
).strip()
assert container, 'web container is not running'
config = json.loads(subprocess.check_output(['docker', 'inspect', container]))[0]
healthcheck = config['Config']['Healthcheck']['Test']
assert healthcheck[0] == 'CMD-SHELL', healthcheck
result = subprocess.run([
    'docker', 'exec',
    '-e', 'http_proxy=http://127.0.0.1:9',
    '-e', 'HTTP_PROXY=http://127.0.0.1:9',
    '-e', 'no_proxy=', '-e', 'NO_PROXY=',
    container, 'sh', '-c', healthcheck[1],
], capture_output=True, text=True)
assert result.returncode == 0, result.stdout + result.stderr
print('PASS: health probe bypasses proxy settings')
