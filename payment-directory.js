(function () {
  "use strict";

  const config = window.CROWN_PAYMENT_LINKS || {};
  const camps = Array.isArray(config.camps) ? config.camps : [];

  function appendTextCell(row, text, className) {
    const cell = document.createElement("td");
    cell.textContent = text;
    if (className) {
      cell.className = className;
    }
    row.appendChild(cell);
  }

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
