# GitOps

GitOps keeps the desired state of your systems in Git and uses an agent in the cluster to make reality match it. Every change is a reviewed commit, so you get an audit trail, easy rollbacks and no manual `kubectl apply` from laptops.

## Example: an Argo CD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: demo
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example/demo-config.git
    targetRevision: main
    path: deploy
  destination:
    server: https://kubernetes.default.svc
    namespace: demo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

`prune` removes resources that were deleted from Git, and `selfHeal` reverts manual changes made directly in the cluster.

## Pitfalls to plan for

- **Secrets:** never commit plain secrets. Use an external secrets operator or sealed secrets.
- **Drift alerts:** decide who gets notified when a sync fails.
- **Repository layout:** separate application code from environment configuration so promotions are simple.
