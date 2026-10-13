# Users, Groups and Permissions

## Users and groups

```bash
sudo useradd -m -s /bin/bash alice
sudo passwd alice
sudo usermod -aG wheel alice        # RHEL: wheel. Debian/Ubuntu: sudo
id alice
sudo chage -l alice                 # password ageing
sudo usermod -L alice               # lock the account
```

## File permissions

| Digit | Meaning |
|---|---|
| 4 | read (`r`) |
| 2 | write (`w`) |
| 1 | execute (`x`) |

```bash
chmod 640 app.conf                  # owner rw, group r, others none
chmod u+x deploy.sh
sudo chown app:app /var/lib/app
umask 027                           # default: new files not readable by others
```

## Special bits

| Bit | Effect |
|---|---|
| `setuid` (`u+s`) | Runs with the file owner's privileges. Use sparingly. |
| `setgid` (`g+s`) on a directory | New files inherit the directory's group. |
| sticky (`+t`) | Only the owner can delete files, as on `/tmp`. |

## ACLs

For access beyond owner, group and others:

```bash
setfacl -m u:bob:rw report.txt
getfacl report.txt
```

## sudo

```bash
sudo visudo -f /etc/sudoers.d/ops
```

```text
%ops ALL=(root) /usr/bin/systemctl restart nginx
```

Grant specific commands, not blanket `ALL`, and review who has access. More in [SELinux and Hardening](selinux-hardening.md).
