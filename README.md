# 开发工具集

## 工具集

- [Favicon 生成器](tools/favicon.html)
- [OpenCC 转换](tools/opencc.html)
- [时间戳转换](tools/timestamp.html)
- [Base64 编码/解码](tools/base64.html)
- [JSON 格式化](tools/json.html)
- [颜色选择器](tools/color.html)
- [URL 编解码](tools/url-encoder.html)
- [UUID 生成](tools/uuid-generator.html)

### 待扩展实现的工具

- Markdown 预览
- 图片压缩
- 二维码生成
- Hash 计算 (MD5/SHA)
- 正则表达式测试
- CSS 美化
- JWT 解析

## 项目结构

dev-toolkit/
├── index.html
├── tools/
│   ├── favicon.html
│   ├── opencc.html
│   ├── timestamp.html
│   ├── base64.html
│   ├── json.html
│   └── color.html
├── assets/
│   ├── css/
│   │   ├── common.css      # 公共样式
│   │   └── tool.css        # 工具页面样式
│   └── js/
│       ├── common.js       # 公共脚本
│       └── i18n.js         # 国际化
└── README.md
