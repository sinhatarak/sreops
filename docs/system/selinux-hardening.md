# SELinux and Server Hardening

## SELinux: fix it, do not disable it

```bash
getenforce
sudo ausearch -m avc -ts recent          # recent denials
ls -Z /var/www/html                      # file labels
```

Common fixes:

```bash
sudo restorecon -Rv /srv/app                                   # reset labels
sudo semanage fcontext -a -t httpd_sys_content_t "/srv/app(/.*)?"
sudo restorecon -Rv /srv/app
sudo semanage port -a -t http_port_t -p tcp 8081               # allow a custom port
getsebool -a | grep httpd
sudo setsebool -P httpd_can_network_connect on                 # persistent boolean
```

Setting SELinux to permissive helps you diagnose, but running it permanently disabled removes a strong layer of defence.

## SSH

In `/etc/ssh/sshd_config` (or a drop-in under `sshd_config.d/`):

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

```bash
sudo sshd -t && sudo systemctl reload sshd     # validate, then apply
```

Keep a second session open while you test, so you cannot lock yourself out.

## Baseline checklist

- Keep packages patched (`dnf-automatic` can automate security updates).
- Run `firewalld` with a closed default ([networking](networking.md)).
- Use `auditd` to record sensitive events.
- Remove unused services and accounts.
- Scan against a benchmark with OpenSCAP (`oscap`) and the CIS benchmarks.
- Centralise and protect logs.

See also [Users and Permissions](users-permissions.md) and [Cluster Hardening](../security/hardening.md).
