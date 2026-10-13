VENV = .venv/bin

.PHONY: serve check security clean all

serve:
	$(VENV)/mkdocs serve

check:
	$(VENV)/mkdocs build --strict

security:
	$(VENV)/pre-commit run --all-files
	$(VENV)/pip-audit -r requirements.txt

all: check security

clean:
	rm -rf site
