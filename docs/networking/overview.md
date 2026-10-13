# Kubernetes Networking Overview

Kubernetes networking looks complicated because several layers cooperate. Each layer has one job, and most problems are easier once you know which layer you are in.

## The network model

1. Every Pod gets its **own IP address**.
2. Pods can talk to all other Pods **without NAT**.
3. Node agents can talk to all Pods on their node.
4. A **Service** gives a stable virtual IP and DNS name to a changing set of Pods.

## The layers

```
 Client
   │
   ▼
 Gateway / Ingress / LoadBalancer      external traffic in
   │
   ▼
 Service (ClusterIP)  ◄── DNS (CoreDNS)  stable name and virtual IP
   │
   ▼
 kube-proxy or eBPF rules              picks a healthy endpoint
   │
   ▼
 Pod IP  ◄── CNI plugin                pod-to-pod across nodes
```

| Layer | Handled by | Read |
|---|---|---|
| Pod-to-Pod | CNI plugin | [Pod Networking and CNI](cni.md) |
| Names | CoreDNS | [DNS](dns.md) |
| Stable access | Services | [Services](../k8s/services.md) |
| External traffic | Gateway API / Ingress | [Gateway API and Ingress](ingress-gateway.md) |
| Isolation | NetworkPolicy | [Network Policies](network-policies.md) |

## Go deeper

For a longer walkthrough, read the article [Kubernetes Networking Deep Dive](../blog/posts/2026-02-07-kubernetes-networking.md).

When something is broken, go straight to [Services and DNS troubleshooting](../troubleshooting/networking.md).
