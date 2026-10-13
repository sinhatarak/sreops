# Platform Engineering

Platform engineering builds an internal platform so product teams can ship without becoming Kubernetes experts. Instead of every team solving deployment, observability and security on its own, a platform team provides paved roads that are self-service, secure by default and supported.

## Core ideas

- **Internal Developer Platform (IDP):** the set of tools and workflows developers use to build, deploy and run software.
- **Golden paths:** opinionated, well-supported ways to do common things, such as creating a new service.
- **Self-service:** developers get what they need without opening a ticket.
- **Platform as a product:** the platform has users, a roadmap and feedback loops.

## Typical building blocks

| Concern | Common tools |
|---|---|
| Delivery | Argo CD, Flux |
| Policy and guardrails | Kyverno, OPA Gatekeeper |
| Observability | Prometheus, Grafana, OpenTelemetry |
| Infrastructure provisioning | Crossplane, Terraform |
| Developer portal | Backstage |

## How to know it's working

Track adoption of the golden paths, deployment lead time, change failure rate and developer satisfaction. A platform nobody chooses to use is not succeeding, however well engineered.

Next: [GitOps with Argo CD](gitops.md).
