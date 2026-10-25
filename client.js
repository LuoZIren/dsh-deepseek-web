window.__ModuleLoader__.load({
  id: '@local/dsh-plugin-deepseek-web',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** This module's package id, reused for style tags and diagnostics. */
    const PKG = '@local/dsh-plugin-deepseek-web';
    /** Locale namespace for every string this module renders. */
    const NS = 'deepseekWeb';
    /** The page the launcher opens. */
    const TARGET_URL = 'https://chat.deepseek.com/';
    /** The only host whose guest this module tunes or reads. */
    const DEEPSEEK_HOST = 'chat.deepseek.com';
    /** The shipped right-Sidebar tab type that owns a sandboxed HTTP(S) view. */
    const TAB_KIND = 'browser';
    /** Identity of the stylesheet this module installs. */
    const STYLE_ID = PKG + '/panel.css';

    /**
     * Runtime dictionaries. `locale/*.json` carries the Plugin Manager's
     * display metadata; these strings are what the controls render.
     */
    const DICTS = {
      en: {
        'action.label': 'DeepSeek',
        'action.open': 'Open DeepSeek web chat in the Sidebar',
        'action.openNew': 'double-click to open another tab',
        'action.failed': 'Cannot open it here. Open a Session first (the Web build has no embedded browser).',
        'pull.label': 'Copy the latest DeepSeek answer into the composer',
        'pull.busy': 'Reading the DeepSeek panel…',
        'pull.done': 'Inserted into the composer',
        'pull.failed': 'Nothing to read. Open DeepSeek in the right Sidebar, get an answer, then click again.',
        'dot.checking': 'Checking the storage-partition patch…',
        'dot.applying': 'Re-applying the patch…',
        'dot.ok': 'Storage partition is persistent — the DeepSeek sign-in survives restarts',
        'dot.appliedRestart': 'Patch rewritten. Restart DeepSeek Harness to activate it.',
        'dot.missing': 'Patch missing (a DSH upgrade removes it). Click to re-apply.',
        'dot.unsupported': 'The archive no longer matches this patch. It needs adapting for this DSH build.',
        'dot.pending': 'State unknown for now — open the DeepSeek panel or restart DSH to detect it.',
        'drop.hint': 'Release to send into the DeepSeek web chat',
        'drop.busy': 'Sending into DeepSeek…',
        'drop.done': 'Sent into DeepSeek',
        'drop.failed': 'Could not send — open the DeepSeek panel first, then drag again',
        'drop.nofile': 'That drag carried no file — drag one from the file manager, or from a file card that offers it',
        'drop.release': 'Release to send:',
        'drop.files': 'files',
        'drop.nopath': 'This element names no file — drag a file row inside the card instead (details copied to the clipboard)',
        'set.nav': 'DeepSeek web chat',
        'set.title': 'DeepSeek web chat',
        'set.lead': 'Embeds the DeepSeek web chat in the right sidebar. Answers can be pulled into the composer, and local files can be dragged straight in.',
        'set.groupDot': 'Sidebar status dot',
        'set.dotVisible': 'Show the status dot',
        'set.dotVisibleHint': 'When off, the sidebar button stands alone; the patch state is then only visible in this page.',
        'set.dotSize': 'Dot size',
        'set.dotSizeHint': 'The dot reports whether the sign-in survives a restart. 6 px reads clearly without pulling attention.',
        'set.sizeSm': 'Small',
        'set.sizeMd': 'Medium',
        'set.sizeLg': 'Large',
        'set.halo': 'Halo spread',
        'set.haloHint': 'How far the breathing glow reaches around the dot. The wider it is, the softer it looks.',
        'set.haloOff': 'Off',
        'set.haloSoft': 'Soft',
        'set.haloNormal': 'Normal',
        'set.haloStrong': 'Wide',
        'set.breath': 'Breathing rhythm',
        'set.breathHint': 'The pause between glows. Still removes the motion entirely, for a calmer sidebar.',
        'set.breathOff': 'Still',
        'set.breathSlow': 'Slow',
        'set.breathNormal': 'Normal',
        'set.breathFast': 'Fast',
        'set.followTheme': 'Colours follow the theme',
        'set.followThemeHint': 'On: green, red and grey come from the active light or dark theme. Off: pick your own three colours.',
        'set.colors': 'Colour per state',
        'set.colorsHint': 'Healthy, needs repair, and not determined yet — in that order.',
        'set.colorOk': 'Healthy colour',
        'set.colorError': 'Repair needed colour',
        'set.colorUnknown': 'Undetermined colour',
        'set.groupPanel': 'Web panel',
        'set.autoOpen': 'Open the panel when a file is dropped',
        'set.autoOpenHint': 'Off: a drop with no panel open becomes a clear error instead of a new tab.',
        'set.maxFile': 'Largest file (MB)',
        'set.maxFileHint': 'Files above this are refused before they travel into the page. 8 MB is safe; the hard cap is 24 MB.',
        'set.groupReview': 'Web review',
        'set.reviewTemplate': 'Output format',
        'set.reviewTemplateHint': 'JSON lets the agent work through findings one by one; the plain list is for reading.',
        'set.tplCompact': 'List',
        'set.tplJson': 'JSON',
        'set.tplStrict': 'Strict JSON',
        'set.reviewRules': 'Review checklist',
        'set.reviewRulesHint': 'Sent with every review request. Edit it for the project; an empty box keeps only the fixed format rules.',
        'set.reviewMax': 'Findings at most',
        'set.reviewMaxHint': '1 to 10. Fewer findings keeps only the most certain ones.',
        'set.reviewReset': 'Built-in checklist',
        'set.reviewResetHint': 'Puts back the default checklist and count.',
        'review.title': 'Web review',
        'review.cached': 'cached',
        'review.running': 'reviewing…',
        'review.failed': 'failed',
        'review.clean': 'no findings',
        'review.progress': 'handled',
        'review.tick': 'Mark as handled',
        'set.reset': 'Restore defaults',
      },
      zh: {
        'action.label': 'DeepSeek',
        'action.open': '在右侧栏打开 DeepSeek 网页版对话',
        'action.openNew': '双击再开一个新标签',
        'action.failed': '暂时无法打开：请先打开一个会话（网页版 DSH 不支持内嵌浏览）。',
        'pull.label': '把 DeepSeek 网页版最新的回答填入输入框',
        'pull.busy': '正在读取 DeepSeek 面板…',
        'pull.done': '已填入输入框',
        'pull.failed': '没读到内容：请先在右侧栏打开 DeepSeek 网页版并生成回答，再点一次。',
        'dot.checking': '正在检查存储分区补丁…',
        'dot.applying': '正在重新打补丁…',
        'dot.ok': '存储分区持久化正常：DeepSeek 登录可跨重启保留',
        'dot.appliedRestart': '补丁已重新写入，重启 DeepSeek Harness 后生效',
        'dot.missing': '补丁缺失（DSH 升级后会清除）——点这里重新打补丁',
        'dot.unsupported': '补丁结构对不上：这个 DSH 版本的语句变了，需要重新适配，自动补丁帮不上忙',
        'dot.pending': '暂时无法确定：打开一次 DeepSeek 面板或重启 DSH 就能检测',
        'drop.hint': '松手：发送到 DeepSeek 网页版',
        'drop.busy': '正在发送到 DeepSeek…',
        'drop.done': '已发送到 DeepSeek',
        'drop.failed': '发送失败：先打开 DeepSeek 面板，再拖一次',
        'drop.nofile': '这次拖拽没带文件——请从文件管理器拖，或从带文件的卡片拖',
        'drop.release': '松手发送：',
        'drop.files': '个文件',
        'drop.nopath': '这个元素没有指向具体文件——请拖卡片里的文件行（诊断信息已复制到剪贴板）',
        'set.nav': 'DeepSeek 网页对话',
        'set.title': 'DeepSeek 网页对话',
        'set.lead': '在右侧栏内嵌 DeepSeek 网页版。回答可以一键填进输入框，本地文件也可以直接拖进去。下面这些偏好只保存在本机。',
        'set.groupDot': '侧边栏状态点',
        'set.dotVisible': '显示状态点',
        'set.dotVisibleHint': '关掉后侧边栏按钮旁边就没有小点了；补丁状态只能在设置页看到。',
        'set.dotSize': '小点大小',
        'set.dotSizeHint': '这个小点表示登录状态能否跨重启保留。6 像素最清楚，也不抢视线。',
        'set.sizeSm': '小',
        'set.sizeMd': '中',
        'set.sizeLg': '大',
        'set.halo': '光晕范围',
        'set.haloHint': '呼吸时光向外扩散多远。范围越大，看起来越柔和。',
        'set.haloOff': '关闭',
        'set.haloSoft': '柔和',
        'set.haloNormal': '标准',
        'set.haloStrong': '明显',
        'set.breath': '呼吸节奏',
        'set.breathHint': '两次光晕之间的间隔。“静止”会完全去掉动画，侧边栏更安静。',
        'set.breathOff': '静止',
        'set.breathSlow': '慢',
        'set.breathNormal': '标准',
        'set.breathFast': '快',
        'set.followTheme': '颜色跟随主题',
        'set.followThemeHint': '开启时用当前明暗主题里的绿、红、灰；关闭后可以自己挑三种颜色。',
        'set.colors': '三种状态的颜色',
        'set.colorsHint': '依次是：正常、需要修复、尚未确定。',
        'set.colorOk': '正常颜色',
        'set.colorError': '需修复颜色',
        'set.colorUnknown': '未确定颜色',
        'set.groupPanel': '网页面板',
        'set.autoOpen': '拖入文件时自动打开面板',
        'set.autoOpenHint': '关闭后，如果面板没开，拖文件会直接提示失败，而不是新开一个标签。',
        'set.maxFile': '单文件上限（MB）',
        'set.maxFileHint': '超过这个大小的文件在送进网页之前就会被拒绝。8 MB 比较稳妥，最大允许 24 MB。',
        'set.groupReview': '网页审查',
        'set.reviewTemplate': '输出格式',
        'set.reviewTemplateHint': 'JSON 便于逐条处理；简洁清单适合直接阅读。',
        'set.tplCompact': '清单',
        'set.tplJson': 'JSON',
        'set.tplStrict': '严格 JSON',
        'set.reviewRules': '审阅规则',
        'set.reviewRulesHint': '每次送审都会带上这段清单。可以按项目增删；留空则只用固定的格式要求。',
        'set.reviewMax': '最多列出几条',
        'set.reviewMaxHint': '1 到 10 条。条数越少，越只保留最确定的问题。',
        'set.reviewReset': '恢复内置规则',
        'set.reviewResetHint': '把清单和条数恢复成默认值。',
        'review.title': '网页审查',
        'review.cached': '缓存',
        'review.running': '审查中…',
        'review.failed': '审查失败',
        'review.clean': '无问题',
        'review.progress': '已处理',
        'review.tick': '标记为已处理',
        'set.reset': '恢复默认设置',
      },
    };

    /**
     * One ghost-button stylesheet shared by both controls. Focus styling is
     * `:focus-visible` only, so a mouse click never draws a ring, while a
     * keyboard user still sees one.
     */
    const CSS = [
      '.dsw-action{align-items:center;background:transparent;border:0;border-radius:var(--dsw-radius-sm);',
      'box-sizing:border-box;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;',
      'flex:none;font:var(--dsw-font-xxs-12);gap:6px;height:28px;justify-content:center;min-width:28px;',
      'padding:0 6px;white-space:nowrap}',
      '.dsw-action:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsw-action:focus{outline:none}',
      '.dsw-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.dsw-action[data-narrow="true"]{padding:0;width:28px}',
      '.dsw-action[data-phase="busy"]{cursor:progress;opacity:.6}',
      '.dsw-action[data-phase="done"]{color:var(--dsw-alias-state-success-primary)}',
      '.dsw-action[data-phase="error"]{color:var(--dsw-alias-state-error-primary)}',
      '.dsw-cell{align-items:center;display:inline-flex;flex:none;gap:4px;padding-right:6px}',
      '.dsw-dot{align-items:center;background:transparent;border:0;border-radius:50%;cursor:default;',
      'display:inline-flex;flex:none;height:16px;justify-content:center;padding:0;position:relative;width:12px}',
      '.dsw-dot::before{background:var(--dsw-dot-color,var(--dsw-alias-state-idle-primary));',
      'background:radial-gradient(circle at 34% 30%,color-mix(in srgb,#fff 42%,var(--dsw-dot-color)) 0%,',
      'var(--dsw-dot-color) 62%);',
      'border-radius:50%;box-shadow:0 0 0 .5px color-mix(in srgb,var(--dsw-dot-color) 22%,transparent);',
      'content:"";height:var(--dsw-dot-size,6px);width:var(--dsw-dot-size,6px);',
      'transition:transform .18s ease,box-shadow .18s ease}',
      '.dsw-dot::after{animation:dsw-breathe var(--dsw-breath,4.2s) cubic-bezier(.45,0,.55,1) infinite;',
      'background:radial-gradient(circle closest-side,',
      'color-mix(in srgb,var(--dsw-dot-color) 52%,transparent) 0%,',
      'color-mix(in srgb,var(--dsw-dot-color) 38%,transparent) 34%,',
      'color-mix(in srgb,var(--dsw-dot-color) 20%,transparent) 62%,',
      'color-mix(in srgb,var(--dsw-dot-color) 0%,transparent) 94%);',
      'border-radius:50%;content:"";height:var(--dsw-halo,16px);left:50%;',
      'margin:calc(var(--dsw-halo,16px) / -2) 0 0 calc(var(--dsw-halo,16px) / -2);opacity:0;',
      'pointer-events:none;position:absolute;top:50%;width:var(--dsw-halo,16px)}',
      '.dsw-dot[data-phase="missing"]::after,.dsw-dot[data-phase="unsupported"]::after{',
      'animation-duration:calc(var(--dsw-breath,4.2s) * .62)}',
      '.dsw-dot[data-phase="applying"]::after{animation-duration:calc(var(--dsw-breath,4.2s) * .3)}',
      '.dsw-dot[data-phase="loading"]::after,.dsw-dot[data-phase="indeterminate"]::after{animation:none}',
      '.dsw-dot[data-breath="off"]::after{animation:none;opacity:0}',
      '.dsw-dot[data-actionable="true"]{cursor:pointer}',
      '.dsw-dot[data-actionable="true"]:hover::before{transform:scale(1.22);',
      'box-shadow:0 0 0 .5px color-mix(in srgb,var(--dsw-dot-color) 30%,transparent),',
      '0 0 8px color-mix(in srgb,var(--dsw-dot-color) 48%,transparent)}',
      '.dsw-dot:focus-visible{border-radius:50%;outline:2px solid var(--dsw-alias-brand-primary);',
      'outline-offset:2px}',
      '@keyframes dsw-breathe{0%{opacity:0;transform:scale(.45)}50%{opacity:.92;transform:scale(1.3)}',
      '100%{opacity:0;transform:scale(.45)}}',
      '@media (prefers-reduced-motion:reduce){.dsw-dot::after{animation:none}}',
      '.dsw-drop{align-items:center;backdrop-filter:blur(10px);background:var(--dsw-alias-bg-overlay);',
      'border:.5px solid var(--dsw-alias-border-l2);border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.22);',
      'color:var(--dsw-alias-label-primary);display:flex;font:var(--dsw-font-xxs-12);gap:8px;left:50%;',
      'padding:10px 16px;pointer-events:auto;position:fixed;top:64px;transform:translateX(-50%);',
      'white-space:nowrap;z-index:2147483000}',
      '.dsw-drop[data-hover="true"]{border-color:var(--dsw-alias-brand-primary);',
      'box-shadow:0 10px 32px color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,transparent)}',
      '.dsw-drop[data-phase="done"]{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 60%,transparent)}',
      '.dsw-drop[data-phase="failed"]{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 60%,transparent)}',
      '.dsw-drop-mark{background:var(--dsw-alias-brand-primary);border-radius:50%;',
      'box-shadow:0 0 8px color-mix(in srgb,var(--dsw-alias-brand-primary) 55%,transparent);',
      'flex:none;height:8px;width:8px}',
      '.dsw-drop[data-phase="done"] .dsw-drop-mark{background:var(--dsw-alias-state-success-primary);',
      'box-shadow:0 0 8px color-mix(in srgb,var(--dsw-alias-state-success-primary) 55%,transparent)}',
      '.dsw-drop[data-phase="failed"] .dsw-drop-mark{background:var(--dsw-alias-state-error-primary);',
      'box-shadow:0 0 8px color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,transparent)}',
      '.dsw-set{color:var(--dsw-alias-label-primary);max-width:640px;padding:2px 0 28px}',
      '.dsw-set-title{font-size:16px;font-weight:500;line-height:24px;margin:0 0 4px}',
      '.dsw-set-lead{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;margin:0 0 20px}',
      '.dsw-set-group{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;margin:22px 0 8px}',
      '.dsw-set-row{align-items:center;border-bottom:.5px solid var(--dsw-alias-border-l2);',
      'display:flex;gap:16px;justify-content:space-between;padding:12px 0}',
      '.dsw-set-label{font-size:14px;line-height:22px}',
      '.dsw-set-hint{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;',
      'margin-top:2px;max-width:400px}',
      '.dsw-set-control{align-items:center;display:flex;flex:none;gap:8px}',
      '.dsw-seg{background:var(--dsw-alias-bg-layer-1);border-radius:var(--dsw-radius-sm);',
      'display:inline-flex;gap:2px;padding:2px}',
      '.dsw-seg button{background:transparent;border:0;border-radius:4px;',
      'color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:12px;line-height:18px;padding:3px 9px}',
      '.dsw-seg button[data-on="true"]{background:color-mix(in srgb,var(--dsw-alias-label-primary) 13%,transparent);',
      'color:var(--dsw-alias-label-primary)}',
      '.dsw-seg button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.dsw-switch{background:var(--dsw-alias-bg-layer-1);border:0;border-radius:999px;',
      'box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l2);cursor:pointer;flex:none;height:20px;position:relative;width:36px}',
      '.dsw-switch::after{background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.28);',
      'content:"";height:16px;left:2px;position:absolute;top:2px;transition:transform .16s ease;width:16px}',
      '.dsw-switch[aria-checked="true"]{background:color-mix(in srgb,var(--dsw-alias-label-primary) 20%,var(--dsw-alias-bg-layer-1))}',
      '.dsw-switch[aria-checked="true"]::after{transform:translateX(16px)}',
      '.dsw-switch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.dsw-color{background:transparent;border:.5px solid var(--dsw-alias-border-l2);border-radius:4px;',
      'cursor:pointer;height:24px;padding:0;width:30px}',
      '.dsw-number{background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);',
      'border-radius:4px;color:var(--dsw-alias-label-primary);font-size:12px;height:26px;padding:0 8px;width:66px}',
      '.dsw-set-block{border-bottom:.5px solid var(--dsw-alias-border-l2);padding:12px 0}',
      '.dsw-textarea{background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);',
      'border-radius:var(--dsw-radius-sm);box-sizing:border-box;color:var(--dsw-alias-label-primary);',
      'font-family:inherit;font-size:12px;line-height:18px;margin-top:8px;min-height:132px;padding:8px 10px;',
      'resize:vertical;width:100%}',
      '.dsw-textarea:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.dsw-review{background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);',
      'border-radius:10px;display:flex;flex-direction:column;gap:2px;padding:10px 12px}',
      '.dsw-review-head{align-items:center;display:flex;gap:8px;min-height:20px}',
      '.dsw-review-title{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px}',
      '.dsw-review-count{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;margin-left:auto;',
      'font-variant-numeric:tabular-nums}',
      '.dsw-review-row{align-items:flex-start;border-top:.5px solid var(--dsw-alias-border-l2);',
      'display:flex;gap:8px;padding:8px 0 6px}',
      '.dsw-review-check{background:transparent;border:.5px solid var(--dsw-alias-border-l2);border-radius:4px;',
      'cursor:pointer;flex:none;height:16px;margin-top:2px;padding:0;position:relative;width:16px}',
      '.dsw-review-check[aria-checked="true"]{background:color-mix(in srgb,var(--dsw-alias-label-primary) 22%,transparent);',
      'border-color:transparent}',
      '.dsw-review-check[aria-checked="true"]::after{border:solid var(--dsw-alias-label-primary);',
      'border-width:0 1.5px 1.5px 0;content:"";height:8px;left:5px;position:absolute;top:2px;',
      'transform:rotate(45deg);width:4px}',
      '.dsw-review-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.dsw-review-body{display:flex;flex-direction:column;gap:2px;min-width:0}',
      '.dsw-review-problem{color:var(--dsw-alias-label-primary);font-size:13px;line-height:19px}',
      '.dsw-review-meta{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.dsw-review-row[data-done="true"] .dsw-review-problem{color:var(--dsw-alias-label-secondary);',
      'text-decoration:line-through}',
      '.dsw-review-row[data-done="true"] .dsw-review-problem .dsw-sev{text-decoration:none}',
      '.dsw-review-row[data-done="true"] .dsw-review-meta{opacity:.7}',
      '.dsw-sev{border:.5px solid var(--dsw-alias-border-l2);border-radius:999px;flex:none;font-size:11px;',
      'line-height:16px;padding:0 6px}',
      '.dsw-sev[data-sev="high"]{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);',
      'color:var(--dsw-alias-state-error-primary)}',
      '.dsw-sev[data-sev="medium"]{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,transparent);',
      'color:var(--dsw-alias-state-warn-primary)}',
      '.dsw-sev[data-sev="low"]{color:var(--dsw-alias-label-secondary)}',
      '.dsw-reset{background:transparent;border:.5px solid var(--dsw-alias-border-l2);',
      'border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-primary);cursor:pointer;',
      'font-size:12px;height:28px;margin-top:20px;padding:0 12px}',
      '.dsw-reset:hover{background:var(--dsw-alias-interactive-bg-hover)}',
    ].join('');

    /** Speech-bubble outline sized for a 24-unit view box. */
    const BUBBLE = 'M4.2 10.6C4.2 6.9 7.8 4 12.3 4s8.1 2.9 8.1 6.6-3.6 6.6-8.1 6.6'
      + 'c-.9 0-1.8-.1-2.6-.3L5 19l1.1-3.6c-1.2-1.2-1.9-2.9-1.9-4.8Z';

    /**
     * Draw the launcher glyph in the host's current text colour.
     * @param size - rendered edge length in pixels.
     * @returns an SVG element.
     */
    function bubbleGlyph(size) {
      const dot = (cx) => h('circle', {
        key: cx, cx, cy: 10.6, r: 0.9, fill: 'currentColor', stroke: 'none',
      });
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: false,
        style: { display: 'block', flex: 'none' },
      }, [h('path', { key: 'bubble', d: BUBBLE }), dot(9), dot(12.3), dot(15.6)]);
    }

    /**
     * Draw the "pull into the composer" glyph: an arrow landing on a tray.
     * @param size - rendered edge length in pixels.
     * @returns an SVG element.
     */
    function pullGlyph(size) {
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: false,
        style: { display: 'block', flex: 'none' },
      }, [
        h('path', { key: 'shaft', d: 'M12 4.5v10' }),
        h('path', { key: 'head', d: 'M8 10.5 12 14.5 16 10.5' }),
        h('path', { key: 'tray', d: 'M5 18.5h14' }),
      ]);
    }

    /**
     * Install this module's stylesheet once per page.
     * @returns a disposer that removes the tag it created.
     */
    function installStyles() {
      if (typeof document === 'undefined') return () => {};
      const selector = 'style[data-plugin-css="' + STYLE_ID + '"]';
      if (document.querySelector(selector) !== null) return () => {};
      const tag = document.createElement('style');
      tag.dataset.plugin = PKG;
      tag.dataset.pluginCss = STYLE_ID;
      tag.textContent = CSS;
      document.head.appendChild(tag);
      return () => {
        tag.remove();
      };
    }

    /**
     * Resolve the DeepSeek guest view the Desktop Browser tab embeds. The
     * shipped tab type is the only in-app surface a site with
     * `frame-ancestors 'none'` can load into.
     * @returns the `<webview>` element, or null when the panel is not open.
     */
    function findDeepSeekGuest() {
      if (typeof document === 'undefined') return null;
      const nodes = Array.from(document.querySelectorAll('webview'));
      const matches = [];
      for (const node of nodes) {
        let address = '';
        try {
          address = typeof node.getURL === 'function' ? String(node.getURL()) : '';
        } catch (error) {
          address = '';
        }
        if (address.length === 0) address = String(node.getAttribute('src') || '');
        let host = '';
        try {
          host = new URL(address).hostname;
        } catch (error) {
          host = '';
        }
        if (host === DEEPSEEK_HOST) matches.push(node);
      }
      // Prefer the tab the user is looking at; background tabs report no box.
      for (const node of matches) {
        try {
          const box = node.getBoundingClientRect();
          if (box.width > 0 && box.height > 0) return node;
        } catch (error) {
          return node;
        }
      }
      // Blindly targeting one of several hidden tabs would deliver into the
      // wrong conversation, so only an unambiguous single guest is accepted.
      return matches.length === 1 ? matches[0] : null;
    }

    /**
     * Runs inside the guest page. Self-contained by design: the caller
     * stringifies it and evaluates it in the guest's own JavaScript context.
     * A live selection wins; otherwise the last rendered answer block is read.
     * @returns the extracted text, or an empty string.
     */
    function readDeepSeekAnswer() {
      const clean = (value) => String(value == null ? '' : value)
        .replace(/\r\n/g, '\n')
        .replace(/\u00a0/g, ' ')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      const selection = window.getSelection() == null ? '' : clean(window.getSelection().toString());
      if (selection.length > 0) return selection;
      const editable = 'textarea, input, [contenteditable="true"]';
      const selector = '[class*="ds-markdown"], [class*="markdown"]';
      // Page chrome inside an answer: icon buttons, anything marked hidden, and
      // toolbars. Class matching stays narrow on purpose — a substring such as
      // "action" or "copy" also appears on ordinary content containers.
      const chrome = 'button, [role="button"], svg, [aria-hidden="true"], '
        + '[role="toolbar"], [class*="toolbar"]';
      /** A short container whose only text comes from buttons is chrome too. */
      const isChromeHost = (node) => {
        if (typeof node.querySelector !== 'function') return false;
        const controls = node.querySelectorAll('button, [role="button"], svg');
        if (controls.length === 0) return false;
        let text = String(node.textContent ?? '');
        for (const control of controls) {
          const controlText = String(control.textContent ?? '');
          if (controlText.length > 0) text = text.replace(controlText, '');
        }
        // The answer block carries a code-block toolbar, so it has controls and
        // still holds the answer; only a bar whose entire text is button text is
        // chrome.
        return text.trim().length === 0;
      };
      const blockTags = /^(P|DIV|LI|UL|OL|TABLE|THEAD|TBODY|H1|H2|H3|H4|H5|H6|PRE|BLOCKQUOTE|SECTION|ARTICLE|HR)$/;

      /** Read one subtree as text, keeping block boundaries and dropping chrome. */
      const read = (node) => {
        if (node.nodeType === 3) return node.nodeValue == null ? '' : String(node.nodeValue);
        if (node.nodeType !== 1) return '';
        if (typeof node.matches === 'function' && node.matches(chrome)) return '';
        if (isChromeHost(node)) return '';
        const tag = String(node.tagName || '').toUpperCase();
        if (tag === 'BR') return '\n';
        if (tag === 'TR') {
          const cells = [];
          for (const cell of node.children) {
            if (typeof cell.matches === 'function' && cell.matches('TD, TH') === false) continue;
            cells.push(read(cell).replace(/\s+/g, ' ').trim());
          }
          return cells.length > 0 ? '\n| ' + cells.join(' | ') + ' |\n' : '\n';
        }
        let text = '';
        for (const child of node.childNodes) text += read(child);
        if (blockTags.test(tag) || tag === 'TD' || tag === 'TH') text = '\n' + text + '\n';
        return text;
      };

      // The page marks the final answer explicitly; that beats any heuristic and
      // keeps the reasoning block out of the draft.
      const answers = Array.prototype.filter.call(
        document.querySelectorAll('[class*="ds-assistant-message-main-content"]'),
        (node) => node.closest(editable) === null,
      );
      if (answers.length > 0) {
        // The newest answer is the last one, but an empty placeholder must fall
        // back to the previous answer rather than to an unlabelled block.
        for (let index = answers.length - 1; index >= 0; index -= 1) {
          const answerText = clean(read(answers[index]));
          if (answerText.length > 0) return answerText;
        }
      }
      const all = Array.prototype.filter.call(
        document.querySelectorAll(selector),
        (node) => node.closest(editable) === null,
      );
      // Keep only the outermost matches, walking ancestors instead of comparing
      // every pair: a long transcript has hundreds of these blocks.
      const allSet = new Set(all);
      const outer = all.filter((node) => {
        let parent = node.parentElement;
        while (parent !== null) {
          if (allSet.has(parent)) return false;
          parent = parent.parentElement;
        }
        return true;
      });
      const blocks = outer.filter((node) => clean(read(node)).length > 0);
      if (blocks.length > 0) {
        const last = blocks[blocks.length - 1];
        const collect = (nodes) => nodes
          .map((node) => clean(read(node)))
          .filter((text) => text.length > 0);
        // One message holds its blocks together; a sibling outside that holder
        // belongs to another answer and must not be joined in.
        const holder = typeof last.closest === 'function'
          ? last.closest('[class*="message"], [class*="chat-item"]')
          : null;
        const owns = (node) => (holder !== null && typeof holder.contains === 'function'
          ? holder.contains(node)
          : node.parentElement === last.parentElement);
        const parent = last.parentElement;
        if (parent !== null) {
          const siblings = Array.prototype.filter.call(
            parent.children,
            (child) => blocks.indexOf(child) >= 0 && owns(child),
          );
          if (siblings.length > 1) {
            const joined = collect(siblings);
            if (joined.length > 0) return joined.join('\n\n');
          }
        }
        // Second chance: every markdown block inside the same message holder.
        // A user bubble holds an editor, so it is never selected by this path.
        if (holder !== null && holder !== last && typeof holder.contains === 'function'
          && typeof holder.querySelector === 'function'
          && holder.querySelector(editable) === null) {
          const inside = blocks.filter((node) => holder.contains(node));
          if (inside.length > 1) {
            const joined = collect(inside);
            if (joined.length > 0) return joined.join('\n\n');
          }
        }
        return clean(read(last));
      }
      const fallback = Array.prototype.map.call(
        document.querySelectorAll('[class*="message"], [class*="chat-item"], [class*="answer"]'),
        (node) => {
          if (node.closest(editable) !== null) return '';
          // Never pull the user's own question back into the draft.
          if (typeof node.querySelector === 'function' && node.querySelector(editable) !== null) return '';
          return clean(read(node));
        },
      ).filter((text) => text.length > 0);
      return fallback.length > 0 ? fallback[fallback.length - 1] : '';
    }

    /**
     * Read the live guest's partition attribute, which the Browser tab must set
     * to the lease it was issued. A `persist:` prefix means the current process
     * is writing cookies to disk.
     * @returns 'patched', 'missing', or null when no guest is open.
     */
    function guestPartitionState() {
      const guest = findDeepSeekGuest();
      if (guest === null || typeof guest.getAttribute !== 'function') return null;
      const partition = String(guest.getAttribute('partition') || '');
      if (partition.length === 0) return null;
      return partition.startsWith('persist:') ? 'patched' : 'missing';
    }

    /**
     * Read the newest answer out of the DeepSeek panel.
     * @returns the answer text.
     */
    async function pullAnswer() {
      const guest = findDeepSeekGuest();
      if (guest === null) throw new Error('no open DeepSeek panel was found');
      if (typeof guest.executeJavaScript !== 'function') {
        throw new Error('this build embeds no guest view to read from');
      }
      const script = '(' + readDeepSeekAnswer.toString() + ')()';
      const raw = await guest.executeJavaScript(script, true);
      const text = typeof raw === 'string' ? raw.trim() : '';
      if (text.length === 0) throw new Error('the panel produced no readable text');
      return text;
    }

    /**
     * Insert text into this Session's draft as one undoable edit.
     * @param actions - the composer's standard `inputActions` prop.
     * @param text - the text to insert.
     */
    async function insertIntoDraft(actions, text) {
      if (actions == null || typeof actions.insertText !== 'function') {
        throw new Error('the composer exposes no insertText');
      }
      const span = typeof actions.captureInsertion === 'function'
        ? actions.captureInsertion()
        : undefined;
      const outcome = actions.insertText(text, span);
      const settled = outcome != null && typeof outcome.then === 'function'
        ? await outcome
        : outcome;
      if (settled === false) throw new Error('the draft refused the insertion');
    }

    /**
     * Normalize the guest's user agent once per tab.
     *
     * DeepSeek's client ships a hard-coded environment check:
     *
     *   navigator.userAgent.toLowerCase().includes('electron')
     *     || ('process' in window && window.process.type === 'renderer')
     *
     * Either hit renders its "abnormal usage environment" dialog. In this guest
     * `process` is not exposed (sandbox, contextIsolation, no node), so the user
     * agent is the only trigger. Dropping the `Electron/x.y.z` and application
     * tokens leaves a plain Chrome string that any embedded browser would send,
     * and removes an automation signal from the sign-in risk engine.
     * @returns the scan loop plus its disposer.
     */
    function createGuestTuner() {
      /** Guests already carrying this tuner's listeners. */
      const wired = new WeakSet();
      /** Guests whose user agent has already been normalized. */
      const tuned = new WeakSet();
      let disposed = false;

      /**
       * Rewrite the guest's user agent when it still advertises Electron.
       *
       * The guest is remembered as tuned only when the reload that makes the new
       * agent take effect actually happened; a page holding a draft keeps the old
       * agent for now and is retried on its next navigation.
       * @param guest - the DeepSeek `<webview>` element.
       * @returns 'applied' when a reload is pending, 'skip' otherwise.
       */
      const tuneUserAgent = (guest) => {
        if (tuned.has(guest)) return 'skip';
        let current = '';
        try {
          current = typeof guest.getUserAgent === 'function' ? String(guest.getUserAgent()) : '';
        } catch (error) {
          current = '';
        }
        if (current.length === 0) current = String(navigator.userAgent || '');
        if (/electron/i.test(current) === false) return 'skip';
        const cleaned = current
          .replace(/\s*Electron\/[\d.]+/gi, '')
          .replace(/\s*(?:DeepSeek Harness|DeepSeekHarness|dsh)\/[\d.]+/gi, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
        if (cleaned.length === 0) return 'skip';
        try {
          if (typeof guest.setUserAgent !== 'function') return 'skip';
          guest.setUserAgent(cleaned);
          return 'applied';
        } catch (error) {
          console.error('[deepseek-web] could not normalize the user agent:', error);
          return 'skip';
        }
      };

      /**
       * Reload the panel so a changed user agent takes effect.
       * @param guest - the DeepSeek `<webview>` element.
       */
      const reopen = async (guest) => {
        try {
          if (typeof guest.loadURL === 'function') await guest.loadURL(TARGET_URL);
          else guest.reload();
        } catch (error) {
          if (error === null || error === undefined || error.code !== 'ERR_ABORTED') {
            console.error('[deepseek-web] could not reload the panel:', error);
            try {
              guest.reload();
            } catch (ignored) {
              // Nothing else to try; the next navigation retries.
            }
          }
        }
      };

      /**
       * Reload only when the page holds no draft. A typed message is more
       * valuable than the user-agent fix, which simply waits for a page that
       * does not need one.
       * @param guest - the DeepSeek `<webview>` element.
       * @returns whether the reload happened.
       */
      const reopenWhenIdle = async (guest) => {
        let busy = false;
        try {
          busy = (await guest.executeJavaScript(
            '(() => { const zone = document.querySelector(\'[contenteditable="true"]\') || document.querySelector("textarea");'
              + ' return zone !== null && String(zone.innerText || zone.value || "").trim().length > 0; })()',
            false,
          )) === true;
        } catch (error) {
          busy = false;
        }
        if (busy) return false;
        await reopen(guest);
        return true;
      };

      /**
       * Tune one guest, never letting a rejection escape into a DOM listener.
       * @param guest - the DeepSeek `<webview>` element.
       */
      const fire = (guest) => {
        try {
          if (tuneUserAgent(guest) !== 'applied') return;
          reopenWhenIdle(guest).then((reloaded) => {
            if (reloaded) tuned.add(guest);
          }).catch(() => {});
        } catch (error) {
          console.error('[deepseek-web] guest tuner failed:', error);
        }
      };

      return {
        /** Wire one guest's navigation events, then tune it once. */
        scan() {
          if (disposed) return;
          const guest = findDeepSeekGuest();
          if (guest === null || wired.has(guest)) return;
          wired.add(guest);
          guest.addEventListener('dom-ready', () => fire(guest));
          guest.addEventListener('did-navigate', () => fire(guest));
          fire(guest);
        },
        /** Stop watching; already-wired guests keep their inert listeners. */
        dispose() {
          disposed = true;
        },
      };
    }

    /** Same-origin route the Host half serves for the partition patch. */
    const PATCH_URL = '/deepseek-web/patch';
    /** Request header the Host half requires before it writes. */
    const PATCH_HEADER = 'x-dsh-deepseek-web';

    /** Write token the Host half hands out with each state read. */
    let writeToken = '';

    /**
     * Read the archive's patch state from the Host half.
     * @returns the Host's state object, or an `unknown` state when unreachable.
     */
    async function fetchPatchState() {
      try {
        const response = await fetchWithTimeout(new URL(PATCH_URL, location.href).href, {
          method: 'GET',
          headers: { accept: 'application/json' },
          cache: 'no-store',
        }, 8000);
        const body = await readJson(response);
        if (body === null || typeof body !== 'object' || body.state === null) {
          throw new Error(`HTTP ${response.status}`);
        }
        if (typeof body.token === 'string') writeToken = body.token;
        return body.state;
      } catch (error) {
        return {
          state: 'unknown',
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    /**
     * Ask the Host half to rewrite the archive, then report the new state.
     * @returns the Host's state object after the attempt.
     */
    async function requestPatch() {
      try {
        const url = new URL(PATCH_URL, location.href);
        if (writeToken.length > 0) url.searchParams.set('token', writeToken);
        const response = await fetch(url.href, {
          method: 'POST',
          headers: { accept: 'application/json', [PATCH_HEADER]: 'patch' },
          cache: 'no-store',
        });
        const body = await readJson(response);
        if (body !== null && typeof body === 'object' && body.state != null) return body.state;
        return { state: 'unknown', error: `HTTP ${response.status}` };
      } catch (error) {
        return {
          state: 'unknown',
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    /**
     * The review checklist a fresh install starts from.
     *
     * The shape follows the design of Alibaba's open-source Open Code Review:
     * deterministic checks first (a fixed checklist per risk area), precision
     * before recall (a finding must be provable from the shown code), and a
     * fixed output format rather than free prose. The wording here is ours.
     */
    const DEFAULT_REVIEW_RULES = [
      '1. 正确性：边界条件、空值/未定义、类型转换、索引越界、相等比较、off-by-one。',
      '2. 资源与并发：未关闭的句柄、内存泄漏、竞态、异步未 await、重复提交。',
      '3. 错误处理：吞掉异常、丢失错误信息、失败后状态不一致、超时缺失。',
      '4. 安全：SQL/命令/路径注入、越权、密钥硬编码、直接使用不受信输入。',
      '5. 兼容与契约：破坏已有调用方、协议或字段变更、迁移遗漏。',
      '6. 性能：循环内 I/O、不必要的全量扫描、明显的 O(n²)。',
      '7. 测试缺口：改动的关键分支没有对应测试。',
    ].join('\n');

    /** Storage key for this plugin's user preferences. */
    const SETTINGS_KEY = 'dsh.deepseek-web.settings.v1';
    /** Every preference, with the value a fresh install starts from. */
    const DEFAULT_SETTINGS = Object.freeze({
      dotVisible: true,
      dotSize: 'md',
      halo: 'normal',
      breath: 'normal',
      followTheme: true,
      colorOk: '#22c55e',
      colorError: '#ef4444',
      colorUnknown: '#9ca3af',
      autoOpen: true,
      maxFileMB: 8,
      reviewMax: 3,
      reviewTemplate: 'json',
      reviewRules: DEFAULT_REVIEW_RULES,
    });
    /** The live preferences; replaced whole on every change. */
    let settings = { ...DEFAULT_SETTINGS };
    const settingsListeners = new Set();

    /** Clamp the file limit to what the Host route will serve. */
    function clampFileMb(value) {
      const mb = Math.round(Number(value));
      if (Number.isFinite(mb) === false) return DEFAULT_SETTINGS.maxFileMB;
      return Math.min(24, Math.max(1, mb));
    }

    /** Read the stored preferences once, keeping defaults for anything odd. */
    function loadSettings() {
      try {
        const raw = window.localStorage.getItem(SETTINGS_KEY);
        if (typeof raw !== 'string' || raw.length === 0) return;
        const stored = JSON.parse(raw);
        if (stored === null || typeof stored !== 'object') return;
        settings = { ...DEFAULT_SETTINGS, ...stored, maxFileMB: clampFileMb(stored.maxFileMB) };
      } catch (error) {
        console.error('[deepseek-web] could not read the settings:', error);
      }
    }

    /** Persist the preferences, ignoring a storage that refuses to write. */
    function writeSettings() {
      try {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error('[deepseek-web] could not save the settings:', error);
      }
    }

    /** Notify every subscriber, containing one listener's failure. */
    function publishSettings() {
      for (const listener of settingsListeners) {
        try {
          listener();
        } catch (error) {
          console.error('[deepseek-web] settings listener failed:', error);
        }
      }
    }

    /**
     * Change some preferences.
     * @param patch - the changed values.
     */
    function patchSettings(patch) {
      settings = { ...settings, ...patch };
      if (Object.prototype.hasOwnProperty.call(patch, 'maxFileMB')) settings.maxFileMB = clampFileMb(patch.maxFileMB);
      writeSettings();
      publishSettings();
    }

    /** Restore every preference to its default. */
    function resetSettings() {
      settings = { ...DEFAULT_SETTINGS };
      writeSettings();
      publishSettings();
    }

    /**
     * Subscribe to preference changes.
     * @param listener - called after every change.
     * @returns the unsubscribe function.
     */
    function subscribeSettings(listener) {
      settingsListeners.add(listener);
      return () => {
        settingsListeners.delete(listener);
      };
    }

    /**
     * Component-side view of the preferences.
     * @returns the current preferences, re-rendering on change.
     */
    function useSettings() {
      const [value, setValue] = React.useState(settings);
      React.useEffect(() => subscribeSettings(() => setValue(settings)), []);
      return value;
    }

    /** Largest file the bridge hands to the page, from the preference. */
    function maxDropBytes() {
      return clampFileMb(settings.maxFileMB) * 1024 * 1024;
    }

    /**
     * The fixed block of each output format: what the page must answer, and in
     * which shape. The checklist below it stays editable; this part does not.
     */
    const REVIEW_TEMPLATES = {
      compact: (max) => [
        `- 最多 ${max} 条，每条一行：问题 — 原因 — 改法`,
        '- 不复述代码，不写前言、不总结、不夸奖',
        '- 没有实质问题时只输出：无问题',
      ],
      json: (max) => [
        '- 只输出一个 ```json 代码块，不要任何其他文字：',
        '{"findings":[{"severity":"high|medium|low","problem":"…","reason":"…","fix":"…"}]}',
        `- 最多 ${max} 条；没有问题时输出 {"findings":[]}`,
      ],
      strict: (max) => [
        '- 只输出一个 ```json 代码块，不要任何其他文字：',
        '{"findings":[{"severity":"high|medium|low","problem":"…","reason":"…","fix":"…","evidence":"代码中的关键片段","confidence":0.0}]}',
        '- 只有 confidence ≥ 0.6 才写进 findings；更低的和拿不准的放进 "uncertain" 数组',
        `- 最多 ${max} 条；没有问题时输出 {"findings":[]}`,
      ],
    };

    /**
     * Build the message the review tab receives: the fixed format block, the
     * user's own checklist, the previous round, and the request the tool sent.
     * @param prompt - the review request from the tool.
     * @param previous - findings the last round already raised.
     * @returns the composed message.
     */
    function composeReviewPrompt(prompt, previous) {
      const max = Math.min(10, Math.max(1, Math.round(Number(settings.reviewMax) || 3)));
      const template = REVIEW_TEMPLATES[settings.reviewTemplate] ?? REVIEW_TEMPLATES.json;
      const rules = String(settings.reviewRules ?? '').trim();
      const lines = [
        '请以资深代码审查者的身份审查下面给出的内容。',
        '',
        '【输出格式】（固定要求，优先于其他说明）',
        ...template(max),
        '',
        '【判定标准】',
        '- 只写能从给出的代码直接推出、并能说明触发条件的问题',
        '- 不确定时标注「需确认」并说明缺哪些信息，不要猜测',
        '- 风格与命名不在本次范围内，除非会引发缺陷',
      ];
      const earlier = Array.isArray(previous) ? previous.filter((item) => typeof item === 'string' && item.length > 0) : [];
      if (earlier.length > 0) {
        lines.push(
          '',
          '【上一轮已提出的问题】逐条确认是否已修复（已修复 / 仍存在 / 已有变化），再补充新问题：',
          ...earlier.map((item, index) => `${index + 1}. ${item}`),
        );
      }
      if (rules.length > 0) lines.push('', '【审查重点】', rules);
      lines.push('', '【待审内容】', String(prompt ?? ''));
      return lines.join('\n');
    }

    /**
     * The status dot's colour for one patch phase.
     * @param phase - the patch state shown by the dot.
     * @param prefs - the current preferences.
     * @returns a CSS colour or a theme token expression.
     */
    function dotColorFor(phase, prefs) {
      const healthy = phase === 'patched';
      const broken = phase === 'missing' || phase === 'unsupported';
      if (prefs.followTheme === true) {
        if (healthy) return 'var(--dsw-alias-state-success-primary)';
        return broken ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-state-idle-primary)';
      }
      if (healthy) return prefs.colorOk;
      return broken ? prefs.colorError : prefs.colorUnknown;
    }

    /**
     * Build the sidebar-footer launcher bound to one client context.
     * @param ctx - the client plugin context owning the slot registration.
     * @returns a React component for `sidebar.footer.action`.
     */
    function createLauncher(ctx) {
      /**
       * Read one localized string, falling back to the key so a missing
       * dictionary entry never blanks the control.
       * @param key - dictionary key.
       * @returns the active locale's text.
       */
      const text = (key) => {
        try {
          const value = ctx.locale.bind(NS)(key);
          if (typeof value === 'string' && value.length > 0) return value;
        } catch (error) {
          console.error('[deepseek-web] locale read failed:', error);
        }
        return key;
      };

      return function DeepSeekWebAction(props) {
        const wide = props.wide === true;
        const [failed, setFailed] = React.useState(false);
        const [patch, setPatch] = React.useState({ phase: 'loading' });
        const [, setLocaleTick] = React.useState(0);
        /** When the launcher last asked for a tab, to absorb a double click. */
        const openingAt = React.useRef(0);

        // Rendered text must follow the active language without a reload.
        React.useEffect(() => ctx.locale.subscribe(() => setLocaleTick((n) => n + 1)), []);

        // A refused click explains itself for a few seconds, then quiets down.
        React.useEffect(() => {
          if (!failed) return undefined;
          const timer = setTimeout(() => setFailed(false), 6000);
          return () => clearTimeout(timer);
        }, [failed]);

        // The dot mirrors the archive, and falls back to the live guest's own
        // partition attribute when the Host route is not up yet (the Host half
        // only starts answering after a restart). A slow poll is enough: an
        // upgrade replaces the archive only from outside this process.
        React.useEffect(() => {
          let alive = true;
          const read = async () => {
            const live = guestPartitionState();
            const state = await fetchPatchState();
            if (!alive) return;
            if (typeof state.state === 'string' && state.state !== 'unknown') {
              setPatch({ phase: state.state, stale: live === 'missing' });
              return;
            }
            if (live !== null) {
              setPatch({ phase: live });
              return;
            }
            setPatch({ phase: 'indeterminate' });
          };
          read();
          const timer = setInterval(read, 20000);
          return () => {
            alive = false;
            clearInterval(timer);
          };
        }, []);

        /**
         * Reveal the DeepSeek page in the right Sidebar. The shipped Browser
         * tab type is reused on purpose: on Desktop it embeds a real guest
         * view, which is the only way to show a site that forbids framing.
         */
        const open = () => {
          try {
            const rightbar = ctx.get('sidebarRight');
            if (rightbar === undefined) throw new Error('the sidebarRight service is absent');
            // A live DeepSeek tab is already the destination: reveal it instead
            // of opening another instance of the multi-instance browser tab.
            if (findDeepSeekGuest() !== null) {
              if (typeof rightbar.isExpanded === 'function' && rightbar.isExpanded() === false) {
                rightbar.toggleExpanded();
              }
              setFailed(false);
              return;
            }
            // The guest appears only after the tab paints, so the second click of
            // a double click must not race the first one into a second tab.
            if (Date.now() - openingAt.current < 4000) return;
            openingAt.current = Date.now();
            rightbar.openTab(TAB_KIND, { params: { url: TARGET_URL } });
            setFailed(false);
          } catch (error) {
            console.error('[deepseek-web] could not open the panel:', error);
            setFailed(true);
          }
        };

        /**
         * Double click asks for another instance. The first click of the pair
         * has already opened one when none existed, so only a live guest makes
         * a second tab here.
         */
        const openAnother = () => {
          if (findDeepSeekGuest() === null) return;
          try {
            const rightbar = ctx.get('sidebarRight');
            if (rightbar === undefined) throw new Error('the sidebarRight service is absent');
            rightbar.openTab(TAB_KIND, { params: { url: TARGET_URL } });
            setFailed(false);
          } catch (error) {
            console.error('[deepseek-web] could not open another panel:', error);
            setFailed(true);
          }
        };

        /** Ask the Host half to rewrite the archive after an upgrade removed it. */
        const repair = async () => {
          if (patch.phase === 'applying') return;
          setPatch({ phase: 'applying' });
          await fetchPatchState();
          const state = await requestPatch();
          const phase = typeof state.state === 'string' ? state.state : 'unknown';
          setPatch({ phase, applied: phase === 'patched' });
        };

        // Only a missing statement is something this dot can repair; an
        // unreachable Host or an unknown archive shape is informational.
        const actionable = patch.phase === 'missing';
        const prefs = useSettings();

        const dotTitle = patch.phase === 'patched'
          ? text(patch.applied || patch.stale ? 'dot.appliedRestart' : 'dot.ok')
          : patch.phase === 'applying'
            ? text('dot.applying')
            : patch.phase === 'loading'
              ? text('dot.checking')
              : patch.phase === 'missing'
                ? text('dot.missing')
                : patch.phase === 'unsupported'
                  ? text('dot.unsupported')
                  : text('dot.pending');

        const dotColor = dotColorFor(patch.phase, prefs);
        const dotSize = prefs.dotSize === 'sm' ? '4px' : prefs.dotSize === 'lg' ? '8px' : '6px';
        const haloSize = prefs.halo === 'off' ? '0px' : prefs.halo === 'soft' ? '14px' : prefs.halo === 'strong' ? '20px' : '16px';
        const breath = prefs.breath === 'off' ? '0s' : prefs.breath === 'slow' ? '6s' : prefs.breath === 'fast' ? '2.6s' : '4.2s';

        const dot = h(actionable ? 'button' : 'span', {
          className: 'dsw-dot',
          type: actionable ? 'button' : undefined,
          'data-actionable': actionable ? 'true' : 'false',
          'data-phase': patch.phase,
          'data-breath': prefs.breath === 'off' ? 'off' : 'on',
          title: dotTitle,
          'aria-label': actionable ? dotTitle : undefined,
          'aria-hidden': actionable ? undefined : 'true',
          style: {
            '--dsw-dot-color': dotColor,
            '--dsw-dot-size': dotSize,
            '--dsw-halo': haloSize,
            '--dsw-breath': breath,
          },
          onClick: actionable ? repair : undefined,
        });

        return h('span', { className: 'dsw-cell' }, [
          h('button', {
            key: 'launcher',
            type: 'button',
            className: 'dsw-action',
            'data-narrow': wide ? 'false' : 'true',
            'data-phase': failed ? 'error' : 'idle',
            title: failed ? text('action.failed') : text('action.open') + ' · ' + text('action.openNew'),
            'aria-label': text('action.open'),
            onClick: open,
            onDoubleClick: openAnother,
          }, [bubbleGlyph(16), wide ? h('span', { key: 'label' }, text('action.label')) : null]),
          prefs.dotVisible ? dot : null,
        ]);
      };
    }

    /**
     * Build the composer control that copies the panel's newest answer into
     * the draft, bound to one client context.
     * @param ctx - the client plugin context owning the slot registration.
     * @returns a React component for `conversation.input.right`.
     */
    function createPull(ctx) {
      /**
       * Read one localized string, falling back to the key.
       * @param key - dictionary key.
       * @returns the active locale's text.
       */
      const text = (key) => {
        try {
          const value = ctx.locale.bind(NS)(key);
          if (typeof value === 'string' && value.length > 0) return value;
        } catch (error) {
          console.error('[deepseek-web] locale read failed:', error);
        }
        return key;
      };

      return function DeepSeekPull(props) {
        const [phase, setPhase] = React.useState('idle');
        const [, setLocaleTick] = React.useState(0);
        // The session directory resolves relative file mentions the UI shows.
        const cwd = props.useSessions((state) => state.byId[props.sessionId]?.cwd);

        React.useEffect(() => ctx.locale.subscribe(() => setLocaleTick((n) => n + 1)), []);

        React.useEffect(() => {
          sessionCwd = typeof cwd === 'string' ? cwd : '';
        }, [cwd]);

        // Success and failure both return to the resting state on their own.
        React.useEffect(() => {
          if (phase !== 'done' && phase !== 'error') return undefined;
          const timer = setTimeout(() => setPhase('idle'), 3500);
          return () => clearTimeout(timer);
        }, [phase]);

        const pull = async () => {
          if (phase === 'busy') return;
          setPhase('busy');
          try {
            const answer = await pullAnswer();
            await insertIntoDraft(props.inputActions, answer);
            setPhase('done');
          } catch (error) {
            console.error('[deepseek-web] could not pull the answer:', error);
            setPhase('error');
          }
        };

        const hint = phase === 'busy' ? text('pull.busy')
          : phase === 'done' ? text('pull.done')
            : phase === 'error' ? text('pull.failed')
              : text('pull.label');

        return h('button', {
          type: 'button',
          className: 'dsw-action',
          'data-narrow': 'true',
          'data-phase': phase,
          title: hint,
          'aria-label': hint,
          'aria-busy': phase === 'busy' ? 'true' : 'false',
          onClick: pull,
        }, pullGlyph(16));
      };
    }

    /** Current session directory, captured from the composer control for the
     * one visible session; multi-session layouts fall back to a live lookup. */
    let sessionCwd = '';
    /** File-like element a native drag started on, resolved only on a real drop. */
    let pendingDropElement = null;
    /** Installed by the drop-tracking effect so the bar can resolve by name. */
    let sendByNameRef = null;
    /** Whether the fallback session lookup has already warned. */
    let cwdWarned = false;

    /**
     * Read the visible session's directory from the client services, for the
     * case where the composer control has not published it yet.
     *
     * The snapshot fields are DSH-internal; a shape change degrades to an empty
     * string (relative references then fall back to by-name lookup), and the
     * warning fires once so the change is visible in the log.
     * @param ctx - the client plugin context.
     * @returns the absolute directory, or an empty string.
     */
    function readCwdFromContext(ctx) {
      try {
        const sessions = ctx.get('sessions');
        const list = sessions === undefined ? undefined : sessions.list;
        const snapshot = list === undefined ? undefined : list.getSnapshot();
        const rows = snapshot === undefined || snapshot === null ? {} : snapshot.byId ?? {};
        const visible = Object.values(rows).find((row) => (row?.retainedBy?.mainView ?? 0) > 0);
        if (visible !== undefined && typeof visible.cwd === 'string' && visible.cwd.length > 0) return visible.cwd;
      } catch (error) {
        if (cwdWarned === false) {
          cwdWarned = true;
          console.warn('[deepseek-web] session directory unavailable; relative references will not resolve', error);
        }
      }
      return '';
    }

    /**
     * Read one localized string outside a component, falling back to the key.
     * @param ctx - the client plugin context.
     * @param key - dictionary key.
     * @returns the active locale's text.
     */
    function dictText(ctx, key) {
      try {
        const value = ctx.locale.bind(NS)(key);
        if (typeof value === 'string' && value.length > 0) return value;
      } catch (error) {
        console.error('[deepseek-web] locale read failed:', error);
      }
      return key;
    }

    /** Live drop-bar state, shared by the document listeners and the overlay. */
    const dropState = {
      active: false,
      hover: false,
      phase: 'idle',
      noteKey: '',
      fileName: '',
      detail: '',
      listeners: new Set(),
    };

    /**
     * Merge one patch into the shared drop state and notify subscribers.
     * @param patch - fields to overwrite.
     */
    function patchDrop(patch) {
      Object.assign(dropState, patch);
      for (const listener of dropState.listeners) {
        try {
          listener();
        } catch (error) {
          console.error('[deepseek-web] drop listener failed:', error);
        }
      }
    }

    /** Read a snapshot of the drop state. */
    function readDrop() {
      return {
        active: dropState.active,
        hover: dropState.hover,
        phase: dropState.phase,
        noteKey: dropState.noteKey,
        fileName: dropState.fileName,
        detail: dropState.detail,
      };
    }

    /**
     * Encode bytes as base64 without overflowing the argument list.
     * @param bytes - the file content.
     * @returns the base64 string.
     */
    function bytesToBase64(bytes) {
      let binary = '';
      const step = 0x8000;
      for (let index = 0; index < bytes.length; index += step) {
        binary += String.fromCharCode.apply(null, bytes.subarray(index, index + step));
      }
      return btoa(binary);
    }

    /**
     * Guest-side script: hand one file to the page's own upload input, which is
     * exactly what clicking its attachment button does.
     * @param name - file name.
     * @param mime - content type.
     * @param base64 - file bytes.
     * @returns the guest-side script.
     */
    function fileInputScript(name, mime, base64) {
      const info = JSON.stringify({ name, type: mime });
      return '(() => { try {'
        + ' const bin = atob(' + JSON.stringify(base64) + ');'
        + ' const bytes = new Uint8Array(bin.length);'
        + ' for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);'
        + ' const info = ' + info + ';'
        + ' const transfer = new DataTransfer();'
        + ' transfer.items.add(new File([bytes], info.name, { type: info.type }));'
        + ' const inputs = Array.from(document.querySelectorAll(\'input[type="file"]\'));'
        + ' if (inputs.length > 0) {'
        + ' const input = inputs[inputs.length - 1];'
        + ' input.files = transfer.files;'
        + ' input.dispatchEvent(new Event("input", { bubbles: true }));'
        + ' input.dispatchEvent(new Event("change", { bubbles: true }));'
        + ' return "ok"; }'
        + ' const zone = document.querySelector(\'[contenteditable="true"]\') || document.querySelector("textarea");'
        + ' const target = zone === null ? null : (zone.closest("form") || zone.parentElement || zone);'
        + ' if (target === null) return "no-input";'
        + ' target.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: transfer }));'
        + ' return "drop-fallback";'
        + ' } catch (error) { return "error:" + (error && error.message ? error.message : error); } })()';
    }

    /** Same-origin route the Host half serves for one artifact's bytes. */
    const FILE_URL = '/deepseek-web/file';
    /** Host routes the review bridge polls. */
    const REVIEW_TASK_URL = '/deepseek-web/review/task';
    const REVIEW_RESULT_URL = '/deepseek-web/review/result';
    /** The guest opened for reviews, kept so a follow-up keeps its context. */
    let reviewGuest = null;
    /** Attributes an accessible file description may live on. */
    const DESCRIPTION_ATTRS = [
      'aria-description',
      'aria-label',
      'title',
      'data-path',
      'data-file-path',
      'data-absolute-path',
    ];

    /**
     * Whether one string looks like an absolute host path.
     *
     * POSIX paths need two segments and an extension, so a site route such as
     * `/api/v0/chat` never masquerades as a file.
     * @param value - candidate text.
     * @returns true for a drive path, a UNC path, or a POSIX file path.
     */
    function looksLikePath(value) {
      if (typeof value !== 'string' || value.length === 0 || value.length > 4096) return false;
      if (/[\n\r]/.test(value)) return false;
      if (/^(?:[A-Za-z]:[\\/]|\\\\)/.test(value)) return true;
      return /^\/[^/]+\/[^\n\r]*\.\w{1,8}$/.test(value);
    }

    /**
     * Turn any file reference the UI exposes into an absolute host path:
     * a plain path, a `:12`/`:12-30` suffixed mention, a `file:///` URL, or a
     * `dsh-resource://file/…` address.
     * @param value - candidate text.
     * @returns the path, or an empty string when it is not a file reference.
     */
    function normalizePath(value) {
      if (typeof value !== 'string') return '';
      let text = value.trim();
      if (text.length === 0 || text.length > 4096 || /[\n\r]/.test(text)) return '';
      if (/^dsh-resource:\/\//i.test(text)) {
        const rest = text.slice('dsh-resource://'.length);
        const cut = rest.indexOf('/');
        if (cut < 0) return '';
        text = rest.slice(cut + 1);
        try {
          text = decodeURIComponent(text);
        } catch (error) {
          // keep the raw form
        }
      } else if (/^file:\/\//i.test(text)) {
        try {
          const url = new URL(text);
          text = decodeURIComponent(url.pathname);
        } catch (error) {
          return '';
        }
        // Windows file URLs carry the drive letter as the first path segment;
        // POSIX ones already are a valid absolute path.
        if (/^\/[A-Za-z]:/.test(text)) text = text.slice(1).replace(/\//g, '\\');
      }
      // A markdown mention may carry a line anchor after the path.
      text = text.replace(/:(\d+)(?:[-–](\d+))?$/, '');
      text = text.trim();
      // A POSIX-looking string on a Windows session is a site route, not a file.
      if (text.startsWith('/') && separatorFor(sessionCwd) === '\\') return '';
      return looksLikePath(text) ? text : '';
    }

    /**
     * The separator an absolute directory uses.
     * @param directory - absolute directory.
     * @returns `\` for Windows paths, `/` otherwise.
     */
    function separatorFor(directory) {
      return /^(?:[A-Za-z]:|\\\\)/.test(String(directory)) ? '\\' : '/';
    }

    /**
     * Resolve a file reference to an absolute host path, including the relative
     * form a prose link or a tree row may carry.
     * @param value - candidate text, URL, or relative path.
     * @param allowSpaces - whether the value may contain spaces (link targets).
     * @returns the absolute path, or an empty string.
     */
    function resolvePath(value, allowSpaces = false) {
      const absolute = normalizePath(value);
      if (absolute.length > 0) return absolute;
      let text = String(value ?? '').trim();
      text = text.replace(/:(\d+)(?:[-–](\d+))?$/, '').trim();
      if (text.length === 0 || text.length > 512 || /[\n\r\t]/.test(text)) return '';
      if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(text)) return '';
      if (text.startsWith('#') || text.startsWith('?')) return '';
      // A rooted reference is absolute, so it is never joined onto the session.
      if (/^[\\/]/.test(text)) return '';
      // A relative reference that climbs out of the session is refused: the
      // bridge hands this path straight to the Host reader.
      if (/(?:^|[\\/])\.\.(?:[\\/]|$)/.test(text)) return '';
      // A relative reference is a bare path; only an explicit link target may
      // carry spaces, so prose is never mistaken for one.
      if (allowSpaces !== true && /\s/.test(text)) return '';
      // Only accept something that ends in an extension: a bare word or a
      // sentence must never become a path.
      if (/[\\/]$/.test(text) || /\.\w{1,8}$/.test(text) === false) return '';
      if (sessionCwd.length === 0) return '';
      const separator = separatorFor(sessionCwd);
      return sessionCwd.replace(/[\\/]+$/, '') + separator + text.replace(/^[\\/]+/, '');
    }

    /**
     * Last path segment, for the drop bar's label.
     * @param path - absolute path.
     * @returns the file name.
     */
    function baseNameOf(path) {
      const parts = String(path).split(/[\\/]/);
      return parts[parts.length - 1] || String(path);
    }

    /**
     * Read the absolute path an element describes, if any. Every attribute is
     * tried for an explicit path first, then for a relative reference, so a
     * relative title can never shadow an absolute address.
     * @param element - candidate element.
     * @returns the path, or an empty string.
     */
    function pathOf(element) {
      if (element === null || element === undefined) return '';
      if (typeof element.getAttribute !== 'function') return '';
      const values = [];
      for (const attribute of DESCRIPTION_ATTRS) {
        values.push({ value: element.getAttribute(attribute), explicit: false });
      }
      // Inline file mentions are links; images carry their file in `src`.
      values.push({ value: element.getAttribute('href'), explicit: true });
      values.push({ value: element.getAttribute('src'), explicit: true });
      // A long path is normally exposed through aria-describedby/labelledby,
      // pointing at a visually hidden element instead of at an attribute.
      for (const relation of ['aria-describedby', 'aria-labelledby']) {
        const described = element.getAttribute(relation);
        if (typeof described !== 'string' || described.length === 0) continue;
        for (const id of described.split(/\s+/)) {
          if (id.length === 0) continue;
          const owner = element.ownerDocument;
          const target = owner === undefined || owner === null ? null : owner.getElementById(id);
          if (target === null) continue;
          values.push({ value: String(target.textContent ?? '').slice(0, 4096), explicit: false });
        }
      }
      for (const entry of values) {
        const absolute = normalizePath(entry.value);
        if (absolute.length > 0) return absolute;
      }
      for (const entry of values) {
        const relative = resolvePath(entry.value, entry.explicit);
        if (relative.length > 0) return relative;
      }
      return '';
    }

    /** Elements that can plausibly stand for a file in the conversation. */
    const FILEISH_SELECTOR = 'a, img, code, button, [role="button"], [draggable="true"]';

    /**
     * Find the nearest file-like element around a node.
     * @param node - the pressed node.
     * @returns the element, or null.
     */
    function fileishOf(node) {
      if (typeof Element === 'undefined' || node instanceof Element === false) return null;
      let element = node;
      let depth = 0;
      while (element !== null && depth < 8) {
        if (typeof element.matches === 'function' && element.matches(FILEISH_SELECTOR)) return element;
        element = element.parentElement;
        depth += 1;
      }
      return null;
    }

    /**
     * Describe an element so a failed resolution can be reported.
     * @param element - the element to describe.
     * @returns a compact one-line summary.
     */
    function describeElement(element) {
      if (element === null || element === undefined) return 'none';
      const parts = [String(element.tagName || '?').toLowerCase()];
      const className = typeof element.className === 'string' ? element.className : '';
      if (className.length > 0) parts.push('.' + className.split(/\s+/).slice(0, 2).join('.'));
      for (const name of ['href', 'src', 'title', 'aria-label', 'aria-description', 'aria-describedby']) {
        const value = typeof element.getAttribute === 'function' ? element.getAttribute(name) : null;
        if (typeof value === 'string' && value.length > 0) {
          parts.push(name + '="' + value.slice(0, 120) + '"');
        }
      }
      return parts.join(' ');
    }

    /**
     * Find the nearest ancestor of a node that describes a file path.
     * @param node - the event target.
     * @returns the element and its path, or null.
     */
    function pathHostOf(node) {
      if (typeof Element === 'undefined' || node instanceof Element === false) return null;
      let element = node;
      let depth = 0;
      while (element !== null && depth < 12) {
        const path = pathOf(element);
        if (path.length > 0) return { element, path };
        element = element.parentElement;
        depth += 1;
      }
      return null;
    }

    /**
     * Collect the distinct file paths inside one container.
     *
     * A changed-files card puts its whole-card action in a header button that
     * names no file; pressing that header should still work, so the files listed
     * underneath it are gathered here.
     * @param root - the container to scan.
     * @param limit - stop after this many distinct paths.
     * @returns distinct absolute paths in document order.
     */
    function collectPaths(root, limit = 12) {
      const found = [];
      if (root === null || root === undefined || typeof root.querySelectorAll !== 'function') return found;
      const candidates = root.querySelectorAll(
        '[aria-description], [aria-label], [title], [data-path], [data-file-path], a[href], img[src]',
      );
      for (const node of candidates) {
        const path = pathOf(node);
        if (path.length > 0 && found.indexOf(path) < 0) found.push(path);
        if (found.length >= limit) break;
      }
      return found;
    }

    /**
     * Read one artifact's bytes through the Host half.
     * @param path - absolute host path.
     * @returns the file payload the guest script needs.
     */
    async function readHostFile(path) {
      const url = new URL(FILE_URL, location.href);
      if (writeToken.length > 0) url.searchParams.set('token', writeToken);
      url.searchParams.set('path', path);
      return requestFilePayload(url);
    }

    /**
     * Resolve one artifact by the file name the UI shows, inside the workspace.
     * @param name - exact file name.
     * @param root - absolute workspace directory.
     * @returns the file payload the guest script needs.
     */
    async function readHostFileByName(name, root) {
      const url = new URL(FILE_URL, location.href);
      if (writeToken.length > 0) url.searchParams.set('token', writeToken);
      url.searchParams.set('name', name);
      url.searchParams.set('root', root);
      return requestFilePayload(url);
    }

    /**
     * Read a JSON body, turning a non-2xx answer into a useful error instead of
     * a parse failure.
     * @param response - the fetch response.
     * @returns the parsed body.
     */
    async function readJson(response) {
      if (response.ok !== true) {
        let detail = '';
        try {
          detail = String(await response.text()).slice(0, 200);
        } catch (error) {
          detail = '';
        }
        throw new Error(`HTTP ${response.status}${detail.length > 0 ? ': ' + detail : ''}`);
      }
      return response.json();
    }

    /**
     * Ask the Host half for one artifact payload.
     * @param url - the fully built file route URL.
     * @returns the file payload.
     */
    async function requestFilePayload(url) {
      const response = await fetchWithTimeout(url.href, {
        method: 'GET',
        headers: { accept: 'application/json' },
        cache: 'no-store',
      }, 30000);
      const body = await readJson(response);
      if (body === null || typeof body !== 'object' || body.ok !== true || body.file == null) {
        throw new Error(body !== null && typeof body.error === 'string' ? body.error : `HTTP ${response.status}`);
      }
      return body.file;
    }

    /**
     * Ask the Host half for a pending review request.
     * @returns the request, or null when there is none.
     */
    async function fetchReviewTask() {
      try {
        // The write token normally arrives with the dot's first state read; a
        // review may be the first thing that needs it, so fetch it here.
        if (writeToken.length === 0) await fetchPatchState();
        const url = new URL(REVIEW_TASK_URL, location.href);
        if (writeToken.length > 0) url.searchParams.set('token', writeToken);
        const response = await fetchWithTimeout(url.href, { method: 'GET', headers: { accept: 'application/json' }, cache: 'no-store' }, 5000);
        const body = await readJson(response);
        if (body === null || typeof body !== 'object' || body.task == null) return null;
        const task = body.task;
        if (typeof task.id !== 'string' || typeof task.prompt !== 'string') return null;
        return {
          id: task.id,
          prompt: task.prompt,
          previous: Array.isArray(task.previous)
            ? task.previous.filter((item) => typeof item === 'string' && item.length > 0)
            : [],
          timeoutMs: typeof task.timeoutMs === 'number' ? task.timeoutMs : 90000,
        };
      } catch (error) {
        return null;
      }
    }

    /**
     * Hand one review answer back to the Host half.
     * @param id - the request it answers.
     * @param ok - whether the page produced an answer.
     * @param text - the answer text.
     * @param error - why it failed, when it did.
     */
    async function postReviewResult(id, ok, text, error) {
      const answer = typeof text === 'string' ? text : '';
      const reason = typeof error === 'string' ? error : '';
      try {
        if (writeToken.length === 0) await fetchPatchState();
        const url = new URL(REVIEW_RESULT_URL, location.href);
        if (writeToken.length > 0) url.searchParams.set('token', writeToken);
        const response = await fetchWithTimeout(url.href, {
          method: 'POST',
          headers: { accept: 'application/json', 'content-type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({ id, ok, text: answer, error: reason }),
        });
        const body = await response.json().catch(() => null);
        if (body !== null && body.ok === true) return;
        // The forwarder may have dropped the body; retry with the answer in the
        // query, truncated to a length a URL survives.
        const retry = new URL(REVIEW_RESULT_URL, location.href);
        if (writeToken.length > 0) retry.searchParams.set('token', writeToken);
        retry.searchParams.set('id', id);
        retry.searchParams.set('ok', ok ? 'true' : 'false');
        retry.searchParams.set('text', answer.slice(0, 6000));
        if (reason.length > 0) retry.searchParams.set('error', reason.slice(0, 400));
        await fetchWithTimeout(retry.href, { method: 'POST', cache: 'no-store' });
      } catch (error2) {
        console.error('[deepseek-web] could not post the review answer:', error2);
      }
    }

    /**
     * Fetch with a deadline, so a stalled page cannot hang the caller.
     * @param url - the URL to request.
     * @param options - fetch options.
     * @param timeoutMs - how long the request may take.
     * @returns the response.
     */
    async function fetchWithTimeout(url, options, timeoutMs = 8000) {
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      if (controller === null) return fetch(url, options);
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        return await fetch(url, { ...options, signal: controller.signal });
      } finally {
        clearTimeout(timer);
      }
    }

    /**
     * Runs inside the guest page: put the prompt into the composer.
     *
     * Typing has to go through the browser's own editing command, not just the
     * native value setter: the composer is a controlled React field, and a
     * value written behind its state is dropped at the next render — which is
     * exactly the "text appears, then the box empties" behaviour.
     * @param prompt - the text to send.
     * @returns JSON describing what the composer accepted.
     */
    function sendReviewScript(prompt) {
      return '(() => {'
        + ' const text = ' + JSON.stringify(prompt) + ';'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const all = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'));'
        + ' const zones = all.filter(visible);'
        + ' if (zones.length === 0) return JSON.stringify({ ok: "no-input", found: all.length });'
        + ' const zone = zones[zones.length - 1];'
        + ' const read = () => String(zone.value !== undefined ? zone.value : zone.innerText || "");'
        + ' zone.focus();'
        + ' if (zone.tagName === "TEXTAREA") zone.select();'
        + ' else document.execCommand("selectAll", false, null);'
        + ' document.execCommand("delete", false, null);'
        + ' let method = "exec";'
        + ' document.execCommand("insertText", false, text);'
        + ' let after = read().length;'
        + ' if (after === 0) {'
        + ' method = "setter";'
        + ' if (zone.tagName === "TEXTAREA") {'
        + ' const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;'
        + ' setter.call(zone, text);'
        + ' zone.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));'
        + ' } else {'
        + ' document.execCommand("selectAll", false, null);'
        + ' document.execCommand("insertText", false, text);'
        + ' }'
        + ' after = read().length;'
        + ' }'
        + ' return JSON.stringify({ ok: after > 0 ? "typed" : "empty", tag: zone.tagName, after, method, zones: zones.length });'
        + ' })()';
    }

    /**
     * Runs inside the guest page: the composer's current text, measured after
     * the page had a chance to re-render, plus how many editable zones exist.
     * @returns JSON with the visible zone count and the draft length.
     */
    function draftScript() {
      return '(() => {'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const zones = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'))'
        + ' .filter(visible);'
        + ' const zone = zones.length === 0 ? null : zones[zones.length - 1];'
        + ' const draft = zone === null ? -1 : String(zone.value !== undefined ? zone.value : zone.innerText || "").length;'
        + ' return JSON.stringify({ zones: zones.length, draft, tag: zone === null ? "" : zone.tagName });'
        + ' })()';
    }

    /**
     * Runs inside the guest page: press Enter in the composer.
     * @returns JSON describing what was pressed.
     */
    /**
     * Runs inside the guest page: press the composer's own send control.
     *
     * Clicking the button the page renders is what a person does; a synthetic
     * Enter only works when the field's own handler accepts it, and an
     * icon-only button carries no accessible name to match on, so the last
     * enabled button inside the composer is the fallback.
     * @returns JSON describing what was pressed.
     */
    function activateSendScript() {
      return '(() => {'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const zones = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'))'
        + ' .filter(visible);'
        + ' const zone = zones.length === 0 ? null : zones[zones.length - 1];'
        + ' if (zone === null) return JSON.stringify({ ok: "no-input" });'
        + ' zone.focus();'
        + ' const selector = \'button, [role="button"], [class*="ds-button"], [class*="send"], [class*="submit"]\';'
        + ' const usable = (node) => visible(node) && node.disabled !== true'
        + ' && node.getAttribute("aria-disabled") !== "true";'
        + ' const label = (node) => String((node.getAttribute("aria-label") || "") + " "'
        + ' + (node.getAttribute("title") || "") + " " + String(node.className || "")).trim();'
        // The composer's own container is the reliable neighbourhood: walk up
        // until an ancestor holds controls, then take the rightmost one by DOM
        // order (the send control closes the toolbar row).
        + ' let scope = zone;'
        + ' let local = [];'
        + ' for (let depth = 0; depth < 5 && scope !== null; depth += 1) {'
        + ' scope = scope.parentElement;'
        + ' if (scope === null) break;'
        + ' const found = Array.prototype.slice.call(scope.querySelectorAll(selector)).filter(usable);'
        + ' if (found.length > 0) { local = found; break; }'
        + ' }'
        + ' const pick = (list) => {'
        + ' const named = list.find((node) => /发送|send|submit/i.test(label(node)));'
        + ' if (named !== undefined) return named;'
        + ' const sendish = list.filter((node) => /send|submit/i.test(String(node.className || "")));'
        + ' if (sendish.length > 0) return sendish[sendish.length - 1];'
        + ' if (list.length === 0) return undefined;'
        + ' return list[list.length - 1];'
        + ' };'
        + ' let hit = pick(local);'
        + ' if (hit === undefined) {'
        + ' const box = zone.getBoundingClientRect();'
        + ' const near = Array.prototype.slice.call(document.querySelectorAll(selector)).filter((node) => {'
        + ' if (node === zone || usable(node) === false) return false;'
        + ' const rect = node.getBoundingClientRect();'
        + ' return rect.top + rect.height > box.top - 24 && rect.top < box.bottom + 160'
        + ' && rect.right > box.left - 24;'
        + ' });'
        + ' hit = pick(near);'
        + ' }'
        + ' if (hit !== undefined && hit !== null) {'
        + ' const rect = hit.getBoundingClientRect();'
        + ' hit.click();'
        + ' return JSON.stringify({ ok: "clicked", label: label(hit).slice(0, 30), local: local.length,'
        + ' at: Math.round(rect.right) + "," + Math.round(rect.top) });'
        + ' }'
        + ' for (const type of ["keydown", "keypress", "keyup"]) {'
        + ' zone.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true }));'
        + ' }'
        + ' return JSON.stringify({ ok: "enter", local: local.length });'
        + ' })()';
    }

    /**
     * Runs inside the guest page: how the conversation looks right now.
     * @returns JSON with the streaming flag and the last answer block's size.
     */
    function reviewStatusScript() {
      return '(() => {'
        + ' const visible = (node) => node !== null && typeof node.getBoundingClientRect === "function"'
        + ' && node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0;'
        // The stop control marks "still generating" — and it is a DIV.ds-button
        // in this UI, not a <button>, so match on the accessible label alone.
        + ' const stops = Array.prototype.slice.call(document.querySelectorAll('
        + ' \'[aria-label*="停止"], [aria-label*="Stop"], [aria-label*="stop"]\'))'
        + ' .filter((node) => visible(node));'
        + ' const boxes = Array.prototype.slice.call(document.querySelectorAll(\'[class*="ds-markdown"], [class*="markdown"]\'));'
        + ' const last = boxes.length === 0 ? null : boxes[boxes.length - 1];'
        + ' const text = last === null ? "" : String(last.textContent || "");'
        + ' const messages = document.querySelectorAll(\'[class*="message"]\').length;'
        + ' const bodyLen = String(document.body === null ? "" : document.body.innerText || "").length;'
        // Same composer choice as the typing scripts: the last visible field, not
        // the first textarea on the page.
        + ' const zones = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'))'
        + ' .filter(visible);'
        + ' const zone = zones.length === 0 ? null : zones[zones.length - 1];'
        + ' const draft = zone === null ? -1 : String(zone.value !== undefined ? zone.value : zone.innerText || "").length;'
        + ' const body = document.body === null ? "" : String(document.body.innerText || "");'
        + ' let auth = null;'
        + ' try { auth = String(localStorage.getItem("userToken") || "").length > 0; } catch (error) { auth = null; }'
        + ' return JSON.stringify({ busy: stops.length > 0, count: boxes.length, length: text.length, messages,'
        + ' bodyLen, draft, auth, url: String(location.href).slice(0, 120), title: String(document.title).slice(0, 60),'
        + ' snippet: body.slice(0, 160) });'
        + ' })()';
    }

    /**
     * Run one script inside the guest with a deadline.
     *
     * `executeJavaScript` never settles while the renderer is stalled (mid
     * navigation, frozen tab, crash), which would hang the whole review; the
     * deadline turns that into a caught error and lets the caller give up.
     * @param guest - the DeepSeek `<webview>` element.
     * @param script - the script to evaluate.
     * @param timeoutMs - how long the page may take.
     * @returns the script's value.
     */
    function evalIn(guest, script, timeoutMs = 15000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('the page stopped responding')), timeoutMs);
        Promise.resolve()
          .then(() => guest.executeJavaScript(script, true))
          .then((value) => {
            clearTimeout(timer);
            resolve(value);
          }, (error) => {
            clearTimeout(timer);
            reject(error);
          });
      });
    }

    /**
     * Wait until the review tab can accept text.
     * @param guest - the DeepSeek `<webview>` element.
     */
    async function waitForGuestReady(guest) {
      const deadline = Date.now() + 12000;
      while (Date.now() < deadline) {
        try {
          const ready = await evalIn(guest,
            '(() => document.readyState !== "loading" && (document.querySelector("textarea") !== null'
              + ' || document.querySelector(\'[contenteditable="true"]\') !== null))()',
          );
          if (ready === true) return;
        } catch (error) {
          // the page is still navigating
        }
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      throw new Error('the DeepSeek panel did not finish loading');
    }

    /**
     * Poll the page until the answer stops growing, then read it.
     * @param guest - the DeepSeek `<webview>` element.
     * @param baseline - the last answer size before the prompt was sent.
     * @param deadline - when to give up.
     * @returns the answer text.
     */
    async function waitForReviewAnswer(guest, baseline, deadline) {
      let lastSignature = '';
      let stable = 0;
      let last = null;
      // A JSON answer arrives after the model's reasoning block; without this
      // marker the first stable block would be the reasoning itself.
      const expectJson = settings.reviewTemplate !== 'compact';
      // With deep thinking on, the reasoning block streams and settles long
      // before the answer; only the answer block carries the JSON, so a waiting
      // loop must not stop at the first settled text.
      let fallbackAnswer = '';
      const progress = (status) => status.count > (baseline.count ?? 0)
        || status.length > (baseline.length ?? 0)
        || status.messages > (baseline.messages ?? 0)
        || status.bodyLen > (baseline.bodyLen ?? 0) + 40;
      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        let status;
        try {
          status = JSON.parse(String(await evalIn(guest, reviewStatusScript(), 8000)));
        } catch (error) {
          continue;
        }
        last = status;
        if (status.busy === true || progress(status) === false) {
          stable = 0;
          lastSignature = '';
          continue;
        }
        const signature = [status.count, status.length, status.messages, status.bodyLen].join(':');
        if (signature === lastSignature) {
          stable += 1;
          if (stable >= 3) {
            // Reading the answer can time out on a busy page; that is a retry,
            // not a reason to fail the whole review.
            let answer = '';
            try {
              answer = String(await evalIn(guest, '(' + String(readDeepSeekAnswer) + ')()', 8000));
            } catch (error) {
              stable = 0;
              continue;
            }
            if (answer.trim().length === 0) continue;
            // The reasoning block quotes the JSON skeleton too, so the marker
            // alone is not enough: strip a code fence before looking for it.
            const trimmed = answer.trim()
              .replace(/^```(?:json)?\s*/i, '')
              .replace(/```$/, '')
              .trim();
            const structured = /\{\s*"findings"\s*:/.test(trimmed);
            if (expectJson === false || structured === true) return answer;
            fallbackAnswer = answer;
            stable = 0;
          }
        } else {
          stable = 0;
          lastSignature = signature;
        }
      }
      // No JSON block arrived: return the last text rather than nothing, so the
      // card shows the prose instead of an empty result.
      if (fallbackAnswer.length > 0) return fallbackAnswer;
      throw new Error('no answer appeared; last page state ' + JSON.stringify(last));
    }

    /**
     * Runs inside the guest page: turn the "深度思考" toggle off.
     *
     * With thinking on, the reasoning block settles before the answer and is
     * indistinguishable from it by text alone. The toggle's on-state shows as a
     * different border/background from its inactive sibling ("智能搜索"), so the
     * decision compares the two and undoes a wrong guess.
     * @returns JSON describing what happened.
     */
    function calmThinkingScript() {
      return '(() => {'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const nodes = Array.prototype.slice.call(document.querySelectorAll('
        + ' \'button, [role="button"], [class*="ds-button"]\')).filter(visible);'
        + ' const find = (pattern) => nodes.find((node) => pattern.test(String(node.textContent || "")));'
        + ' const think = find(/深度思考/);'
        + ' if (think === undefined) return JSON.stringify({ ok: "missing" });'
        + ' const other = find(/智能搜索/);'
        + ' const style = (node) => { const computed = getComputedStyle(node);'
        + ' return computed.borderColor + "|" + computed.backgroundColor + "|" + computed.color; };'
        + ' const before = style(think);'
        + ' const reference = other === undefined ? "" : style(other);'
        + ' if (reference.length > 0 && before === reference) return JSON.stringify({ ok: "already-off" });'
        + ' think.click();'
        + ' const after = style(think);'
        + ' if (after === before) { think.click(); return JSON.stringify({ ok: "restored" }); }'
        + ' return JSON.stringify({ ok: "clicked" });'
        + ' })()';
    }

    /**
     * Runs inside the guest page: a structural summary of the conversation, for
     * diagnosing extraction against the live DOM (invoked with a `__dump__`
     * prompt and returned verbatim).
     * @returns JSON describing the blocks, composer and toggles.
     */
    function dumpScript() {
      return '(() => {'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const blocks = Array.prototype.slice.call(document.querySelectorAll('
        + ' \'[class*="ds-markdown"], [class*="markdown"]\')).map((node) => ({'
        + ' c: String(node.className).slice(0, 60),'
        + ' n: node.querySelectorAll("*").length,'
        + ' t: String(node.textContent || "").replace(/\\s+/g, " ").slice(0, 60) })).slice(-8);'
        + ' const zones = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'))'
        + ' .filter(visible).map((node) => ({ t: node.tagName, c: String(node.className).slice(0, 50),'
        + ' v: String(node.value !== undefined ? node.value : node.innerText || "").length }));'
        + ' const pills = Array.prototype.slice.call(document.querySelectorAll(\'button, [role="button"], [class*="ds-button"]\'))'
        + ' .filter(visible).filter((node) => /深度思考|智能搜索/.test(String(node.textContent || "")))'
        + ' .map((node) => { const computed = getComputedStyle(node);'
        + ' return { text: String(node.textContent || "").trim().slice(0, 12),'
        + ' border: computed.borderColor, bg: computed.backgroundColor, color: computed.color }; });'
        + ' const stops = Array.prototype.slice.call(document.querySelectorAll(\'[aria-label*="停止"], [aria-label*="Stop"]\'))'
        + ' .filter(visible).map((node) => String(node.getAttribute("aria-label") || "").slice(0, 20));'
        + ' return JSON.stringify({ url: String(location.href).slice(0, 100), blocks, zones, pills, stops });'
        + ' })()';
    }

    /**
     * Runs inside the guest page: a compact snapshot of the composer and the
     * controls around it, so a failed send can be diagnosed from the error.
     * @returns JSON with the composer box and nearby controls.
     */
    function probeScript() {
      return '(() => {'
        + ' const visible = (node) => { const box = node.getBoundingClientRect();'
        + ' return box.width > 0 && box.height > 0; };'
        + ' const zones = Array.prototype.slice.call(document.querySelectorAll(\'textarea, [contenteditable="true"]\'))'
        + ' .filter(visible);'
        + ' const zone = zones.length === 0 ? null : zones[zones.length - 1];'
        + ' const box = zone === null ? null : zone.getBoundingClientRect();'
        + ' const nodes = Array.prototype.slice.call(document.querySelectorAll('
        + ' \'button, [role="button"], [class*="send"], [class*="submit"]\')).filter(visible);'
        + ' const items = nodes.slice(0, 10).map((node) => { const rect = node.getBoundingClientRect();'
        + ' return { t: node.tagName, c: String(node.className).slice(0, 36),'
        + ' l: String(node.getAttribute("aria-label") || node.getAttribute("title") || "").slice(0, 20),'
        + ' x: Math.round(rect.right), y: Math.round(rect.top), d: node.disabled === true }; });'
        + ' return JSON.stringify({ zone: zone === null ? null : { t: zone.tagName, c: String(zone.className).slice(0, 36) },'
        + ' box: box === null ? null : { r: Math.round(box.right), t: Math.round(box.top) }, items });'
        + ' })()';
    }

    /**
     * The review tab: a dedicated chat, opened once and reused afterwards, so a
     * review never types into the conversation the user is having.
     * @param ctx - the client context, for the sidebar service.
     * @returns the guest, or null when no panel can be opened.
     */
    async function ensureReviewGuest(ctx) {
      if (reviewGuest !== null && reviewGuest.isConnected === true) {
        let address = '';
        try {
          address = typeof reviewGuest.getURL === 'function' ? String(reviewGuest.getURL()) : '';
        } catch (error) {
          address = '';
        }
        // A tab that navigated away is no longer the review chat. The host is
        // compared exactly: a substring test would accept evil.com/?chat.deepseek.com.
        let sameSite = false;
        if (address.length > 0) {
          try {
            sameSite = new URL(address).hostname === DEEPSEEK_HOST;
          } catch (error) {
            sameSite = false;
          }
        }
        if (sameSite === true) {
          // A tab can also survive as an element while its renderer is wedged;
          // one cheap probe decides whether it is still usable.
          try {
            const alive = await evalIn(
              reviewGuest,
              '(() => document.readyState === "complete" && !!(document.querySelector(\'textarea, [contenteditable="true"]\')))()',
              5000,
            );
            if (alive === true) return reviewGuest;
          } catch (error) {
            // fall through: open a fresh tab
          }
        }
        reviewGuest = null;
      }
      reviewGuest = null;
      // Reuse whatever DeepSeek view is already open before opening another:
      // a failed review used to leave a new tab behind on every attempt.
      const existing = findDeepSeekGuest();
      if (existing !== null) {
        reviewGuest = existing;
        return existing;
      }
      const known = new Set(Array.from(document.querySelectorAll('webview')));
      const rightbar = ctx.get('sidebarRight');
      if (rightbar === undefined) return findDeepSeekGuest();
      try {
        rightbar.openTab(TAB_KIND, { params: { url: TARGET_URL } });
      } catch (error) {
        console.error('[deepseek-web] could not open the review tab:', error);
        return findDeepSeekGuest();
      }
      const deadline = Date.now() + 10000;
      while (Date.now() < deadline) {
        const fresh = Array.from(document.querySelectorAll('webview')).find((node) => known.has(node) === false);
        if (fresh !== undefined) {
          reviewGuest = fresh;
          return fresh;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      return findDeepSeekGuest();
    }

    /**
     * Drive one review request through the page and answer the Host half.
     * @param ctx - the client context.
     * @param task - the request the Host half queued.
     */
    async function runReview(ctx, task) {
      /** Each step the driver took, so a failure names where it stopped. */
      const steps = [];
      let guestRef = null;
      // The budget covers the whole call, preamble included: the answer wait must
      // end before the Host's own deadline, not `timeoutMs` after this point.
      const started = Date.now();
      try {
        const guest = await ensureReviewGuest(ctx);
        guestRef = guest;
        if (guest === null) throw new Error('open the DeepSeek panel first: no review tab could be opened');
        await waitForGuestReady(guest);
        steps.push('ready');
        // Diagnostic channel: a `__dump__` request returns the page structure
        // instead of sending anything, so extraction can be fixed against the
        // real DOM rather than guessed.
        if (String(task.prompt).startsWith('__dump__')) {
          const dump = String(await evalIn(guest, dumpScript(), 8000));
          const extracted = String(await evalIn(guest, '(' + String(readDeepSeekAnswer) + ')()', 8000));
          await postReviewResult(task.id, true, dump + ' EXTRACT=' + JSON.stringify(extracted.slice(0, 240)), '');
          return;
        }
        let baseline = { count: 0, length: 0, messages: 0, bodyLen: 0 };
        try {
          baseline = JSON.parse(String(await evalIn(guest, reviewStatusScript(), 8000)));
        } catch (error) {
          baseline = { count: 0, length: 0, messages: 0, bodyLen: 0 };
        }
        // A page without a composer is the only stale case worth reloading: an
        // empty welcome screen is a valid place to type, and reloading it would
        // race the send (the reload lands right after Enter and wipes it).
        if ((baseline.draft ?? -1) < 0 && typeof guest.reload === 'function') {
          try {
            guest.reload();
          } catch (error) {
            // the next readiness wait reports it
          }
          await waitForGuestReady(guest);
          try {
            baseline = JSON.parse(String(await evalIn(guest, reviewStatusScript(), 8000)));
          } catch (error) {
            baseline = { count: 0, length: 0, messages: 0, bodyLen: 0 };
          }
        }
        const message = composeReviewPrompt(task.prompt, task.previous);
        // Reasoning would be extracted instead of the answer; switch it off for
        // this chat when the toggle is on.
        const thinking = JSON.parse(String(await evalIn(guest, calmThinkingScript(), 8000)));
        steps.push('think:' + String(thinking === null || thinking.ok === undefined ? '?' : thinking.ok));
        const typed = JSON.parse(String(await evalIn(guest, sendReviewScript(message), 20000)));
        if (typed === null || typed.ok !== 'typed') {
          throw new Error('the DeepSeek composer did not accept the text: ' + JSON.stringify(typed));
        }
        steps.push('typed:' + typed.tag + ':' + typed.after + ':' + typed.method);
        await new Promise((resolve) => setTimeout(resolve, 600));
        let draft = JSON.parse(String(await evalIn(guest, draftScript(), 8000)));
        steps.push('draft:' + draft.draft + '/' + draft.zones);
        if ((draft.draft ?? 0) === 0) {
          // A controlled composer can drop a value written through the native
          // setter; type once more and re-measure before blaming the send.
          await evalIn(guest, sendReviewScript(message), 20000);
          await new Promise((resolve) => setTimeout(resolve, 600));
          draft = JSON.parse(String(await evalIn(guest, draftScript(), 8000)));
          steps.push('redraft:' + draft.draft);
        }
        if ((draft.draft ?? 0) === 0) {
          throw new Error('the DeepSeek composer dropped the text: ' + JSON.stringify({ typed, draft }));
        }
        const activated = JSON.parse(String(await evalIn(guest, activateSendScript(), 8000)));
        steps.push('send:' + String(activated === null || activated.ok === undefined ? '?' : activated.ok));
        // A large prompt takes the SPA a while to hand off, so give the send
        // eight seconds to show any sign of life before pressing anything again.
        let began = false;
        let lastStatus = null;
        const probeUntil = Date.now() + 8000;
        while (Date.now() < probeUntil && began === false) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          try {
            lastStatus = JSON.parse(String(await evalIn(guest, reviewStatusScript(), 8000)));
            began = lastStatus.busy === true
              || lastStatus.count > (baseline.count ?? 0)
              || lastStatus.length > (baseline.length ?? 0)
              || lastStatus.messages > (baseline.messages ?? 0)
              || lastStatus.bodyLen > (baseline.bodyLen ?? 0) + 40;
          } catch (error) {
            began = false;
          }
        }
        if (began === false) {
          // Only press again when the text is still sitting in the composer: a
          // cleared composer means the page consumed the message, and another
          // click would either do nothing or send a second copy.
          let after = { draft: 0 };
          try {
            after = JSON.parse(String(await evalIn(guest, draftScript(), 8000)));
          } catch (error) {
            after = { draft: 0 };
          }
          if ((after.draft ?? 0) > 0) {
            const again = JSON.parse(String(await evalIn(guest, activateSendScript(), 8000)));
            steps.push('retry:' + String(again === null || again.ok === undefined ? '?' : again.ok));
            await new Promise((resolve) => setTimeout(resolve, 1500));
          } else {
            steps.push('cleared');
          }
        }
        const text = await waitForReviewAnswer(guest, baseline, started + task.timeoutMs);
        await postReviewResult(task.id, true, text, '');
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        let detail = steps.length === 0 ? reason : reason + ' [' + steps.join(' | ') + ']';
        if (guestRef !== null) {
          try {
            detail += ' :: ' + String(await evalIn(guestRef, probeScript(), 5000)).slice(0, 600);
          } catch (error2) {
            detail += ' :: probe failed';
          }
        }
        console.error('[deepseek-web] review failed:', detail);
        // A tab that stalled or crashed is not trustworthy for the next call.
        reviewGuest = null;
        await postReviewResult(task.id, false, '', detail);
      }
    }

    /**
     * Read the file name an element shows, when it is nothing but a name.
     * The stem accepts any letters — a Chinese file name such as `简历.pdf` has
     * to work — while path separators and characters a file name cannot hold
     * are rejected, so a sentence is still refused.
     * @param element - the file-like element.
     * @returns the name, or an empty string.
     */
    function nameFromElement(element) {
      if (element === null || element === undefined) return '';
      const bare = /^[^\s/\\:*?"<>|][^/\\:*?"<>|]*\.\w{1,8}$/u;
      const text = String(element.textContent ?? '').trim();
      if (text.length > 0 && text.length <= 120 && bare.test(text)) return text;
      const title = typeof element.getAttribute === 'function' ? element.getAttribute('title') : null;
      if (typeof title === 'string' && title.trim().length <= 120 && bare.test(title.trim())) return title.trim();
      return '';
    }

    /**
     * Wait until the DeepSeek guest exists and can accept script.
     * @param timeoutMs - how long to wait.
     * @returns the guest element, or null.
     */
    async function waitForGuest(timeoutMs) {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const guest = findDeepSeekGuest();
        if (guest !== null) return guest;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      return null;
    }

    /**
     * Open the panel if needed, then hand every payload to its upload input.
     * @param ctx - the client context, for the sidebar service.
     * @param payloads - `{ name, type, base64 }` items.
     */
    async function sendPayloadsToPanel(ctx, payloads) {
      if (payloads.length === 0) throw new Error('nothing was dropped');
      // Only open a tab when there is nothing to receive the file. The browser
      // tab type is multi-instance, so calling openTab again on an open panel
      // would spawn a second DeepSeek tab and drop the file into the new one.
      let guest = findDeepSeekGuest();
      if (guest === null) {
        // The user may have chosen to keep the panel closed; a send then has
        // nowhere to land, so say that instead of opening a tab they refused.
        if (settings.autoOpen === false) {
          throw new Error('the DeepSeek panel is closed and auto-open is off');
        }
        const rightbar = ctx.get('sidebarRight');
        if (rightbar !== undefined) {
          try {
            rightbar.openTab(TAB_KIND, { params: { url: TARGET_URL } });
          } catch (error) {
            console.error('[deepseek-web] could not open the panel for a drop:', error);
          }
        }
        guest = await waitForGuest(15000);
      }
      if (guest === null) throw new Error('the DeepSeek panel is not open');
      for (const payload of payloads) {
        const outcome = await guest.executeJavaScript(
          fileInputScript(payload.name, payload.type, payload.base64),
          true,
        );
        if (outcome !== 'ok' && outcome !== 'drop-fallback') throw new Error(String(outcome));
      }
    }

    /**
     * Send dropped `File` objects.
     * @param ctx - the client context.
     * @param files - dropped files.
     */
    async function sendFilesToPanel(ctx, files) {
      const payloads = [];
      for (const file of files) {
        if (file.size > maxDropBytes()) {
          throw new Error(`the file is larger than ${Math.round(maxDropBytes() / 1024 / 1024)} MB`);
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        payloads.push({
          name: file.name,
          type: file.type || 'application/octet-stream',
          base64: bytesToBase64(bytes),
        });
      }
      await sendPayloadsToPanel(ctx, payloads);
    }

    /**
     * Send one artifact addressed by its host path.
     * @param ctx - the client context.
     * @param path - absolute host path.
     */
    /**
     * Refuse a payload larger than the bridge will hand to the page.
     * @param file - the Host payload.
     * @returns the same payload.
     */
    function assertPayloadSize(file) {
      if (typeof file.size === 'number' && file.size > maxDropBytes()) {
        throw new Error(`${file.name} is larger than ${Math.round(maxDropBytes() / 1024 / 1024)} MB`);
      }
      return file;
    }

    /**
     * Send one artifact addressed by its host path.
     * @param ctx - the client context.
     * @param path - absolute host path.
     */
    async function sendPathToPanel(ctx, rawPath) {
      const path = resolvePath(rawPath);
      if (path.length === 0) throw new Error('that reference is not a readable file path');
      const file = assertPayloadSize(await readHostFile(path));
      await sendPayloadsToPanel(ctx, [file]);
    }

    /**
     * Send several artifacts by path — the whole set a card lists.
     * @param ctx - the client context.
     * @param paths - absolute host paths.
     */
    async function sendPathsToPanel(ctx, paths) {
      const payloads = [];
      for (const path of paths) payloads.push(assertPayloadSize(await readHostFile(path)));
      await sendPayloadsToPanel(ctx, payloads);
    }

    /**
     * Build the settings page for this plugin, bound to one client context.
     * @param ctx - the client plugin context owning the slot registration.
     * @returns a React component for `settings.section`.
     */
    function createSettings(ctx) {
      const text = (key) => dictText(ctx, key);

      /** One segmented choice; every option is a real button. */
      const segmented = (options, active, onPick) => h('div', { className: 'dsw-seg', role: 'group' }, options.map((option) => h('button', {
        key: option.value,
        type: 'button',
        'data-on': active === option.value ? 'true' : 'false',
        'aria-pressed': active === option.value ? 'true' : 'false',
        onClick: () => onPick(option.value),
      }, text(option.label))));

      /** One on/off switch, exposed as a switch rather than a checkbox. */
      const toggle = (value, onChange, labelKey) => h('button', {
        className: 'dsw-switch',
        type: 'button',
        role: 'switch',
        'aria-checked': value ? 'true' : 'false',
        'aria-label': text(labelKey),
        onClick: () => onChange(!value),
      });

      /** One labelled preference row. */
      const row = (labelKey, hintKey, control) => h('div', { className: 'dsw-set-row', key: labelKey }, [
        h('div', { key: 'text' }, [
          h('div', { className: 'dsw-set-label', key: 'label' }, text(labelKey)),
          h('div', { className: 'dsw-set-hint', key: 'hint' }, text(hintKey)),
        ]),
        h('div', { className: 'dsw-set-control', key: 'control' }, control),
      ]);

      /** One colour picker. */
      const color = (value, onChange, labelKey) => h('input', {
        className: 'dsw-color',
        type: 'color',
        value,
        'aria-label': text(labelKey),
        title: text(labelKey),
        onChange: (event) => onChange(event.target.value),
      });

      return function DeepSeekSettingsPage() {
        const prefs = useSettings();
        const [, setLocaleTick] = React.useState(0);
        // Labels come from dictText at render time; without this the page keeps
        // the language it was mounted with.
        React.useEffect(() => ctx.locale.subscribe(() => setLocaleTick((n) => n + 1)), []);
        return h('div', { className: 'dsw-set' }, [
          h('h2', { className: 'dsw-set-title', key: 'title' }, text('set.title')),
          h('p', { className: 'dsw-set-lead', key: 'lead' }, text('set.lead')),

          h('div', { className: 'dsw-set-group', key: 'group-dot' }, text('set.groupDot')),
          row('set.dotVisible', 'set.dotVisibleHint',
            toggle(prefs.dotVisible, (value) => patchSettings({ dotVisible: value }), 'set.dotVisible')),
          row('set.dotSize', 'set.dotSizeHint', segmented([
            { value: 'sm', label: 'set.sizeSm' },
            { value: 'md', label: 'set.sizeMd' },
            { value: 'lg', label: 'set.sizeLg' },
          ], prefs.dotSize, (value) => patchSettings({ dotSize: value }))),
          row('set.halo', 'set.haloHint', segmented([
            { value: 'off', label: 'set.haloOff' },
            { value: 'soft', label: 'set.haloSoft' },
            { value: 'normal', label: 'set.haloNormal' },
            { value: 'strong', label: 'set.haloStrong' },
          ], prefs.halo, (value) => patchSettings({ halo: value }))),
          row('set.breath', 'set.breathHint', segmented([
            { value: 'off', label: 'set.breathOff' },
            { value: 'slow', label: 'set.breathSlow' },
            { value: 'normal', label: 'set.breathNormal' },
            { value: 'fast', label: 'set.breathFast' },
          ], prefs.breath, (value) => patchSettings({ breath: value }))),
          row('set.followTheme', 'set.followThemeHint',
            toggle(prefs.followTheme, (value) => patchSettings({ followTheme: value }), 'set.followTheme')),
          prefs.followTheme ? null : row('set.colors', 'set.colorsHint', h('div', { className: 'dsw-set-control' }, [
            color(prefs.colorOk, (value) => patchSettings({ colorOk: value }), 'set.colorOk'),
            color(prefs.colorError, (value) => patchSettings({ colorError: value }), 'set.colorError'),
            color(prefs.colorUnknown, (value) => patchSettings({ colorUnknown: value }), 'set.colorUnknown'),
          ])),

          h('div', { className: 'dsw-set-group', key: 'group-panel' }, text('set.groupPanel')),
          row('set.autoOpen', 'set.autoOpenHint',
            toggle(prefs.autoOpen, (value) => patchSettings({ autoOpen: value }), 'set.autoOpen')),
          row('set.maxFile', 'set.maxFileHint', h('input', {
            className: 'dsw-number',
            type: 'number',
            min: 1,
            max: 24,
            step: 1,
            value: String(prefs.maxFileMB),
            'aria-label': text('set.maxFile'),
            onChange: (event) => patchSettings({ maxFileMB: event.target.value }),
          })),

          h('div', { className: 'dsw-set-group', key: 'group-review' }, text('set.groupReview')),
          row('set.reviewTemplate', 'set.reviewTemplateHint', segmented([
            { value: 'compact', label: 'set.tplCompact' },
            { value: 'json', label: 'set.tplJson' },
            { value: 'strict', label: 'set.tplStrict' },
          ], prefs.reviewTemplate, (value) => patchSettings({ reviewTemplate: value }))),
          h('div', { className: 'dsw-set-block', key: 'review-rules' }, [
            h('div', { className: 'dsw-set-label', key: 'label' }, text('set.reviewRules')),
            h('div', { className: 'dsw-set-hint', key: 'hint' }, text('set.reviewRulesHint')),
            h('textarea', {
              key: 'input',
              className: 'dsw-textarea',
              rows: 7,
              spellCheck: false,
              value: String(prefs.reviewRules ?? ''),
              'aria-label': text('set.reviewRules'),
              onChange: (event) => patchSettings({ reviewRules: event.target.value }),
            }),
          ]),
          row('set.reviewMax', 'set.reviewMaxHint', h('input', {
            className: 'dsw-number',
            type: 'number',
            min: 1,
            max: 10,
            step: 1,
            value: String(prefs.reviewMax),
            'aria-label': text('set.reviewMax'),
            onChange: (event) => patchSettings({ reviewMax: event.target.value }),
          })),
          row('set.reviewReset', 'set.reviewResetHint', h('button', {
            className: 'dsw-reset',
            type: 'button',
            style: { marginTop: '0' },
            onClick: () => patchSettings({ reviewRules: DEFAULT_REVIEW_RULES, reviewMax: 3 }),
          }, text('set.reviewReset'))),

          h('button', {
            className: 'dsw-reset',
            type: 'button',
            key: 'reset',
            onClick: resetSettings,
          }, text('set.reset')),
        ]);
      };
    }

    /**
     * Build the conversation card for a `web_review` call: one row per finding,
     * each ticked off as it gets fixed.
     * @param ctx - the client plugin context.
     * @returns a React component for `tool.call.toolview` keyed by `web_review`.
     */
    function createReviewCard(ctx) {
      const text = (key) => dictText(ctx, key);
      const storeKey = (callId) => 'dsw.review.done.' + callId;

      /** Read the ticked findings for one call. */
      const readDone = (callId) => {
        try {
          const raw = window.localStorage.getItem(storeKey(callId));
          const list = JSON.parse(raw === null ? '[]' : raw);
          return new Set(Array.isArray(list) ? list.filter((item) => typeof item === 'number') : []);
        } catch (error) {
          return new Set();
        }
      };

      /** Persist the ticked findings for one call. */
      const writeDone = (callId, done) => {
        try {
          window.localStorage.setItem(storeKey(callId), JSON.stringify([...done]));
        } catch (error) {
          // storage may be unavailable
        }
      };

      /** Pull the structured value out of whichever shape the card receives. */
      const valueOf = (props) => {
        const block = props.block === undefined || props.block === null ? {} : props.block;
        const candidates = [block.value, block.result === undefined ? undefined : block.result.value];
        for (const candidate of candidates) {
          if (candidate !== null && candidate !== undefined && typeof candidate === 'object'
            && Array.isArray(candidate.findings)) return candidate;
        }
        return null;
      };

      /** The plain answer, for a run that returned prose. */
      const answerOf = (props, value) => {
        if (value !== null && value !== undefined && typeof value.report === 'string') return value.report.trim();
        const block = props.block === undefined || props.block === null ? {} : props.block;
        const content = block.result === undefined ? block.content : block.result.content;
        if (Array.isArray(content)) {
          return content
            .filter((item) => item !== null && typeof item === 'object' && typeof item.text === 'string')
            .map((item) => item.text)
            .join('\n')
            .trim();
        }
        return '';
      };

      return function DeepSeekReviewCard(input) {
        const props = input === undefined || input === null ? {} : input;
        const callId = String(props.callId ?? '');
        const [done, setDone] = React.useState(() => readDone(callId));
        const [, setLocaleTick] = React.useState(0);
        React.useEffect(() => {
          setDone(readDone(callId));
        }, [callId]);
        React.useEffect(() => ctx.locale.subscribe(() => setLocaleTick((n) => n + 1)), []);
        const value = valueOf(props);
        const findings = value !== null && Array.isArray(value.findings) ? value.findings : [];
        const running = props.phase !== 'result';
        const failed = props.block !== undefined && props.block !== null && props.block.isError === true;
        const answer = answerOf(props, value);
        const ticked = findings.reduce((count, finding, index) => count + (done.has(index) ? 1 : 0), 0);
        const toggle = (index) => {
          const next = new Set(done);
          if (next.has(index)) next.delete(index);
          else next.add(index);
          setDone(next);
          writeDone(callId, next);
        };
        const head = h('div', { className: 'dsw-review-head', key: 'head' }, [
          h('span', { className: 'dsw-review-title', key: 'title' }, text('review.title')),
          value !== null && value.cached === true
            ? h('span', { className: 'dsw-sev', key: 'cached' }, text('review.cached'))
            : null,
          h('span', { className: 'dsw-review-count', key: 'count' }, running === true
            ? text('review.running')
            : failed === true
              ? text('review.failed')
              : findings.length === 0
                ? text('review.clean')
                : `${text('review.progress')} ${ticked}/${findings.length}`),
        ]);
        const rows = findings.map((finding, index) => h('div', {
          className: 'dsw-review-row',
          key: 'f' + index,
          'data-done': done.has(index) ? 'true' : 'false',
        }, [
          h('button', {
            key: 'check',
            type: 'button',
            role: 'checkbox',
            className: 'dsw-review-check',
            'aria-checked': done.has(index) ? 'true' : 'false',
            'aria-label': text('review.tick'),
            onClick: () => toggle(index),
          }),
          h('div', { className: 'dsw-review-body', key: 'body' }, [
            h('div', { className: 'dsw-review-problem', key: 'problem' }, [
              h('span', {
                className: 'dsw-sev',
                key: 'sev',
                'data-sev': String(finding.severity ?? 'medium'),
              }, String(finding.severity ?? 'medium')),
              ' ' + String(finding.problem ?? ''),
            ]),
            finding.reason === undefined ? null : h('div', { className: 'dsw-review-meta', key: 'reason' }, String(finding.reason)),
            finding.fix === undefined ? null : h('div', { className: 'dsw-review-meta', key: 'fix' }, '→ ' + String(finding.fix)),
          ]),
        ]));
        const fallback = findings.length === 0 && running === false && answer.length > 0
          ? h('div', { className: 'dsw-review-meta', key: 'answer' }, answer.slice(0, 600))
          : null;
        return h('div', { className: 'dsw-review' }, [head, ...rows, fallback]);
      };
    }

    /**
     * Build the overlay bar that receives a file drag and feeds the panel.
     * @param ctx - the client plugin context owning the slot registration.
     * @returns a React component for `shell.overlay`.
     */
    function createDropBar(ctx) {
      /**
       * Read one localized string, falling back to the key.
       * @param key - dictionary key.
       * @returns the active locale's text.
       */
      const text = (key) => {
        try {
          const value = ctx.locale.bind(NS)(key);
          if (typeof value === 'string' && value.length > 0) return value;
        } catch (error) {
          console.error('[deepseek-web] locale read failed:', error);
        }
        return key;
      };

      return function DeepSeekDropBar() {
        const [state, setState] = React.useState(readDrop());
        const [, setLocaleTick] = React.useState(0);

        React.useEffect(() => {
          const listener = () => setState(readDrop());
          dropState.listeners.add(listener);
          return () => {
            dropState.listeners.delete(listener);
          };
        }, []);

        React.useEffect(() => ctx.locale.subscribe(() => setLocaleTick((n) => n + 1)), []);

        if (!state.active) return null;

        const message = state.phase === 'busy' ? text('drop.busy')
          : state.phase === 'done' ? text('drop.done')
            : state.noteKey.length > 0
              ? text(state.noteKey) + (state.detail.length > 0 ? ' — ' + state.detail : '')
              : state.phase === 'failed' ? text('drop.failed')
                : state.fileName.length > 0 ? text('drop.release') + ' ' + state.fileName
                  : text('drop.hint');

        const settle = () => {
          setTimeout(() => patchDrop({
            active: false,
            hover: false,
            phase: 'idle',
            noteKey: '',
            detail: '',
          }), 2500);
        };

        const handleDrop = async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const transfer = event.dataTransfer;
          const files = Array.from(transfer?.files ?? []);
          /** First non-empty line of a multi-valued transfer field. */
          const firstLine = (value) => String(value ?? '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .find((line) => line.length > 0) ?? '';
          const path = files.length > 0 ? '' : (
            resolvePath(transfer?.getData('application/x-dsh-artifact'))
            || resolvePath(firstLine(transfer?.getData('text/uri-list')))
            || resolvePath(transfer?.getData('text/plain'))
          );
          if (files.length === 0 && path.length === 0) {
            // A native drag from a chip that only shows a name: the element is
            // remembered at dragstart, and the name is resolved here — after the
            // user actually dropped on the bar, never on the way.
            const element = pendingDropElement;
            pendingDropElement = null;
            if (element !== null && typeof sendByNameRef === 'function') {
              patchDrop({ active: true, phase: 'busy', noteKey: '', hover: false });
              // sendByName owns the bar from here, including failure reporting.
              sendByNameRef(element);
              return;
            }
            patchDrop({ phase: 'idle', noteKey: 'drop.nofile', hover: false });
            settle();
            return;
          }
          patchDrop({ phase: 'busy', noteKey: '', hover: false });
          try {
            if (files.length > 0) await sendFilesToPanel(ctx, files);
            else await sendPathToPanel(ctx, path);
            patchDrop({ phase: 'done', noteKey: '' });
          } catch (error) {
            console.error('[deepseek-web] drop failed:', error);
            patchDrop({ phase: 'failed', noteKey: '', detail: error instanceof Error ? error.message : String(error) });
          }
          settle();
        };

        return h('div', {
          className: 'dsw-drop',
          'data-hover': state.hover ? 'true' : 'false',
          'data-phase': state.phase,
          title: state.detail.length > 0 ? state.detail : undefined,
          onDragOver: (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.dataTransfer !== null) event.dataTransfer.dropEffect = 'copy';
            if (state.hover === false) patchDrop({ hover: true });
          },
          onDragLeave: () => patchDrop({ hover: false }),
          onDrop: handleDrop,
        }, [
          h('span', { key: 'mark', className: 'dsw-drop-mark' }),
          h('span', { key: 'text' }, message),
        ]);
      };
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, DICTS), 'deepseek-web: dictionaries');
        ctx.effect(() => installStyles(), 'deepseek-web: styles');
        loadSettings();
        ctx.effect(() => {
          const tuner = createGuestTuner();
          const timer = setInterval(tuner.scan, 2000);
          tuner.scan();
          return () => {
            clearInterval(timer);
            tuner.dispose();
          };
        }, 'deepseek-web: guest tuner');
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'deepseek-web',
          order: 10,
        }, createLauncher(ctx)));
        ctx.slots.inject('conversation.input.right', () => ctx.slots.register({
          name: 'conversation.input.right',
          id: 'deepseek-web-pull',
          order: 10,
        }, createPull(ctx)));
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'deepseek-web-drop',
          order: 50,
        }, createDropBar(ctx)));
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'deepseek-web',
          order: 30,
          label: () => dictText(ctx, 'set.nav'),
        }, createSettings(ctx)));
        ctx.slots.inject('tool.call.toolview', () => ctx.slots.register({
          name: 'tool.call.toolview',
          key: 'web_review',
        }, createReviewCard(ctx)));
        ctx.effect(() => {
          if (typeof document === 'undefined') return () => {};
          /** Path read from the element a drag started on, cleared when it ends. */
          let dragPathHint = '';
          /** Whether the drag in flight can be turned into a file for the page. */
          const carriesArtifact = (event) => {
            const types = event.dataTransfer?.types;
            if (types === undefined || types === null) return false;
            const list = Array.from(types);
            if (list.includes('Files') || list.includes('application/x-dsh-artifact')) return true;
            // Inline file mentions are links: Chromium drags their address.
            if (dragPathHint.length === 0) return false;
            return list.includes('text/uri-list') || list.includes('text/plain');
          };
          const onOver = (event) => {
            if (carriesArtifact(event) && dropState.active === false) {
              patchDrop({ active: true, phase: 'idle', noteKey: '' });
            }
          };
          const onLeave = (event) => {
            if (event.relatedTarget === null) patchDrop({ active: false, hover: false });
          };
          /**
           * Keep the phase on a real drop (the bar shows done or failed), reset it
           * only when the drag ended without one.
           * @param event - the drop or dragend event.
           */
          const onEnd = (event) => {
            dragPathHint = '';
            const dropped = event !== undefined && event.type === 'drop';
            // A drop is consumed by the bar, which reads the remembered element;
            // only a drag that ended without one clears it here.
            if (!dropped) pendingDropElement = null;
            window.setTimeout(() => {
              pendingDropElement = null;
              // A send in flight owns the bar until it settles on its own.
              if (dropState.phase === 'busy') return;
              patchDrop({
                active: false,
                hover: false,
                phase: dropped ? dropState.phase : 'idle',
                noteKey: '',
                fileName: '',
                detail: dropped ? dropState.detail : '',
              });
            }, 3000);
          };
          /**
           * Conversation cards are interactive buttons, so a native HTML5 drag
           * never starts from them. Pressing and moving is enough instead: the
           * path is read on press, and releasing over the bar sends it.
           */
          let candidate = null;
          let dragging = false;
          const cancel = () => {
            candidate = null;
            dragging = false;
            if (dropState.active) patchDrop({ active: false, hover: false, phase: 'idle', noteKey: '', fileName: '', detail: '' });
          };
          /**
           * Report an element that looked like a file but exposed no path, and
           * copy its shape to the clipboard so the mismatch can be diagnosed.
           * @param element - the file-like element.
           */
          const reportNoPath = (element, reason) => {
            const detail = describeElement(element) + (typeof reason === 'string' && reason.length > 0 ? ' · ' + reason : '');
            try {
              if (typeof navigator !== 'undefined' && navigator.clipboard !== undefined) {
                navigator.clipboard.writeText('deepseek-web drag: ' + detail).catch(() => {});
              }
            } catch (error) {
              // clipboard may be unavailable
            }
            patchDrop({ active: true, hover: false, phase: 'failed', noteKey: 'drop.nopath', detail, fileName: '' });
            window.setTimeout(() => {
              patchDrop({ active: false, hover: false, phase: 'idle', noteKey: '', detail: '', fileName: '' });
            }, 4000);
          };
          /**
           * Resolve an element that shows only a file name under the workspace.
           * @param element - the file-like element.
           */
          const sendByName = async (element) => {
            const name = nameFromElement(element);
            const root = sessionCwd.length > 0 ? sessionCwd : readCwdFromContext(ctx);
            if (name.length === 0 || root.length === 0) {
              reportNoPath(
                element,
                name.length === 0 ? 'no file name on that element' : 'no session directory is known',
              );
              return;
            }
            patchDrop({ active: true, hover: false, phase: 'busy', noteKey: '', fileName: name, detail: '' });
            try {
              const file = await readHostFileByName(name, root);
              await sendPayloadsToPanel(ctx, [file]);
              patchDrop({ phase: 'done', fileName: '' });
            } catch (error) {
              console.error('[deepseek-web] name lookup failed:', error);
              reportNoPath(element, error instanceof Error ? error.message : String(error));
            }
            window.setTimeout(() => {
              patchDrop({ active: false, hover: false, phase: 'idle', noteKey: '', detail: '', fileName: '' });
            }, 2500);
          };
          sendByNameRef = (element) => {
            void sendByName(element);
          };
          const onMouseDown = (event) => {
            if (event.button !== 0) return;
            if (sessionCwd.length === 0) sessionCwd = readCwdFromContext(ctx);
            const host = pathHostOf(event.target);
            const fileish = host === null ? fileishOf(event.target) : null;
            if (host === null && fileish === null) {
              candidate = null;
              dragPathHint = '';
              return;
            }
            // A card's header button names no file; the rows underneath it do.
            let paths = host === null ? [] : [host.path];
            if (paths.length === 0 && fileish !== null) {
              let scope = fileish.parentElement;
              for (let depth = 0; scope !== null && depth < 4 && paths.length === 0; depth += 1) {
                paths = collectPaths(scope);
                scope = scope.parentElement;
              }
            }
            candidate = {
              paths,
              x: event.clientX,
              y: event.clientY,
              fileish,
            };
            dragging = false;
            dragPathHint = paths.length === 1 ? paths[0] : '';
          };
          /**
           * Moving only announces the candidate. Nothing is sent here: a drag
           * that ends anywhere but the bar must never hand a file to the page.
           */
          const onMouseMove = (event) => {
            if (candidate === null || dragging) return;
            if (Math.abs(event.clientX - candidate.x) + Math.abs(event.clientY - candidate.y) < 8) return;
            dragging = true;
            const label = candidate.paths.length === 1
              ? baseNameOf(candidate.paths[0])
              : candidate.paths.length > 1
                ? candidate.paths.length + ' ' + dictText(ctx, 'drop.files')
                : (candidate.fileish === null ? '' : nameFromElement(candidate.fileish));
            patchDrop({ active: true, hover: false, phase: 'idle', noteKey: '', fileName: label, detail: '' });
          };
          const overBar = (x, y) => {
            const element = document.elementFromPoint(x, y);
            if (element === null || typeof element.closest !== 'function') return false;
            return element.closest('.dsw-drop') !== null;
          };
          /** The only place a pointer drag releases a file. */
          const onMouseUp = (event) => {
            const moved = dragging;
            const picked = candidate;
            candidate = null;
            dragging = false;
            if (moved === false || picked === null) return;
            if (overBar(event.clientX, event.clientY) === false) {
              patchDrop({ active: false, hover: false, phase: 'idle', fileName: '', detail: '' });
              return;
            }
            // Swallow the click the card would receive right after this drag.
            const swallow = (clickEvent) => {
              clickEvent.preventDefault();
              clickEvent.stopPropagation();
            };
            document.addEventListener('click', swallow, true);
            window.setTimeout(() => document.removeEventListener('click', swallow, true), 150);
            if (picked.paths.length > 0) {
              const many = picked.paths.length > 1;
              const label = many
                ? picked.paths.length + ' ' + dictText(ctx, 'drop.files')
                : baseNameOf(picked.paths[0]);
              patchDrop({ phase: 'busy', fileName: label });
              const work = many ? sendPathsToPanel(ctx, picked.paths) : sendPathToPanel(ctx, picked.paths[0]);
              work.then(() => {
                patchDrop({ phase: 'done', fileName: '' });
              }, (error) => {
                console.error('[deepseek-web] card drag failed:', error);
                patchDrop({
                  phase: 'failed',
                  fileName: '',
                  detail: error instanceof Error ? error.message : String(error),
                });
              }).then(() => {
                window.setTimeout(() => {
                  patchDrop({ active: false, hover: false, phase: 'idle', noteKey: '', fileName: '', detail: '' });
                }, 2500);
              });
              return;
            }
            if (picked.fileish !== null) {
              patchDrop({
                active: true,
                hover: false,
                phase: 'busy',
                noteKey: '',
                fileName: nameFromElement(picked.fileish),
                detail: '',
              });
              void sendByName(picked.fileish);
            }
          };
          const onKeyDown = (event) => {
            if (event.key === 'Escape' && dragging) cancel();
          };
          /**
           * A native drag that starts on a file-like element without a readable
           * path only remembers the element; the bar resolves its name after the
           * user actually drops on it.
           */
          const onDragStart = (event) => {
            if (dragPathHint.length > 0) return;
            const element = fileishOf(event.target);
            if (element === null) return;
            const href = typeof element.getAttribute === 'function' ? element.getAttribute('href') : null;
            if (typeof href === 'string' && /^https?:/i.test(href)) return;
            pendingDropElement = element;
            const label = nameFromElement(element);
            patchDrop({
              active: true,
              hover: false,
              phase: 'idle',
              noteKey: '',
              fileName: label,
              detail: '',
            });
          };
          document.addEventListener('dragover', onOver, true);
          document.addEventListener('dragleave', onLeave, true);
          document.addEventListener('drop', onEnd, true);
          document.addEventListener('dragend', onEnd, true);
          document.addEventListener('dragstart', onDragStart, true);
          document.addEventListener('mousedown', onMouseDown, true);
          document.addEventListener('mousemove', onMouseMove, true);
          document.addEventListener('mouseup', onMouseUp, true);
          document.addEventListener('keydown', onKeyDown, true);
          return () => {
            document.removeEventListener('dragover', onOver, true);
            document.removeEventListener('dragleave', onLeave, true);
            document.removeEventListener('drop', onEnd, true);
            document.removeEventListener('dragend', onEnd, true);
            document.removeEventListener('dragstart', onDragStart, true);
            document.removeEventListener('mousedown', onMouseDown, true);
            document.removeEventListener('mousemove', onMouseMove, true);
            document.removeEventListener('mouseup', onMouseUp, true);
            document.removeEventListener('keydown', onKeyDown, true);
            pendingDropElement = null;
            sendByNameRef = null;
            cancel();
          };
        }, 'deepseek-web: drop tracking');
        ctx.effect(() => {
          if (typeof document === 'undefined') return () => {};
          let stopped = false;
          let running = false;
          let handled = '';
          const tick = async () => {
            if (stopped || running) return;
            const task = await fetchReviewTask();
            if (task === null || task.id === handled) return;
            handled = task.id;
            running = true;
            try {
              await runReview(ctx, task);
            } finally {
              running = false;
            }
          };
          const timer = setInterval(() => {
            void tick();
          }, 1200);
          return () => {
            stopped = true;
            clearInterval(timer);
          };
        }, 'deepseek-web: review runner');
      },
    };
  },
});
