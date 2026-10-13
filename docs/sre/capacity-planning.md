# Capacity Planning

Capacity planning makes sure the service has enough resources for today's demand and a safe margin for tomorrow's.

## Steps

1. **Measure demand:** requests per second, data growth, peak versus average.
2. **Know the limits:** load test to find where latency or errors start to climb.
3. **Forecast:** use growth trends and known events such as launches and sales.
4. **Keep headroom:** plan for peaks and for losing a node or zone (N+1).
5. **Review regularly,** and tie it to cost.

## The USE method

For every resource (CPU, memory, disk, network), check:

- **Utilization:** how busy it is.
- **Saturation:** how much work is waiting.
- **Errors:** how often it fails.

Saturation is the early warning that utilisation alone hides.

## Autoscaling on Kubernetes

| Tool | Scales |
|---|---|
| **HPA** | Pod replicas, based on metrics |
| **VPA** | Pod resource requests |
| **Cluster Autoscaler or Karpenter** | Nodes |

Autoscaling reacts to load but does not replace planning. Limits, quotas and node supply still apply. See [Requests, Limits and QoS](../k8s/resources.md).
