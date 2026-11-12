# dsh-sidebar-compact

把侧栏的两类列表排成**每行两个**，把竖直空间还给工作区的会话列表。

DSH 官方侧栏里，全局面板行（插件 / 插件市场 / …）和底部功能入口（论文伴读 /
远程控制 / …）都是一行一个。宽栏模式下本插件把每个列表压成两列：

```
改前                      改后
插件                      插件      |  插件市场
插件市场                  自动化任务 |  上下文洞察
自动化任务                Dream 记忆 |  更多
上下文洞察
Dream 记忆
更多
```

- **面板行**：只在渲染出文字标签时（宽栏）两列；收起成图标列时保持官方竖排
- **底部入口**：插槽渲染器把入口包在一个匿名容器里，那个容器改成两等分的
  flex 行；收起窄栏时恢复居中竖排

纯 CSS：不注册服务、不联网、不调模型。

## 依赖

- 带 Web UI 的 DeepSeek Harness，`engines.dsh` 为 `>=0.2.0-rc.1 || >=0.2.1-rc.1 || >=0.2.2-rc.1`。
- 入口数量随意，多出来的自动换到下一行。

## 安装

```sh
dsh plugin --profile desktop add dsh-sidebar-compact
```

或手动写进 profile：

```jsonc
// <profile>/package.json
{
  "dependencies": { "dsh-sidebar-compact": "link:/path/to/dsh-sidebar-compact" },
  "dsh": { "profile": { "bundles": ["...", "dsh-sidebar-compact"] } }
}
```

然后重启桌面端（新增 bundle 需要重启；已加载插件的改动刷新页面即可）。

## 维护提示

规则依赖官方侧栏的 CSS module 前缀 `csseja_`（`SidebarRoot.module.css` 里的
`panelList` / `panelRow` / `panelTitle` / `footerActions`）。DSH 升级可能改前缀
——在打包后的 client bundle 里搜 `SidebarRoot.module.css`，改 `client.js` 里的
`SIDEBAR_PREFIX` 即可。

## 许可证

MIT
