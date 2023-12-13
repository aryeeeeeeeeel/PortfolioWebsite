window.FontAwesomeKitConfig = {
    "id": 113066536,
    "version": "6.5.1",
    "token": "6f861a9eb6",
    "method": "css",
    "baseUrl": "https://ka-f.fontawesome.com",
    "license": "free",
    "asyncLoading": {
      "enabled": false
    },
    "autoA11y": {
      "enabled": true
    },
    "baseUrlKit": "https://kit.fontawesome.com",
    "detectConflictsUntil": null,
    "iconUploads": {},
    "minify": {
      "enabled": true
    },
    "v4FontFaceShim": {
      "enabled": true
    },
    "v4shim": {
      "enabled": true
    },
    "v5FontFaceShim": {
      "enabled": true
    }
  };
  
  (function () {
    "use strict";
  
    function objectKeys(obj) {
      return Object.keys(obj);
    }
  
    function mergeObjects(target, ...sources) {
      for (const source of sources) {
        if (source && typeof source === "object") {
          Object.assign(target, source);
        }
      }
      return target;
    }
  
    function isSymbol(value) {
      return typeof value === "symbol";
    }
  
    function setProperty(target, key, value) {
      if (isSymbol(key)) {
        Object.defineProperty(target, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        target[key] = value;
      }
      return target;
    }
  
    function iterateObject(obj, callback) {
      const keys = objectKeys(obj);
      for (const key of keys) {
        setProperty(obj, key, callback(obj, key));
      }
    }
  
    const shimTypes = ["classic", "duotone", "sharp"];
    const kitTypes = ["fak", "fa-kit", "fakd", "fa-kit-duotone"];
    const iconTypes = ["fa", "fas", "fa-solid", "far", "fa-regular", "fal", "fa-light", "fat", "fa-thin", "fad", "fa-duotone", "fab", "fa-brands", "fass", "fasr", "fasl", "fast"];
  
    function addBaseUrl(addOn, baseFilename, version, method, subdir) {
      return `${FontAwesomeKitConfig.baseUrl}/releases/${version === "latest" ? "latest" : `v${version}`}/${subdir}/${FontAwesomeKitConfig.license}${addOn}${baseFilename}.${method}`;
    }
  
    function addTokenToUrl(url, token) {
      if (token && !url.includes("kit-upload.css")) {
        const urlObject = new URL(url);
        if ("URLSearchParams" in window) {
          urlObject.searchParams.set("token", token);
        } else {
          urlObject.href = `${urlObject.href}?token=${encodeURIComponent(token)}`;
        }
        return urlObject.toString();
      }
      return url;
    }
  
    function replaceUrlSegments(url, replacements) {
      for (const replacement of replacements) {
        const [pattern, replaceFunction] = replacement;
        url = url.replace(pattern, replaceFunction);
      }
      return url;
    }
  
    function createStyleSheetLink(url, id) {
      const styleSheet = document.createElement("link");
      styleSheet.href = url;
      styleSheet.rel = "stylesheet";
      styleSheet.media = "all";
      if (id) {
        styleSheet.setAttribute("id", id);
      }
      return styleSheet;
    }
  
    function setA11yAttributes(element, autoA11y) {
      if (autoA11y) {
        element.setAttribute("aria-hidden", "true");
        const title = element.getAttribute("title");
        if (title && !element.nextElementSibling?.classList.contains("sr-only")) {
          const srOnlyElement = document.createElement("span");
          srOnlyElement.innerHTML = title;
          srOnlyElement.classList.add("sr-only");
          element.parentNode.insertBefore(srOnlyElement, element.nextSibling);
        }
      }
    }
  
    function loadFontAwesomeKit(config) {
      const baseUrl = config.baseUrl;
      const version = config.version;
      const token = config.token;
      const method = config.method;
      const autoA11y = config.autoA11y.enabled;
      const minify = config.minify.enabled;
  
      const subsetPath = config.subsetPath;
      const baseFilename = config.baseFilename || config.license;
      const subdir = config.method;
  
      const stylesheetLinks = [];
  
      const mainStylesheetLink = createStyleSheetLink(addTokenToUrl(addBaseUrl("", baseFilename, version, method, subdir), token), "fa-main");
      setA11yAttributes(mainStylesheetLink, autoA11y);
      stylesheetLinks.push(mainStylesheetLink);
  
      if (config.v4shim && config.v4shim.enabled) {
        const v4ShimStylesheetLink = createStyleSheetLink(addTokenToUrl(addBaseUrl("-v4-shims", baseFilename, version, method, subdir), token), "fa-v4-shims");
        setA11yAttributes(v4ShimStylesheetLink, autoA11y);
        stylesheetLinks.push(v4ShimStylesheetLink);
      }
  
      if (config.v5FontFaceShim && config.v5FontFaceShim.enabled) {
        const v5FontFaceShimStylesheetLink = createStyleSheetLink(addTokenToUrl(addBaseUrl("-v5-font-face", baseFilename, version, method, subdir), token), "fa-v5-font-face");
        setA11yAttributes(v5FontFaceShimStylesheetLink, autoA11y);
        stylesheetLinks.push(v5FontFaceShimStylesheetLink);
      }
  
      if (config.v4FontFaceShim && config.v4FontFaceShim.enabled) {
        const v4FontFaceShimStylesheetLink = createStyleSheetLink(addTokenToUrl(addBaseUrl("-v4-font-face", baseFilename, version, method, subdir), token), "fa-v4-font-face");
        setA11yAttributes(v4FontFaceShimStylesheetLink, autoA11y);
        stylesheetLinks.push(v4FontFaceShimStylesheetLink);
      }
  
      if (!subsetPath && config.customIconsCssPath) {
        const customIconsUrl = addTokenToUrl(`${config.customIconsCssPath.includes("kit-upload.css") ? config.baseUrlKit : config.baseUrl}/${config.customIconsCssPath}`, token);
        const customIconsStylesheetLink = createStyleSheetLink(customIconsUrl, "fa-kit-upload");
        setA11yAttributes(customIconsStylesheetLink, autoA11y);
        stylesheetLinks.push(customIconsStylesheetLink);
      }
  
      return Promise.all(stylesheetLinks);
    }
  
    function createInlineStyleElement(content, id) {
      const styleElement = document.createElement("style");
      styleElement.appendChild(document.createTextNode(content));
      styleElement.media = "all";
      if (id) {
        styleElement.setAttribute("id", id);
      }
      return styleElement;
    }
  
    function configureLibrary(config) {
      const autoA11y = config.autoA11y.enabled;
      const detectionIgnoreAttr = "data-fa-detection-ignore";
      const detectionIgnoreAttrNode = document.createAttribute(detectionIgnoreAttr);
      const stylesheetLinks = [];
  
      if (config.v4shim.enabled) {
        stylesheetLinks.push(new Promise((resolve, reject) => {
          loadStyleSheet(addTokenToUrl(addBaseUrl("-v4-shims", "conflict-detection", config.version, config.method, "js"), config.token))
            .then(content => resolve(createInlineStyleElement(content, "fa-v4-shims")))
            .catch(reject);
        }));
      }
  
      stylesheetLinks.push(new Promise((resolve, reject) => {
        loadStyleSheet(addTokenToUrl(config.subsetPath && `${config.baseUrl}/${config.subsetPath}` || addBaseUrl("", config.baseFilename, config.version, config.method, config.method), config.token))
          .then(content => {
            const mainStylesheet = createInlineStyleElement(content, "fa-main");
            resolve(mainStylesheet);
            setA11yAttributes(mainStylesheet, autoA11y);
          })
          .catch(reject);
      }));
  
      return Promise.all(stylesheetLinks);
    }
  
    function loadStyleSheet(url) {
      return new Promise((resolve, reject) => {
        if (typeof fetch === "function") {
          fetch(url, { mode: "cors", cache: "default" })
            .then(response => {
              if (response.ok) {
                return response.text();
              }
              throw new Error("");
            })
            .then(resolve)
            .catch(reject);
        } else if (typeof XMLHttpRequest === "function") {
          const xhr = new XMLHttpRequest();
          xhr.addEventListener("loadend", function () {
            if (this.responseText) {
              resolve(this.responseText);
            } else {
              reject(new Error(""));
            }
          });
          ["abort", "error", "timeout"].forEach(event => {
            xhr.addEventListener(event, function () {
              reject(new Error(""));
            });
          });
          xhr.open("GET", url);
          xhr.send();
        } else {
          reject(new Error(""));
        }
      });
    }
  
    function replaceFontUrls(content, baseUrl, version) {
      const replacements = [
        [/(url\("?)\.\.\/\.\.\/\.\./g, (match, p1) => `${p1}${baseUrl}`],
        [/(url\("?)\.\.\/webfonts/g, (match, p1) => `${p1}${baseUrl}/releases/v${version}/webfonts`],
        [/(url\("?)https:\/\/kit-free([^.])*\.fontawesome\.com/g, (match, p1) => `${p1}${baseUrl}`]
      ];
      return replaceUrlSegments(content, replacements);
    }
  
    function addTokenAndCleanUrl(url, token) {
      return addTokenToUrl(url, token);
    }
  
    function cleanCode(config) {
      const baseFilename = config.baseFilename || config.license;
      const method = config.method;
      const baseUrl = config.baseUrl;
      const version = config.version;
      const token = config.token;
  
      if (!window.FontAwesomeKitConfig) {
        return;
      }
  
      const config = window.FontAwesomeKitConfig;
      const detectionIgnoreAttr = "data-fa-detection-ignore";
  
      if (config) {
        try {
          const {
            detectConflictsUntil,
            detectionIgnoreAttr,
            fetch,
            token,
            XMLHttpRequest,
            document
          } = window.FontAwesomeKitConfig;
          const loader = (function () {
            return typeof define === "function" && define.amd ? define("kit-loader", loader) : loader;
          })();
  
          const addOn = "";
          const baseFilename = config.baseFilename || config.license;
          const method = config.method;
          const subdir = method;
  
          const url = `${config.baseUrlKit}/releases/${config.version === "latest" ? "latest" : `v${config.version}`}/${subdir}/${config.license}${addOn}${baseFilename}.min.${method}`;
          const stylesheet = createStyleSheetLink(url, "fa-kit");
  
          if (config.detectingConflicts && config.detectConflictsUntil && new Date() <= new Date(config.detectConflictsUntil)) {
            const script = createInlineStyleElement(loadStyleSheet(addTokenAndCleanUrl(addBaseUrl("conflict-detection", baseFilename, version, method, "js"), token)), "fa-kit-upload");
            document.body.appendChild(script);
          }
  
          document.head.appendChild(stylesheet);
        } catch (error) {
          console.error(`Font Awesome Kit: ${error}`);
        }
      }
    }
  
    try {
      if (window.FontAwesomeKitConfig) {
        const config = window.FontAwesomeKitConfig;
        const loaderConfig = {
          detectingConflicts: config.detectConflictsUntil && new Date() <= new Date(config.detectConflictsUntil),
          detectionIgnoreAttr: "data-fa-detection-ignore"
        };
  
        loadFontAwesomeKit(config).then(stylesheets => {
          stylesheets.forEach(stylesheet => {
            try {
              document.head.appendChild(stylesheet);
            } catch (error) {
              console.error(`Font Awesome Kit: ${error}`);
            }
          });
  
          if (config.detectingConflicts) {
            M(() => {
              H.setAttributeNode(document.createAttribute(loaderConfig.detectionIgnoreAttr));
              const detectionScript = createInlineStyleElement(loadStyleSheet(addTokenAndCleanUrl(addBaseUrl("conflict-detection", config.baseFilename || config.license, config.version, config.method, "js"), config.token)), "fa-kit-upload");
              document.body.appendChild(detectionScript);
            });
          }
        }).catch(error => {
          console.error(`Font Awesome Kit: ${error}`);
        });
      }
    } catch (error) {
      console.error(`Font Awesome Kit: ${error}`);
    }
  })();
  