(function () {
  "use strict";

  const icons = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.44L5.54 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.78L18.9 2Zm-1.1 18h1.73L7.27 3.88H5.42L17.8 20Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.32.22 11.88c0 2.1.55 4.15 1.6 5.96L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.47-8.44ZM12.1 21.78h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.83 9.83 0 0 1-1.51-5.27c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V7Zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-8ZM2 7a1 1 0 0 1 1-1h2v2H4v10a1 1 0 0 0 1 1h1v2H5a3 3 0 0 1-3-3V7Z"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.2 3.2 0 0 0 0-1.39l7.05-4.11a3 3 0 1 0-.94-1.72L7.97 9.59a3 3 0 1 0 0 4.82l7.12 4.16a3 3 0 1 0 2.91-2.49Z"/></svg>'
  };
  
  const targets = {
    linkedin: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: (url, title) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
  };

  function addStyles() {
    if (document.getElementById("sreops-share-styles")) return;

    const style = document.createElement("style");
    style.id = "sreops-share-styles";
    style.textContent = `
      .sreops-share {
        margin: 1rem 0 1.5rem;
        padding: 14px 16px;
        border: 1px solid var(--md-default-fg-color--lightest, #ddd);
        border-radius: 10px;
      }
      .sreops-share__title {
        margin-bottom: 10px;
        color: var(--md-default-fg-color, #222);
        font-size: .85rem;
        font-weight: 700;
      }
      .sreops-share__buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .sreops-share__buttons a,
      .sreops-share__buttons button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        min-height: 36px;
        padding: 7px 11px;
        border: 1px solid var(--md-default-fg-color--lightest, #ddd);
        border-radius: 7px;
        color: var(--md-default-fg-color, #222);
        background: var(--md-code-bg-color, #f5f5f5);
        font: inherit;
        font-size: .75rem;
        line-height: 1.2;
        text-decoration: none;
        cursor: pointer;
        transition: border-color .15s ease, transform .15s ease;
      }
      .sreops-share__buttons a:hover,
      .sreops-share__buttons button:hover {
        border-color: var(--md-primary-fg-color, #526cfe);
        transform: translateY(-1px);
      }
      .sreops-share__buttons svg {
        display: block;
        width: 17px;
        height: 17px;
        flex: 0 0 17px;
      }
      
      /* Social platform brand colors */
      .sreops-share__buttons a[data-share="linkedin"] svg {
        color: #0A66C2;
      }
      .sreops-share__buttons a[data-share="x"] svg {
        color: #000000;
      }
      .sreops-share__buttons a[data-share="whatsapp"] svg {
        color: #25D366;
      }
      .sreops-share__buttons button[data-share="copy"] svg,
      .sreops-share__buttons button[data-share="native"] svg {
        color: var(--md-default-fg-color--light, #666666);
      }

      @media (max-width: 600px) {
        .sreops-share { padding: 12px; }
        .sreops-share__buttons { gap: 6px; }
        .sreops-share__buttons a,
        .sreops-share__buttons button { padding: 7px 9px; }
      }
    `;
    document.head.appendChild(style);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    const success = document.execCommand("copy");
    field.remove();
    if (!success) throw new Error("Clipboard copy failed");
  }
    
  function initShare() {
    const article = document.querySelector(".md-content__inner");

    // Hide sharing only on the homepage.
    const path = window.location.pathname.replace(/\/+$/, "");
    const isHomePage = path === "" || path === "/index.html";

    if (isHomePage) {
      document.querySelectorAll(".sreops-share").forEach((el) => el.remove());
      return;
    }

    if (!article || article.querySelector(".sreops-share")) return;

    const heading = article.querySelector("h1");
    const title = heading
      ? heading.cloneNode(true).textContent.replace(/¶/g, "").trim()
      : document.title.replace(/¶/g, "").trim();
    const url = window.location.href.split("#")[0];

    const share = document.createElement("section");
    share.className = "sreops-share";
    share.setAttribute("aria-label", "Share this page");

    share.innerHTML = `
      <div class="sreops-share__title">Share this page</div>
      <div class="sreops-share__buttons">
        <a data-share="linkedin" target="_blank" rel="noopener noreferrer">${icons.linkedin}<span>LinkedIn</span></a>
        <a data-share="x" target="_blank" rel="noopener noreferrer">${icons.x}<span>X</span></a>
        <a data-share="whatsapp" target="_blank" rel="noopener noreferrer">${icons.whatsapp}<span>WhatsApp</span></a>
        <button type="button" data-share="copy">${icons.copy}<span>Copy link</span></button>
        <button type="button" data-share="native">${icons.share}<span>More options</span></button>
      </div>
      <div class="sreops-share__status" aria-live="polite"></div>
    `;

    Object.entries(targets).forEach(([name, makeUrl]) => {
      const link = share.querySelector(`[data-share="${name}"]`);
      link.href = makeUrl(url, title);
      link.title = `Share on ${name === "x" ? "X" : name}`;
      link.setAttribute("aria-label", `Share on ${name === "x" ? "X" : name}`);
    });

    const status = share.querySelector(".sreops-share__status");

    share.querySelector('[data-share="copy"]').addEventListener("click", async () => {
      try {
        await copyText(url);
        status.textContent = "Link copied to clipboard.";
      } catch {
        status.textContent = "Copy failed. Copy the URL from your browser address bar.";
      }
    });

    share.querySelector('[data-share="native"]').addEventListener("click", async () => {
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
          await copyText(url);
          status.textContent = "Link copied. Paste it into your preferred app.";
        } catch {
          status.textContent = "Use one of the sharing links or copy the URL from your address bar.";
        }
      }
    });

    if (heading) {
      heading.insertAdjacentElement("afterend", share);
    } else {
      article.prepend(share);
    }
  }

  function run() {
    addStyles();
    initShare();
  }

  // Supports MkDocs Material instant navigation.
  if (typeof document$ !== "undefined" &&
      document$ &&
      typeof document$.subscribe === "function") {
    document$.subscribe(run);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
