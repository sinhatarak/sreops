# DNS in Kubernetes (CoreDNS)

CoreDNS runs in `kube-system` and answers every name lookup inside the cluster.

## Names you can use

| Name | Resolves to |
|---|---|
| `my-svc` | Service in the **same** namespace |
| `my-svc.my-ns` | Service in another namespace |
| `my-svc.my-ns.svc.cluster.local` | Fully qualified name |
| `pod-0.my-svc.my-ns.svc.cluster.local` | A StatefulSet Pod behind a headless Service |

A **headless** Service (`clusterIP: None`) returns the Pod IPs directly instead of one virtual IP.

## The `ndots:5` surprise

Pods get a resolver setting `ndots:5`. Any name with fewer than five dots is tried with each search suffix **first**, so an external lookup like `api.example.com` can cost several failed queries before it succeeds.

Reduce the noise per Pod:

```yaml
spec:
  dnsConfig:
    options:
      - name: ndots
        value: "2"
```

Alternatively, use a trailing dot (`api.example.com.`) to skip the search list.

## Debugging

```bash
kubectl -n kube-system get pods -l k8s-app=kube-dns
kubectl -n kube-system logs -l k8s-app=kube-dns --tail=50

kubectl run dns-test --rm -it --image=nicolaka/netshoot -- bash
# inside the pod:
nslookup kubernetes.default
cat /etc/resolv.conf
```

If lookups fail, see [Services and DNS troubleshooting](../troubleshooting/networking.md).
