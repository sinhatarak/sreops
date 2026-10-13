# Linux Networking and Firewalls

## Inspect

```bash
ip -br a                    # addresses
ip r                        # routes
ss -tulpn                   # listening ports and owning processes
nmcli device status         # NetworkManager (RHEL)
resolvectl status           # DNS (systemd-resolved systems)
```

## Troubleshooting ladder

Work from the bottom up and stop at the first failure:

| Layer | Check |
|---|---|
| Link | `ip link`, cable or virtual NIC state |
| Address | `ip a` |
| Route | `ip r`, then `ping <gateway>` |
| DNS | `dig example.com`, `getent hosts example.com` |
| Port | `ss -tulpn`, `curl -v http://host:port` |
| Firewall | `firewall-cmd --list-all` |
| Application | logs with [journalctl](systemd.md) |

## firewalld

```bash
sudo firewall-cmd --get-active-zones
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=8443/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

Without `--permanent`, a change is lost at reload or reboot. Keep the default policy closed and open only what you need.

## Packet capture

```bash
sudo tcpdump -ni eth0 port 443 -c 20
```

Typical clues: repeated SYNs without replies suggest a firewall or routing issue. Resets suggest nothing is listening.

For the Kubernetes layers see [K8s Networking](../networking/overview.md).
