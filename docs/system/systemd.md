# systemd: Services, Logs and Timers

## Everyday commands

```bash
systemctl status nginx
sudo systemctl enable --now nginx
sudo systemctl restart nginx
systemctl list-units --failed
sudo systemctl daemon-reload          # after editing unit files
```

## Logs with journalctl

```bash
journalctl -u nginx -f                       # follow
journalctl -u nginx --since "1 hour ago"
journalctl -p err -b                         # errors since boot
journalctl -b -1                             # previous boot
```

## A service unit with sensible hardening

`/etc/systemd/system/demo-api.service`

```ini
[Unit]
Description=Demo API
After=network-online.target
Wants=network-online.target

[Service]
User=demo
ExecStart=/usr/local/bin/demo-api
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/var/lib/demo

[Install]
WantedBy=multi-user.target
```

## Timers (a modern cron)

`backup.timer`

```ini
[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

It runs a matching `backup.service`. Check with `systemctl list-timers`. `Persistent=true` runs a missed job after downtime.

## Slow boots

```bash
systemd-analyze blame | head
systemd-analyze critical-chain
```
