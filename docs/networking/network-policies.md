# Network Policies

By default every Pod can talk to every other Pod. **NetworkPolicy** restricts that, but only if your [CNI enforces it](cni.md).

## How they behave

- Policies are **allow-lists** that add together. There are no deny rules.
- Once any policy selects a Pod for a direction (ingress or egress), that direction becomes **default-deny** for that Pod. Only what a policy allows gets through.

## 1. Start from default-deny

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: my-app
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
```

## 2. Allow DNS

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-egress
  namespace: my-app
spec:
  podSelector: {}
  policyTypes: [Egress]
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - { protocol: UDP, port: 53 }
        - { protocol: TCP, port: 53 }
```

## 3. Allow only what is needed

Frontend to backend on port 8080:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-from-frontend
  namespace: my-app
spec:
  podSelector:
    matchLabels: { app: backend }
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector:
            matchLabels: { app: frontend }
      ports:
        - { protocol: TCP, port: 8080 }
```

Remember that the frontend also needs an **egress** rule to reach the backend while default-deny egress is on.

## Test it

```bash
kubectl run probe --rm -it --image=nicolaka/netshoot -n my-app -- \
  curl -sS -m 3 http://backend:8080/healthz
```

See also [Cluster Hardening](../security/hardening.md).
