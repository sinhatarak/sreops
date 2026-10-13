# Requests, Limits and QoS

## Requests vs limits

- **Request:** what the scheduler reserves for the container. It decides where the Pod fits.
- **Limit:** the maximum the container may use.

CPU and memory behave differently when a limit is reached:

| Resource | At the limit |
|---|---|
| **CPU** | The container is **throttled** (slowed down). It keeps running. |
| **Memory** | The container is **OOM-killed** (exit code 137). |

## QoS classes

Kubernetes assigns each Pod a class that decides eviction order under node pressure:

| Class | Rule | Evicted |
|---|---|---|
| **Guaranteed** | Every container has CPU and memory requests equal to limits | Last |
| **Burstable** | At least one request or limit is set | Middle |
| **BestEffort** | Nothing set | First |

```bash
kubectl get pod <pod> -o jsonpath='{.status.qosClass}'
kubectl top pod -n <namespace>        # needs metrics-server
```

## Guardrails per namespace

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: defaults
spec:
  limits:
    - type: Container
      defaultRequest: { cpu: 100m, memory: 128Mi }
      default:        { memory: 256Mi }
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
spec:
  hard:
    requests.cpu: "8"
    requests.memory: 16Gi
    pods: "50"
```

!!! tip
    Set memory requests close to real usage and be careful with CPU limits. Tight CPU limits cause latency through throttling even when the node has spare capacity.
