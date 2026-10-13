# Secrets

A Secret holds small amounts of sensitive data such as passwords, tokens and keys.

!!! warning
    Secret values are **base64 encoded, not encrypted**. Anyone who can read the Secret can decode it. Protect them with RBAC and encryption at rest.

## Create and read

```bash
kubectl create secret generic db-credentials \
  --from-literal=username=app \
  --from-literal=password='CHANGE_ME'

kubectl get secret db-credentials -o jsonpath='{.data.password}' | base64 -d
```

## Use in a Pod

```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-credentials
        key: password
```

Mounting a Secret as a **volume** is usually preferable to environment variables. Mounted files can update without a restart, and values are less likely to leak into logs and crash dumps.

## Good practice

- Restrict `get`, `list` and `watch` on Secrets with RBAC. `list` also exposes values.
- Turn on **encryption at rest** for Secrets in etcd.
- Never commit Secret manifests to Git. Use an external secrets operator, sealed secrets or SOPS.
- Rotate credentials, and prefer short-lived ones where possible.

More in [Cluster Hardening](../security/hardening.md).
