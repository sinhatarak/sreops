# Cluster Hardening Checklist

A practical baseline for any production cluster.

## 1. Least-privilege RBAC

Avoid binding `cluster-admin` to people or workloads. Grant namespaced roles with only the verbs and resources needed, and review bindings regularly.

## 2. Enforce Pod Security Standards

Label namespaces so the built-in admission controller applies the `restricted` profile. Try `warn` first to see what would break:

```bash
kubectl label namespace my-app pod-security.kubernetes.io/warn=restricted
kubectl label namespace my-app pod-security.kubernetes.io/enforce=restricted
```

## 3. Default-deny network policy

Start from "no traffic" and allow only what is required:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: my-app
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

!!! warning
    Denying all egress also blocks DNS. Add a policy that allows traffic to your cluster DNS service.

## 4. Protect secrets

Enable encryption at rest for Secrets in etcd, restrict who can read them, and prefer an external secret manager for sensitive credentials.

## 5. Secure images

Scan images in CI, pin by digest rather than mutable tags, and sign images you build.

## 6. Log and patch

Enable API server audit logging, keep Kubernetes and node operating systems patched, and restrict access to etcd and the kubelet API.
