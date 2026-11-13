(function () {
  var PREVIEW = "Preview Your Font";
  var input = document.getElementById("user-input");
  var list = document.getElementById("fonts-output-list");
  var tabs = document.querySelectorAll(".tab");
  var copiedButton = null;
  var copiedTimer = 0;
  var currentCategory = "all";

  if (!input || !list || typeof FONT_STYLES === "undefined") return;

  function sourceText() {
    return input.value.length ? input.value : PREVIEW;
  }

  function convert(text, style) {
    var parts = Array.from(text).map(function (ch) {
      return style.map[ch] || ch;
    });
    if (style.reverse) parts.reverse();
    return parts.join(style.separator || "");
  }

  function resetCopied() {
    window.clearTimeout(copiedTimer);
    if (!copiedButton) return;
    copiedButton.classList.remove("is-copied");
    copiedButton.textContent = "Copy";
    copiedButton = null;
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    var ok = document.execCommand("copy");
    area.remove();
    if (!ok) throw new Error("copy failed");
  }

  function copyText(text, button) {
    var done = function () {
      resetCopied();
      button.classList.add("is-copied");
      button.textContent = "Copied!";
      copiedButton = button;
      copiedTimer = window.setTimeout(resetCopied, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        try {
          fallbackCopy(text);
          done();
        } catch (error) {
          button.textContent = "Copy failed";
          copiedTimer = window.setTimeout(resetCopied, 1500);
        }
      });
      return;
    }
    try {
      fallbackCopy(text);
      done();
    } catch (error) {
      button.textContent = "Copy failed";
      copiedTimer = window.setTimeout(resetCopied, 1500);
    }
  }

  function updateSamples() {
    var text = sourceText();
    list.querySelectorAll(".font-card").forEach(function (card) {
      var style = FONT_STYLES[Number(card.dataset.index)];
      card.querySelector(".font-card__sample").textContent = convert(text, style);
    });
  }

  function applyFilter(category) {
    currentCategory = category;
    tabs.forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.dataset.category === category ? "true" : "false");
    });
    list.querySelectorAll(".font-card").forEach(function (card) {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  }

  function buildCards() {
    var fragment = document.createDocumentFragment();
    FONT_STYLES.forEach(function (style, index) {
      var card = document.createElement("article");
      card.className = "font-card";
      card.dataset.category = style.category;
      card.dataset.index = String(index);

      var sample = document.createElement("p");
      sample.className = "font-card__sample";

      var meta = document.createElement("div");
      meta.className = "font-card__meta";

      var name = document.createElement("h3");
      name.className = "font-card__name";
      name.textContent = style.name;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "copy-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy " + style.name);
      button.addEventListener("click", function () {
        copyText(sample.textContent, button);
      });

      meta.append(name, button);
      card.append(sample, meta);
      fragment.append(card);
    });
    list.replaceChildren(fragment);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      applyFilter(tab.dataset.category);
    });
  });

  input.addEventListener("input", function () {
    resetCopied();
    updateSamples();
  });

  buildCards();
  updateSamples();
  applyFilter(currentCategory);
})();
