(function () {
  "use strict";

  // This file powers all-payment-links.html.
  // It reads the same payment-links.config.js file as the automatic router,
  // then builds a simple table agents can use when automatic routing fails.

  const config = window.CROWN_PAYMENT_LINKS || {};
  const camps = Array.isArray(config.camps) ? config.camps : [];

  // Add a plain text table cell to the current row.
  function appendTextCell(row, text, className) {
    const cell = document.createElement("td");
    cell.textContent = text;
    if (className) {
      cell.className = className;
    }
    row.appendChild(cell);
  }

  // Add the payment link cell.
  // Manual fallback links are kept clean: they go directly to the processor URL in the config.
  function appendLinkCell(row, camp) {
    const cell = document.createElement("td");
    if (camp.paymentUrl) {
      const link = document.createElement("a");
      link.href = camp.paymentUrl;
      link.textContent = "Open payment link";
      cell.appendChild(link);
    } else {
      cell.textContent = "Missing payment link";
      cell.className = "missing";
    }
    row.appendChild(cell);
  }

  // Fill the table body with one row per camp from payment-links.config.js.
  function run() {
    const list = document.getElementById("payment-link-list");
    if (!list) {
      return;
    }

    list.textContent = "";
    camps.forEach(function (camp) {
      const row = document.createElement("tr");
      appendTextCell(row, camp.name || "");
      appendTextCell(row, camp.abbreviation || "");
      appendLinkCell(row, camp);
      list.appendChild(row);
    });
  }

  run();
}());