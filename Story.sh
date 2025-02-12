#!/bin/bash

#========================================
# Story 项目自动化脚本
# 作者: TOKRICH (@TOK_RICH)
# 原始代码贡献者: Jacobmtucker
# 指南创建者: 0xGareeb
# 日期: 2025-01-31
# 版本: v1.0
#========================================

REPO_DIR="typescript-tutorial"

# 显示增强型 ASCII 艺术标题
show_banner() {
    clear
    echo -e "\033[1;37m"
    echo "  ███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗"
    echo "  ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝"
    echo "  ███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝ "
    echo "  ╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝  "
    echo "  ███████║   ██║   ╚██████╔╝██║  ██║   ██║   "
    echo "  ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   "
    echo -e "\033[1;33m"
    echo "┌──────────────────────────────────────────────────────┐"
    echo "│ 脚本作者: TOKRICH (@TOK_RICH)                        │"
    echo "│ 原始代码贡献者: Jacobmtucker                         │"
    echo "│ 指南创建者: 0xGareeb                                 │"
    echo "│ 版本: v1.0                            2025-01-31     │"
    echo "└──────────────────────────────────────────────────────┘"
    echo -e "\033[0m"
}

# 检测并安装 Node.js 18
install_node() {
    NODE_VERSION=$(node -v 2>/dev/null | grep -oP '[0-9]+' | head -1)
    if [[ -z "$NODE_VERSION" || "$NODE_VERSION" -lt 18 ]]; then
        echo -e "\033[1;33m正在安装 Node.js 18...\033[0m"
        sudo apt update && sudo apt install -y curl
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt install -y nodejs
    else
        echo -e "\033[1;32mNode.js 版本 $NODE_VERSION 符合要求\033[0m"
    fi
}

# 克隆仓库并进入目录
clone_repo() {
    if [ -d "$REPO_DIR" ]; then
        echo -e "\033[1;33m检测到已存在的仓库目录，正在更新...\033[0m"
        cd "$REPO_DIR" && git pull
    else
        echo -e "\033[1;36m正在克隆仓库...\033[0m"
        git clone https://github.com/arun993/typescript-tutorial.git
        cd "$REPO_DIR" || { echo -e "\033[1;31m错误：无法进入仓库目录！\033[0m"; exit 1; }
    fi
}

# 安装依赖
install_dependencies() {
    echo -e "\033[1;36m正在安装项目依赖...\033[0m"
    npm install && npm install @story-protocol/core-sdk
    echo -e "\033[1;32m依赖安装完成 ✔\033[0m"
}

# 配置环境变量
setup_env() {
    echo -e "\033[1;33m"
    read -p "请输入钱包私钥（无需0x前缀）: " WALLET_PRIVATE_KEY
    read -p "请输入 Pinata JWT: " PINATA_JWT
    echo -e "\033[0m"

    # 自动去除可能的0x前缀
    WALLET_PRIVATE_KEY=$(echo "$WALLET_PRIVATE_KEY" | sed 's/^0x//')

    cat <<EOF > .env
WALLET_PRIVATE_KEY=$WALLET_PRIVATE_KEY
PINATA_JWT=$PINATA_JWT
RPC_PROVIDER_URL=https://rpc.odyssey.storyrpc.io
EOF
    echo -e "\033[1;32m环境变量配置完成 ✔\033[0m"
}

# 注册IP
register_ip() {
    echo -e "\033[1;36m正在注册IP资产...\033[0m"
    npm run mint-and-register | tee registration.log
    echo -e "\033[1;32m操作日志已保存: registration.log\033[0m"
}

# 注册音乐
register_music() {
    echo -e "\033[1;33m"
    read -p "请输入Suno歌曲ID（示例: dcd3076f-3aa5-400b-ba5d-87d30f27c311）: " SONG_ID
    echo -e "\033[0m"

    # 验证ID格式
    if [[ ! $SONG_ID =~ ^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$ ]]; then
        echo -e "\033[1;31m错误：无效的歌曲ID格式！\033[0m"
        return
    fi

    sed -i "s/SONG_ID/$SONG_ID/g" scripts/registerMusic.ts
    echo -e "\033[1;36m正在注册音乐资产...\033[0m"
    npm run register-music | tee music_registration.log
}

# 注册SPG
register_spg() {
    echo -e "\033[1;36m正在创建SPG集合...\033[0m"
    npm run create-spg-collection | tee spg.log
    echo -e "\033[1;32m操作日志已保存: spg.log\033[0m"
}

# 主菜单系统
while true; do
    show_banner
    echo -e "\033[1;34m
╔════════════════════════════════════════════╗
║               主操作菜单 / Main Menu       ║
╠════════════════════════════════════════════╣
║ 1. 克隆/更新仓库                           ║
║    Clone/Update Repository                 ║
║ 2. 安装依赖环境                            ║
║    Install Dependencies                    ║
║ 3. 配置钱包信息                            ║
║    Setup Wallet Info                       ║
║ 4. 注册IP资产                              ║
║    Register IP Asset                       ║
║ 5. 注册音乐资产                            ║
║    Register Music Asset                    ║
║ 6. 创建SPG集合                             ║
║    Create SPG Collection                   ║
║ 7. 退出系统                                ║
║    Exit                                    ║
╚════════════════════════════════════════════╝
\033[0m"
    
    read -p "请输入操作选项 (1-7) / Enter choice (1-7): " choice
    case $choice in
        1) clone_repo ;;
        2) install_node && install_dependencies ;;
        3) setup_env ;;
        4) register_ip ;;
        5) register_music ;;
        6) register_spg ;;
        7) echo -e "\033[1;35m感谢使用！退出系统中...\033[0m"; exit 0 ;;
        *) echo -e "\033[1;31m无效选项，请重新输入！\033[0m" ;;
    esac
    read -p "按回车键继续 / Press Enter to continue..."
done
