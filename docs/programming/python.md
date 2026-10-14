# Python for SRE

Python is the fastest route from idea to working automation. With the official Kubernetes client you can query a cluster in a few lines.

## How to check unhealthy pods on K8 cluster
---

### Step 1: Install Virtual Environment Prerequisites

Because Ubuntu enforces PEP 668 (externally-managed environments), system-wide `pip install` is blocked. Install the required tools via `apt`:

```bash
apt update
apt install -y python3-full python3-pip

```

---

### Step 2: Create and Activate a Virtual Environment

Create a dedicated virtual environment for your SRE automation scripts:

```bash
python3 -m venv /home/ubuntu/venv
source /home/ubuntu/venv/bin/activate

```

*(Your terminal prompt will now show `(venv)` indicating you are inside the isolated space).*

---

### Step 3: Install Pinned Dependencies Safely

Instead of unpinned global installations, install and pin the dependency inside the virtual environment:

```bash
pip install kubernetes==32.0.0
# Save the pinned dependency for reproducibility (SRE habit)
pip freeze > requirements.txt

```

---

### Step 4: Create the Safe Script (`check_health.py`)

Create a production-ready script that wraps your SREOPS snippet with **API error handling**, **logging**, and **read-only safety guarantees**:

```bash
cat << 'EOF' > check_health.py
import logging
import sys
from kubernetes import client, config
from kubernetes.client.exceptions import ApiException

# Habit: Log what you did
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

def main():
    try:
        # Habit: Safe read-only connection initialization
        config.load_kube_config()          # Use config.load_incluster_config() inside a pod
        v1 = client.CoreV1Api()
        
        logging.info("Connected to Kubernetes cluster. Scanning for unhealthy pods...")

        # Fetch pods across all namespaces
        pods = v1.list_pod_for_all_namespaces()
        unhealthy_found = 0

        for pod in pods.items:
            if pod.status.phase not in ("Running", "Succeeded"):
                unhealthy_found += 1
                logging.warning(f"Unhealthy Pod -> {pod.metadata.namespace}/{pod.metadata.name}: {pod.status.phase}")

        logging.info(f"Scan complete. Total unhealthy pods found: {unhealthy_found}")

    # Habit: Handle API errors instead of ignoring them
    except ApiException as e:
        logging.error(f"Kubernetes API Error: {e.status} - {e.reason}")
        sys.exit(1)
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
EOF

```

---

### Step 5: Run the Script

Execute your script safely inside the virtual environment:

```bash
python3 check_health.py

```

When you are done working, you can safely exit the virtual environment by running:

```bash
deactivate

```

## Habits that keep scripts safe

- Use a virtual environment and pinned dependencies.
- Make scripts read-only by default and require an explicit flag for changes.
- Log what you did, and handle API errors instead of ignoring them.
