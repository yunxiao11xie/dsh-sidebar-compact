window.__ModuleLoader__.load({
  id: 'dsh-sidebar-compact',
  factory(require) {
    const React = require('react');

    const STYLE_ID = 'dsh-sidebar-compact-style';

    // CSS-module prefix of the shipped sidebar (@deepseek-ai/dsh-client-ui-sidebar,
    // SidebarRoot.module.css). It changes between DSH builds: re-read it from the
    // packaged client bundle after an upgrade (search the asar for
    // "SidebarRoot.module.css" and take the class before the first underscore).
    const SIDEBAR_PREFIX = 'wtg9ga_';

    // Two footer action entries share one line in wide mode. Their rows wrap an
    // anonymous container div and carry width:100%, so the wrapper becomes a
    // flex row of equal halves instead of stacked full-width rows.
    const FOOTER_ACTIONS_TWO_COL = true;

    // The global panel rows (插件 / 插件市场 / …) share one line per pair.
    // Gated on the row's own label span so the collapsed icon rail, which
    // renders glyphs without labels, keeps its shipped vertical layout.
    const PANEL_LIST_TWO_COL = true;

    function css() {
      return `
${FOOTER_ACTIONS_TWO_COL ? `
/* Sidebar footer action rows: two entries share one line in wide mode.
   Two DOM shapes must both work: on a cold boot the slot renders entries as
   direct children of footerActions; under HMR/hot-reload sessions an
   anonymous wrapper div sits between them (display:contents makes that
   wrapper transparent so its children become the flex items either way). */
.${SIDEBAR_PREFIX}footerActions {
  display: flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  gap: 4px !important;
}
.${SIDEBAR_PREFIX}footerActions > div { display: contents !important; }
.${SIDEBAR_PREFIX}footerActions > *,
.${SIDEBAR_PREFIX}footerActions > div > * {
  flex: 1 1 0 !important;
  width: auto !important;
  min-width: 0 !important;
}
.${SIDEBAR_PREFIX}collapsed .${SIDEBAR_PREFIX}footerActions {
  flex-direction: column !important;
  align-items: center !important;
}
.${SIDEBAR_PREFIX}collapsed .${SIDEBAR_PREFIX}footerActions > div {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}
` : ''}
${PANEL_LIST_TWO_COL ? `
/* Sidebar global panel rows: two entries per line in wide mode.
   :has() on the descendant title span, not a fixed child depth — the shipped
   DOM nesting differs between releases (0.2.1: list > row > title;
   0.2.2: list > entry > button > title). */
.${SIDEBAR_PREFIX}panelList:has(.${SIDEBAR_PREFIX}panelTitle) {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  flex-direction: initial !important;
  flex-wrap: initial !important;
  column-gap: 4px !important;
  row-gap: 2px !important;
}
.${SIDEBAR_PREFIX}panelList:has(.${SIDEBAR_PREFIX}panelTitle) > * {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
}
` : ''}
`;
    }

    function installStyles() {
      let el = document.getElementById(STYLE_ID);
      if (!el) {
        el = document.createElement('style');
        el.id = STYLE_ID;
        document.head.appendChild(el);
      }
      el.textContent = css();
    }

    function removeStyles() {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    }

    return {
      inject: [],
      apply(ctx) {
        installStyles();
        ctx.effect(() => () => removeStyles(), 'sidebar-compact: styles');
      },
    };
  },
});
