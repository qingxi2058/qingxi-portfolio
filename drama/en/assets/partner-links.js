// Edit partner IDs here once and every linked page will update automatically.
(function(){
  var PARTNER_IDS = {
    fal: 'REPLACE_WITH_REAL_FAL_REF',
    replicate: 'REPLACE_WITH_REAL_REPLICATE_REF',
    aimlapi: 'REPLACE_WITH_REAL_AIMLAPI_REF'
  };

  var BASE_URLS = {
    fal: 'https://fal.ai/',
    replicate: 'https://replicate.com/',
    aimlapi: 'https://aimlapi.com/'
  };

  function hasRealId(value){
    return !!value && String(value).indexOf('REPLACE_WITH_REAL_') !== 0;
  }

  function buildUrl(base, ref){
    var url = new URL(base);
    if(hasRealId(ref)) url.searchParams.set('ref', ref);
    return url.toString();
  }

  function applyPartnerLinks(){
    document.querySelectorAll('[data-partner-link]').forEach(function(link){
      var key = link.getAttribute('data-partner-link');
      var base = link.getAttribute('data-partner-base') || BASE_URLS[key];
      if(!key || !base) return;
      link.href = buildUrl(base, PARTNER_IDS[key]);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyPartnerLinks, {once:true});
  }else{
    applyPartnerLinks();
  }
})();
