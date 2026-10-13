# CNCF Kubestronaut Path

**Kubestronaut** is awarded to people who pass all five CNCF Kubernetes certifications. Official details: [CNCF Kubestronaut program](https://www.cncf.io/training/kubestronaut/).

## Recommended order

| Step | Exam | Format | Why this order |
|---|---|---|---|
| 1 | **KCNA**: Kubernetes and Cloud Native Associate | Multiple choice | Builds the vocabulary and the big picture |
| 2 | **KCSA**: Kubernetes and Cloud Native Security Associate | Multiple choice | Security concepts that make CKS easier |
| 3 | **CKA**: Certified Kubernetes Administrator | Hands-on | The core operations skill set |
| 4 | **CKAD**: Certified Kubernetes Application Developer | Hands-on | Speed with workloads and manifests |
| 5 | **CKS**: Certified Kubernetes Security Specialist | Hands-on | The hardest, and it requires a current CKA |

## How I'd prepare

- **Live in a cluster.** Build one with kubeadm, break it, and fix it. The [Troubleshooting](../troubleshooting/overview.md) section is a good drill list.
- **Get fast with `kubectl`.** Imperative commands, `--dry-run=client -o yaml`, and `kubectl explain` save minutes.
- **Use the practice simulator** that comes with exam registration, and review the candidate handbook for what is allowed.
- **Study concepts, not exam content.** Sharing real exam questions breaks the candidate agreement.

## After the five

Everything must stay current to keep the Kubestronaut title, so plan renewals. The next step is the [Golden Kubestronaut](golden-kubestronaut.md).
