# Pods

A Pod is the smallest deployable unit: one or more containers that share a network namespace and storage.

## Lifecycle phases

| Phase | Meaning |
|---|---|
| **Pending** | Accepted, but not yet running. Often waiting for a node, an image or a volume. |
| **Running** | Bound to a node with at least one container running. |
| **Succeeded** | All containers exited successfully. Typical for Jobs. |
| **Failed** | All containers ended and at least one failed. |
| **Unknown** | The node cannot be reached, so the state is not known. |

## Probes

| Probe | Question it answers | If it fails |
|---|---|---|
| **startupProbe** | Has the app finished starting? | Container is restarted. Other probes wait for it. |
| **readinessProbe** | Can it take traffic now? | Removed from Service endpoints. |
| **livenessProbe** | Is it stuck? | Container is restarted. |

## Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
    - name: web
      image: nginx:1.27
      ports:
        - containerPort: 80
      resources:
        requests: { cpu: 100m, memory: 128Mi }
        limits:   { memory: 256Mi }
      startupProbe:
        httpGet: { path: /, port: 80 }
        periodSeconds: 2
        failureThreshold: 30
      readinessProbe:
        httpGet: { path: /, port: 80 }
        periodSeconds: 5
      livenessProbe:
        httpGet: { path: /, port: 80 }
        periodSeconds: 10
        failureThreshold: 3
```

!!! tip
    Use a readiness probe on every service. Without it, traffic reaches Pods that are not ready yet. See [Pod failures](../troubleshooting/pods.md) when something goes wrong.
