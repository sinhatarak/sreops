# Pod Networking and CNI

The **Container Network Interface (CNI)** plugin gives each Pod an IP and connects it to the rest of the cluster. Kubernetes defines the rules, and the CNI plugin implements them.

## Common plugins

| Plugin | Notes |
|---|---|
| **Cilium** | eBPF-based. Can replace kube-proxy, with rich policy and observability. |
| **Calico** | Mature, with strong network policy. Supports BGP routing or overlays. |
| **Flannel** | Simple overlay. **Does not enforce NetworkPolicy** by itself. |
| **AWS VPC CNI** | Pods get real VPC IPs. Pod density depends on ENI limits. |

## Overlay vs routed

- **Overlay** (VXLAN, IP-in-IP) wraps Pod traffic in node-to-node packets. It is easy to set up and works almost anywhere, with some encapsulation overhead.
- **Routed** (BGP or cloud routes) uses real routes. It is faster and easier to inspect, but needs network support.

## How Services are implemented

`kube-proxy` programs rules on every node so that traffic to a Service IP reaches one of its Pods:

- **iptables** mode is the common default.
- **IPVS** mode scales better for very large Service counts.
- **eBPF** (for example Cilium) can replace kube-proxy entirely.

## Useful checks

```bash
kubectl get nodes -o custom-columns=NAME:.metadata.name,CIDR:.spec.podCIDR
kubectl get pods -A -o wide
ls /etc/cni/net.d/                      # run on a node
```

!!! warning
    NetworkPolicy only works if your CNI enforces it. Creating policies on a CNI that ignores them gives a false sense of security.
