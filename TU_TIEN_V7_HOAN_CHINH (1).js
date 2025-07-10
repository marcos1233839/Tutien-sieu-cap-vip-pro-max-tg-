const fs = require("fs");
const path = require("path");

module.exports = class {
  static config = {
    name: "tutien",
    aliases: [],
    version: "7.0.0",
    role: 0,
    author: "God Marcos",
    info: "Tu luyện nâng cấp với hệ thống Clan hoàn chỉnh",
    Category: "Game",
    guides: "[train|dokiep|info|quest|shop|boss|phai|clan|top|hide|pvp|dungeon|pet]",
    cd: 3,
    hasPrefix: true
  };

  static realms = ["Luyện Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh", "Hóa Thần", "Luyện Hư", "Độ Kiếp", "Đại Thừa", "Phi Thăng", "Thiên Tiên", "Thánh Nhân", "Đế Quân", "Thần Vương", "Tạo Hóa"];
  static dataPath = path.join(__dirname, "..", "..", "system", "data", "tutien.json");
  static bossPath = path.join(__dirname, "..", "..", "system", "data", "boss.json");
  static clanPath = path.join(__dirname, "..", "..", "system", "data", "clans.json");

  static factions = {
    tien: "🧘 Tu Tiên",
    ma: "😈 Tu Ma",
    phat: "🪷 Tu Phật",
    hachan: "❄️ Hắc Hàn",
    kiem: "⚔️ Kiếm Tông"
  };

  static clanRoles = {
    member: { name: "🔷 Thành Viên", level: 0, expBonus: 0.05 },
    elder: { name: "🔶 Trưởng Lão", level: 1, expBonus: 0.10 },
    vice: { name: "🔸 Phó Bang Chủ", level: 2, expBonus: 0.15 },
    leader: { name: "👑 Bang Chủ", level: 3, expBonus: 0.20 }
  };

  static clanBuildings = {
    training: { name: "💪 Võ Đường", maxLevel: 5, baseCost: 50 },
    library: { name: "📚 Thư Viện", maxLevel: 5, baseCost: 60 },
    treasury: { name: "💰 Kho Bạc", maxLevel: 5, baseCost: 70 },
    altar: { name: "⚡ Pháp Đàn", maxLevel: 5, baseCost: 80 }
  };

  static items = {
    ngoc: { name: "💠 Ngọc May Mắn", price: 2, effect: "+20% tỉ lệ độ kiếp" },
    danexp: { name: "💊 Đan EXP", price: 2, effect: "+1000 EXP" },
    danphuc: { name: "🧪 Đan Hồi Phục", price: 3, effect: "Bảo vệ khi độ kiếp fail" },
    thechat: { name: "💼 Gói Thể Chất", price: 1, effect: "+10~20 Thể Chất" },
    petbox: { name: "🎁 Rương Pet", price: 5, effect: "Mở ra 1 pet ngẫu nhiên" },
    
    // Clan items
    clanstone: { name: "🏗️ Đá Xây Dựng", price: 10, effect: "Nâng cấp công trình clan" },
    clanbuff: { name: "⚡ Buff Clan", price: 8, effect: "+50% EXP cho toàn clan trong 1h" },
    clantoken: { name: "🎖️ Token Clan", price: 15, effect: "Dùng để tham gia event clan" }
  };

  static bossList = [
    { name: "Thần Long", hp: 50000 },
    { name: "Thiên Ưng", hp: 52000 },
    { name: "Bọ Cạp Linh Hồn", hp: 55000 },
    { name: "Hỏa Kỳ Lân", hp: 58000 },
    { name: "Băng Tâm Hồ", hp: 60000 },
    
    // Clan bosses
    { name: "Ma Vương Cổ Đại", hp: 100000, type: "clan" },
    { name: "Rồng Huyết Tộc", hp: 120000, type: "clan" },
    { name: "Thiên Ma Đế Quân", hp: 150000, type: "clan" }
  ];

  static petList = {
    common: [
      "🐶 Chó Nhỏ", "🐱 Mèo Mun", "🦊 Cáo", "🐰 Thỏ", "🐦 Chim Sẻ"
    ],
    uncommon: [
      " Hổ Nhỏ", " Khỉ Thông Minh", "🦅 Ưng Lửa", "🐍 Xà Tinh", "🐺 Sói Trắng"
    ],
    rare: [
      "🐲 Rồng Con", "🦄 Kỳ Lân", "🦖 Khủng Long", "👻 Bóng Ma", "🦂 Bọ Cạp Lửa"
    ],
    epic: [
      "🐺 Sói Băng", "🐉 Long Linh", "🧚 Tiên Linh", "💀 Lich", " Phượng Hoàng"
    ],
    legendary: [
      "🌪️ Rồng Gió", "⚡ Rồng Sấm", "🌌 Rồng Vũ Trụ", "🌟 Thần Long", "👑 Hoàng Gia Kỳ Lân"
    ]
  };

  static petRarity = {
    common: { name: "Bình Thường", chance: 0.5, bonus: 1 },
    uncommon: { name: "Không Phổ Biến", chance: 0.3, bonus: 1.2 },
    rare: { name: "Hiếm", chance: 0.15, bonus: 1.5 },
    epic: { name: "Sử Thi", chance: 0.04, bonus: 2 },
    legendary: { name: "Truyền Thuyết", chance: 0.01, bonus: 3 }
  };

  static titles = {
    // Realm titles
    "🌱 Tu Luyện Sinh": { req: "realm", value: "Luyện Khí", desc: "Đạt cảnh giới Luyện Khí" },
    "⚡ Lôi Kiếp Chủ": { req: "realm", value: "Độ Kiếp", desc: "Đạt cảnh giới Độ Kiếp" },
    "🌟 Phi Thăng Tiên": { req: "realm", value: "Phi Thăng", desc: "Đạt cảnh giới Phi Thăng" },
    
    // PvP titles
    "⚔️ Chiến Binh": { req: "pvpWins", value: 5, desc: "Thắng 5 trận PvP" },
    "🏆 Võ Lâm Minh Chủ": { req: "pvpWins", value: 20, desc: "Thắng 20 trận PvP" },
    "👑 Thiên Hạ Đệ Nhất": { req: "pvpWins", value: 50, desc: "Thắng 50 trận PvP" },
    
    // Pet titles
    "🐾 Thú Chủ": { req: "petCount", value: 5, desc: "Sở hữu 5 pet" },
    "🦄 Linh Thú Sư": { req: "petCount", value: 10, desc: "Sở hữu 10 pet" },
    "🟡 Truyền Thuyết Sư": { req: "petRarity", value: "legendary", desc: "Sở hữu pet Truyền Thuyết" },
    
    // Breakthrough titles
    "💥 Độ Kiếp Vương": { req: "dokiepCount", value: 10, desc: "Độ kiếp thành công 10 lần" },
    "🌈 Thiên Kiếp Chủ": { req: "dokiepCount", value: 25, desc: "Độ kiếp thành công 25 lần" },
    
    // Training titles
    "🧘 Khổ Hạnh Tăng": { req: "trainCount", value: 100, desc: "Train 100 lần" },
    "⭐ Tu Luyện Cuồng": { req: "trainCount", value: 500, desc: "Train 500 lần" },
    
    // Boss titles
    "🐉 Đồ Long Giả": { req: "bossDamage", value: 10000, desc: "Gây 10,000 sát thương boss" },
    "🔥 Diệt Thế Ma Vương": { req: "bossDamage", value: 50000, desc: "Gây 50,000 sát thương boss" },
    
    // Clan titles
    "🏯 Bang Chủ": { req: "clanRole", value: "leader", desc: "Là bang chủ của clan" },
    "🎯 Công Thần": { req: "clanContribution", value: 1000, desc: "Đóng góp 1,000 cho clan" },
    
    // Wealth titles
    "💎 Đại Phú Hào": { req: "linhThach", value: 1000, desc: "Sở hữu 1,000 Linh Thạch" },
    "💰 Tài Phiệt": { req: "linhThach", value: 5000, desc: "Sở hữu 5,000 Linh Thạch" },
    
    // Special titles
    "🔄 Tái Sinh Giả": { req: "rebirthCount", value: 1, desc: "Tái sinh 1 lần" },
    "♾️ Bất Tử": { req: "rebirthCount", value: 5, desc: "Tái sinh 5 lần" },
    "🎭 Ẩn Danh Nhân": { req: "special", value: "hide", desc: "Luôn ẩn thông tin" },
    "🌟 Thiên Tài": { req: "special", value: "allMax", desc: "Đạt tất cả cảnh giới tối đa" }
  };

  // Pet helper functions
  static getRandomPet() {
    const roll = Math.random();
    let cumulative = 0;
    
    for (const [rarity, data] of Object.entries(this.petRarity)) {
      cumulative += data.chance;
      if (roll <= cumulative) {
        const pets = this.petList[rarity];
        const pet = pets[Math.floor(Math.random() * pets.length)];
        return { pet, rarity, rarityName: data.name };
      }
    }
    
    // Fallback to common
    const pets = this.petList.common;
    const pet = pets[Math.floor(Math.random() * pets.length)];
    return { pet, rarity: "common", rarityName: this.petRarity.common.name };
  }

  static getPetBonus(petName) {
    for (const [rarity, pets] of Object.entries(this.petList)) {
      if (pets.includes(petName)) {
        return this.petRarity[rarity].bonus;
      }
    }
    return 1;
  }

  static getPetId(petName) {
    for (const [rarity, pets] of Object.entries(this.petList)) {
      const index = pets.indexOf(petName);
      if (index !== -1) {
        return `${rarity.charAt(0).toUpperCase()}${index + 1}`;
      }
    }
    return "UNK";
  }

  static createProgressBar(percent) {
    const filled = Math.floor(percent / 10);
    const empty = 10 - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  }

  // Title helper functions
  static checkTitleRequirement(user, titleData) {
    switch (titleData.req) {
      case "realm":
        return user.realm === titleData.value;
      case "pvpWins":
        return (user.pvpWins || 0) >= titleData.value;
      case "petCount":
        return (user.petInventory?.length || 0) >= titleData.value;
      case "petRarity":
        if (!user.petInventory) return false;
        for (const pet of user.petInventory) {
          for (const [rarity, pets] of Object.entries(this.petList)) {
            if (pets.includes(pet) && rarity === titleData.value) {
              return true;
            }
          }
        }
        return false;
      case "dokiepCount":
        return (user.dokiepCount || 0) >= titleData.value;
      case "trainCount":
        return (user.trainCount || 0) >= titleData.value;
      case "bossDamage":
        return (user.bossDamage || 0) >= titleData.value;
      case "clanRole":
        return user.clanRole === titleData.value;
      case "clanContribution":
        return (user.clanContribution || 0) >= titleData.value;
      case "linhThach":
        return (user.linhThach || 0) >= titleData.value;
      case "rebirthCount":
        return (user.rebirthCount || 0) >= titleData.value;
      case "special":
        if (titleData.value === "hide") return user.hideInfo;
        if (titleData.value === "allMax") return user.realm === "Phi Thăng" && (user.rebirthCount || 0) > 0;
        return false;
      default:
        return false;
    }
  }

  static getAvailableTitles(user) {
    const available = [];
    for (const [title, data] of Object.entries(this.titles)) {
      if (this.checkTitleRequirement(user, data)) {
        available.push(title);
      }
    }
    return available;
  }

  static getHighestTitle(user) {
    const available = this.getAvailableTitles(user);
    if (available.length === 0) return null;
    
    // Priority order for automatic title selection
    const priorities = [
      "🌟 Thiên Tài", "♾️ Bất Tử", "👑 Thiên Hạ Đệ Nhất", "🌟 Phi Thăng Tiên",
      "🏆 Võ Lâm Minh Chủ", "🟡 Truyền Thuyết Sư", "🔥 Diệt Thế Ma Vương", "🌈 Thiên Kiếp Chủ"
    ];
    
    for (const priority of priorities) {
      if (available.includes(priority)) return priority;
    }
    
    return available[available.length - 1]; // Return last available
  }

  // Data management functions
  static getAllData() {
    try {
      if (!fs.existsSync(this.dataPath)) return {};
      return JSON.parse(fs.readFileSync(this.dataPath));
    } catch (e) {
      console.error("[tutien] Lỗi đọc data:", e);
      return {};
    }
  }

  static saveAllData(data) {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("[tutien] Lỗi lưu data:", e);
    }
  }

  static getBossData() {
    try {
      if (!fs.existsSync(this.bossPath)) {
        const boss = this.createNewBoss();
        this.saveBossData(boss);
        return boss;
      }
      let boss = JSON.parse(fs.readFileSync(this.bossPath));
      const now = Date.now();
      if (boss.defeated && now - boss.defeatTime >= 86400000) {
        boss = this.createNewBoss();
        this.saveBossData(boss);
      }
      return boss;
    } catch (e) {
      console.error("[tutien] Lỗi đọc boss:", e);
      return null;
    }
  }

  static createNewBoss() {
    const pick = this.bossList[Math.floor(Math.random() * this.bossList.length)];
    return {
      name: pick.name,
      hp: pick.hp,
      damage: {},
      defeated: false,
      defeatTime: 0,
      type: pick.type || "normal"
    };
  }

  static saveBossData(data) {
    try {
      fs.writeFileSync(this.bossPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("[tutien] Lỗi lưu boss:", e);
    }
  }

  static getClanData() {
    try {
      if (!fs.existsSync(this.clanPath)) return {};
      return JSON.parse(fs.readFileSync(this.clanPath));
    } catch (e) {
      console.error("[tutien] Lỗi đọc clan data:", e);
      return {};
    }
  }

  static saveClanData(data) {
    try {
      fs.writeFileSync(this.clanPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("[tutien] Lỗi lưu clan data:", e);
    }
  }

  static async onLoad() {
    const dir = path.dirname(this.dataPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.dataPath)) fs.writeFileSync(this.dataPath, "{}");
    if (!fs.existsSync(this.bossPath)) {
      const boss = this.createNewBoss();
      this.saveBossData(boss);
    }
    if (!fs.existsSync(this.clanPath)) fs.writeFileSync(this.clanPath, "{}");
  }

  static async onRun({ api, event, args }) {
    const { threadID, senderID, messageID } = event;
    const data = this.getAllData();
    const clanData = this.getClanData();
    
    // Initialize pendingRequests for existing clans
    Object.values(clanData).forEach(clan => {
      if (!clan.hasOwnProperty('pendingRequests')) {
        clan.pendingRequests = [];
      }
    });
    
    const fbName = (await api.getUserInfo(senderID))[senderID].name;

    // Initialize user data
    if (!data[senderID]) {
      data[senderID] = {
        name: fbName,
        exp: 0,
        linhThach: 0,
        realm: "Luyện Khí",
        theChat: Math.floor(Math.random() * 101) + 50,
        items: {},
        faction: null,
        lastTrain: 0,
        pvpCooldown: 0,
        clan: null,
        clanRole: "member",
        clanContribution: 0,
        dokiepCount: 0,
        pvpWins: 0,
        trainCount: 0,
        bossDamage: 0,
        hideInfo: false,
        petInventory: [],
        petEquipped: null,
        lastClanActivity: 0,
        lastDungeon: 0,
        availableTitles: [],
        equippedTitle: null,
        clanRequests: []
      };
    }

    const user = data[senderID];
    user.name = fbName;
    
    // Initialize new properties for existing users
    if (!user.hasOwnProperty('clanRequests')) user.clanRequests = [];
    if (!user.hasOwnProperty('availableTitles')) user.availableTitles = [];
    if (!user.hasOwnProperty('equippedTitle')) user.equippedTitle = null;
    if (!user.hasOwnProperty('lastDungeon')) user.lastDungeon = 0;
    
    const cmd = args[0]?.toLowerCase();

    // Auto-update titles
    const updateTitles = () => {
      const newTitles = this.getAvailableTitles(user);
      const gained = newTitles.filter(t => !user.availableTitles.includes(t));
      user.availableTitles = newTitles;
      
      if (gained.length > 0) {
        // Auto-equip highest priority title if no title equipped
        if (!user.equippedTitle && newTitles.length > 0) {
          user.equippedTitle = this.getHighestTitle(user);
        }
        return gained;
      }
      return [];
    };

    if (!cmd) {
      const msg = `📜 𝗧𝗨 𝗧𝗜Ê𝗡 𝗠𝗘𝗡𝗨 𝗩𝟳.𝟬\n━━━━━━━━━━━━━━━━\n` +
        `🌱 Tu luyện: train | dokiep | quest | dungeon | info\n` +
        `🎮 Khác: pvp <@tag> | boss | phai | artifact | event\n` +
        `🏯 Bang hội: clan | cjoin | cleave | cinfo | cupgrade\n` +
        `🛍️ Vật phẩm: shop | buy <mã> | use <mã> | inv\n` +
        `⚙️ Hệ thống: top | clantop | hide | pet | title | rebirth\n` +
        `☯️ Phái: phai <tên phái>`;
      return api.sendMessage(msg, threadID, messageID);
    }

    // Enhanced training with clan bonus
    if (cmd === "train") {
      const now = Date.now();
      const cd = 180000; // 3 minutes
      if (now - user.lastTrain < cd) {
        const left = Math.ceil((cd - (now - user.lastTrain)) / 1000);
        return api.sendMessage(`⏱️ Còn ${left}s mới có thể train tiếp.`, threadID, messageID);
      }

      let exp = Math.floor(Math.random() * 201) + 100;
      
      // Faction bonus
      if (user.faction === "hachan" && user.theChat > 100) exp += 50;
      
      // Pet bonus
      if (user.petEquipped) {
        const petBonus = this.getPetBonus(user.petEquipped);
        exp = Math.floor(exp * petBonus);
      }
      
      // Clan bonus
      if (user.clan && clanData[user.clan]) {
        const clan = clanData[user.clan];
        const roleBonus = this.clanRoles[user.clanRole]?.expBonus || 0;
        const buildingBonus = (clan.buildings?.training || 0) * 0.05;
        exp = Math.floor(exp * (1 + roleBonus + buildingBonus));
        
        // Add clan contribution
        user.clanContribution += Math.floor(exp * 0.1);
        clan.totalContribution = (clan.totalContribution || 0) + Math.floor(exp * 0.1);
      }

      user.exp += exp;
      user.trainCount++;
      user.linhThach += Math.random() < 0.3 ? 1 : 0;
      user.lastTrain = now;
      user.lastClanActivity = now;

              // Quest progress tracking
        if (user.quests?.date === new Date().toDateString()) {
          user.quests.list.forEach(quest => {
            if (quest.type === "train" && !quest.completed) {
              quest.progress++;
              if (quest.progress >= quest.target) {
                quest.completed = true;
              }
            }
            if (quest.type === "clan" && !quest.completed && user.clan) {
              quest.progress++;
              if (quest.progress >= quest.target) {
                quest.completed = true;
              }
            }
          });
        }

      // Check for new titles
      const gainedTitles = updateTitles();
      
      this.saveAllData(data);
      this.saveClanData(clanData);
      
      let msg = `🧘 Bạn nhận được ${exp} EXP`;
      if (user.petEquipped) msg += ` (🐾 Pet bonus)`;
      if (user.clan) msg += ` (🏯 Clan bonus)`;
      
      if (gainedTitles.length > 0) {
        msg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
      }
      
      return api.sendMessage(msg + ".", threadID, messageID);
    }

    // Enhanced breakthrough system
    if (cmd === "dokiep") {
      const index = this.realms.indexOf(user.realm);
      if (index >= this.realms.length - 1) return api.sendMessage("🚫 Đã đạt cảnh giới tối đa.", threadID, messageID);
      
      const next = this.realms[index + 1];
      const reqExp = (index + 1) * 1500;
      
      if (user.exp < reqExp) return api.sendMessage(`⚠️ Cần ${reqExp} EXP để độ kiếp.`, threadID, messageID);
      if (user.theChat < 50) return api.sendMessage("❌ Thể chất không đủ.", threadID, messageID);
      
      // Send initial message
      api.sendMessage(`⚡ Bắt đầu độ kiếp đột phá cảnh giới...`, threadID, messageID);
      
      let rate = 0.6;
      
      // Faction bonus
      if (user.faction === "ma") rate += 0.1;
      
      // Clan bonus
      if (user.clan && clanData[user.clan]) {
        const clan = clanData[user.clan];
        rate += (clan.buildings?.altar || 0) * 0.02;
      }
      
      // Item bonus
      if (user.items.ngoc) {
        user.items.ngoc--;
        rate += 0.2;
      }

      const roll = Math.random();
      
      if (roll < 0.05) {
        // Super breakthrough
        user.realm = this.realms[Math.min(index + 2, this.realms.length - 1)];
        user.exp -= reqExp;
        user.dokiepCount += 2;
        user.linhThach += 5;
        this.saveAllData(data);
        return api.sendMessage(`⚡️ ĐỘT PHÁ THẦN TỐC lên ${user.realm}! Bonus +5 Linh Thạch!`, threadID, messageID);
      }

      if (roll < rate) {
        user.realm = next;
        user.exp -= reqExp;
        user.dokiepCount++;
        user.linhThach += 2;
        
        // Quest progress tracking
        if (user.quests?.date === new Date().toDateString()) {
          user.quests.list.forEach(quest => {
            if (quest.type === "dokiep" && !quest.completed) {
              quest.progress++;
              if (quest.progress >= quest.target) {
                quest.completed = true;
              }
            }
          });
        }
        
        // Clan contribution
        if (user.clan) {
          user.clanContribution += 50;
          clanData[user.clan].totalContribution = (clanData[user.clan].totalContribution || 0) + 50;
        }
        
        // Check for new titles
        const gainedTitles = updateTitles();
        
        this.saveAllData(data);
        this.saveClanData(clanData);
        
        // Generate success reason
        const successReasons = [
          "Thiên Đạo Thuận Lợi", "Linh Lực Dồi Dào", "Tâm Thần Tĩnh Lặng",
          "Khí Huyết Thông Suốt", "Thiên Kiếp Nhẹ Nhàng", "Tâm Ma Bị Trấn Áp",
          "Linh Hồn Thuần Khiết", "Thiên Lôi Bỏ Qua", "Đạo Tâm Kiên Định"
        ];
        const successReason = successReasons[Math.floor(Math.random() * successReasons.length)];
        
        let msg = `🌟 Thành công đột phá lên tầng ${index + 2}/${this.realms.length} nhờ *${successReason}*!\n\n`;
        msg += `✨ Cảnh giới mới: *${next}*\n`;
        msg += `💰 Nhận được: *+2 Linh Thạch*\n`;
        msg += `💪 Thể chất: ${user.theChat}`;
        
        if (gainedTitles.length > 0) {
          msg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
        }
        
        return api.sendMessage(msg, threadID, messageID);
      } else {
        if (user.items.danphuc) {
          user.items.danphuc--;
          this.saveAllData(data);
          return api.sendMessage("🛡️ Được bảo vệ bởi Đan Hồi Phục. Không mất EXP.", threadID, messageID);
        }
        
        // Generate failure reason
        const failureReasons = [
          "Thiên Lôi Nhẹ", "Tâm Ma Quấy Nhiễu", "Khí Huyết Bất Ổn", 
          "Tâm Thần Phân Tán", "Linh Lực Không Đủ", "Thiên Đạo Phản Đối",
          "Tâm Ma Xâm Chiếm", "Linh Hồn Bất Ổn", "Thiên Kiếp Nặng"
        ];
        const failureReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
        
        if (Math.random() < 0.3) {
          user.realm = this.realms[Math.max(0, index - 1)];
          user.theChat -= 10;
          this.saveAllData(data);
          return api.sendMessage(`💥 Tẩu hỏa nhập ma! Bị giảm cảnh giới và thể chất!`, threadID, messageID);
        }
        
        user.exp -= reqExp;
        this.saveAllData(data);
        
        let msg = `💥 Thất bại ở tầng ${index + 1}/${this.realms.length} do *${failureReason}*!\n\n`;
        msg += `Mất: *${reqExp} EXP*.\n`;
        msg += `� Thể chất: ${user.theChat}`;
        
        return api.sendMessage(msg, threadID, messageID);
      }
    }

    // Enhanced info display
    if (cmd === "info") {
      const targetID = Object.keys(event.mentions)[0] || senderID;
      const target = data[targetID];
      
      if (!target) return api.sendMessage("❌ Người này chưa tu tiên!", threadID, messageID);
      if (target.hideInfo && targetID !== senderID) {
        return api.sendMessage("🔒 Người này đang ẩn thông tin tu luyện.", threadID, messageID);
      }
      
      let msg = `👤 ${target.name}`;
      if (target.equippedTitle) msg += ` [${target.equippedTitle}]`;
      msg += `\n🌟 Cảnh giới: ${target.realm}\n✨ EXP: ${target.exp}\n💎 Linh Thạch: ${target.linhThach}\n💪 Thể chất: ${target.theChat}`;
      
      if (target.faction) msg += `\n☯️ Phái: ${this.factions[target.faction]}`;
      
      if (target.clan) {
        const role = this.clanRoles[target.clanRole]?.name || "🔷 Thành Viên";
        msg += `\n🏯 Clan: ${target.clan} (${role})`;
        msg += `\n🎯 Đóng góp: ${target.clanContribution}`;
      }
      
      if (target.petEquipped) {
        // Get pet rarity
        let rarityInfo = "";
        for (const [rarity, pets] of Object.entries(this.petList)) {
          if (pets.includes(target.petEquipped)) {
            rarityInfo = ` (${this.petRarity[rarity].name})`;
            break;
          }
        }
        msg += `\n🐾 Pet: ${target.petEquipped}${rarityInfo}`;
      }
      
      msg += `\n📊 Thống kê: ${target.dokiepCount} độ kiếp | ${target.pvpWins} PvP thắng`;
      
      return api.sendMessage(msg, threadID, messageID);
    }

    // Clan system
    if (cmd === "clan") {
      const sub = args[1]?.toLowerCase();
      
      if (!sub) {
        if (!user.clan) {
          return api.sendMessage(`🏯 𝗖𝗟𝗔𝗡 𝗦𝗬𝗦𝗧𝗘𝗠\n━━━━━━━━━━━━\n` +
            `📝 Tạo clan: clan create <tên>\n` +
            `🚪 Xin vào clan: clan join <tên>\n` +
            `📋 Danh sách: clan list\n` +
            `🔍 Tìm kiếm: clan search <tên>\n` +
            `❓ Trợ giúp: clan help`, threadID, messageID);
        } else {
          const clan = clanData[user.clan];
          if (!clan) {
            user.clan = null;
            user.clanRole = "member";
            this.saveAllData(data);
            return api.sendMessage("❌ Clan không tồn tại. Đã rời clan.", threadID, messageID);
          }
          
          const memberCount = Object.values(data).filter(u => u.clan === user.clan).length;
          const pendingCount = clan.pendingRequests ? clan.pendingRequests.length : 0;
          
          let msg = `🏯 ${clan.name}\n👑 Bang chủ: ${clan.leader}\n👥 Thành viên: ${memberCount}/${clan.maxMembers || 20}\n`;
          msg += `💰 Kho bạc: ${clan.treasury || 0} LT\n🎯 Tổng đóng góp: ${clan.totalContribution || 0}\n`;
          msg += `📈 Level: ${clan.level || 1}\n📜 Mô tả: ${clan.description || "Chưa có mô tả"}\n`;
          
          if (pendingCount > 0 && (user.clanRole === "leader" || user.clanRole === "vice")) {
            msg += `📝 Đơn xin vào: ${pendingCount} người\n`;
          }
          
          msg += `\n❓ Dùng: clan help để xem lệnh`;
          
          return api.sendMessage(msg, threadID, messageID);
        }
      }
      
      if (sub === "create") {
        if (user.clan) return api.sendMessage("❌ Bạn đã ở trong clan rồi!", threadID, messageID);
        
        const name = args.slice(2).join(" ");
        if (!name) return api.sendMessage("❌ Vui lòng nhập tên clan!", threadID, messageID);
        if (name.length > 20) return api.sendMessage("❌ Tên clan tối đa 20 ký tự!", threadID, messageID);
        if (clanData[name]) return api.sendMessage("❌ Tên clan đã tồn tại!", threadID, messageID);
        if (user.linhThach < 100) return api.sendMessage("❌ Cần 100 Linh Thạch để tạo clan!", threadID, messageID);
        
        user.linhThach -= 100;
        user.clan = name;
        user.clanRole = "leader";
        
        clanData[name] = {
          name: name,
          leader: user.name,
          created: Date.now(),
          level: 1,
          treasury: 0,
          totalContribution: 0,
          maxMembers: 20,
          description: "",
          pendingRequests: [],
          buildings: {
            training: 0,
            library: 0,
            treasury: 0,
            altar: 0
          }
        };
        
        this.saveAllData(data);
        this.saveClanData(clanData);
        return api.sendMessage(`🎉 Đã tạo clan "${name}" thành công! Bạn là bang chủ.`, threadID, messageID);
      }
      
      if (sub === "join") {
        if (user.clan) return api.sendMessage("❌ Bạn đã ở trong clan rồi!", threadID, messageID);
        
        const name = args.slice(2).join(" ");
        if (!name) return api.sendMessage("❌ Vui lòng nhập tên clan!", threadID, messageID);
        if (!clanData[name]) return api.sendMessage("❌ Clan không tồn tại!", threadID, messageID);
        
        const clan = clanData[name];
        const memberCount = Object.values(data).filter(u => u.clan === name).length;
        
        if (memberCount >= (clan.maxMembers || 20)) {
          return api.sendMessage("❌ Clan đã đầy!", threadID, messageID);
        }
        
        // Initialize pending requests if not exists
        clan.pendingRequests = clan.pendingRequests || [];
        
        // Check if user already has pending request
        if (clan.pendingRequests.some(req => req.userId === senderID)) {
          return api.sendMessage("❌ Bạn đã gửi đơn xin vào clan này rồi! Chờ phê duyệt.", threadID, messageID);
        }
        
        // Add to pending requests
        clan.pendingRequests.push({
          userId: senderID,
          userName: user.name,
          timestamp: Date.now()
        });
        
        this.saveClanData(clanData);
        
        // Notify clan leaders
        const leaders = Object.values(data).filter(u => 
          u.clan === name && (u.clanRole === "leader" || u.clanRole === "vice")
        );
        
        return api.sendMessage(`📝 Đã gửi đơn xin vào clan "${name}"!\nChờ Bang Chủ hoặc Phó Bang Chủ phê duyệt.`, threadID, messageID);
      }
      
      if (sub === "leave") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        if (user.clanRole === "leader") {
          return api.sendMessage("❌ Bang chủ không thể rời clan! Hãy chuyển quyền hoặc giải tán clan.", threadID, messageID);
        }
        
        const oldClan = user.clan;
        user.clan = null;
        user.clanRole = "member";
        user.clanContribution = 0;
        
        this.saveAllData(data);
        return api.sendMessage(`🚪 Đã rời clan "${oldClan}".`, threadID, messageID);
      }
      
      if (sub === "list") {
        const clans = Object.values(clanData)
          .sort((a, b) => (b.totalContribution || 0) - (a.totalContribution || 0))
          .slice(0, 10);
        
        if (clans.length === 0) {
          return api.sendMessage("📝 Chưa có clan nào được tạo!", threadID, messageID);
        }
        
        let msg = "🏯 𝗧𝗢𝗣 𝗖𝗟𝗔𝗡\n━━━━━━━━━━━━\n";
        clans.forEach((clan, i) => {
          const memberCount = Object.values(data).filter(u => u.clan === clan.name).length;
          msg += `${i + 1}. ${clan.name} | Lv.${clan.level || 1} | ${memberCount} thành viên\n`;
        });
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (sub === "upgrade") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        const userRole = this.clanRoles[user.clanRole];
        if (userRole.level < 2) return api.sendMessage("❌ Chỉ Phó Bang Chủ trở lên mới có thể nâng cấp!", threadID, messageID);
        
        const building = args[2]?.toLowerCase();
        if (!this.clanBuildings[building]) {
          return api.sendMessage("❌ Dùng: clan upgrade training|library|treasury|altar", threadID, messageID);
        }
        
        const clan = clanData[user.clan];
        const currentLevel = clan.buildings[building] || 0;
        const maxLevel = this.clanBuildings[building].maxLevel;
        
        if (currentLevel >= maxLevel) {
          return api.sendMessage(`❌ ${this.clanBuildings[building].name} đã ở level tối đa!`, threadID, messageID);
        }
        
        const cost = this.clanBuildings[building].baseCost * (currentLevel + 1);
        if (clan.treasury < cost) {
          return api.sendMessage(`❌ Kho bạc clan cần ${cost} Linh Thạch để nâng cấp!`, threadID, messageID);
        }
        
        clan.treasury -= cost;
        clan.buildings[building]++;
        
        this.saveClanData(clanData);
        return api.sendMessage(`🔧 Đã nâng cấp ${this.clanBuildings[building].name} lên level ${clan.buildings[building]}!`, threadID, messageID);
      }
      
      if (sub === "donate") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        const amount = parseInt(args[2]);
        if (!amount || amount <= 0) return api.sendMessage("❌ Số lượng không hợp lệ!", threadID, messageID);
        if (user.linhThach < amount) return api.sendMessage("❌ Không đủ Linh Thạch!", threadID, messageID);
        
        user.linhThach -= amount;
        user.clanContribution += amount;
        
        const clan = clanData[user.clan];
        clan.treasury = (clan.treasury || 0) + amount;
        clan.totalContribution = (clan.totalContribution || 0) + amount;
        
        this.saveAllData(data);
        this.saveClanData(clanData);
        
        return api.sendMessage(`💰 Đã donate ${amount} Linh Thạch cho clan!`, threadID, messageID);
      }
      
      if (sub === "help") {
        let msg = `🏯 𝗖𝗟𝗔𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦\n━━━━━━━━━━━━━━━━\n`;
        
        if (!user.clan) {
          msg += `📝 clan create <tên> - Tạo clan (100 LT)\n`;
          msg += `🚪 clan join <tên> - Xin vào clan\n`;
          msg += `📋 clan list - Xem top clan\n`;
          msg += `🔍 clan search <tên> - Tìm clan\n`;
        } else {
          msg += `🏠 clan - Thông tin clan\n`;
          msg += `🚪 clan leave - Rời clan\n`;
          msg += `💰 clan donate <số> - Donate Linh Thạch\n`;
          
          const userRole = this.clanRoles[user.clanRole];
          if (userRole.level >= 2) { // Vice leader+
            msg += `\n🔧 QUẢN LÝ:\n`;
            msg += `⬆️ clan upgrade <building> - Nâng cấp\n`;
            msg += `📝 clan requests - Xem đơn xin vào\n`;
            msg += `✅ clan approve <số> - Duyệt đơn\n`;
            msg += `❌ clan reject <số> - Từ chối đơn\n`;
          }
          
          if (user.clanRole === "leader") {
            msg += `\n👑 BANG CHỦ:\n`;
            msg += `💥 clan disband - Giải tán clan\n`;
            msg += `👥 clan kick <@user> - Đuổi thành viên\n`;
            msg += `⬆️ clan promote <@user> - Thăng chức\n`;
            msg += `⬇️ clan demote <@user> - Giáng chức\n`;
          }
        }
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (sub === "requests") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        const userRole = this.clanRoles[user.clanRole];
        if (userRole.level < 2) return api.sendMessage("❌ Chỉ Phó Bang Chủ trở lên mới xem được đơn xin vào!", threadID, messageID);
        
        const clan = clanData[user.clan];
        clan.pendingRequests = clan.pendingRequests || [];
        
        if (clan.pendingRequests.length === 0) {
          return api.sendMessage("📝 Không có đơn xin vào nào!", threadID, messageID);
        }
        
        let msg = `📝 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 Đ𝗢̛𝗡 𝗫𝗜𝗡 𝗩𝗔̀𝗢\n━━━━━━━━━━━━━━━━\n`;
        clan.pendingRequests.forEach((req, i) => {
          const timeAgo = Math.floor((Date.now() - req.timestamp) / 60000);
          msg += `${i + 1}. ${req.userName} (${timeAgo} phút trước)\n`;
        });
        
        msg += `\n✅ Dùng: clan approve <số>\n❌ Dùng: clan reject <số>`;
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (sub === "approve") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        const userRole = this.clanRoles[user.clanRole];
        if (userRole.level < 2) return api.sendMessage("❌ Chỉ Phó Bang Chủ trở lên mới được duyệt đơn!", threadID, messageID);
        
        const requestIndex = parseInt(args[2]) - 1;
        if (isNaN(requestIndex)) return api.sendMessage("❌ Vui lòng nhập số thứ tự đơn!", threadID, messageID);
        
        const clan = clanData[user.clan];
        clan.pendingRequests = clan.pendingRequests || [];
        
        if (requestIndex < 0 || requestIndex >= clan.pendingRequests.length) {
          return api.sendMessage("❌ Số thứ tự không hợp lệ!", threadID, messageID);
        }
        
        const request = clan.pendingRequests[requestIndex];
        const newMember = data[request.userId];
        
        if (!newMember) {
          clan.pendingRequests.splice(requestIndex, 1);
          this.saveClanData(clanData);
          return api.sendMessage("❌ Người dùng không tồn tại! Đã xóa đơn.", threadID, messageID);
        }
        
        if (newMember.clan) {
          clan.pendingRequests.splice(requestIndex, 1);
          this.saveClanData(clanData);
          return api.sendMessage("❌ Người này đã ở clan khác rồi! Đã xóa đơn.", threadID, messageID);
        }
        
        // Check if clan is full
        const memberCount = Object.values(data).filter(u => u.clan === user.clan).length;
        if (memberCount >= (clan.maxMembers || 20)) {
          return api.sendMessage("❌ Clan đã đầy!", threadID, messageID);
        }
        
        // Approve the request
        newMember.clan = user.clan;
        newMember.clanRole = "member";
        newMember.clanContribution = 0;
        
        clan.pendingRequests.splice(requestIndex, 1);
        
        this.saveAllData(data);
        this.saveClanData(clanData);
        
        return api.sendMessage(`✅ Đã phê duyệt ${request.userName} gia nhập clan!`, threadID, messageID);
      }
      
      if (sub === "reject") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        const userRole = this.clanRoles[user.clanRole];
        if (userRole.level < 2) return api.sendMessage("❌ Chỉ Phó Bang Chủ trở lên mới được từ chối đơn!", threadID, messageID);
        
        const requestIndex = parseInt(args[2]) - 1;
        if (isNaN(requestIndex)) return api.sendMessage("❌ Vui lòng nhập số thứ tự đơn!", threadID, messageID);
        
        const clan = clanData[user.clan];
        clan.pendingRequests = clan.pendingRequests || [];
        
        if (requestIndex < 0 || requestIndex >= clan.pendingRequests.length) {
          return api.sendMessage("❌ Số thứ tự không hợp lệ!", threadID, messageID);
        }
        
        const request = clan.pendingRequests[requestIndex];
        clan.pendingRequests.splice(requestIndex, 1);
        
        this.saveClanData(clanData);
        
        return api.sendMessage(`❌ Đã từ chối đơn của ${request.userName}!`, threadID, messageID);
      }
      
      if (sub === "disband") {
        if (!user.clan) return api.sendMessage("❌ Bạn không ở trong clan nào!", threadID, messageID);
        
        if (user.clanRole !== "leader") {
          return api.sendMessage("❌ Chỉ Bang Chủ mới có thể giải tán clan!", threadID, messageID);
        }
        
        const clanName = user.clan;
        
        // Remove all members from clan
        Object.values(data).forEach(u => {
          if (u.clan === clanName) {
            u.clan = null;
            u.clanRole = "member";
            u.clanContribution = 0;
          }
        });
        
        // Delete clan data
        delete clanData[clanName];
        
        this.saveAllData(data);
        this.saveClanData(clanData);
        
        return api.sendMessage(`💥 Clan "${clanName}" đã được giải tán!\nTất cả thành viên đã được rời clan.`, threadID, messageID);
      }
    }

    // Enhanced faction system
    if (cmd === "phai") {
      if (user.faction) {
        return api.sendMessage(`☯️ Bạn đã gia nhập ${this.factions[user.faction]}\n❌ Không thể thay đổi phái sau khi đã chọn.`, threadID, messageID);
      }
      
      const pick = args[1]?.toLowerCase();
      
      if (!pick) {
        // Show all factions with their properties
        let msg = `☯️ 𝗛Ệ 𝗧𝗛Ố𝗡𝗚 𝗣𝗛Á𝗜 𝗧𝗨 𝗧𝗜Ê𝗡\n━━━━━━━━━━━━━━━━\n`;
        msg += `📋 Dùng: phai <tên phái>\n\n`;
        
        const factionInfo = {
          tien: {
            name: "🧘 Tu Tiên",
            desc: "Tu luyện theo đường lối chính đạo, tâm tính ôn hòa",
            bonus: "Tăng tỉ lệ thành công độ kiếp +10%",
            color: "🟢"
          },
          ma: {
            name: "😈 Tu Ma", 
            desc: "Tu luyện theo đường lối tà đạo, sức mạnh hủy diệt",
            bonus: "Tăng tỉ lệ thành công độ kiếp +10%",
            color: "🔴"
          },
          phat: {
            name: "🪷 Tu Phật",
            desc: "Tu luyện theo đường lối từ bi, tâm hồn thanh tịnh",
            bonus: "Tăng thể chất hồi phục +20%",
            color: "🟡"
          },
          hachan: {
            name: "❄️ Hắc Hàn",
            desc: "Tu luyện theo đường lối băng hàn, sức mạnh lạnh lẽo",
            bonus: "Tăng EXP khi thể chất > 100",
            color: "🔵"
          },
          kiem: {
            name: "⚔️ Kiếm Tông",
            desc: "Tu luyện theo đường lối kiếm đạo, sát khí mạnh mẽ",
            bonus: "Tăng sát thương PvP +15%",
            color: "⚪"
          }
        };
        
        for (const [key, info] of Object.entries(factionInfo)) {
          msg += `${info.color} **${info.name}**\n`;
          msg += `   ${info.desc}\n`;
          msg += `   💫 ${info.bonus}\n`;
          msg += `   📝 Lệnh: phai ${key}\n\n`;
        }
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (!["tien", "ma", "phat", "hachan", "kiem"].includes(pick)) {
        return api.sendMessage("❌ Tên phái không hợp lệ!\n📋 Dùng: phai (không có tham số) để xem danh sách phái", threadID, messageID);
      }
      
      user.faction = pick;
      this.saveAllData(data);
      
      const factionNames = {
        tien: "🧘 Tu Tiên",
        ma: "😈 Tu Ma", 
        phat: "🪷 Tu Phật",
        hachan: "❄️ Hắc Hàn",
        kiem: "⚔️ Kiếm Tông"
      };
      
      return api.sendMessage(`☯️ Chúc mừng! Bạn đã gia nhập ${factionNames[pick]}!\n🎯 Hãy tu luyện để phát huy sức mạnh của phái!`, threadID, messageID);
    }

    // Enhanced shop with clan items
    if (cmd === "shop") {
      let msg = "🛒 Shop Tu Tiên:\n━━━━━━━━━━━━\n";
      for (const [code, item] of Object.entries(this.items)) {
        msg += `• ${code}: ${item.name} (${item.price} LT)\n  ${item.effect}\n\n`;
      }
      return api.sendMessage(msg.trim(), threadID, messageID);
    }

    if (cmd === "buy") {
      const code = args[1];
      if (!this.items[code]) return api.sendMessage("❌ Mã vật phẩm không hợp lệ.", threadID, messageID);
      const item = this.items[code];
      if (user.linhThach < item.price) return api.sendMessage("❌ Không đủ Linh Thạch.", threadID, messageID);
      user.linhThach -= item.price;
      user.items[code] = (user.items[code] || 0) + 1;
      this.saveAllData(data);
      return api.sendMessage(`✅ Đã mua 1 ${item.name}.`, threadID, messageID);
    }

    if (cmd === "use") {
      const code = args[1];
      if (!this.items[code] || !user.items[code]) return api.sendMessage("❌ Bạn không có vật phẩm này.", threadID, messageID);
      user.items[code]--;
      
      if (code === "danexp") user.exp += 1000;
      if (code === "thechat") user.theChat += Math.floor(Math.random() * 11) + 10;
      if (code === "petbox") {
        const petResult = this.getRandomPet();
        user.petInventory = user.petInventory || [];
        user.petInventory.push(petResult.pet);
        this.saveAllData(data);
        // Check for new titles after getting pet
        const gainedTitles = updateTitles();
        
        const petId = this.getPetId(petResult.pet);
        let msg = `🎁 Đã mở Rương Pet!\n🐾 Pet ID: ${petId}\n⭐ Độ hiếm: ${petResult.rarityName}`;
        if (gainedTitles.length > 0) {
          msg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
        }
        
        return api.sendMessage(msg, threadID, messageID);
      }
      if (code === "clanbuff" && user.clan) {
        const clan = clanData[user.clan];
        clan.buffExpire = Date.now() + 3600000; // 1 hour
        this.saveClanData(clanData);
        return api.sendMessage("⚡ Đã kích hoạt buff EXP cho clan trong 1 giờ!", threadID, messageID);
      }
      
      this.saveAllData(data);
      return api.sendMessage(`🎯 Đã dùng ${this.items[code].name}`, threadID, messageID);
    }

    if (cmd === "inv") {
      const inv = user.items || {};
      if (!Object.keys(inv).length) return api.sendMessage("🎒 Kho đồ trống.", threadID, messageID);
      let msg = "🎒 Kho đồ:\n━━━━━━━━━━━━\n";
      for (const [code, count] of Object.entries(inv)) {
        if (count > 0) {
          msg += `• ${this.items[code]?.name || code}: ${count}\n`;
        }
      }
      return api.sendMessage(msg.trim(), threadID, messageID);
    }

    // Enhanced pet system
    if (cmd === "pet") {
      const sub = args[1];
      if (!sub) {
        if (!user.petEquipped) {
          return api.sendMessage("🐾 Bạn chưa có pet, hãy dùng `use petbox` để mở!\n📋 Dùng: pet inv | pet equip <ID> | pet info", threadID, messageID);
        }
        
        // Get pet rarity
        let rarityInfo = "";
        for (const [rarity, pets] of Object.entries(this.petList)) {
          if (pets.includes(user.petEquipped)) {
            rarityInfo = ` (${this.petRarity[rarity].name})`;
            break;
          }
        }
        
        return api.sendMessage(`🐾 Pet hiện tại: ${user.petEquipped}${rarityInfo}\n📋 Dùng: pet inv | pet equip <ID> | pet info`, threadID, messageID);
      }
      if (sub === "inv") {
        if (!user.petInventory || user.petInventory.length === 0)
          return api.sendMessage("🎒 Bạn chưa có pet nào trong kho!", threadID, messageID);
        
        let msg = "🎒 𝗣𝗘𝗧 𝗧𝗥𝗢𝗡𝗚 𝗞𝗛𝗢\n━━━━━━━━━━━━\n";
        user.petInventory.forEach((pet, i) => {
          // Get rarity info and pet ID
          let rarityInfo = "";
          const petId = this.getPetId(pet);
          for (const [rarity, pets] of Object.entries(this.petList)) {
            if (pets.includes(pet)) {
              rarityInfo = ` (${this.petRarity[rarity].name})`;
              break;
            }
          }
          msg += `${i + 1}. ${petId} - ${pet}${rarityInfo}\n`;
        });
        return api.sendMessage(msg, threadID, messageID);
      }
      if (sub === "equip") {
        const name = args.slice(2).join(" ");
        if (!name) return api.sendMessage("❌ Dùng: pet equip <ID pet>", threadID, messageID);
        
        // Check if input is a pet ID
        let targetPet = null;
        if (name.length <= 3) { // Likely a pet ID
          for (const pet of user.petInventory) {
            if (this.getPetId(pet) === name.toUpperCase()) {
              targetPet = pet;
              break;
            }
          }
        } else { // Likely a pet name
          if (user.petInventory.includes(name)) {
            targetPet = name;
          }
        }
        
        if (!targetPet) return api.sendMessage("❌ Bạn không sở hữu pet này.", threadID, messageID);
        user.petEquipped = targetPet;
        this.saveAllData(data);
        return api.sendMessage(`✅ Đã trang bị pet: ${targetPet}`, threadID, messageID);
      }
      if (sub === "info") {
        if (!user.petEquipped) return api.sendMessage("🐾 Bạn chưa trang bị pet nào.", threadID, messageID);
        
        // Get pet rarity and bonus
        let rarityInfo = "";
        let bonusInfo = "";
        for (const [rarity, pets] of Object.entries(this.petList)) {
          if (pets.includes(user.petEquipped)) {
            rarityInfo = this.petRarity[rarity].name;
            bonusInfo = `${Math.floor((this.petRarity[rarity].bonus - 1) * 100)}%`;
            break;
          }
        }
        
        let msg = `🐾 𝗣𝗘𝗧 Đ𝗔𝗡𝗚 𝗧𝗥𝗔𝗡𝗚 𝗕Ị\n━━━━━━━━━━━━\n`;
        msg += `Pet: ${user.petEquipped}\n`;
        msg += `⭐ Độ hiếm: ${rarityInfo}\n`;
        msg += `💫 Bonus: +${bonusInfo} EXP/Phần thưởng`;
        
        return api.sendMessage(msg, threadID, messageID);
      }
    }

    // Title system
    if (cmd === "title") {
      const sub = args[1]?.toLowerCase();
      
      if (!sub) {
        updateTitles(); // Update available titles
        
        let msg = `🏆 𝗛𝗘̂̀ 𝗧𝗛𝗢̂́𝗡𝗚 𝗗𝗔𝗡𝗛 𝗛𝗜𝗘̣̂𝗨\n━━━━━━━━━━━━━━━━\n`;
        if (user.equippedTitle) {
          msg += `🎖️ Danh hiệu hiện tại: ${user.equippedTitle}\n\n`;
        } else {
          msg += `🎖️ Chưa trang bị danh hiệu\n\n`;
        }
        
        msg += `📋 Dùng: title list | title equip <tên> | title remove\n`;
        msg += `📖 Xem tất cả: title all`;
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (sub === "list") {
        updateTitles();
        
        if (user.availableTitles.length === 0) {
          return api.sendMessage("🏆 Bạn chưa có danh hiệu nào!\nHãy tu luyện và hoàn thành thành tích để mở khóa danh hiệu.", threadID, messageID);
        }
        
        let msg = `🏆 𝗗𝗔𝗡𝗛 𝗛𝗜𝗘̣̂𝗨 𝗖𝗢́ 𝗦𝗔̆̃𝗡\n━━━━━━━━━━━━━━━━\n`;
        user.availableTitles.forEach((title, i) => {
          const isEquipped = title === user.equippedTitle ? " ✅" : "";
          msg += `${i + 1}. ${title}${isEquipped}\n`;
          msg += `   ${this.titles[title].desc}\n\n`;
        });
        
        return api.sendMessage(msg, threadID, messageID);
      }
      
      if (sub === "equip") {
        const titleName = args.slice(2).join(" ");
        if (!titleName) return api.sendMessage("❌ Dùng: title equip <tên danh hiệu>", threadID, messageID);
        
        updateTitles();
        
        if (!user.availableTitles.includes(titleName)) {
          return api.sendMessage("❌ Bạn không sở hữu danh hiệu này!", threadID, messageID);
        }
        
        user.equippedTitle = titleName;
        this.saveAllData(data);
        return api.sendMessage(`🎖️ Đã trang bị danh hiệu: ${titleName}`, threadID, messageID);
      }
      
      if (sub === "remove") {
        if (!user.equippedTitle) {
          return api.sendMessage("❌ Bạn chưa trang bị danh hiệu nào!", threadID, messageID);
        }
        
        user.equippedTitle = null;
        this.saveAllData(data);
        return api.sendMessage("🎖️ Đã gỡ danh hiệu.", threadID, messageID);
      }
      
      if (sub === "all") {
        let msg = `🏆 𝗧𝗔̂́𝗧 𝗖𝗔̉ 𝗗𝗔𝗡𝗛 𝗛𝗜𝗘̣̂𝗨\n━━━━━━━━━━━━━━━━\n`;
        
        const categories = {
          "🌟 Cảnh Giới": ["🌱 Tu Luyện Sinh", "⚡ Lôi Kiếp Chủ", "🌟 Phi Thăng Tiên"],
          "⚔️ PvP": ["⚔️ Chiến Binh", "🏆 Võ Lâm Minh Chủ", "👑 Thiên Hạ Đệ Nhất"],
          "🐾 Pet": ["🐾 Thú Chủ", "🦄 Linh Thú Sư", "🟡 Truyền Thuyết Sư"],
          "💥 Độ Kiếp": ["💥 Độ Kiếp Vương", "🌈 Thiên Kiếp Chủ"],
          "🧘 Tu Luyện": ["🧘 Khổ Hạnh Tăng", "⭐ Tu Luyện Cuồng"],
          "🐉 Boss": ["🐉 Đồ Long Giả", "🔥 Diệt Thế Ma Vương"],
          "🏯 Clan": ["🏯 Bang Chủ", "🎯 Công Thần"],
          "💰 Tài Sản": ["💎 Đại Phú Hào", "💰 Tài Phiệt"],
          "🌟 Đặc Biệt": ["🔄 Tái Sinh Giả", "♾️ Bất Tử", "🎭 Ẩn Danh Nhân", "🌟 Thiên Tài"]
        };
        
        for (const [category, titles] of Object.entries(categories)) {
          msg += `\n${category}:\n`;
          titles.forEach(title => {
            const hasTitle = user.availableTitles?.includes(title) ? "✅" : "❌";
            msg += `${hasTitle} ${title}\n  ${this.titles[title].desc}\n`;
          });
        }
        
        return api.sendMessage(msg, threadID, messageID);
      }
    }

    // Enhanced PvP system
    if (cmd === "pvp") {
      const now = Date.now();
      if (now - user.pvpCooldown < 300000) {
        const left = Math.ceil((300000 - (now - user.pvpCooldown)) / 1000);
        return api.sendMessage(`⏱️ Chờ ${left}s để thách đấu tiếp.`, threadID, messageID);
      }

      const targetID = Object.keys(event.mentions)[0];
      if (!targetID) return api.sendMessage("❌ Vui lòng tag đối thủ!", threadID, messageID);
      if (targetID === senderID) return api.sendMessage("❌ Không thể tự đánh bản thân!", threadID, messageID);

      const target = data[targetID];
      if (!target) return api.sendMessage("❌ Đối thủ chưa tu tiên!", threadID, messageID);

      let userPower = this.realms.indexOf(user.realm) * 100 + user.theChat;
      let targetPower = this.realms.indexOf(target.realm) * 100 + target.theChat;

      // Pet bonuses
      if (user.petEquipped) {
        const petBonus = this.getPetBonus(user.petEquipped);
        userPower = Math.floor(userPower * petBonus);
      }
      if (target.petEquipped) {
        const petBonus = this.getPetBonus(target.petEquipped);
        targetPower = Math.floor(targetPower * petBonus);
      }

      // Clan bonuses
      if (user.clan && clanData[user.clan]) {
        userPower += clanData[user.clan].buildings?.training || 0 * 10;
      }
      if (target.clan && clanData[target.clan]) {
        targetPower += clanData[target.clan].buildings?.training || 0 * 10;
      }

      const userRoll = Math.random() * 50;
      const targetRoll = Math.random() * 50;
      const userTotal = userPower + userRoll;
      const targetTotal = targetPower + targetRoll;

      let resultMsg = "", expGain = 0;
      if (userTotal > targetTotal) {
        expGain = Math.floor(targetPower / 2);
        resultMsg = `⚔️ Bạn đã đánh bại ${target.name}! Nhận ${expGain} EXP + 1 Linh Thạch.`;
        user.exp += expGain;
        user.pvpWins++;
        user.linhThach += 1;
        target.theChat = Math.max(10, target.theChat - 5);
      } else if (userTotal < targetTotal) {
        expGain = Math.floor(userPower / 4);
        resultMsg = `💥 Bạn bị ${target.name} đánh bại! Nhận ${expGain} EXP từ chiến bại.`;
        user.exp += expGain;
        user.theChat = Math.max(10, user.theChat - 5);
      } else {
        expGain = Math.floor(userPower / 3);
        resultMsg = `🤝 Hòa với ${target.name}! Cả hai nhận ${expGain} EXP.`;
        user.exp += expGain;
        target.exp += expGain;
      }

      // Quest progress tracking
      if (user.quests?.date === new Date().toDateString()) {
        user.quests.list.forEach(quest => {
          if (quest.type === "pvp" && !quest.completed) {
            quest.progress++;
            if (quest.progress >= quest.target) {
              quest.completed = true;
            }
          }
        });
      }

      // Check for new titles
      const gainedTitles = updateTitles();
      if (gainedTitles.length > 0) {
        resultMsg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
      }

      user.pvpCooldown = now;
      this.saveAllData(data);
      return api.sendMessage(resultMsg, threadID, messageID);
    }

    // Enhanced quest system with 24h cooldown and multiple quests
    if (cmd === "quest") {
      const now = Date.now();
      const cooldown = 86400000; // 24 hours
      
      if (!user.quests || user.quests.date !== new Date().toDateString()) {
        // Generate 1-3 random quests
        const questCount = Math.floor(Math.random() * 3) + 1;
        const questTypes = [
          { type: "train", name: "Tu Luyện", target: 5, reward: { exp: 300, lt: 2 } },
          { type: "dokiep", name: "Độ Kiếp", target: 2, reward: { exp: 500, lt: 3 } },
          { type: "boss", name: "Đánh Boss", target: 1, reward: { exp: 800, lt: 5 } },
          { type: "clan", name: "Hoạt Động Clan", target: 3, reward: { exp: 400, lt: 4 } },
          { type: "dungeon", name: "Vào Dungeon", target: 1, reward: { exp: 600, lt: 3 } },
          { type: "pvp", name: "PvP", target: 2, reward: { exp: 700, lt: 4 } }
        ];
        
        const selectedQuests = [];
        const shuffled = questTypes.sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < questCount; i++) {
          selectedQuests.push(shuffled[i]);
        }
        
        user.quests = {
          date: new Date().toDateString(),
          list: selectedQuests.map(q => ({ ...q, progress: 0, completed: false }))
        };
      }

      const quests = user.quests.list;
      let msg = `🎯 𝗡𝗛𝗜Ệ𝗠 𝗩Ụ 𝗛Ô𝗠 𝗡𝗔𝗬\n━━━━━━━━━━━━━━━━\n`;
      
      let allCompleted = true;
      quests.forEach((quest, index) => {
        const percent = Math.floor((quest.progress / quest.target) * 100);
        const status = quest.completed ? "✅" : "⏳";
        const progressBar = this.createProgressBar(percent);
        
        msg += `${index + 1}. ${status} ${quest.name}\n`;
        msg += `   ${progressBar} ${quest.progress}/${quest.target}\n`;
        msg += `   💰 Thưởng: +${quest.reward.exp} EXP +${quest.reward.lt} LT\n\n`;
        
        if (!quest.completed) allCompleted = false;
      });
      
      if (allCompleted) {
        let totalExp = 0;
        let totalLt = 0;
        quests.forEach(quest => {
          totalExp += quest.reward.exp;
          totalLt += quest.reward.lt;
        });
        
        user.exp += totalExp;
        user.linhThach += totalLt;
        
        msg += `🎉 𝗛𝗢À𝗡 𝗧𝗛À𝗡𝗛 𝗧Ấ𝗧 𝗖Ả 𝗡𝗛Ệ𝗠 𝗩Ụ!\n`;
        msg += `✨ Nhận được: +${totalExp} EXP +${totalLt} LT`;
        
        delete user.quests;
      } else {
        msg += `⏰ Nhiệm vụ mới sau 24h`;
      }

      this.saveAllData(data);
      return api.sendMessage(msg, threadID, messageID);
    }

    // Enhanced dungeon system with 24h cooldown
    if (cmd === "dungeon") {
      const now = Date.now();
      const cooldown = 86400000; // 24 hours
      
      if (now - user.lastDungeon < cooldown) {
        const left = Math.ceil((cooldown - (now - user.lastDungeon)) / 3600000);
        return api.sendMessage(`⏰ Phải chờ ${left} giờ nữa mới có thể vào dungeon tiếp!`, threadID, messageID);
      }
      
      const list = [
        { name: "Hang Nhện", level: 1, reward: 300 },
        { name: "Lâu Đài Bóng Tối", level: 2, reward: 600 },
        { name: "Động Băng Huyết", level: 3, reward: 1000 },
        { name: "Tháp Tu Luyện", level: 4, reward: 1500 },
        { name: "Cung Điện Ma Vương", level: 5, reward: 2000 }
      ];
      const pick = list[Math.floor(Math.random() * list.length)];
      
      let successRate = 0.6;
      if (user.clan && clanData[user.clan]) {
        successRate += (clanData[user.clan].buildings?.library || 0) * 0.05;
      }
      
      // Pet bonus
      if (user.petEquipped) {
        const petBonus = this.getPetBonus(user.petEquipped);
        successRate += (petBonus - 1) * 0.1;
      }
      
      const pass = Math.random() < successRate;
      let msg = `🏰 Dungeon: ${pick.name}\n🔥 Độ khó: ${pick.level}`;
      
      if (pass) {
        let reward = pick.reward;
        let ltReward = Math.floor(pick.level / 2);
        
        // Pet bonus for rewards
        if (user.petEquipped) {
          const petBonus = this.getPetBonus(user.petEquipped);
          reward = Math.floor(reward * petBonus);
          ltReward = Math.floor(ltReward * petBonus);
        }
        
        user.exp += reward;
        user.linhThach += ltReward;
        
        // Quest progress tracking
        if (user.quests?.date === new Date().toDateString()) {
          user.quests.list.forEach(quest => {
            if (quest.type === "dungeon" && !quest.completed) {
              quest.progress++;
              if (quest.progress >= quest.target) {
                quest.completed = true;
              }
            }
          });
        }
        
        msg += `\n✅ Thành công! Nhận ${reward} EXP + ${ltReward} LT.`;
        if (user.petEquipped) msg += `\n🐾 Pet bonus được áp dụng!`;
      } else {
        user.theChat -= 10;
        msg += `\n💀 Thất bại! Mất 10 thể chất.`;
      }
      
      user.lastDungeon = now;
      this.saveAllData(data);
      return api.sendMessage(msg, threadID, messageID);
    }

    // Enhanced top system
    if (cmd === "top") {
      const top = Object.values(data)
        .filter(u => !u.hideInfo)
        .sort((a, b) => b.exp - a.exp)
        .slice(0, 10);
      let msg = "🏆 𝗧𝗢𝗣 𝗧𝗨 𝗧𝗜Ê𝗡\n━━━━━━━━━━━━\n";
      top.forEach((u, i) => {
        let name = u.name;
        if (u.equippedTitle) name = `${u.name} [${u.equippedTitle}]`;
        const clan = u.clan ? ` {${u.clan}}` : "";
        msg += `${i + 1}. ${name}${clan}\n🌟 ${u.realm} | ✨ ${u.exp} EXP\n\n`;
      });
      return api.sendMessage(msg, threadID, messageID);
    }

    // Clan top
    if (cmd === "clantop") {
      const clans = Object.values(clanData)
        .sort((a, b) => (b.totalContribution || 0) - (a.totalContribution || 0))
        .slice(0, 10);
      
      if (clans.length === 0) {
        return api.sendMessage("📝 Chưa có clan nào được tạo!", threadID, messageID);
      }
      
      let msg = "🏯 𝗧𝗢𝗣 𝗖𝗟𝗔𝗡\n━━━━━━━━━━━━\n";
      clans.forEach((clan, i) => {
        const memberCount = Object.values(data).filter(u => u.clan === clan.name).length;
        msg += `${i + 1}. ${clan.name}\n👑 ${clan.leader} | 👥 ${memberCount} thành viên\n🎯 ${clan.totalContribution || 0} đóng góp\n\n`;
      });
      
      return api.sendMessage(msg, threadID, messageID);
    }

    if (cmd === "hide") {
      user.hideInfo = !user.hideInfo;
      this.saveAllData(data);
      return api.sendMessage(user.hideInfo ? "🔒 Đã bật ẩn thông tin." : "🔓 Đã tắt ẩn thông tin.", threadID, messageID);
    }

    // Enhanced boss system
    if (cmd === "boss") {
      const boss = this.getBossData();
      if (!boss) return api.sendMessage("⚠️ Lỗi tải boss!", threadID, messageID);
      if (boss.defeated) return api.sendMessage("🐉 Boss đã bị tiêu diệt! Chờ boss mới...", threadID, messageID);

      let dmg = Math.floor(Math.random() * 201) + 100;
      
      // Pet bonus
      if (user.petEquipped) {
        const petBonus = this.getPetBonus(user.petEquipped);
        dmg = Math.floor(dmg * petBonus);
      }
      
      // Clan bonuses
      if (user.clan && clanData[user.clan]) {
        const clan = clanData[user.clan];
        dmg = Math.floor(dmg * (1 + (clan.buildings?.altar || 0) * 0.1));
      }
      
      boss.hp -= dmg;
      boss.damage[senderID] = (boss.damage[senderID] || 0) + dmg;
      user.bossDamage += dmg;

      // Quest progress tracking
      if (user.quests?.date === new Date().toDateString()) {
        user.quests.list.forEach(quest => {
          if (quest.type === "boss" && !quest.completed) {
            quest.progress++;
            if (quest.progress >= quest.target) {
              quest.completed = true;
            }
          }
        });
      }

      let msg = `🐲 Bạn đánh ${boss.name} gây ${dmg} sát thương!`;
      if (user.petEquipped) msg += ` (🐾 Pet bonus)`;
      msg += `\n${boss.name} còn ${Math.max(0, boss.hp)} HP.`;

      if (boss.hp <= 0) {
        boss.defeated = true;
        boss.defeatTime = Date.now();
        const sorted = Object.entries(boss.damage).sort((a, b) => b[1] - a[1]);
        const top = sorted.slice(0, 5);
        
        for (const [uid, val] of sorted) {
          if (!data[uid]) continue;
          const reward = Math.floor(val / 10);
          data[uid].exp += reward;
          data[uid].linhThach += Math.floor(reward / 100);
        }
        
        msg += `\n\n🏆 ${boss.name} bị tiêu diệt! Top sát thương:\n`;
        top.forEach(([uid, dmg], i) => {
          const name = data[uid]?.hideInfo ? `Ẩn danh` : (data[uid]?.name || "Ẩn");
          msg += `${i + 1}. ${name} - ${dmg} sát thương\n`;
        });
      }

      // Check for new titles after boss damage
      const gainedTitles = updateTitles();
      if (gainedTitles.length > 0) {
        msg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
      }

      this.saveBossData(boss);
      this.saveAllData(data);
      return api.sendMessage(msg, threadID, messageID);
    }

    // New rebirth system
    if (cmd === "rebirth") {
      if (user.realm !== "Phi Thăng") return api.sendMessage("❌ Chỉ có thể tái sinh ở cảnh giới Phi Thăng!", threadID, messageID);
      if (user.exp < 50000) return api.sendMessage("❌ Cần tối thiểu 50,000 EXP để tái sinh!", threadID, messageID);
      
      user.realm = "Luyện Khí";
      user.exp = 0;
      user.theChat = Math.min(200, user.theChat + 50);
      user.linhThach += 100;
      user.rebirthCount = (user.rebirthCount || 0) + 1;
      
      // Check for new titles after rebirth
      const gainedTitles = updateTitles();
      
      this.saveAllData(data);
      
      let msg = `🔄 Tái sinh thành công! Lần ${user.rebirthCount}\n+50 Thể chất +100 Linh Thạch`;
      if (gainedTitles.length > 0) {
        msg += `\n🎉 Danh hiệu mới: ${gainedTitles.join(", ")}`;
      }
      
      return api.sendMessage(msg, threadID, messageID);
    }

    return api.sendMessage("❓ Lệnh không hợp lệ. Gõ `.tutien` để xem menu.", threadID, messageID);
  }

  static async onEvent({ event }) {
    const data = this.getAllData();
    const user = data[event.senderID];
    if (!user) return;
    
    let gain = Math.floor(Math.random() * 3) + 1;
    
    // Clan bonus for passive EXP
    if (user.clan) {
      const clanData = this.getClanData();
      const clan = clanData[user.clan];
      if (clan && clan.buildings?.library) {
        gain = Math.floor(gain * (1 + clan.buildings.library * 0.1));
      }
    }
    
    user.exp += gain;
    this.saveAllData(data);
  }

  static async onReply() {}
  static async onReaction() {}
};