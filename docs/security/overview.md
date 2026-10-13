# Security

Security works best as part of the design, not as a review at the end. Kubernetes documentation describes defence in depth as four layers, often called the 4Cs: **Cloud**, **Cluster**, **Container** and **Code**. A weakness in an inner layer is much harder to exploit when the outer layers are sound.

## What I cover here

- Hardening clusters: RBAC, Pod Security Standards, network policies and secrets.
- Securing the software supply chain: image scanning, signing and provenance.
- Detection and response: audit logs and runtime monitoring.

Start with the [cluster hardening checklist](hardening.md).
