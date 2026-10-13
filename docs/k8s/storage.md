# Volumes and Persistent Storage

| Object | What it is |
|---|---|
| **PersistentVolume (PV)** | A piece of storage in the cluster. |
| **PersistentVolumeClaim (PVC)** | A request for storage by a workload. |
| **StorageClass** | A template for dynamically provisioning PVs. |

## Access modes

| Mode | Meaning |
|---|---|
| `ReadWriteOnce` (RWO) | Mounted read-write by one node |
| `ReadOnlyMany` (ROX) | Mounted read-only by many nodes |
| `ReadWriteMany` (RWX) | Mounted read-write by many nodes (needs a supporting backend) |
| `ReadWriteOncePod` (RWOP) | Read-write by a single Pod |

## Example claim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: standard      # use a class from: kubectl get storageclass
  resources:
    requests:
      storage: 10Gi
```

## Things worth knowing

- With `volumeBindingMode: WaitForFirstConsumer`, a PVC stays **Pending until a Pod uses it**. That is normal.
- `reclaimPolicy: Delete` removes the underlying disk when the PVC is deleted. Use `Retain` for data you cannot lose.
- Growing a volume needs `allowVolumeExpansion: true` on the StorageClass.

```bash
kubectl get pvc,pv -A
kubectl describe pvc <name>
```

Having trouble? See [Storage troubleshooting](../troubleshooting/storage.md).
