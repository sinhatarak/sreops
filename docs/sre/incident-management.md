# Incident Management

An incident is any event that hurts users or the business. A clear process lets people act calmly instead of improvising under pressure.

## Lifecycle

1. **Detect:** an alert or a user report.
2. **Triage:** assess impact and set a severity.
3. **Mitigate:** stop the harm first. Rollback, fail over or scale. Root cause comes later.
4. **Communicate:** keep stakeholders informed on a regular rhythm.
5. **Resolve:** confirm recovery against the SLI.
6. **Learn:** hold a [postmortem](postmortems.md).

## Roles

| Role | Job |
|---|---|
| **Incident commander** | Coordinates and decides. Does not debug. |
| **Operations lead** | Investigates and applies fixes. |
| **Communications lead** | Updates stakeholders and customers. |
| **Scribe** | Keeps the timeline. |

Small teams combine roles, but someone must own coordination.

## Example severity levels

Adapt these to your organisation:

| Level | Meaning |
|---|---|
| **SEV1** | Major outage or data loss. All hands. |
| **SEV2** | Significant degradation for many users. |
| **SEV3** | Limited impact. Handle in working hours. |

## First ten minutes

- Open one channel and name an incident commander.
- State impact and the time it started.
- Check recent changes first. They explain most incidents.
- Prefer rollback to a risky live fix.
- Post an update, and then keep to a schedule.

For hands-on diagnosis see [Troubleshooting](../troubleshooting/overview.md).

## Healthy on-call

Keep rotations sustainable, make handoffs explicit, and keep runbooks next to the alerts they explain. Every page should be actionable, or the alert should change.
