# Shell Scripting and Ansible

## Safe shell scripts

```bash
#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "failed at line $LINENO" >&2' ERR

threshold="${1:-85}"
df -P -x tmpfs -x devtmpfs | awk -v t="$threshold" '
  NR > 1 { gsub("%", "", $5); if ($5 + 0 >= t) printf "%s is at %s%%\n", $6, $5 }
'
```

- `set -Eeuo pipefail` stops on errors, unset variables and failed pipes.
- Quote variables and validate input.
- Run scripts through `shellcheck` before you trust them.

## cron and timers

```bash
crontab -e
# m h dom mon dow  command
0 2 * * *  /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
```

Prefer [systemd timers](systemd.md) when you want logging, dependency handling and catch-up of missed runs.

## Ansible: describe the state, not the steps

```yaml
# site.yml
- hosts: all
  become: true
  tasks:
    - name: Ensure chrony is installed
      ansible.builtin.dnf:
        name: chrony
        state: present

    - name: Ensure chronyd is enabled and running
      ansible.builtin.service:
        name: chronyd
        state: started
        enabled: true
```

```bash
ansible-playbook -i inventory.ini site.yml --check --diff    # preview first
ansible-playbook -i inventory.ini site.yml
```

Good playbooks are **idempotent**, so running them twice changes nothing the second time. For the bigger picture see [Toil and Automation](../sre/toil-automation.md).
