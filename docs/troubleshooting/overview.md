# Troubleshooting: Start Here

Most incidents are solved faster by following the same steps every time than by guessing.

## A repeatable method

1. **Define the symptom.** What exactly is failing, for whom, and since when?
2. **Check what changed.** Deployments, config, node upgrades and certificate expiry cause most outages.
3. **Walk the layers** from the outside in: DNS, then Service, then endpoints, then Pod, then node.
4. **Gather evidence** before you change anything: events, logs and describe output.
5. **Change one thing at a time,** and note what you did.

## The five commands I reach for first

```bash
kubectl get pods -A -o wide
kubectl describe pod <pod> -n <ns>
kubectl logs <pod> -n <ns> --previous
kubectl get events -n <ns> --sort-by=.lastTimestamp
kubectl debug -it <pod> -n <ns> --image=nicolaka/netshoot --target=<container>
```

`describe` and `events` explain most scheduling, image and probe failures. `--previous` shows the logs of the container that just crashed. `kubectl debug` attaches a temporary toolbox container to a live Pod.

## Which page do I need?

| What you see | Go to |
|---|---|
| `Pending`, `ImagePullBackOff`, `CrashLoopBackOff`, `OOMKilled` | [Pod failures](pods.md) |
| Node `NotReady`, pressure conditions | [Nodes](nodes.md) |
| Service unreachable, DNS errors, 502/503 | [Services and DNS](networking.md) |
| PVC `Pending`, volume mount errors | [Storage](storage.md) |
| Just want the commands | [Quick Reference](../k8s/troubleshooting.md) |
