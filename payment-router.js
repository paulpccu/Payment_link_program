(function () {
  "use strict";

  const config = window.CROWN_PAYMENT_LINKS || {};
  const camps = Array.isArray(config.camps) ? config.camps : [];

  function normalize(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/&/g, "AND")
      .replace(/[^A-Z0-9]+/g, "");
  }

  function cleanVicidialValue(value) {
    const cleaned = String(value || "").trim();
    if (!cleaned || /^--A--.*--B--$/i.test(cleaned)) {
      return "";
    }
    return cleaned;
  }

  function routeText(params) {
    return [
      cleanVicidialValue(params.get("list_description")),
      cleanVicidialValue(params.get("list_name")),
      cleanVicidialValue(params.get("list_id")),
      cleanVicidialValue(params.get("campaign")),
      window.location.search
    ].filter(Boolean).join(" ");
  }

  function scoreCamp(camp, normalizedCampText) {
    return (camp.keys || []).reduce(function (bestScore, key) {
      const normalizedKey = normalize(key);
      if (!normalizedKey) {
        return bestScore;
      }
      if (normalizedCampText === normalizedKey) {
        return Math.max(bestScore, normalizedKey.length + 1000);
      }
      if (normalizedCampText.indexOf(normalizedKey) !== -1) {
        return Math.max(bestScore, normalizedKey.length);
      }
      return bestScore;
    }, 0);
  }

  function pickCamp(campText) {
    const normalizedCampText = normalize(campText);
    const result = camps
      .map(function (camp) {
        return {
          camp,
          score: scoreCamp(camp, normalizedCampText)
        };
      })
      .filter(function (result) {
        return result.score > 0;
      })
      .sort(function (left, right) {
        return right.score - left.score;
      })[0];

    return result ? result.camp : null;
  }

  function getCustomerName(params) {
    const fullName = cleanVicidialValue(params.get("name")) || cleanVicidialValue(params.get("full_name"));
    if (fullName) {
      return fullName;
    }

    const firstName = cleanVicidialValue(params.get("first_name"));
    const lastName = cleanVicidialValue(params.get("last_name"));
    return [firstName, lastName].filter(Boolean).join(" ");
  }

  function showError(message, details) {
    const status = document.getElementById("router-status");
    if (status) {
      status.textContent = message;
    }

    const heading = document.querySelector("h1") || document.createElement("h1");
    heading.textContent = "Payment Link Routing Error";
    if (!heading.parentNode) {
      document.body.appendChild(heading);
    }

    const detailBox = document.createElement("pre");
    detailBox.textContent = details.join("\n");
    document.body.appendChild(detailBox);
  }

  function buildTargetUrl(paymentUrl) {
    const targetUrl = new URL(paymentUrl, window.location.href);
    if (config.appendVicidialQuery !== false) {
      const sourceParams = new URLSearchParams(window.location.search);
      sourceParams.forEach(function (value, key) {
        if (!targetUrl.searchParams.has(key)) {
          targetUrl.searchParams.set(key, value);
        }
      });
    }
    return targetUrl.toString();
  }

  function redirectToPayment(paymentUrl) {
    window.location.replace(buildTargetUrl(paymentUrl));
  }

  function run() {
    const params = new URLSearchParams(window.location.search);
    const campText = routeText(params);
    const camp = pickCamp(campText);
    const paymentUrl = camp ? cleanVicidialValue(camp.paymentUrl) : "";

    if (!camp || !paymentUrl) {
      showError("Could not detect a payment link.", [
        "Customer Name: " + (getCustomerName(params) || "NONE"),
        "List Description: " + (cleanVicidialValue(params.get("list_description")) || "[missing]"),
        "List Name: " + (cleanVicidialValue(params.get("list_name")) || "[missing]"),
        "List ID: " + (cleanVicidialValue(params.get("list_id")) || "[missing]"),
        "Campaign: " + (cleanVicidialValue(params.get("campaign")) || "[missing]"),
        "Detected Camp: " + (camp ? camp.name : "[none]"),
        "Payment URL Configured: " + (paymentUrl ? "yes" : "no")
      ]);
      return;
    }

    const status = document.getElementById("router-status");
    if (status) {
      status.textContent = "Loading payment link for " + camp.name + ".";
    }
    redirectToPayment(paymentUrl);
  }

  run();
}());
