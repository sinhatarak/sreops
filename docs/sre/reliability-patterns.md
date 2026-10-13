# Reliability Patterns

## In application code

| Pattern | What it does |
|---|---|
| **Timeouts** | Never wait forever on a dependency. |
| **Retries with backoff and jitter** | Recover from brief faults without causing a retry storm. |
| **Circuit breakers** | Stop calling a failing dependency so it can recover. |
| **Bulkheads** | Isolate resources so one failure does not take everything down. |
| **Load shedding** | Reject excess work early to protect the core. |
| **Graceful degradation** | Serve a reduced experience instead of failing. |
| **Idempotency** | Make retries safe. |

!!! warning
    Retries multiply load. Without backoff, jitter and a retry budget, they can turn a small problem into an outage.

## On Kubernetes

Spread replicas across failure domains and protect them during maintenance:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api
spec:
  minAvailable: 2
  selector:
    matchLabels: { app: api }
```

In the Pod template of the Deployment:

```yaml
topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: ScheduleAnyway
    labelSelector:
      matchLabels: { app: api }
```

Also use [readiness probes](../k8s/pods.md), sensible [resource requests](../k8s/resources.md), and [disaster recovery](disaster-recovery.md) plans that you actually test.
