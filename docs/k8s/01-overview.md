# Kubernetes Overview

Learn about pods, deployments, services, and ConfigMaps.

## Example: Create a Pod

# Kubernetes Pod Example

Run a simple Nginx pod:

```bash
kubectl run nginx --image=nginx --restart=Never
kubectl get pods

