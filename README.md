# KTL-NG Tutorials

Test application for developing and demonstrating [KTLNG](https://github.com/cortexrd/KTLNG) features.

## Purpose

This Knack application serves as:
- Development testbed for KTLNG features
- Reference implementation for KTLNG integration
- Tutorial examples for KTLNG usage

## Status

**Early Development** - Only local development mode works currently. CDN/production deployment not yet available.

## Setup (Local Development Only)

### 1. Start Local Server

Start a local HTTP server on port 3000 serving `C:\code`:

```bash
cd C:\code && python -m http.server 3000
```

### 2. Knack Builder Configuration

In your Knack app's **Settings > API & Code > JavaScript**, add:

```javascript
Knack.ready().then(async () => {
    await Knack.loadScript('http://localhost:3000/Lib/KTLNG/KTL_Loader.js');
});
```

### 3. Enable Local Mode

In the browser console, run `KTL.setLocalMode()` then refresh.

The loader will fetch files from:
- `http://localhost:3000/Lib/KTLNG/KTL.js`
- `http://localhost:3000/KnackApps/KTL-NG Tutorials/KTL-NG Tutorials.js`

## File Structure

```
KTL-NG Tutorials/
├── KTL-NG Tutorials.js   # Main app file
├── KTL-NG Tutorials.css  # App styles (optional)
└── README.md             # This file
```

## App Code Overview

```javascript
window.APP_VERSION = '0.1.0';

// Called by KTL Loader after KTL is loaded
window.KnackApp = function(params) {
    const { ktlVersion, lsShortName } = params;

    // Wait for KTL initialization
    document.addEventListener('ktl:ready', function(e) {
        initApp();
    });
};

function initApp() {
    const ktl = window.ktl;

    // Configure KTL
    ktl.core.setCfg({
        developerNames: ['Normand'],
        showVersionInfo: true,
        enableDebugMode: true
    });

    // Set up event handlers
    ktl.events.on('knack-scene-render.any', (event, data) => {
        console.log('Page rendered:', data);
    });
}
```

## Testing Keywords

Add these to view titles in the Builder to test features:

| Keyword | Test |
|---------|------|
| `_ar=10` | Auto-refresh every 10 seconds |
| `_hc=field_X` | Hide column |
| `_sth` | Sticky table header |

## Switching Modes

From browser console:

```javascript
KTL.setLocalMode()   // Development (localhost:3000)
KTL.setProdMode()    // Production (CDN)
KTL.setDevMode()     // Development version from CDN
KTL.getMode()        // Check current mode
```

## Related

- [KTLNG](https://github.com/cortexrd/KTLNG) - The KTL Next-Gen library
- [KTL Classic](https://github.com/cortexrd/Knack-Toolkit-Library) - Original KTL

## License

MIT
