# Node Problems

```bash
kubectl get nodes -o wide
kubectl describe node <node>        # check Conditions and Events
```

## Conditions to read

| Condition | Healthy value | Problem means |
|---|---|---|
| `Ready` | True | Kubelet cannot report healthy |
| `MemoryPressure` | False | Node is low on memory, so Pods may be evicted |
| `DiskPressure` | False | Disk or inode shortage, often from images and logs |
| `PIDPressure` | False | Too many processes |

## NotReady

Log in to the node and check, in this order:

```bash
systemctl status kubelet
journalctl -u kubelet -n 100 --no-pager
systemctl status containerd
crictl ps
df -h && free -m
```

Common causes:

- The kubelet or container runtime stopped.
- **Expired kubelet or cluster certificates.**
- The CNI plugin is not ready, which shows in the node's Ready condition message.
- A full disk.
- Lost connectivity to the API server.

## Maintaining a node safely

```bash
kubectl cordon <node>                                  # stop new Pods
kubectl drain <node> --ignore-daemonsets --delete-emptydir-data
kubectl uncordon <node>                                # when done
```

!!! tip
    PodDisruptionBudgets can block a drain. If it hangs, check `kubectl get pdb -A` before forcing anything.
