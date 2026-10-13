# SLIs, SLOs and Error Budgets

| Term | Meaning | Example |
|---|---|---|
| **SLI** | A measurement of service behaviour | Share of requests that succeed |
| **SLO** | The target for that measurement over a window | 99.9% over 30 days |
| **SLA** | A contract with consequences if you miss it | Service credits |
| **Error budget** | Allowed unreliability: 100% minus the SLO | 0.1% of requests |

## What an SLO allows

Over 30 days:

| SLO | Allowed downtime |
|---|---|
| 99% | 7.2 hours |
| 99.5% | 3.6 hours |
| 99.9% | 43.2 minutes |
| 99.95% | 21.6 minutes |
| 99.99% | 4.3 minutes |

Each extra nine costs much more to deliver, so choose the target users actually need.

## Example SLI (Prometheus)

```promql
sum(rate(http_requests_total{job="api",code!~"5.."}[5m]))
/
sum(rate(http_requests_total{job="api"}[5m]))
```

## Using the budget

Agree on an **error budget policy** in advance. While budget remains, ship features. When it is spent, slow down and invest in reliability. That turns "stability versus speed" arguments into a shared, data-driven rule.

## Alert on burn rate

Page on how fast the budget is being consumed, not on raw error spikes:

| Window | Burn rate | Budget consumed | Action |
|---|---|---|---|
| 1 hour (and 5 minutes) | 14.4 | 2% | Page |
| 6 hours (and 30 minutes) | 6 | 5% | Page |
| 3 days (and 6 hours) | 1 | 10% | Ticket |

```yaml
- alert: ApiFastBurn
  expr: |
    (
      sum(rate(http_requests_total{job="api",code=~"5.."}[1h]))
      / sum(rate(http_requests_total{job="api"}[1h])) > (14.4 * 0.001)
    )
    and
    (
      sum(rate(http_requests_total{job="api",code=~"5.."}[5m]))
      / sum(rate(http_requests_total{job="api"}[5m])) > (14.4 * 0.001)
    )
  labels:
    severity: page
```

The example assumes a 99.9% SLO, so `0.001` is the error budget. More in [Alerting](alerting.md).
