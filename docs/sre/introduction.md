# What is SRE?

Site Reliability Engineering applies software engineering to operations. Reliability becomes a feature that is measured, budgeted and engineered, instead of something achieved by heroics.

## Core principles

- **Reliability is a product feature.** Users feel availability and latency, not your architecture.
- **Measure it with SLOs.** Agree on a target for what "reliable enough" means.
- **Spend an error budget.** The gap between the SLO and 100% is room for change and risk.
- **Eliminate toil.** Automate repetitive manual work.
- **Learn from failure.** Run blameless postmortems and fix systemic causes.
- **Keep it simple.** Complexity is the main enemy of reliability.

## SRE, DevOps and platform engineering

| | Main question | Typical output |
|---|---|---|
| **DevOps** | How do we ship quickly and safely together? | Culture, CI/CD, shared ownership |
| **SRE** | Is the service reliable enough, and how do we prove it? | SLOs, error budgets, on-call, postmortems |
| **Platform engineering** | How do we make good practice the easy path? | Internal platform and golden paths |

They overlap heavily, and good teams use all three ideas.

## Where to go next

1. [SLIs, SLOs and error budgets](slo.md)
2. [Monitoring](monitoring.md) and [alerting](alerting.md)
3. [Incident management](incident-management.md) and [postmortems](postmortems.md)
4. [Reliability patterns](reliability-patterns.md), [capacity planning](capacity-planning.md) and [disaster recovery](disaster-recovery.md)
5. [Toil and automation](toil-automation.md) and [release engineering](release-engineering.md)
