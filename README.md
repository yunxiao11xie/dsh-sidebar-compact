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

The rules target the shipped sidebar's CSS-module prefix `csseja_`
(`SidebarRoot.module.css`: `panelList`, `panelRow`, `panelTitle`,
`footerActions`). A DSH upgrade may rename it — search the packaged client
bundle for `SidebarRoot.module.css` and update `SIDEBAR_PREFIX` in `client.js`.

## License

MIT
