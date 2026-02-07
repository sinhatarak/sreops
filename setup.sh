#!/bin/bash

BASE_DIR=$(pwd)

# Directories to create
DIRS=(
  "docs"
  "docs/k8s"
  "docs/sre"
  "docs/images"
)

for dir in "${DIRS[@]}"; do
  mkdir -p "$BASE_DIR/$dir"
done
echo "Directories created ✅"

# File paths
FILES=(
  "docs/index.md"
  "docs/about.md"
  "docs/featured.md"
  "docs/k8s/overview.md"
  "docs/k8s/deployments.md"
  "docs/k8s/troubleshooting.md"
  "docs/sre/monitoring.md"
  "docs/sre/alerting.md"
  "docs/sre/disaster-recovery.md"
)

# File contents (matching order)
CONTENTS=(
"# Welcome to SREOPS\n\nDark-mode, high-tech **SRE & Kubernetes blog**. 🚀"
"# About SREOPS\n\nSREOPS is a blog for **SRE, Kubernetes, and System Admin** enthusiasts."
"# Featured SRE & Kubernetes Tips\n\n- Kubernetes Pod Debugging\n- Alerting Best Practices\n- Disaster Recovery Drills"
"# Kubernetes Overview\n\nLearn about pods, deployments, services, and ConfigMaps."
"# Kubernetes Deployments\n\nExample YAML for deployments."
"# Kubernetes Troubleshooting\n\nDebug failed pods and services."
"# Monitoring\n\nPrometheus, Grafana, and alerting strategies."
"# Alerting\n\nBest practices for SRE alerting."
"# Disaster Recovery\n\nPlan and execute DR drills."
)

# Create files if not exist
for i in "${!FILES[@]}"; do
  if [ ! -f "${FILES[$i]}" ]; then
    echo -e "${CONTENTS[$i]}" > "${FILES[$i]}"
    echo "Created ${FILES[$i]}"
  fi
done

# mkdocs.yml
MKDOCS_FILE="$BASE_DIR/mkdocs.yml"
if [ ! -f "$MKDOCS_FILE" ]; then
cat <<EOL > "$MKDOCS_FILE"
site_name: SREOPS
site_description: SRE & Kubernetes Tech Blog
site_url: https://sreops.co
repo_url: https://github.com/sinhatarak/sreops
repo_name: GitHub
theme:
  name: material
  palette:
    primary: 'blue'
    accent: 'deep-purple'
    scheme: 'slate'
  font:
    text: Roboto
    code: Roboto Mono
  features:
    - navigation.tabs
    - content.code.annotate
    - header.autohide
    - toc.integrate
  logo: docs/images/logo.png
  favicon: docs/images/favicon.ico
  highlightjs: true
nav:
  - Home: index.md
  - Featured: featured.md
  - Kubernetes:
      - Overview: k8s/overview.md
      - Deployments: k8s/deployments.md
      - Troubleshooting: k8s/troubleshooting.md
  - SRE Practices:
      - Monitoring: sre/monitoring.md
      - Alerting: sre/alerting.md
      - Disaster Recovery: sre/disaster-recovery.md
  - About: about.md
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
  - pymdownx.superfences
  - pymdownx.tabbed
  - pymdownx.highlight
  - pymdownx.betterem:
      smart_enable: all
plugins:
  - search
  - minify:
      minify_html: true
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/sinhatarak/sreops
EOL
  echo "Created mkdocs.yml"
fi

# requirements.txt
REQ_FILE="$BASE_DIR/requirements.txt"
if [ ! -f "$REQ_FILE" ]; then
  echo -e "mkdocs>=1.6.1\nmkdocs-material>=9.0.0" > "$REQ_FILE"
  echo "Created requirements.txt"
fi

echo "✅ Folder structure and initial files created!"

