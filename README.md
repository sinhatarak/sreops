![SREOPS Logo](https://raw.githubusercontent.com/sinhatarak/sreops/main/docs/images/logo.png)

# SREOps Blog

**Practical knowledge for SRE, Kubernetes, DevOps, and System Administration.**

SREOPS is a technical knowledge base for engineers who build, operate, secure, and scale reliable infrastructure and cloud-native platforms.

[🌐 Visit SREOPS](https://sreops.co) · [📚 Browse Repository](https://github.com/sinhatarak/sreops) · [🤝 Contribute](https://github.com/sinhatarak/sreops/issues)

[![Deploy to GitHub Pages](https://github.com/sinhatarak/sreops/actions/workflows/deploy.yml/badge.svg)](https://github.com/sinhatarak/sreops/actions/workflows/deploy.yml)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/sinhatarak/sreops/issues)

## What You'll Find Here

- **Site Reliability Engineering:** SLOs, SLIs, error budgets, incident management, and reliability practices.
- **Kubernetes & Cloud Native:** Cluster operations, networking, service mesh, security, and troubleshooting.
- **DevOps & Platform Engineering:** Infrastructure as code, automation, CI/CD, and platform tooling.
- **Linux & System Administration:** Networking, performance tuning, monitoring, and production troubleshooting.
- **Observability:** Metrics, logs, traces, dashboards, and alerting.
- **Hands-on Guides:** Practical examples, scripts, labs, and technical walkthroughs.

## Technology Stack

- [MkDocs](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- GitHub and GitHub Actions
- GitHub Pages

## Run Locally

```bash
git clone https://github.com/sinhatarak/sreops.git
cd sreops

python3 -m venv .venv
source .venv/bin/activate

python -m pip install --upgrade pip
pip install -r requirements.txt

mkdocs serve
```

Open `http://127.0.0.1:8000` to preview the site.

Validate your changes before publishing:

```bash
mkdocs build --strict
```

## Publish Changes

The site is configured to deploy through GitHub Actions when changes are pushed to `main`.

```bash
git status
git add README.md docs mkdocs.yml
git commit -m "Update SREOPS documentation"
git push origin main
```

Monitor deployment in [GitHub Actions](https://github.com/sinhatarak/sreops/actions).

If you're working on a feature branch, push it and open a pull request instead of pushing directly to `main`.

## Contributing

Contributions from the engineering community are welcome!

You can help by:

- Improving existing tutorials and documentation.
- Adding SRE, Kubernetes, DevOps, and Linux guides.
- Sharing troubleshooting steps, labs, and automation examples.
- Correcting errors or suggesting new topics.

### How to Contribute

1. Fork the repository.
2. Create a branch for your changes.
3. Add or update Markdown files under `docs/`.
4. Update `mkdocs.yml` navigation if required.
5. Run `mkdocs build --strict` to validate the site.
6. Open a pull request describing your contribution.

Please contribute original material or content you have permission to publish. Never include credentials, secrets, or employer-confidential information.

## Licensing

- **Code and scripts:** MIT License — see [LICENSE](LICENSE).
- **Original articles and documentation:** Creative Commons Attribution 4.0 International (CC BY 4.0), once the repository's `LICENSE-CONTENT` file and contribution terms are in place. See the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

CC BY 4.0 permits sharing and adapting covered content, including commercially, with appropriate attribution. Third-party materials may have separate licensing terms.

Contributors should ensure they have the right to submit their work under the applicable project license.

## Disclaimer

Content is provided for educational purposes. Test commands and configurations in a suitable environment before applying them to production systems.

---

**Learn, share, and build more reliable systems together.**
