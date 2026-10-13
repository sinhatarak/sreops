# Storage Troubleshooting

```bash
kubectl get pvc,pv -A
kubectl describe pvc <name> -n <ns>
kubectl get storageclass
```

## PVC stuck in Pending

- **`WaitForFirstConsumer`** is normal until a Pod that uses the claim is scheduled.
- No default StorageClass, or the `storageClassName` is wrong.
- The provisioner or CSI driver is failing. Check its Pods in `kube-system`.
- Not enough capacity or quota.

## Multi-Attach error

A `ReadWriteOnce` volume is still attached to another node, which often happens after a node failure. Wait for the detach, or confirm the old Pod is gone. Do not force-detach until you are sure nothing is writing to the disk.

## Mount or permission errors

- Check that the Pod is in the same zone as a zonal disk.
- If the app cannot write, set `securityContext.fsGroup` so the volume is group-writable.

## Volume full or needs to grow

```bash
kubectl exec <pod> -n <ns> -- df -h
kubectl patch pvc <name> -n <ns> -p '{"spec":{"resources":{"requests":{"storage":"20Gi"}}}}'
```

Expansion requires `allowVolumeExpansion: true` on the StorageClass, and you can only grow, never shrink.

Background: [Volumes and Persistent Storage](../k8s/storage.md).
