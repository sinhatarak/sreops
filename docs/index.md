---
hide:
  - navigation
  - toc
---

<div class="hero hero-split" markdown>

<div class="hero-copy" markdown>

# Engineering Reliable **Platforms at Scale.**

<p class="hero-roles">Hands-on <span class="rotator"><span>Kubernetes</span><span>SRE</span><span>Platform Engineering</span><span>Cloud Security</span><span>Python &amp; Go</span><span>Kubernetes</span></span></p>

Platform architecture, Kubernetes, cloud-native infrastructure, networking, security, and SRE practices for building scalable, resilient production systems.
{ .hero-sub }

[Learn with me](services.md){ .md-button .md-button--primary }
[Troubleshooting guides](troubleshooting/overview.md){ .md-button }

</div>

<div class="terminal" aria-hidden="true">
  <div class="t-bar"><i></i><i></i><i></i><span>sre@prod-cluster</span></div>
  <div class="t-body">
<div class="t-line" style="--n:26;--d:.4s">$ kubectl get pods -n shop</div>
<div class="t-out" style="--d:2.2s">NAME           READY   STATUS             RESTARTS
api-7d9f-x2k   0/1     CrashLoopBackOff   6</div>
<div class="t-line" style="--n:38;--d:3.2s">$ kubectl logs api-7d9f-x2k --previous</div>
<div class="t-out" style="--d:5.2s">Error: missing required env DATABASE_URL</div>
<div class="t-line" style="--n:35;--d:6.2s">$ kubectl rollout status deploy/api</div>
<div class="t-out ok" style="--d:8s">deployment "api" successfully rolled out</div>
<div class="t-cursor">$ <b></b></div>
  </div>
</div>

</div>

<div class="stats" markdown>
<div><strong>5</strong><span>CNCF Kubernetes certifications</span></div>
<div><strong>3</strong><span>hands-on exams: CKA · CKAD · CKS</span></div>
<div><strong>9</strong><span>topic areas and growing</span></div>
</div>

<div class="credstrip" markdown>
![CNCF Kubestronaut badge](images/kubestronaut.png){ .credstrip-badge }
<div markdown>
**CNCF Kubestronaut**<br>
All five Kubernetes certifications: CKA · CKAD · CKS · KCNA · KCSA

[See the credential](kubestronaut.md){ .md-button }
</div>
</div>

## Start here

<div class="grid cards" markdown>

- :material-restart-alert: **Debug a CrashLoopBackOff**

    A repeatable method for pods that keep restarting.

    [:octicons-arrow-right-24: Read](troubleshooting/pods.md#crashloopbackoff)

- :material-lan: **How Services and DNS really work**

    From Pod IPs to Gateway API.

    [:octicons-arrow-right-24: Read](networking/overview.md)

- :material-shield-lock: **Harden a cluster**

    A practical production baseline.

    [:octicons-arrow-right-24: Read](security/hardening.md)

</div>

## Fix it fast

<div class="chips" markdown>
[CrashLoopBackOff](troubleshooting/pods.md#crashloopbackoff){ .chip }
[ImagePullBackOff](troubleshooting/pods.md#imagepullbackoff){ .chip }
[Pending](troubleshooting/pods.md#pending){ .chip }
[OOMKilled](troubleshooting/pods.md#oomkilled){ .chip }
[Node NotReady](troubleshooting/nodes.md#notready){ .chip }
[DNS failures](troubleshooting/networking.md#dns-lookups-fail){ .chip }
[No endpoints](troubleshooting/networking.md#service-has-no-endpoints){ .chip }
[PVC Pending](troubleshooting/storage.md#pvc-stuck-in-pending){ .chip }
</div>

## Explore topics

<div class="grid cards" markdown>

- :material-kubernetes: **Kubernetes**

    Architecture, workloads, configuration and storage.

    [:octicons-arrow-right-24: Explore](k8s/01-overview.md)

- :material-lan: **K8s Networking**

    CNI, Services, DNS, Gateway API and policies.

    [:octicons-arrow-right-24: Explore](networking/overview.md)

- :material-wrench: **Troubleshooting**

    Step-by-step playbooks for pods, nodes, DNS and storage.

    [:octicons-arrow-right-24: Explore](troubleshooting/overview.md)

- :material-chart-line: **SRE**

    SLOs, monitoring, alerting and disaster recovery.

    [:octicons-arrow-right-24: Explore](sre/monitoring.md)

- :material-layers-triple: **Platform Engineering**

    Internal platforms, golden paths and GitOps.

    [:octicons-arrow-right-24: Explore](platform/overview.md)

- :material-shield-lock: **Security**

    Cluster hardening and software supply chain.

    [:octicons-arrow-right-24: Explore](security/overview.md)

- :material-code-braces: **Python & Go**

    Automation and tooling for reliable operations.

    [:octicons-arrow-right-24: Explore](programming/overview.md)

- :material-linux: **Linux**

    The foundations: automation and hardening.

    [:octicons-arrow-right-24: Explore](system/overview.md)

- :material-map-marker-path: **Cert Roadmaps**

    CNCF, AWS, Google Cloud, Azure and security paths.

    [:octicons-arrow-right-24: Explore](roadmaps/overview.md)

</div>

<div class="cta" markdown>

## Need a second pair of eyes on your cluster?

Kubernetes audits, SLO and alerting setup, and disaster recovery planning.

[Learn with me](services.md){ .md-button .md-button--primary }
[Read the blog](blog/index.md){ .md-button }

</div>
