# Performance Troubleshooting

When a server is slow, take a structured first look instead of guessing.

## The first 60 seconds

```bash
uptime                  # load averages
dmesg -T | tail         # kernel errors, OOM kills
vmstat 1                # run queue, memory, swap, CPU split
mpstat -P ALL 1         # per-CPU balance
pidstat 1               # per-process CPU
iostat -xz 1            # disk latency and utilisation
free -m                 # memory and swap
sar -n DEV 1            # network throughput
top                     # the overall picture
```

Some tools come from the `sysstat` package.

## How to read it

| Signal | What it suggests |
|---|---|
| Load far above CPU count | CPU contention or processes blocked on I/O |
| High `%iowait` or disk `await` | Slow or saturated disk |
| Swap in and out activity | Memory pressure |
| `us` high | Application CPU use |
| `sy` high | Kernel work: syscalls, networking, interrupts |

## Out of memory

```bash
dmesg -T | grep -i 'killed process'
journalctl -k | grep -i oom
```

The kernel OOM killer picks a victim when memory runs out. Check whether it was a memory leak or a limit set too low.

## Think in USE terms

For each resource, look at **U**tilization, **S**aturation and **E**rrors. See [Capacity Planning](../sre/capacity-planning.md).
