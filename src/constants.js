export const DEFAULT_ADS = {
  tableAds: {
    sel: '#srchrslt-adtable',
    type: 0,
    isCompleted: false,
  },
  altTableAds: {
    sel: '#srchrslt-adtable-altads',
    type: 0,
    isCompleted: false,
  },
  leftbaseAds: {
    sel: '.site-base--left-banner',
    type: 1,
    isCompleted: false,
  },
  rightbaseAds: {
    sel: '.site-base--right-banner',
    type: 1,
    isCompleted: false,
  },
  bannerAds: {
    sel: '#brws_banner-supersize',
    type: 1,
    isCompleted: false,
  },
  topAds: {
    sel: '#srp_adsense-top',
    type: 1,
    isCompleted: false,
  },
  middleAds: {
    sel: '#srps-middle',
    type: 1,
    isCompleted: false,
  },
  footerAds: {
    sel: '#btf-billboard',
    type: 1,
    isCompleted: false,
  },
  leftBottomAds: {
    sel: '#srp-skyscraper-btf',
    type: 1,
    isCompleted: false,
  },
  any: {
    sel: '[data-liberty-position-name]',
    type: 2,
    isCompleted: false,
  },
};

export const SEARCH_RESULT_CSS = {
  items: [
    {
      sel: '#srchrslt > header',
      multiple: false,
      style: {
        position: 'sticky',
        top: '-92px',
        zIndex: '100',
      },
    },
    {
      sel: 'body > header',
      multiple: false,
      style: {
        position: 'sticky',
        top: '-92px',
        zIndex: '100',
      },
    },
    {
      sel: '#site-header',
      multiple: false,
      style: {
        position: 'sticky',
        top: '-92px',
        zIndex: '100',
      },
    },
    {
      sel: 'div.grid.grid-cols-\\[1fr_970px_1fr\\].bg-backgroundSubdued.pb-small.pt-large',
      multiple: false,
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    {
      sel: '#srchrslt > div.grid.grid-cols-\\[1fr_970px_1fr\\].bg-backgroundSubdued.pb-small.pt-large > main',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '.site-base--content',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '#srchrslt > div.grid.grid-cols-\\[1fr_970px_1fr\\].bg-backgroundSubdued.pb-small.pt-large > main > div > div.w-full.bg-backgroundSubdued.pb-small > div',
      multiple: false,
      style: {
        width: '100%',
        padding: '0 3rem 3rem 3rem',
        gap: '2rem',
      },
    },
    {
      sel: '#site-content',
      multiple: false,
      style: {
        width: '100%',
        padding: '3rem',
      },
    },
    {
      sel: '#srchrslt > div.grid.grid-cols-\\[1fr_970px_1fr\\].bg-backgroundSubdued.pb-small.pt-large > main > div',
      multiple: false,
      style: {
        maxWidth: 'none',
      },
    },
    {
      sel: '#main > div',
      multiple: false,
      style: {
        width: '100%',
        padding: '0 3rem',
      },
    },
    {
      sel: '.srp-header',
      multiple: false,
      style: {
        marginBottom: '2rem',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
        border: '1px solid #dddbd5',
      },
    },
    {
      sel: '#srchrslt-content > div.mb-small.rounded-xsmall.bg-surface > div',
      multiple: false,
      style: {
        marginBottom: '2rem',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
        border: '1px solid #dddbd5',
      },
    },
    {
      sel: '#srchrslt > div.grid.grid-cols-\\[1fr_970px_1fr\\].bg-backgroundSubdued.pb-small.pt-large > main > div > div.w-full.bg-backgroundSubdued.pb-small > div > aside > div.mb-small.flex.flex-col.rounded-xsmall.bg-surface',
      multiple: false,
      style: {
        border: '1px solid #dddbd5',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      },
    },
    {
      sel: '.browsebox',
      multiple: false,
      style: {
        border: '1px solid #dddbd5',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      },
    },
    {
      sel: '.l-splitpage-flex',
      multiple: true,
      style: {
        justifyContent: 'space-between',
        gap: '2rem',
      },
    },
    {
      sel: '#srchrslt-content',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '.aditem-image',
      multiple: true,
      style: {
        flexBasis: '250px',
      },
    },
    {
      sel: '#srchrslt-adtable > li > article > div.relative.z-raised.basis-\\[200px\\]',
      multiple: true,
      style: {
        flexBasis: '250px',
      },
    },
    {
      sel: '.imagebox.srpimagebox',
      multiple: true,
      style: {
        width: '250px',
        height: '200px',
      },
    },
    {
      sel: '#srchrslt-adtable > li > article > div.relative.z-raised.basis-\\[200px\\] > a > div',
      multiple: true,
      style: {
        width: '250px',
        height: '200px',
      },
    },
    {
      sel: '#srchrslt-adtable > li > article > div.z-raised.flex.grow.basis-\\[398px\\].flex-col.overflow-hidden.pl-medium > div.my-xsmall.truncate',
      multiple: true,
      style: {
        display: 'none',
      },
    },
    {
      sel: '.aditem-main--top',
      multiple: true,
      style: { fontWeight: '500' },
    },
    {
      sel: '#srchrslt-adtable > li > article > div.z-raised.flex.grow.basis-\\[398px\\].flex-col.overflow-hidden.pl-medium > div.mb-xsmall.flex.items-start.justify-between.text-bodyRegular',
      multiple: true,
      style: { fontWeight: '500' },
    },
    {
      sel: '.aditem-main--middle--price-shipping--price, .aditem-main--middle--price-shipping--old-price',
      multiple: true,
      style: {
        fontSize: '20px',
      },
    },
    {
      sel: '#srchrslt-adtable > li > article > div.z-raised.flex.grow.basis-\\[398px\\].flex-col.overflow-hidden.pl-medium > div.flex.flex-col > div > p',
      multiple: true,
      style: {
        fontSize: '20px',
      },
    },
    {
      sel: '#srchrslt-results > div:nth-child(1) > div.mx-auto.max-w-screen-custom',
      multiple: false,
      style: {
        maxWidth: 'none',
      },
    },
  ],
};

export const PROFILE_RESULT_CSS = {
  items: [
    {
      sel: '#site-header',
      multiple: false,
      style: {
        position: 'sticky',
        top: '-92px',
        zIndex: '100',
      },
    },
    {
      sel: '.site-base',
      multiple: false,
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    {
      sel: '.site-base--content',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '#site-content',
      multiple: false,
      style: {
        width: '100%',
        padding: '3rem',
      },
    },
    {
      sel: '.srp-header',
      multiple: false,
      style: {
        marginBottom: '2rem',
      },
    },
    {
      sel: '.browsebox',
      multiple: false,
      style: {
        border: '1px solid #dddbd5',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      },
    },
    {
      sel: '.l-splitpage-flex',
      multiple: false,
      style: {
        justifyContent: 'space-between',
        gap: '2rem',
      },
    },
    {
      sel: '.l-container-row.l-splitpage-content',
      multiple: false,
      style: {
        width: '80%',
      },
    },
    {
      sel: '.l-splitpage-navigation',
      multiple: false,
      style: {
        width: '20%',
      },
    },
    {
      sel: '.a-vertical-padded.l-container',
      multiple: false,
      style: {
        paddingTop: '0',
      },
    },
    {
      sel: '#srchrslt-content',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '.imagebox.srpimagebox',
      multiple: true,
      style: {
        width: '250px',
        height: '200px',
      },
    },
    {
      sel: '.aditem-image',
      multiple: true,
      style: {
        flexBasis: '250px',
      },
    },
    {
      sel: '.aditem-main--top',
      multiple: true,
      style: { fontWeight: '500' },
    },
    {
      sel: '.aditem-main--middle--price-shipping--price, .aditem-main--middle--price-shipping--old-price',
      multiple: true,
      style: {
        fontSize: '20px',
      },
    },
    {
      sel: '#main > div.l-splitpage-flex > div.l-splitpage-navigation > section',
      multiple: false,
      style: {
        border: '1px solid #dddbd5',
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
      },
    },
  ],
};

export const AD_ITEM_CSS = {
  items: [
    {
      sel: '.site-base',
      multiple: false,
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    {
      sel: '.site-base--content',
      multiple: false,
      style: { width: '100%' },
    },
    {
      sel: '#site-content',
      multiple: false,
      style: {
        width: '100%',
        padding: '3rem',
      },
    },
    {
      sel: '.galleryimage-large.l-container-row.j-gallery-image',
      multiple: false,
      style: {
        width: '100%',
      },
    },
  ],
};

export const START_PAGE_CSS = {
  items: [
    {
      sel: '.grid.bg-backgroundSubdued',
      multiple: false,
      style: {
        gridTemplate: 'none',
      },
    },
  ],
};
