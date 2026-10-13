
(function () {
  const initShare = () => {
    const article = document.querySelector(".md-content__inner");
    if (!article || article.querySelector(".sreops-share")) return;

    const title = document.title;
    const url = window.location.href.split("#")[0];

    const share = document.createElement("section");
    share.className = "sreops-share";
    share.setAttribute("aria-label", "Share this page");

    share.innerHTML = `
      <div class="sreops-share__title">Share this page</div>
      <div class="sreops-share__buttons">
        <a data-share="linkedin" target="_blank"
           rel="noopener noreferrer">LinkedIn</a>
        <a data-share="x" target="_blank"
           rel="noopener noreferrer">X</a>
        <a data-share="reddit" target="_blank"
           rel="noopener noreferrer">Reddit</a>
        <a data-share="whatsapp" target="_blank"
           rel="noopener noreferrer">WhatsApp</a>
        <a data-share="telegram" target="_blank"
           rel="noopener noreferrer">Telegram</a>
        <button type="button" data-share="copy">Copy link</button>
        <button type="button" data-share="native">More options</button>
      </div>
      <div class="sreops-share__status" aria-live="polite"></div>
    `;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const destinations = {
      linkedin:
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      x:
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      reddit:
        `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      whatsapp:
        `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      telegram:
        `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    };

    share.querySelectorAll("a[data-share]").forEach(link => {
      link.href = destinations[link.dataset.share];
    });

    const status = share.querySelector(".sreops-share__status");

    share.querySelector('[data-share="copy"]').addEventListener(
      "click", async () => {
        try {
          await navigator.clipboard.writeText(url);
          status.textContent = "Link copied!";
        } catch {
          status.textContent = "Copy the page URL from your browser address bar.";
        }
      }
    );

    share.querySelector('[data-share="native"]').addEventListener(
      "click", async () => {
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
          } catch (error) {
            if (error.name !== "AbortError") {
              status.textContent = "Sharing could not be opened.";
            }
          }
        } else {
          try {
            await navigator.clipboard.writeText(url);
            status.textContent = "Link copied! Paste it into your preferred app.";
          } catch {
            status.textContent = "Copy the page URL from your browser address bar.";
          }
        }
      }
    );

    const heading = article.querySelector("h1");
    if (heading) {
      heading.insertAdjacentElement("afterend", share);
    } else {
      article.prepend(share);
    }
  };

  const addStyles = () => {
    if (document.getElementById("sreops-share-styles")) return;

    const style = document.createElement("style");
    style.id = "sreops-share-styles";
    style.textContent = `
      .sreops-share {
        margin: 1rem 0 1.5rem;
        padding: 14px;
        border: 1px solid var(--md-default-fg-color--lightest);
        border-radius: 10px;
      }
      .sreops-share__title {
        font-weight: 700;
        margin-bottom: 10px;
      }
      .sreops-share__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .sreops-share__buttons a,
      .sreops-share__buttons button {
        display: inline-block;
        padding: 6px 10px;
        border: 1px solid var(--md-default-fg-color--lightest);
        border-radius: 6px;
        font: inherit;
        font-size: 0.75rem;
        text-decoration: none;
        cursor: pointer;
        color: var(--md-default-fg-color);
        background: var(--md-code-bg-color);
      }
      .sreops-share__buttons a:hover,
      .sreops-share__buttons button:hover {
        border-color: var(--md-primary-fg-color);
        color: var(--md-primary-fg-color);
      }
      .sreops-share__status {
        margin-top: 8px;
        font-size: 0.75rem;
      }
    `;
    document.head.appendChild(style);
  };

  const run = () => {
    addStyles();
    initShare();
  };

  // Support MkDocs Material instant navigation.
  if (typeof document$ !== "undefined") {
    document$.subscribe(run);
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run);
    } else {
      run();
    }
  }
})();

