---
title: Kubernetes Networking Deep Dive
date: 2026-02-07
authors:
  - Tarak Sinha
tags: [kubernetes, networking, CNI, SRE]
---

# Kubernetes Networking Deep Dive

Kubernetes networking is critical for SREs and system administrators. Pods must communicate with each other and with services, often across nodes.

---

## Kubernetes Networking Model

Kubernetes uses a **flat network model**. Every Pod gets its own IP and can talk to other Pods directly.

---

## CNI (Container Network Interface)

CNI is the standard interface for networking in Kubernetes. Popular plugins: **Cilium**, **Calico**.

```bash
kubectl apply -f cni-config.yaml
```

---

## Example: Create a Pod

```bash
kubectl run nginx --image=nginx --restart=Never
kubectl get pods
```

> Use `kubectl describe pod nginx` to inspect networking details.

---

## References

- [Kubernetes CNI](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/)
- [CNI Spec](https://github.com/containernetworking/cni)
- [Cilium](https://github.com/cilium/cilium)
- [Calico](https://github.com/projectcalico/calico/)

