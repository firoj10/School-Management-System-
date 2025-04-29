// src/utils/formatErrorHtml.js

/**
 * Converts a DRF error object into an HTML <ul>:
 * { first_name: [...], phone: [...] }
 *  ↦
 * "<ul><li>First Name: This field may not be blank.</li>
 *  <li>Phone: Ensure this field has no more than 15 characters.</li></ul>"
 */
export function formatErrorHtml(errObj) {
    if (typeof errObj === "string") {
      return `<p>${errObj}</p>`;
    }
    if (typeof errObj === "object" && errObj !== null) {
      const items = Object.entries(errObj).map(([field, msgs]) => {
        const title = field
          .split("_")
          .map(w => w[0].toUpperCase() + w.slice(1))
          .join(" ");
        const message = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
        return `<li><strong>${title}:</strong> ${message}</li>`;
      });
      return `<ul style="text-align:left; padding-left:1rem;">${items.join("")}</ul>`;
    }
    return `<p>${String(errObj)}</p>`;
  }
  