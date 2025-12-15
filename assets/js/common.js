/**
 * Dev Toolkit - 公共 JavaScript
 * 包含：Toast、工具函数、通用方法等
 */

// ========== Toast 提示 ==========
const Toast = {
    show(message, type = 'info', duration = 3000) {
        let toast = document.getElementById('toast');
        
        // 如果不存在，创建一个
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            toast.innerHTML = `
                <span id="toastIcon">✓</span>
                <span id="toastText"></span>
            `;
            document.body.appendChild(toast);
        }

        const toastText = document.getElementById('toastText');
        const toastIcon = document.getElementById('toastIcon');
        
        // 设置图标
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        toastIcon.textContent = icons[type] || icons.info;

        // 设置消息
        toastText.textContent = message;

        // 设置样式
        toast.className = 'toast show ' + type;

        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    success(message, duration) {
        this.show(message, 'success', duration);
    },

    error(message, duration) {
        this.show(message, 'error', duration);
    },

    warning(message, duration) {
        this.show(message, 'warning', duration);
    },

    info(message, duration) {
        this.show(message, 'info', duration);
    }
};

// ========== 复制到剪贴板 ==========
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            Toast.success('已复制到剪贴板！');
            return true;
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                Toast.success('已复制到剪贴板！');
                return true;
            } catch (err) {
                Toast.error('复制失败，请手动复制');
                return false;
            } finally {
                textArea.remove();
            }
        }
    } catch (err) {
        Toast.error('复制失败：' + err.message);
        return false;
    }
}

// ========== 下载文件 ==========
function downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    Toast.success(`已下载 ${filename}！`);
}

// ========== 防抖函数 ==========
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== 节流函数 ==========
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== 格式化文件大小 ==========
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

// ========== 格式化时间 ==========
function formatTime(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const second = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// ========== Tab 切换 ==========
function switchTab(tabName, event) {
    // 移除所有激活状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // 激活当前 tab
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    const targetContent = document.getElementById(`tab-${tabName}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// ========== 本地存储 ==========
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }
};

// ========== 验证函数 ==========
const Validator = {
    isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    isURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    isJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    },

    isHexColor(color) {
        return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
    },

    isEmpty(value) {
        return value === null || value === undefined || value === '' || 
               (Array.isArray(value) && value.length === 0) ||
               (typeof value === 'object' && Object.keys(value).length === 0);
    }
};

// ========== 导出全局对象 ==========
window.DevToolkit = {
    Toast,
    copyToClipboard,
    downloadFile,
    debounce,
    throttle,
    formatFileSize,
    formatTime,
    switchTab,
    Storage,
    Validator
};

// ========== 页面加载完成 ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛠️ Dev Toolkit Loaded');
    
    // 添加复制按钮到代码块
    document.querySelectorAll('.code-block').forEach(block => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制';
        btn.onclick = () => {
            const code = block.querySelector('pre')?.textContent || block.textContent;
            copyToClipboard(code);
        };
        block.style.position = 'relative';
        block.appendChild(btn);
    });
});