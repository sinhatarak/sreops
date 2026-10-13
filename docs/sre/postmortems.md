# Postmortems

A postmortem is a written record of an incident that turns pain into improvement. The aim is to fix systems, not to find someone to blame.

## Principles

- **Blameless.** Assume everyone acted sensibly with the information they had.
- **Systemic.** Ask why the system allowed the mistake, not who made it.
- **Timely.** Write it while memory is fresh.
- **Shared.** Learning that stays in one team is wasted.

## Template

1. **Summary:** what happened, in two or three sentences.
2. **Impact:** who and what was affected, for how long, and the error budget used.
3. **Timeline:** key events with timestamps.
4. **Root causes and contributing factors:** use "why" chains, not a single cause.
5. **What went well and what went badly.**
6. **Action items:** each with an owner, a priority and a due date.

## Good action items

| Weak | Strong |
|---|---|
| "Be more careful with config changes" | "Add a validation step in CI that blocks invalid config (owner, due date)" |
| "Improve monitoring" | "Alert on the queue depth SLI, with a runbook" |

Prefer actions that remove the failure mode over actions that depend on people remembering.

!!! tip
    Review old postmortems for repeat themes. Repeats show where the real investment belongs.
