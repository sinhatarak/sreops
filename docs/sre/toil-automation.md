# Toil and Automation

**Toil** is operational work that is manual, repetitive, automatable, tactical, without lasting value, and that grows in proportion to the service. Handling it forever keeps a team too busy to improve anything.

## Why it matters

A common SRE guideline is to keep toil under about half of the team's time, so the rest goes to engineering that reduces future work.

## Finding toil

- Review tickets and pages for repeated tasks.
- Ask the team what they dread doing.
- Track time spent, even roughly.

## The automation ladder

1. **Document it** as a runbook.
2. **Script it** so a person runs one command.
3. **Make it self-service** so users do it themselves.
4. **Make it self-healing** so the system does it automatically.

## Example: from runbook to script

```bash
#!/usr/bin/env bash
set -Eeuo pipefail
ns="${1:?usage: restart-unhealthy.sh <namespace>}"

kubectl get pods -n "$ns" --no-headers \
  | awk '$3 == "CrashLoopBackOff" {print $1}' \
  | while read -r pod; do
      echo "Deleting $pod"
      kubectl delete pod "$pod" -n "$ns"
    done
```

!!! note
    A script that hides a recurring failure is not a fix. Track why it keeps happening and remove the cause.

See also [Shell and Ansible](../system/automation.md) and [GitOps](../platform/gitops.md).
