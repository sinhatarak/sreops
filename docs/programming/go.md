# Go for SRE

Go compiles to a single static binary that is easy to ship, which makes it ideal for small operational tools. It is also the language of Kubernetes, so reading its source and writing controllers or operators becomes natural.

## Example: a tiny HTTP health checker

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: healthcheck <url>")
		os.Exit(2)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, os.Args[1], nil)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(2)
	}

	start := time.Now()
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Fprintln(os.Stderr, "FAIL:", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	fmt.Printf("%s -> %d in %v\n", os.Args[1], resp.StatusCode, time.Since(start).Round(time.Millisecond))
	if resp.StatusCode >= 400 {
		os.Exit(1)
	}
}
```

Build it with `go build -o healthcheck .` and the exit code makes it easy to use in scripts and CI.
