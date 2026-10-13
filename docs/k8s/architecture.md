# Kubernetes Architecture

Kubernetes is a set of cooperating control loops. You declare the desired state through the API, and controllers keep working until reality matches it.

## Control plane

| Component | Role |
|---|---|
| **kube-apiserver** | The front door. Every read and write goes through it, and it authenticates, validates and persists requests. |
| **etcd** | Consistent key-value store that holds all cluster state. |
| **kube-scheduler** | Picks a node for each Pod that has none. |
| **kube-controller-manager** | Runs the controllers (Deployment, Node, Job and more) that reconcile state. |
| **cloud-controller-manager** | Talks to the cloud provider for load balancers, nodes and routes. Cloud clusters only. |

## Node components

| Component | Role |
|---|---|
| **kubelet** | Starts and monitors the Pods assigned to its node. |
| **Container runtime** | Runs the containers, usually containerd or CRI-O. |
| **kube-proxy** | Programs Service routing rules. Some CNIs replace it. |

## What happens on `kubectl apply`

1. The API server authenticates the request, validates it and stores the object in etcd.
2. The Deployment controller sees the new object and creates a ReplicaSet.
3. The ReplicaSet controller creates Pod objects.
4. The scheduler assigns each Pod to a node.
5. The kubelet on that node asks the runtime to pull the image and start the containers.
6. Readiness probes pass, and the Pod joins its Service endpoints.

## Quick health checks

```bash
kubectl get --raw='/readyz?verbose'
kubectl get nodes -o wide
kubectl -n kube-system get pods
```
