(function () {
  "use strict";

  // This file runs in the agent's browser when Vicidial opens master-payment.html.
  // Its job is simple:
  // 1. Read the Vicidial values from the URL, especially list_description.
  // 2. Compare those values against the camp names/abbreviations in payment-links.config.js.
  // 3. If it finds a matching camp with a payment link, send the agent to that link.
  // 4. If it cannot find a match, show the customer/list details and a manual backup link.

  // payment-links.config.js creates window.CROWN_PAYMENT_LINKS before this file runs.
  // If that file fails to load, this fallback keeps the page from crashing immediately.
  const config = window.CROWN_PAYMENT_LINKS || {};
  const camps = Array.isArray(config.camps) ? config.camps : [];

  // Normalize text so matching is forgiving.
  // Example: "Police & Sheriffs PAC" and "POLICE AND SHERIFFS PAC" both become similar text.
  function normalize(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/&/g, "AND")
      .replace(/[^A-Z0-9]+/g, "");
  }

  // Vicidial sometimes leaves a variable placeholder in the URL if it has no value.
  // This removes blank values and placeholder-looking values like --A--field_name--B--.
  function cleanVicidialValue(value) {
    const cleaned = String(value || "").trim();
    if (!cleaned || /^--A--.*--B--$/i.test(cleaned)) {
      return "";
    }
    return cleaned;
  }

  // Build one large piece of text for camp detection.
  // list_description is first because that is the source you wanted to use.
  // The other fields are backups in case the camp abbreviation/name appears elsewhere.
  // Do not scan the full URL, because parameter names like lead_id can accidentally match LEAD.
  function routeText(params) {
    return [
      cleanVicidialValue(params.get("list_description")),
      cleanVicidialValue(params.get("list_name")),
      cleanVicidialValue(params.get("list_id")),
      cleanVicidialValue(params.get("campaign"))
    ].filter(Boolean).join(" ");
  }

  // Give a camp a matching score based on its aliases.
  // Higher score wins. Exact full matches get a big bonus.
  // Longer matches naturally beat shorter matches, which helps avoid bad matches.
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

  // Compare the Vicidial/list text against every configured camp and return the best match.
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

  // Vicidial may provide either a full name or separate first/last name fields.
  // This helper displays the best available customer name on the fallback error screen.
  function getCustomerName(params) {
    const fullName = cleanVicidialValue(params.get("name")) || cleanVicidialValue(params.get("full_name"));
    if (fullName) {
      return fullName;
    }

    const firstName = cleanVicidialValue(params.get("first_name"));
    const lastName = cleanVicidialValue(params.get("last_name"));
    return [firstName, lastName].filter(Boolean).join(" ");
  }

  // Show a readable error page instead of sending the agent to the wrong processor.
  // This displays the customer/list info available from Vicidial and adds a manual directory link.
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

    const fallback = document.createElement("p");
    const fallbackLink = document.createElement("a");
    fallbackLink.href = new URL("all-payment-links.html", window.location.href).toString();
    fallbackLink.textContent = "Open all payment processor links";
    fallback.appendChild(fallbackLink);
    document.body.appendChild(fallback);
  }

  // Build the final URL for the selected processor.
  // If appendVicidialQuery is true in payment-links.config.js, the original URL fields are passed along.
  // If a processor already has a parameter with the same name, we keep the processor's original value.
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

  // Replace the current router page with the chosen payment page.
  function redirectToPayment(paymentUrl) {
    window.location.replace(buildTargetUrl(paymentUrl));
  }

  // Main entry point: this runs once when the page loads.
  function run() {
    const params = new URLSearchParams(window.location.search);
    const campText = routeText(params);
    const camp = pickCamp(campText);
    const paymentUrl = camp ? cleanVicidialValue(camp.paymentUrl) : "";

    if (!camp || !paymentUrl) {
      showError("Could not detect a payment link.", [
        "Customer Name: " + (getCustomerName(params) || "NONE"),
        "Phone Number: " + (cleanVicidialValue(params.get("phone_number")) || "[missing]"),
        "Lead ID: " + (cleanVicidialValue(params.get("lead_id")) || "[missing]"),
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