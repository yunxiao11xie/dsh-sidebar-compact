# dsh-sidebar-compact

Two sidebar rows per line, so the workspace session list gets the height back.

The shipped sidebar stacks its global panel rows (插件 / 插件市场 / …) and its
footer actions (论文伴读 / 远程控制 / …) one per line. In wide mode this plugin
packs each list two per line:

```
before                    after
插件                      插件      |  插件市场
插件市场                  自动化任务 |  上下文洞察
自动化任务                Dream 记忆 |  更多
上下文洞察
Dream 记忆
更多
```

- Panel rows: packed two per line **only while the rows render their labels**
  (wide sidebar). The collapsed icon rail keeps its shipped vertical layout.
- Footer actions: the slot renderer wraps every entry in one anonymous
  container; that wrapper becomes a flex row of two equal halves. The collapsed
  rail keeps the centered column.

Everything is CSS: no host service, no network, no model call.

## Requirements

- DeepSeek Harness with the Web UI, `engines.dsh` `>=0.2.0-rc.1 || >=0.2.1-rc.1 || >=0.2.2-rc.1`.
- Works with any number of entries: extra rows simply wrap to the next line.

## Install

```sh
dsh plugin --profile desktop add dsh-sidebar-compact
```

or add it to the profile by hand:

```jsonc
// <profile>/package.json
{
  "dependencies": { "dsh-sidebar-compact": "link:/path/to/dsh-sidebar-compact" },
  "dsh": { "profile": { "bundles": ["...", "dsh-sidebar-compact"] } }
}
```

then restart the desktop app (a new bundle needs a kernel restart; edits to an
already loaded plugin only need a page refresh).

## Maintenance note

The rules target the shipped sidebar's CSS-module prefix `wtg9ga_` (verified on
DSH 0.2.2-rc.2; older releases used `csseja_`). Search the packaged client
bundle (`@deepseek-ai/dsh-client-ui-sidebar/lib/client.js`) and update
`SIDEBAR_PREFIX` in `client.js` after a DSH upgrade.

Two 0.2.2 changes the rules account for:

- The panel row DOM deepened to
  `nav.panelList > div.panelEntryWide > button.panelRow > span.panelTitle`, so
  the wide-mode test uses a descendant `:has(.panelTitle)` instead of a fixed
  child depth.
- `flex-direction` on `panelList` is overridden by shipped layout rules, so the
  two-column layout is forced with `display: grid` instead of flex.

`dsh.client.inject` points at `@deepseek-ai/dsh-client-ui-conversation` (the
first-loaded client surface) so the stylesheet mounts early and reliably.

## License

MIT
