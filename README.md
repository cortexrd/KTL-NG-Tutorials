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

Start the local file server on port 3000:

```bash
node C:\code\Lib\KTLNG\NodeJS\NodeJS_FileServer.js
```

### 2. Knack Builder Configuration

In your Knack app's **Settings > API & Code > JavaScript**, add:

```javascript
Knack.ready().then(async () => {
    await Knack.loadScript('http://localhost:3000/Lib/KTLNG/KTL_Start.js');
    loadKtl(typeof KnackApp === 'function' ? KnackApp : null);
});
```

### 3. Enable Local Mode

Add `?ktl=local` to your app URL, e.g.:
`https://your-app.knack.com/app#page/?ktl=local`

The mode is saved to localStorage and persists across sessions.

In local mode, the loader fetches:
- `http://localhost:3000/Lib/KTLNG/KTL.js`
- `http://localhost:3000/Lib/KTLNG/KTL.css`
- `http://localhost:3000/KnackApps/KTL-NG Tutorials/KTL-NG Tutorials.js`
- `http://localhost:3000/KnackApps/KTL-NG Tutorials/KTL-NG Tutorials.css` (if exists)

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

    // Set up event handlers (native Next-Gen events)
    Knack.on('page:render', (data) => {
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

Use URL parameter (easiest):
- `?ktl=local` - Development (localhost:3000)
- `?ktl=prod` - Production (CDN)
- `?ktl=dev` - Development version from CDN

The mode persists in localStorage after first use.

## Related

- [KTLNG](https://github.com/cortexrd/KTLNG) - The KTL Next-Gen library
- [KTL Classic](https://github.com/cortexrd/Knack-Toolkit-Library) - Original KTL

## License

MIT
