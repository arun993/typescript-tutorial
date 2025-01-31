# 音乐上Story链一键脚本 By TOKRICH
- **我还是个大学生，只是站在巨人的肩膀上**
- **点赞关注不迷路**：https://x.com/TOK_RICH
感谢 [jacobmtucker](https://x.com/jacobmtucker) 提供代码，感谢 [0xGareeb](https://x.com/Arun__993) 提供指南。

---

## 使用环境
- **操作系统**: Ubuntu 22.04 或更高版本  
- **Node.js**: 脚本会自动配置环境，若版本低于 18，请手动升级。

---

## 操作步骤

### 1. 下载脚本
安全下载脚本：
- GitHub    

执行命令：
```bash
wget https://github.com/TOKRICH/Mint-Music-on-Story/blob/main/Story.sh
```

### 2. 赋予脚本执行权限
```bash
chmod +x Story.sh
```

### 3. 运行脚本
```bash
./Story.sh
```
![image](https://github.com/user-attachments/assets/f64fe732-14d3-4186-bae4-8ad801eda027)



**注意事项**：  
- 确保钱包有足够的余额（需“有水”）。  
- 建议在 Gas 费用较低时执行操作。

---

## 注册 Pinata 获取 JWT Key

1. **登录 Pinata**  
   访问 [Pinata Cloud](https://pinata.cloud/)，注册并登录后台。  
2. **创建 API Key**  
   - 左侧导航栏点击 **API Key** → 右上角 **New Key**。
   ![image](https://github.com/user-attachments/assets/19e2124a-97eb-4f47-9dca-c8739d77d14a)
   - 输入 **Key Name** → 勾选 **Admin** 权限 → 点击 **Generate API Key**。  
   ![image](https://github.com/user-attachments/assets/a1913769-fc77-4cab-901e-e004f128d056)
  
3. **保存 JWT Key**  
   生成后，复制并保存弹出对话框中的 **JWT Key**。  
   ![image](https://github.com/user-attachments/assets/d26e5adf-1590-490d-9e89-b8d41bcc64b1)

---

## 使用 Suno 生成 AI 音乐

1. **注册 Suno**  
   访问 [Suno](https://suno.com/invite/@unearthlyaudiogram6357) 并注册账号。  
2. **创建音乐**  
   - 点击左侧菜单 **Create** → 输入描述（如“轻快的歌曲”），支持中英文。  
   - 等待生成后试听，并开启 **Public** 选项。  
   ![image](https://github.com/user-attachments/assets/2a1232da-7c56-47b1-84c7-4ca759e709a7)
 
3. **获取音乐 ID**  
   复制歌曲链接中的 ID（示例：`d8bf2c6b-edd1-4145-813b-1fe988888888`），脚本中需填入此 ID。

---

## 注意事项
- **Suno 播放问题**：在线播放可能不稳定，若返回的 NFT 链接无法播放，仍可确认音乐已上链。  
- **脚本依赖**：确保网络畅通，避免因依赖安装失败导致脚本中断。  
