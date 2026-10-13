---
hide:
  - navigation
  - toc
---

<div class="hero hero-split" markdown>

<div class="hero-copy" markdown>

# Reliable infrastructure, **engineered.**

<p class="hero-roles">Hands-on <span class="rotator"><span>Kubernetes</span><span>SRE</span><span>Platform Engineering</span><span>Cloud Security</span><span>Python &amp; Go</span><span>Kubernetes</span></span></p>

CNCF Kubestronaut sharing real production lessons, troubleshooting playbooks and automation.
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


## Live visitor activity

<div class="visitor-feed">
  <div class="visitor-feed__header">
    <div>
      <strong>LIVE TRAFFIC</strong>
      <div class="visitor-feed__subtitle">Recent website visitors</div>
    </div>
    <button id="visitor-feed-refresh" type="button">
      ↻ Refresh
    </button>
  </div>

  <div class="visitor-feed__widget">
    <script src="https://feed-pulse.com/api/embed/traffic-feed.js?site_id=102f4d90-8dec-4327-a2ee-b1ca2be5d8d2&w=320&bc=111827&tc=F3F4F6&brd=374151&hb=002FA7&hf=ffffff&lnk=60A5FA&font=IBM+Plex+Sans&rows=10&poll=3000&lang=en&bstyle=minimal&v=15" async></script>
  </div>
  <div class="visitor-feed__footer">Auto-refresh enabled · 3-second polling</div>
</div>

<style>
.visitor-feed {
  max-width: 360px;
  padding: 16px;
  margin: 1rem 0;
  color: #f3f4f6;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 12px;
  font-family: "IBM Plex Sans", sans-serif;
}
.visitor-feed__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.visitor-feed__subtitle,
.visitor-feed__footer {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 4px;
}
#visitor-feed-refresh {
  padding: 7px 10px;
  color: #fff;
  background: #002fa7;
  border: 1px solid #4268c5;
  border-radius: 7px;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
}
#visitor-feed-refresh:hover {
  background: #1746bd;
}
.visitor-feed__widget {
  min-height: 100px;
  overflow: hidden;
}
.visitor-feed__footer {
  border-top: 1px solid #374151;
  padding-top: 10px;
  margin-top: 10px;
}
</style>

<script>
(function () {
  var button = document.getElementById('visitor-feed-refresh');
  if (!button) return;

  button.addEventListener('click', function () {
    button.disabled = true;
    button.textContent = 'Refreshing…';

    var oldScript = document.querySelector(
      '.visitor-feed__widget script[src*="traffic-feed.js"]'
    );

    if (oldScript) {
      var src = oldScript.src;
      var widget = oldScript.parentNode;
      widget.innerHTML = '';

      var newScript = document.createElement('script');
      newScript.src = src;
      newScript.async = true;
      newScript.onload = function () {
        button.disabled = false;
        button.textContent = '↻ Refresh';
      };
      newScript.onerror = function () {
        button.disabled = false;
        button.textContent = 'Retry refresh';
      };
      widget.appendChild(newScript);
    } else {
      button.disabled = false;
      button.textContent = '↻ Refresh';
    }
  });
})();
</script>

