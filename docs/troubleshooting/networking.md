# Services and DNS Troubleshooting

Work from the client towards the server, and stop at the first layer that fails.

```
 DNS  →  Service  →  Endpoints  →  Pod  →  NetworkPolicy  →  Ingress/Gateway
```

## DNS lookups fail

```bash
kubectl run dns-test --rm -it --image=nicolaka/netshoot -- nslookup kubernetes.default
kubectl -n kube-system get pods -l k8s-app=kube-dns
kubectl -n kube-system logs -l k8s-app=kube-dns --tail=50
```

- CoreDNS Pods not running or crash-looping.
- A default-deny egress policy that does not allow DNS ([fix](../networking/network-policies.md)).
- Slow lookups from `ndots:5`. See [DNS](../networking/dns.md).

## Service has no endpoints

This is the most common cause of "the Service does not work".

```bash
kubectl get svc <svc> -n <ns>
kubectl get endpointslices -n <ns> -l kubernetes.io/service-name=<svc>
kubectl get pods -n <ns> --show-labels
```

- The Service `selector` does not match the Pod labels.
- Pods are not Ready, because the readiness probe is failing.
- `targetPort` does not match the port the container listens on.

## Reaching it still fails

Test directly at each hop:

```bash
kubectl port-forward pod/<pod> 8080:<container-port> -n <ns>     # bypass the Service
kubectl run probe --rm -it --image=nicolaka/netshoot -n <ns> -- \
  curl -sS -m 3 http://<svc>:<port>
```

If the Pod works but the Service does not, look at selectors and ports. If both work from one Pod and not another, suspect a NetworkPolicy.

## NetworkPolicy blocking traffic

```bash
kubectl get networkpolicy -n <ns>
kubectl describe networkpolicy <name> -n <ns>
```

Remember that default-deny needs **both** an egress rule on the caller and an ingress rule on the target.

## Ingress or Gateway errors

| Symptom | Likely cause |
|---|---|
| **404** | No matching host or path rule |
| **502 / 503** | The backend Service has no ready endpoints, or the wrong port |
| **TLS errors** | Missing, expired or wrongly named certificate Secret |

```bash
kubectl describe httproute <name> -n <ns>      # look at the Accepted and ResolvedRefs conditions
kubectl describe ingress <name> -n <ns>
```
