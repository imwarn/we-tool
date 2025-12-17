/**
 * Dev Toolkit - 国际化支持
 */

const i18nData = {
    'zh-CN': {
        // 通用
        'common.copy': '复制',
        'common.download': '下载',
        'common.clear': '清空',
        'common.reset': '重置',
        'common.confirm': '确认',
        'common.cancel': '取消',
        'common.close': '关闭',
        'common.save': '保存',
        'common.loading': '加载中...',
        'common.success': '操作成功！',
        'common.error': '操作失败！',
        'common.back': '返回首页',
        
        // 导航
        'nav.home': '开发者工具箱',
        
        // 首页
        'home.title': '开发者工具箱',
        'home.subtitle': '简洁、快速、实用的在线开发工具集合',
        
        // 工具
        'tool.opencc.title': '中文简繁转换',
        'tool.opencc.desc': '支持简体、繁体、台湾、香港等多种转换模式',
        'tool.timestamp.title': '时间戳转换',
        'tool.timestamp.desc': 'Unix、ISO、UTC 等多种时间格式互转',
        'tool.favicon.title': 'Favicon 生成器',
        'tool.favicon.desc': '支持图片上传、文字、Emoji，多尺寸导出',
        'tool.base64.title': 'Base64 编解码',
        'tool.base64.desc': '文本和图片的 Base64 编码解码工具',
        'tool.json.title': 'JSON 格式化',
        'tool.json.desc': '格式化、压缩、验证 JSON 数据',
        'tool.color.title': '颜色转换',
        'tool.color.desc': 'HEX、RGB、HSL 等颜色格式互转',
        
        // 徽章
        'badge.popular': '热门',
        'badge.new': '新',
        'badge.enhanced': '增强版',
        
        // 页脚
        'footer.author': 'imWarn',
        'footer.made': '制作的小玩具',
        'footer.github': 'GitHub',
        'footer.color': '配色方案'
    },
    'zh-TW': {
        'common.copy': '複製',
        'common.download': '下載',
        'common.clear': '清空',
        'common.reset': '重置',
        'common.confirm': '確認',
        'common.cancel': '取消',
        'common.close': '關閉',
        'common.save': '儲存',
        'common.loading': '載入中...',
        'common.success': '操作成功！',
        'common.error': '操作失敗！',
        'common.back': '返回首頁',
        
        'nav.home': '開發者工具箱',
        
        'home.title': '開發者工具箱',
        'home.subtitle': '簡潔、快速、實用的線上開發工具集合',
        
        'tool.opencc.title': '中文簡繁轉換',
        'tool.opencc.desc': '支援簡體、繁體、臺灣、香港等多種轉換模式',
        'tool.timestamp.title': '時間戳轉換',
        'tool.timestamp.desc': 'Unix、ISO、UTC 等多種時間格式互轉',
        'tool.favicon.title': 'Favicon 產生器',
        'tool.favicon.desc': '支援圖片上傳、文字、Emoji，多尺寸匯出',
        'tool.base64.title': 'Base64 編解碼',
        'tool.base64.desc': '文字和圖片的 Base64 編碼解碼工具',
        'tool.json.title': 'JSON 格式化',
        'tool.json.desc': '格式化、壓縮、驗證 JSON 資料',
        'tool.color.title': '顏色轉換',
        'tool.color.desc': 'HEX、RGB、HSL 等顏色格式互轉',
        
        'badge.popular': '熱門',
        'badge.new': '新',
        'badge.enhanced': '增強版',
        
        'footer.author': 'imWarn',
        'footer.made': '制作的小玩具',
        'footer.github': 'GitHub',
        'footer.color': '配色方案'
    },
    'en': {
        'common.copy': 'Copy',
        'common.download': 'Download',
        'common.clear': 'Clear',
        'common.reset': 'Reset',
        'common.confirm': 'Confirm',
        'common.cancel': 'Cancel',
        'common.close': 'Close',
        'common.save': 'Save',
        'common.loading': 'Loading...',
        'common.success': 'Success!',
        'common.error': 'Error!',
        'common.back': 'Back to Home',
        
        'nav.home': 'Dev Toolkit',
        
        'home.title': 'Developer Toolkit',
        'home.subtitle': 'Simple, Fast, and Practical Online Developer Tools',
        
        'tool.opencc.title': 'Chinese Converter',
        'tool.opencc.desc': 'Support Simplified, Traditional, Taiwan, Hong Kong conversion',
        'tool.timestamp.title': 'Timestamp Converter',
        'tool.timestamp.desc': 'Convert between Unix, ISO, UTC and more formats',
        'tool.favicon.title': 'Favicon Generator',
        'tool.favicon.desc': 'Upload images, text, Emoji with multi-size export',
        'tool.base64.title': 'Base64 Encoder',
        'tool.base64.desc': 'Encode and decode text and images to Base64',
        'tool.json.title': 'JSON Formatter',
        'tool.json.desc': 'Format, compress, and validate JSON data',
        'tool.color.title': 'Color Converter',
        'tool.color.desc': 'Convert between HEX, RGB, HSL color formats',
        
        'badge.popular': 'Popular',
        'badge.new': 'New',
        'badge.enhanced': 'Enhanced',
        
        'footer.author': 'imWarn',
        'footer.made': 'Made something useful',
        'footer.github': 'GitHub',
        'footer.color': 'Color Scheme'
    }
};

// 国际化管理器
const I18n = {
    currentLang: 'zh-CN',
    
    // 初始化
    init() {
        // 从 localStorage 读取语言设置
        this.currentLang = localStorage.getItem('toolkit-lang') || 'zh-CN';
        this.applyLanguage(this.currentLang);
        this.initLanguageSwitcher();
    },
    
    // 切换语言
    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('toolkit-lang', lang);
        this.applyLanguage(lang);
        
        // 更新按钮状态
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    },
    
    // 应用语言
    applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const text = this.t(key, lang);
            if (text) {
                el.textContent = text;
            }
        });
        
        // 更新 HTML lang 属性
        document.documentElement.lang = lang;
    },
    
    // 获取翻译
    t(key, lang = this.currentLang) {
        return i18nData[lang]?.[key] || i18nData['zh-CN'][key] || key;
    },
    
    // 初始化语言切换器
    initLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.dataset.lang);
            });
            
            // 设置初始状态
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
});

// 导出到全局
window.I18n = I18n;