# Release Engineering

Most incidents follow a change, so safe releases are one of the best reliability investments.

## Principles

- **Small, frequent changes** are easier to understand and roll back.
- **Automate the path to production,** and review everything through [GitOps](../platform/gitops.md) where you can.
- **Release progressively,** and watch the SLIs while you do.
- **Make rollback fast and boring.**

## Strategies

| Strategy | How it works |
|---|---|
| **Rolling update** | Replace Pods gradually (the Kubernetes default). |
| **Canary** | Send a small share of traffic to the new version first. |
| **Blue/green** | Run two environments and switch traffic. |
| **Feature flags** | Ship code dark and enable it separately. |

## Safe rolling updates

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 25%
```

```bash
kubectl rollout status deploy/api
kubectl rollout undo deploy/api
```

## Measure delivery

The DORA metrics are a good scorecard: deployment frequency, lead time for changes, change failure rate, and time to recover from a failed deployment.

Tie release speed to the [error budget](slo.md): when the budget is healthy, release more freely.
