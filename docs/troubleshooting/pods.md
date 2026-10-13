# Pod Failures

Start every investigation with:

```bash
kubectl describe pod <pod> -n <ns>      # read the Events at the bottom
```

## Pending

The Pod was accepted but cannot start yet.

- **Events say `0/N nodes are available`.** Insufficient CPU or memory, taints without tolerations, or a `nodeSelector` or affinity that matches nothing.
- **PVC not bound.** See [Storage](storage.md).
- **Quota exceeded.** Check `kubectl describe resourcequota -n <ns>`.

## ImagePullBackOff

- A typo in the image name or tag.
- A private registry without `imagePullSecrets`.
- Registry rate limits or network access from the node.

```bash
kubectl describe pod <pod> | grep -A5 Events
```

## CrashLoopBackOff

The container starts, exits, and Kubernetes keeps restarting it with growing delays.

```bash
kubectl logs <pod> -n <ns> --previous
kubectl get pod <pod> -n <ns> \
  -o jsonpath='{.status.containerStatuses[0].lastState.terminated}'
```

| Exit code | Usual meaning |
|---|---|
| 1 | Application error. Read the logs. |
| 137 | Killed (SIGKILL). Often an OOM kill. |
| 143 | Terminated (SIGTERM). Check shutdown handling. |

Common causes: missing config or Secret, wrong command, a liveness probe that fails too early (add a `startupProbe`), or a dependency that is not ready.

## OOMKilled

```bash
kubectl get pod <pod> -n <ns> \
  -o jsonpath='{.status.containerStatuses[0].lastState.terminated.reason}'
```

If it prints `OOMKilled`, raise the memory limit, or find the leak. See [Requests, Limits and QoS](../k8s/resources.md).

## CreateContainerConfigError

A referenced ConfigMap or Secret key does not exist, or the name is wrong. `describe` names the missing object.

## Running but not Ready

The readiness probe is failing. Check the probe path and port, then run it by hand:

```bash
kubectl exec <pod> -n <ns> -- wget -qO- http://localhost:8080/healthz
```

## Evicted

The node ran short of memory, disk or PIDs. See [Nodes](nodes.md), and set realistic requests so important Pods are not first in line.
