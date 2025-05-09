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
        boxShadow: '3px 3px 5px 0px rgb(0, 0, 0, 0.04)',
        border: '1px solid #dddbd5',
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
    // {
    //   sel: '.l-splitpage-navigation.adslot-container > .l-container-row',
    //   multiple: false,
    //   style: {
    //     position: 'sticky',
    //     top: '5.7rem',
    //   },
    // },
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
  ],
};

export const PROFILE_RESULT_CSS = {
  items: [
    {
      sel: '#site-header',
      multiple: false,
      style: {
        position: 'sticky',
        top: '-84px',
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
