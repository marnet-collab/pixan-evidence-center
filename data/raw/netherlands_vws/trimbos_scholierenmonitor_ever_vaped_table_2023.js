(function () {
  //Inject tables code v1.0

  var highcharts = document.createElement('script');

  var cdn = 'https://app.everviz.com/resources/highcharts/11.4.8/';
  var loaded = 0;  
  var encodedUrl = encodeURI('https:///show/VhUgu4jQb');
  var chartCreated = false;
  var scripts = [
    "highcharts.js"
  ];

  var externalCSS = [
    "https://app.everviz.com/static/fonts/radio-grotesk/style.css",
    "https://app.everviz.com/static/fonts/gordita/style.css"
  ];

  var extraScripts = [
    "https://app.everviz.com/resources/tables/1.0/js/table.js"
  ];

  var options = {"template":[],"data":{"googleSpreadsheetKey":"","value":[[null,"Jongens",null,"Meisjes",null,"Totaal",null],[null,"%","95% BI","%","95% BI","%","95% BI"],["12 jaar","8,5","6,1-11,0","9,9","7,3-12,6","9,3","7,3-11,2"],["13 jaar","15,7","12,9-18,4","19,1","16,1-22,1","17,4","15,3-19,5"],["14 jaar","23,3","19,5-27,1","36,1","31,7-40,5","29,7","26,4-33,0"],["15 jaar","30,6","26,6-34,5","41,7","37,0-46,3","36,0","32,9-39,1"],["16 jaar","32,2","27,7-36,7","39,3","33,9-44,6","35,6","31,9-39,3"],["Totaal 12-16 jaar","21,0","19,0-23,1","28,1","25,8-30,3","24,6","22,8-26,4"]]},"options":{"title":{"text":"","align":"left","style":{"fontSize":"16px","fontWeight":"unset","color":"#000000","fontFamily":"gordita"},"enabled":true},"subtitle":{"text":"","align":"left","style":{"fontSize":"14px","color":"#000000","fontFamily":"gordita"}},"caption":{"style":{"color":"#000000","fontSize":"12px","fontStyle":"italic","fontFamily":"gordita"}},"credits":{"style":{"color":"#000000"}},"rows":{"stripes":true,"style":{},"stripesColor":"#edf2f6","textColor":"#000000"},"exporting":{"enabled":true,"sourceWidth":null,"sourceHeight":null},"table":{"pagination":{"enabled":false},"style":{"fontFamily":"gordita","backgroundColor":"#ffffff","fontSize":"12px","color":"#000000"},"searchable":{"enabled":false,"style":{"borderColor":"#172b4c"},"labelText":""},"extra":{"style":{"backgroundColor":"#edf2f6"}}},"header":{"style":{"backgroundColor":"#c7d308","fontSize":"12px","fontFamily":"gordita","color":"#ffffff","fontWeight":"bold"}},"columns":[{"type":"data","visible":true},{"type":"data","visible":true},{"type":"data","visible":false},{"type":"data","visible":true},{"type":"data","visible":false},{"type":"data","visible":true},{"type":"data","visible":false}]}};
  
  function isScriptAlreadyIncluded(src){
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].hasAttribute('src')) {
        const scriptTag = scripts[i].getAttribute('src') || '';
        if ((scriptTag.indexOf(src) >= 0) || 
            (scriptTag.indexOf('highcharts.src.js') > -1 && src === 'highcharts.js') ||
            ((scriptTag.indexOf('stock/highstock.js') > -1) && src === 'modules/highstock.js')) {
          return true;
        }
      }
    }
    return false;
  }

  function loadCSS() {
    var cssLength = externalCSS.length;
    for(var i=0; i < cssLength; i++) {
      var css = document.createElement('link');
      css.rel  = 'stylesheet';
      css.type = "text/css";
      css.href = externalCSS[i];
      document.body.appendChild(css);
    }
  }

  function createLayout() {
    if(chartCreated) return;

    if (!window['EvervizLayoutModule']) window['EvervizLayoutModule'] = {};
    if (!window['EvervizLayoutModule'].projects) window['EvervizLayoutModule'].projects = [];
    
    chartCreated = true;
    window.EvervizLayoutModule.hasLoaded = true;
    var evervizTable = new EvervizTable('everviz-table-VhUgu4jQb', options);
    window['EvervizLayoutModule'].projects.push(evervizTable);
  }

  function check(scripts, cb) {
    if (loaded === scripts.length) {
      if (cb) {
        cb();
      } else {
        for (var i = 0; i < window.EvervizLayoutModule.ondone.length; i++) {
          try {
            window.EvervizLayoutModule.ondone[i]();
          } catch(e) {
            console.error(e);
          }
        }
      }
    }
  }

  function loadScript(s, scripts, cb) {
    if (!s) next();
    
    function next() {
      ++loaded;
      if (loaded < scripts.length) {
        loadScript(scripts[loaded], scripts, cb);
      }
      check(scripts, cb);
    }

    if (isScriptAlreadyIncluded(s)) {
      return next();
    }

    var n = document.createElement('script');

    n.onload = function () {
      next();
    };
    if (s.indexOf('https') >= 0) {
      n.src = s;
    } else {
      n.src = cdn + s;
    }
    document.body.appendChild(n);
  }

  function loadExtraScripts(){
    if (extraScripts.length > 0) {
      loaded = 0;
      loadScript(extraScripts[0], extraScripts);
    } else {
      check(scripts);
    }
  }

  function loadExtraScriptsAndMakeChart(){
    loaded = 0;
    loadCSS();
    if (extraScripts.length > 0) {
      loadScript(extraScripts[0], extraScripts, createLayout);
    } else {
      check(extraScripts, createLayout);
    }
  }

  if (typeof window['EvervizLayoutModule'] === 'undefined') {
    window.EvervizLayoutModule = {
      ondone: [createLayout],
      hasWrapped: false,
      hasLoaded: false,
      projects: []
    };

    loadScript(scripts[0], scripts, loadExtraScripts);
    loadCSS();

  } else {
    if (!window.EvervizLayoutModule.hasLoaded) window.EvervizLayoutModule.ondone.push(loadExtraScriptsAndMakeChart);
    else loadExtraScriptsAndMakeChart();
  }

}());
