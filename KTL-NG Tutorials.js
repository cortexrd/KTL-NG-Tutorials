/**
 * KTL-NG Tutorials - Test Application for KTL
 * This app is used to test and demonstrate KTL features.
 */

window.APP_VERSION = '0.1.0';

//Called by KTL after loading
window.KnackApp = function (params = {}) {
    const { ktlVersion, lsShortName } = params;

    // console.log('KTL-NG Tutorials starting...');
    // console.log('KTL Version:', ktlVersion);
    // console.log('Storage prefix:', lsShortName);

    //Wait for KTL to be ready
    document.addEventListener('ktl:ready', function (e) {
        console.log('KTL ready event received:', e.detail);
        initApp();
    });
};

function initApp() {
    if (!window.ktl) {
        console.error('KTL not found');
        return;
    }

    const ktl = window.ktl;

    //Configure KTL core
    ktl.core.setCfg({
        developerNames: ['Normand'],
        showVersionInfo: true,
        enableDebugMode: true
    });

    //Set up page render handler (native Next-Gen events)
    Knack.on('page:render', function (data) {
        console.log('Page rendered:', data);
    });

    //Set up view render handler (native Next-Gen events)
    Knack.on('view:render', function (data) {
        console.log('View rendered:', data);
    });

    //Log initialization
    ktl.log.clog('KTL-NG Tutorials initialized', 'green');
    ktl.log.addLog(ktl.const.LS_INFO, 'App initialized');

    //Show a welcome popup
    ktl.core.timedPopup('KTL-NG Tutorials loaded!', 'info', 3000);
}

//Alternative: ktlReady callback (for compatibility with KTL pattern)
window.ktlReady = function (ktl) {
    console.log('ktlReady called');
    //Can also configure here if needed
};
