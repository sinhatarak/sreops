# Python for SRE

Python is the fastest route from idea to working automation. With the official Kubernetes client you can query a cluster in a few lines.

## Example: find pods that are not healthy

```bash
pip install kubernetes
```

```python
from kubernetes import client, config

config.load_kube_config()          # use load_incluster_config() inside a cluster
v1 = client.CoreV1Api()

for pod in v1.list_pod_for_all_namespaces().items:
    if pod.status.phase not in ("Running", "Succeeded"):
        print(f"{pod.metadata.namespace}/{pod.metadata.name}: {pod.status.phase}")
```

## Habits that keep scripts safe

- Use a virtual environment and pinned dependencies.
- Make scripts read-only by default and require an explicit flag for changes.
- Log what you did, and handle API errors instead of ignoring them.
