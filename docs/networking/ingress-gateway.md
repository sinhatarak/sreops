# Gateway API and Ingress

Both bring HTTP and HTTPS traffic from outside the cluster to your Services. A controller or implementation must be installed, since creating the objects alone does nothing.

!!! warning "ingress-nginx is retired"
    The community **ingress-nginx** controller was retired in March 2026 and no longer receives fixes. Check whether you run it:

```bash
    kubectl get pods --all-namespaces --selector app.kubernetes.io/name=ingress-nginx
```

    The Ingress API itself still exists, but the Kubernetes project recommends **Gateway API** as the successor.

## Gateway API

Gateway API separates responsibilities: infrastructure teams own the **Gateway**, and application teams own **HTTPRoutes**.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: web
  namespace: my-app
spec:
  gatewayClassName: example-class     # provided by your Gateway implementation
  listeners:
    - name: https
      protocol: HTTPS
      port: 443
      hostname: app.example.com
      tls:
        mode: Terminate
        certificateRefs:
          - name: app-example-com-tls
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: app
  namespace: my-app
spec:
  parentRefs:
    - name: web
  hostnames: ["app.example.com"]
  rules:
    - matches:
        - path: { type: PathPrefix, value: / }
      backendRefs:
        - name: app
          port: 80
```

For a Gateway shared across namespaces, set `allowedRoutes` on the listener to control which namespaces may attach routes.

## Ingress (if you still use it)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app
  namespace: my-app
spec:
  ingressClassName: <your-controller-class>
  tls:
    - hosts: [app.example.com]
      secretName: app-example-com-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app
                port: { number: 80 }
```

## Migrating

The Kubernetes project provides an **Ingress2Gateway** tool that converts existing Ingress resources to Gateway API objects. Treat its output as a first draft, then test routing, TLS and any annotation-based behaviour in a non-production cluster.
