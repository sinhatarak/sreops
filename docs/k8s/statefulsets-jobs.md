# StatefulSets, Jobs and CronJobs

## StatefulSet

Use a StatefulSet when each replica needs a **stable identity and its own storage**, such as databases and queues. Pods get ordered names (`db-0`, `db-1`) and keep their volumes across restarts.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: db
spec:
  clusterIP: None          # headless: gives each Pod its own DNS record
  selector: { app: db }
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db
spec:
  serviceName: db
  replicas: 3
  selector:
    matchLabels: { app: db }
  template:
    metadata:
      labels: { app: db }
    spec:
      containers:
        - name: db
          image: postgres:16
          volumeMounts:
            - { name: data, mountPath: /var/lib/postgresql/data }
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests: { storage: 10Gi }
```

## Job and CronJob

A **Job** runs a task to completion. A **CronJob** creates Jobs on a schedule.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-backup
spec:
  schedule: "0 2 * * *"
  concurrencyPolicy: Forbid          # never overlap runs
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      backoffLimit: 2
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: busybox:1.36
              command: ["sh", "-c", "echo running backup"]
```

!!! note
    A StatefulSet is not a backup strategy. Replicated storage does not protect you from deleting data, so test restores regularly (see [Disaster Recovery](../sre/disaster-recovery.md)).
