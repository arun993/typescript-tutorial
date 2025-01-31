# 非常简单的脚本

感谢 [jacobmtucker](https://x.com/jacobmtucker) 提供代码，感谢 [0xGareeb](https://x.com/Arun__993) 提供指南。

---

## 使用环境
- **操作系统**: Ubuntu 22.04 或更高版本  
- **Node.js**: 脚本会自动配置环境，若版本低于 18，请手动升级。

---

## 操作步骤

### 1. 下载脚本
从以下任一来源下载脚本：
- GitHub  
- 作者网站  

执行命令：
```bash
wget https://www.tokrich.com/story/story.sh
2. 赋予脚本执行权限
bash
复制
chmod +x Story.sh
3. 运行脚本
bash
复制
./Story.sh
脚本执行界面

注意事项：

确保钱包有足够的余额（需“有水”）。

建议在 Gas 费用较低时执行操作。

注册 Pinata 获取 JWT Key
登录 Pinata
访问 Pinata Cloud，注册并登录后台。

创建 API Key

左侧导航栏点击 API Key → 右上角 New Key。

输入 Key Name → 勾选 Admin 权限 → 点击 Generate API Key。
创建 API Key

保存 JWT Key
生成后，复制并保存弹出对话框中的 JWT Key。
保存 JWT Key

使用 Suno 生成 AI 音乐
注册 Suno
访问 Suno 并注册账号。

创建音乐

点击左侧菜单 Create → 输入描述（如“轻快的歌曲”），支持中英文。

等待生成后试听，并开启 Public 选项。
生成音乐界面

获取音乐 ID
复制歌曲链接中的 ID（示例：d8bf2c6b-edd1-4145-813b-1fe993fe38a3），脚本中需填入此 ID。

注意事项
Suno 播放问题：在线播放可能不稳定，若返回的 NFT 链接无法播放，仍可确认音乐已上链。

脚本依赖：确保网络畅通，避免因依赖安装失败导致脚本中断。

路径问题：若图片无法显示，请检查 media/ 目录下的文件路径。
