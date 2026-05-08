/* ==================== script.js ==================== */
/* 【可修改区域说明】                                          */
/* 1. ACTIVITY_CONFIG - 核心活动配置（时间、图片、语言列表）    */
/* 2. TRANSLATIONS - 所有语言翻译文本                          */
/* 3. formatDateRange() - 日期格式化逻辑                       */
/* 4. getTimeUnits() - 时间单位翻译                            */
/* 5. 各语言包中的文本内容（奖池金额、规则、标签等）            */
/* ==================================================== */

/**
 * 【核心配置 - 请根据需要修改】
 * startDateTime: 活动开始时间 (ISO 8601格式)
 * endDateTime: 活动结束时间 (ISO 8601格式)
 * bannerImage: 活动Banner图片URL
 * bannerFallback: Banner加载失败时的备用图片
 * languages: 支持的语言列表（code: 语言代码, flag: 国旗图标URL, alt: 描述）
 */
const ACTIVITY_CONFIG = {
    startDateTime: "2026-06-01T20:00:00+08:00",  // 【可修改】活动开始时间
    endDateTime: "2026-06-30T00:59:00+08:00",     // 【可修改】活动结束时间
    bannerImage: "https://game-asset.all5555.com/lobby/YLczKaWFdSveYyMj.png", // 【可修改】Banner图片地址
    bannerFallback: "https://placehold.co/1200x300/f9cf7c/7a430e?text=OG+Anniversary", // 【可修改】备用图片
    languages: [  // 【可修改】支持的语言列表（增删语言）
        { code: "zh", flag: "https://pp88.asia/wp-content/polylang/zh_CN.svg", alt: "中文" },
        { code: "en", flag: "https://pp88.asia/wp-content/polylang/en_US.svg", alt: "English" },
        { code: "id", flag: "https://pp88.asia/wp-content/polylang/id_ID.svg", alt: "Indonesia" },
        { code: "th", flag: "https://pp88.asia/wp-content/polylang/th.svg", alt: "Thai" },
        { code: "vi", flag: "https://pp88.asia/wp-content/polylang/vi.svg", alt: "Vietnam" },
        { code: "ko", flag: "https://pp88.asia/wp-content/polylang/ko_KR.svg", alt: "Korean" },
        { code: "ja", flag: "https://pp88.asia/wp-content/polylang/ja.svg", alt: "Japanese" }
    ]
};

/**
 * 【多语言翻译 - 请根据需要修改各语言文本】
 * 每个语言包包含：
 * - pageTitle: 页面标题
 * - mainTitle/subTagline: 主副标题（含HTML标签）
 * - periodLabel: 活动周期标签
 * - totalPrizeStr: 奖池金额文本（【可修改】修改奖池显示金额）
 * - winnerCountStr: 获奖者描述
 * - dailyScheduleTitle: 赛程标题
 * - week1Label~week4Val: 每周赛程（【可修改】修改每周获奖人数和奖池）
 * - scoreTitle/scoreFormula/exampleNote: 积分公式相关
 * - rulesTitle/rules: 规则标题和列表（【可修改】修改活动规则）
 * - qualifiedHint: 资格提示
 * - globalTerms: 页脚条款
 * - countdownStartLabel/countdownEndLabel: 倒计时标签
 * - eventStarted/eventEnded: 活动状态文字
 * - timeUnits: 时间单位翻译
 */
const TRANSLATIONS = {
    zh: {
        pageTitle: "OG周年庆 | 视讯推广活动",
        mainTitle: '<span class="dynamic-icon">💰</span> OG周年庆 <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> 每日锦标赛 · 视讯推广活动 <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> 活动周期',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> 总奖池 ¥1,000,000',  // 【可修改】中文奖池金额
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> OG所有幸运玩家将赢得奖励',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> 赛程 & 每日奖池',
        week1Label: "第1周 (6月1日–7日):",       // 【可修改】第1周标签
        week1Val: "每日100名获奖者 · 奖池 ¥500",  // 【可修改】第1周描述
        week2Label: "第2周 (6月8日–14日):",
        week2Val: "每日50名获奖者 · 奖池 ¥1,000",
        week3Label: "第3周 (6月15日–21日):",
        week3Val: "每日20名获奖者 · 奖池 ¥5,000",
        week4Label: "第4周 (6月22日–30日):",
        week4Val: "每日10名获奖者 · 奖池 ¥10,000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> 锦标赛积分公式',
        scoreFormula: "得分 = (单次旋转最大获胜金额) / (该次旋转投注额) × 100",  // 【可修改】积分公式
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> 示例: 投注 ¥10 → 赢 ¥9.5 → 分数 = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> 活动规则',
        rules: [  // 【可修改】活动规则列表
            "视讯游戏: OG周年庆-视讯推广活动。",
            "每日锦标赛 20:00–00:59 (GMT+8) 进行，共28场。",
            "最低投注额¥10，基于单次旋转最大获胜金额(按注调整)。",
            "获胜连续超过 6次, 累计有效投注额奖金 本金¥10 × 获胜次数",
            "排行榜同分时，优先取得高分的玩家排名靠前。",
            "锦标赛排行榜内置于游戏内实时更新。",
            "Oriental Gaming 保留审查滥用行为及取消权利。",
            "主办方保留修改/取消活动权利，不另行通知。"
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> 视讯游戏: <strong>活动默认参加，任何会员自动参与，无需报名</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> 一般条款与规则适用。 Oriental Gaming 保留彻底审查玩家活动以识别潜在滥用行为的权利，确保公平性。若发现滥用行为，将没收奖励金额。请参阅完整条款。',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> 距活动开始',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> 距活动结束',
        eventStarted: "活动进行中",
        eventEnded: "活动已结束",
        timeUnits: { days: '天', hours: '时', minutes: '分', seconds: '秒' }
    },
    en: {
        pageTitle: "OG Anniversary | Live Casino Promotion",
        mainTitle: '<span class="dynamic-icon">💰</span> OG Anniversary <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> Daily Tournament · Live Casino Promotion <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> Event Period',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> Total Prize Pool ¥1,000,000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> All OG lucky players will win rewards',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> Schedule & Daily Prize',
        week1Label: "Week 1 (Jun 1–7):",
        week1Val: "100 winners/day · Prize ¥500",
        week2Label: "Week 2 (Jun 8–14):",
        week2Val: "50 winners/day · Prize ¥1,000",
        week3Label: "Week 3 (Jun 15–21):",
        week3Val: "20 winners/day · Prize ¥5,000",
        week4Label: "Week 4 (Jun 22–30):",
        week4Val: "10 winners/day · Prize ¥10,000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> Tournament Scoring',
        scoreFormula: "Score = (Max Single Spin Win) / (Bet Amount) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> Example: Bet ¥10 → Win ¥9.5 → Score = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> Event Rules',
        rules: [
            "Live Casino Game: OG Anniversary - Live Casino Promotion.",
            "Daily Tournament 20:00–00:59 (GMT+8), total 28 tournaments.",
            "Minimum bet ¥10. Based on max single spin win (bet-adjusted).",
            "Win more than 6 consecutive times, cumulative valid bet bonus: principal ¥10 × number of wins",
            "In case of tie, player who achieved score first ranks higher.",
            "Leaderboard embedded in-game, real-time updates.",
            "Oriental Gaming reserves right to review abuse & cancel prizes.",
            "Organizer reserves right to modify/cancel without notice."
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> Live Casino Game: <strong>OG Anniversary - Auto participation for all members, no registration required</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> General Terms apply. Oriental Gaming reserves the right to review player activity for any abusive behavior to ensure fairness. Any abuse will lead to prize forfeiture. Please refer to the full terms.',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> Countdown to Start',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> Countdown to End',
        eventStarted: "Event in Progress",
        eventEnded: "Event Ended",
        timeUnits: { days: 'd', hours: 'h', minutes: 'm', seconds: 's' }
    },
    id: {
        pageTitle: "HUT OG | Promosi Live Casino",
        mainTitle: '<span class="dynamic-icon">💰</span> HUT OG <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> Turnamen Harian · Promosi Live Casino <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> Periode',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> Total Hadiah ¥1.000.000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> Semua pemain OG yang beruntung akan memenangkan hadiah',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> Jadwal & Hadiah Harian',
        week1Label: "Minggu 1 (1–7 Jun):",
        week1Val: "100 pemenang/hari · Hadiah ¥500",
        week2Label: "Minggu 2 (8–14 Jun):",
        week2Val: "50 pemenang/hari · Hadiah ¥1.000",
        week3Label: "Minggu 3 (15–21 Jun):",
        week3Val: "20 pemenang/hari · Hadiah ¥5.000",
        week4Label: "Minggu 4 (22–30 Jun):",
        week4Val: "10 pemenang/hari · Hadiah ¥10.000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> Skor Turnamen',
        scoreFormula: "Skor = (Max Menang 1 putaran) / (Taruhan) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> Contoh: Taruhan ¥10 → Menang ¥9.5 → Skor = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> Aturan',
        rules: [
            "Game Live Casino: HUT OG - Promosi Live Casino.",
            "Turnamen Harian 20:00–00:59 (GMT+8), total 28 turnamen.",
            "Taruhan minimum ¥10. Berdasarkan max menang 1 putaran.",
            "Menang berturut-turut lebih dari 6 kali, bonus akumulatif: pokok ¥10 × jumlah menang",
            "Skor sama, pemain yang capai lebih dulu menang.",
            "Papan peringkat real-time dalam game.",
            "Oriental Gaming berhak meninjau penyalahgunaan & membatalkan hadiah.",
            "Penyelenggara berhak mengubah/membatalkan tanpa pemberitahuan."
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> Game Live Casino: <strong>HUT OG - Partisipasi otomatis untuk semua anggota, tanpa registrasi</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> Ketentuan umum berlaku. Oriental Gaming berhak meninjau aktivitas pemain untuk mengidentifikasi perilaku curang demi memastikan keadilan. Jika ditemukan kecurangan, hadiah akan disita. Silakan lihat ketentuan lengkap.',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> Mulai dalam',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> Berakhir dalam',
        eventStarted: "Acara Berlangsung",
        eventEnded: "Acara Selesai",
        timeUnits: { days: 'hr', hours: 'j', minutes: 'm', seconds: 'd' }
    },
    th: {
        pageTitle: "ครบรอบ OG | โปรโมชั่นคาสิโนสด",
        mainTitle: '<span class="dynamic-icon">💰</span> ครบรอบ OG <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> ทัวร์นาเมนต์รายวัน · โปรโมชั่นคาสิโนสด <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> ระยะเวลา',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> เงินรางวัลรวม ¥1,000,000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> ผู้เล่น OG ผู้โชคดีทุกท่านจะได้รับรางวัล',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> ตาราง & เงินรางวัลรายวัน',
        week1Label: "สัปดาห์ที่ 1 (1–7 มิ.ย.):",
        week1Val: "100 ผู้ชนะ/วัน · เงินรางวัล ¥500",
        week2Label: "สัปดาห์ที่ 2 (8–14 มิ.ย.):",
        week2Val: "50 ผู้ชนะ/วัน · เงินรางวัล ¥1,000",
        week3Label: "สัปดาห์ที่ 3 (15–21 มิ.ย.):",
        week3Val: "20 ผู้ชนะ/วัน · เงินรางวัล ¥5,000",
        week4Label: "สัปดาห์ที่ 4 (22–30 มิ.ย.):",
        week4Val: "10 ผู้ชนะ/วัน · เงินรางวัล ¥10,000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> คะแนนทัวร์นาเมนต์',
        scoreFormula: "คะแนน = (ชนะสูงสุด 1 รอบ) / (เดิมพัน) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> ตัวอย่าง: เดิมพัน ¥10 → ชนะ ¥9.5 → คะแนน = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> กฎกติกา',
        rules: [
            "เกมคาสิโนสด: ครบรอบ OG - โปรโมชั่นคาสิโนสด",
            "ทัวร์นาเมนต์รายวัน 20:00–00:59 (GMT+8) รวม 28 ครั้ง",
            "เดิมพันขั้นต่ำ ¥10 อิงตามการชนะสูงสุด 1 รอบ",
            "ชนะติดต่อกันเกิน 6 ครั้ง โบนัสสะสม: เงินต้น ¥10 × จำนวนครั้งที่ชนะ",
            "คะแนนเท่ากัน ผู้ที่ทำคะแนนได้ก่อนชนะ",
            "อัปเดตอันดับเรียลไทม์ในเกม",
            "Oriental Gaming ขอสงวนสิทธิ์ในการตรวจสอบและยกเลิก",
            "ผู้จัดขอสงวนสิทธิ์ในการเปลี่ยนแปลง/ยกเลิกโดยไม่ต้องแจ้ง"
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> เกมคาสิโนสด: <strong>ครบรอบ OG - เข้าร่วมอัตโนมัติสำหรับสมาชิกทุกคน ไม่ต้องลงทะเบียน</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> ข้อกำหนดทั่วไปมีผลบังคับใช้ Oriental Gaming ขอสงวนสิทธิ์ในการตรวจสอบกิจกรรมผู้เล่นเพื่อระบุพฤติกรรมที่ไม่เหมาะสมเพื่อให้เกิดความเป็นธรรม หากพบการละเมิดจะริบรางวัล กรุณาอ่านข้อกำหนดฉบับเต็ม',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> เริ่มใน',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> สิ้นสุดใน',
        eventStarted: "กิจกรรมกำลังดำเนินการ",
        eventEnded: "กิจกรรมสิ้นสุดแล้ว",
        timeUnits: { days: 'วัน', hours: 'ชม.', minutes: 'นาที', seconds: 'วิ' }
    },
    vi: {
        pageTitle: "Kỷ Niệm OG | Khuyến Mãi Casino",
        mainTitle: '<span class="dynamic-icon">💰</span> Kỷ Niệm OG <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> Giải Đấu Hàng Ngày · Khuyến Mãi Casino Trực Tuyến <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> Thời Gian',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> Tổng Giải Thưởng ¥1.000.000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> Tất cả người chơi OG may mắn sẽ giành được phần thưởng',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> Lịch & Giải Thưởng Hàng Ngày',
        week1Label: "Tuần 1 (1–7/6):",
        week1Val: "100 người thắng/ngày · Giải ¥500",
        week2Label: "Tuần 2 (8–14/6):",
        week2Val: "50 người thắng/ngày · Giải ¥1.000",
        week3Label: "Tuần 3 (15–21/6):",
        week3Val: "20 người thắng/ngày · Giải ¥5.000",
        week4Label: "Tuần 4 (22–30/6):",
        week4Val: "10 người thắng/ngày · Giải ¥10.000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> Điểm Số',
        scoreFormula: "Điểm = (Thắng lớn nhất 1 vòng) / (Cược) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> Ví dụ: Cược ¥10 → Thắng ¥9.5 → Điểm = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> Luật',
        rules: [
            "Game Casino Trực Tuyến: Kỷ Niệm OG - Khuyến Mãi Casino.",
            "Giải đấu hàng ngày 20:00–00:59 (GMT+8), tổng 28 giải.",
            "Cược tối thiểu ¥10. Dựa trên thắng lớn nhất 1 vòng.",
            "Thắng liên tiếp trên 6 lần, thưởng tích lũy: vốn ¥10 × số lần thắng",
            "Điểm bằng nhau, ai đạt trước xếp trên.",
            "Bảng xếp hạng cập nhật real-time trong game.",
            "Oriental Gaming có quyền kiểm tra & hủy giải.",
            "Ban tổ chức có quyền thay đổi/hủy mà không cần thông báo."
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> Game Casino: <strong>Kỷ Niệm OG - Tự động tham gia cho tất cả thành viên, không cần đăng ký</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> Điều khoản chung được áp dụng. Oriental Gaming có quyền kiểm tra hoạt động của người chơi để xác định hành vi lạm dụng nhằm đảm bảo công bằng. Mọi hành vi lạm dụng sẽ bị thu hồi giải thưởng. Vui lòng tham khảo điều khoản đầy đủ.',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> Bắt đầu sau',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> Kết thúc sau',
        eventStarted: "Sự kiện đang diễn ra",
        eventEnded: "Sự kiện đã kết thúc",
        timeUnits: { days: 'ngày', hours: 'giờ', minutes: 'phút', seconds: 'giây' }
    },
    ko: {
        pageTitle: "OG 기념일 | 라이브 카지노 프로모션",
        mainTitle: '<span class="dynamic-icon">💰</span> OG 기념일 <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> 데일리 토너먼트 · 라이브 카지노 프로모션 <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> 기간',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> 총 상금 ¥1,000,000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> 모든 OG 행운의 플레이어가 보상을 받습니다',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> 일정 & 일일 상금',
        week1Label: "1주차 (6월 1–7일):",
        week1Val: "일일 100명 · 상금 ¥500",
        week2Label: "2주차 (6월 8–14일):",
        week2Val: "일일 50명 · 상금 ¥1,000",
        week3Label: "3주차 (6월 15–21일):",
        week3Val: "일일 20명 · 상금 ¥5,000",
        week4Label: "4주차 (6월 22–30일):",
        week4Val: "일일 10명 · 상금 ¥10,000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> 점수',
        scoreFormula: "점수 = (최대 1회전 승리) / (베팅) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> 예시: 베팅 ¥10 → 승리 ¥9.5 → 점수 = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> 규칙',
        rules: [
            "라이브 카지노 게임: OG 기념일 - 라이브 카지노 프로모션.",
            "데일리 토너먼트 20:00–00:59 (GMT+8), 총 28회.",
            "최소 베팅 ¥10. 최대 1회전 승리 기준.",
            "연속 6회 이상 승리 시, 누적 유효 베팅 보너스: 원금 ¥10 × 승리 횟수",
            "동점 시 먼저 달성한 플레이어 우선.",
            "실시간 랭킹 업데이트.",
            "Oriental Gaming은 남용 검토 및 상금 취소 권리 보유.",
            "주최 측은 사전 통보 없이 변경/취소 가능."
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> 라이브 카지노 게임: <strong>OG 기념일 - 모든 회원 자동 참여, 등록 불필요</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> 일반 약관이 적용됩니다. Oriental Gaming은 공정성을 보장하기 위해 플레이어 활동을 검토하여 부정 행위를 식별할 권리를 보유합니다. 부정 행위가 발견되면 상금이 몰수됩니다. 전체 약관을 참조하십시오.',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> 시작까지',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> 종료까지',
        eventStarted: "이벤트 진행 중",
        eventEnded: "이벤트 종료됨",
        timeUnits: { days: '일', hours: '시', minutes: '분', seconds: '초' }
    },
    ja: {
        pageTitle: "OGアニバーサリー | ライブカジノプロモーション",
        mainTitle: '<span class="dynamic-icon">💰</span> OGアニバーサリー <span class="dynamic-icon">💰</span>',
        subTagline: '<span class="emoji-animate emoji-pulse">💎</span> デイリートーナメント · ライブカジノプロモーション <span class="emoji-animate emoji-pulse">💎</span>',
        periodLabel: '<span class="emoji-animate emoji-float">📅</span> 期間',
        totalPrizeStr: '<span class="emoji-animate emoji-glow">🎯</span> 総賞金 ¥1,000,000',
        winnerCountStr: '<span class="emoji-animate emoji-bounce">🏆</span> すべてのOGラッキープレイヤーが報酬を獲得します',
        dailyScheduleTitle: '<span class="emoji-animate emoji-float">📆</span> スケジュール & デイリー賞金',
        week1Label: "第1週 (6月1日–7日):",
        week1Val: "毎日100名 · 賞金 ¥500",
        week2Label: "第2週 (6月8日–14日):",
        week2Val: "毎日50名 · 賞金 ¥1,000",
        week3Label: "第3週 (6月15日–21日):",
        week3Val: "毎日20名 · 賞金 ¥5,000",
        week4Label: "第4週 (6月22日–30日):",
        week4Val: "毎日10名 · 賞金 ¥10,000",
        scoreTitle: '<span class="emoji-animate emoji-shake">🎲</span> スコア',
        scoreFormula: "スコア = (最大1回転勝利額) / (ベット額) × 100",
        exampleNote: '<span class="emoji-animate emoji-pulse">📌</span> 例: ベット ¥10 → 勝利 ¥9.5 → スコア = 0.95',
        rulesTitle: '<span class="emoji-animate emoji-bounce">🍭</span> ルール',
        rules: [
            "ライブカジノゲーム: OGアニバーサリー - ライブカジノプロモーション。",
            "デイリートーナメント 20:00–00:59 (GMT+8)、全28回。",
            "最低ベット ¥10。最大1回転勝利額に基づく。",
            "6回以上連続勝利で累積有効ベットボーナス: 元金 ¥10 × 勝利回数",
            "同点の場合は先にスコアを達成したプレイヤーが上位。",
            "リアルタイムランキング更新。",
            "Oriental Gamingは不正行為の審査および賞金取消の権利を保有。",
            "主催者は予告なく変更/中止する権利を保有。"
        ],
        qualifiedHint: '<span class="emoji-animate emoji-pulse">✅</span> ライブカジノゲーム: <strong>OGアニバーサリー - 全会員自動参加、登録不要</strong>',
        globalTerms: '<span class="emoji-animate emoji-glow">⚡</span> 一般利用規約が適用されます。Oriental Gamingは公正さを確保するため、プレイヤー活動を審査し不正行為を特定する権利を保有します。不正行為が発見された場合、賞金は没収されます。完全な利用規約をご参照ください。',
        countdownStartLabel: '<span class="emoji-animate emoji-pulse">⏳</span> 開始まで',
        countdownEndLabel: '<span class="emoji-animate emoji-shake">⌛</span> 終了まで',
        eventStarted: "イベント進行中",
        eventEnded: "イベント終了",
        timeUnits: { days: '日', hours: '時間', minutes: '分', seconds: '秒' }
    }
};

// ==================== DOM元素引用 ====================
const getElement = (id) => document.getElementById(id);

const DOM = {
    langSwitcher: getElement('langSwitcher'),
    bannerImg: getElement('bannerImage'),
    mainTitle: getElement('mainTitle'),
    subTagline: getElement('subTagline'),
    periodLabel: getElement('periodLabel'),
    periodDateRange: getElement('periodDateRange'),
    totalPrizeStr: getElement('totalPrizeStr'),
    winnerCountStr: getElement('winnerCountStr'),
    dailyScheduleTitle: getElement('dailyScheduleTitle'),
    scheduleList: getElement('scheduleList'),
    scoreTitle: getElement('scoreTitle'),
    scoreFormula: getElement('scoreFormula'),
    exampleNote: getElement('exampleNote'),
    rulesTitle: getElement('rulesTitle'),
    rulesList: getElement('rulesList'),
    qualifiedHint: getElement('qualifiedHint'),
    globalTerms: getElement('globalTerms'),
    countdownStartLabel: getElement('countdownStartLabel'),
    countdownStartDigits: getElement('countdownStartDigits'),
    countdownStartDays: getElement('countdownStartDays'),
    countdownStartHMS: getElement('countdownStartHMS'),
    countdownEndLabel: getElement('countdownEndLabel'),
    countdownEndDigits: getElement('countdownEndDigits'),
    countdownEndDays: getElement('countdownEndDays'),
    countdownEndHMS: getElement('countdownEndHMS'),
    pageTitle: document.querySelector('title')
};

/**
 * 格式化日期范围
 * 【可修改】日期显示格式 - 调整toLocaleString的options参数
 */
function formatDateRange(startDateTime, endDateTime, lang) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false  // 【可修改】改为true使用12小时制
    };
    const locale = lang === 'zh' ? 'zh-CN' : (lang === 'ja' ? 'ja-JP' : (lang === 'ko' ? 'ko-KR' : 'en-US'));
    const startStr = start.toLocaleString(locale, options);
    const endStr = end.toLocaleString(locale, options);
    return `${startStr} → ${endStr} (GMT+8)`;
}

/** 构建语言切换按钮 */
function buildLanguageSwitcher() {
    if (!DOM.langSwitcher) return;
    DOM.langSwitcher.innerHTML = '';
    ACTIVITY_CONFIG.languages.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'country-btn';
        btn.setAttribute('data-lang', lang.code);
        btn.innerHTML = `<img src="${lang.flag}" alt="${lang.alt}" loading="lazy">`;
        btn.addEventListener('click', () => {
            applyLanguage(lang.code);
            document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            saveLanguagePreference(lang.code);
        });
        DOM.langSwitcher.appendChild(btn);
    });
}

/** 构建赛程列表 */
function buildScheduleList(langData) {
    if (!DOM.scheduleList) return;
    DOM.scheduleList.innerHTML = '';
    const weeks = [
        { label: langData.week1Label, value: langData.week1Val },
        { label: langData.week2Label, value: langData.week2Val },
        { label: langData.week3Label, value: langData.week3Val },
        { label: langData.week4Label, value: langData.week4Val }
    ];
    weeks.forEach(week => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.innerHTML = `<span>${week.label}</span><span class="week-highlight">${week.value}</span>`;
        DOM.scheduleList.appendChild(div);
    });
}

/** 构建规则列表 */
function buildRulesList(langData) {
    if (!DOM.rulesList) return;
    DOM.rulesList.innerHTML = '';
    langData.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        DOM.rulesList.appendChild(li);
    });
}

/** 获取时间单位翻译 */
function getTimeUnits(lang) {
    const dict = TRANSLATIONS[lang];
    const tu = (dict && dict.timeUnits) ? dict.timeUnits : { days: '天', hours: '时', minutes: '分', seconds: '秒' };
    return {
        days: tu.days || '天',
        hours: tu.hours || '时',
        minutes: tu.minutes || '分',
        seconds: tu.seconds || '秒'
    };
}

/** 格式化倒计时各部分 */
function formatCountdownParts(diff, lang) {
    if (diff <= 0) return null;
    const tu = getTimeUnits(lang);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return {
        daysStr: `${String(days).padStart(2, '0')}${tu.days}`,
        hmsStr: `${String(hours).padStart(2, '0')}${tu.hours} ${String(mins).padStart(2, '0')}${tu.minutes} ${String(secs).padStart(2, '0')}${tu.seconds}`
    };
}

/** 获取当前语言 */
function getCurrentLanguage() {
    const activeBtn = document.querySelector('.country-btn.active');
    if (activeBtn) return activeBtn.getAttribute('data-lang');
    return 'zh';
}

/** 更新单个倒计时 */
function updateSingleCountdown(daysEl, hmsEl, targetDate, statusKey, lang) {
    if (!daysEl || !hmsEl) return;
    const now = new Date();
    const diff = targetDate - now;
    const dict = TRANSLATIONS[lang];
    const statusText = dict ? (dict[statusKey] || statusKey) : statusKey;
    if (diff <= 0) {
        daysEl.textContent = statusText;
        daysEl.className = 'countdown-status';
        hmsEl.style.display = 'none';
        daysEl.style.color = statusKey === 'eventStarted' ? '#1e6b3a' : '#c0392b';
    } else {
        const parts = formatCountdownParts(diff, lang);
        if (parts) {
            daysEl.textContent = parts.daysStr;
            daysEl.className = 'countdown-days';
            daysEl.style.color = '#c76e2e';
            hmsEl.textContent = parts.hmsStr;
            hmsEl.style.display = 'inline-block';
            hmsEl.style.color = '#b45f1b';
        }
    }
}

/** 更新所有倒计时 */
function updateCountdowns(forceLang) {
    const currentLang = forceLang || getCurrentLanguage();
    const startDate = new Date(ACTIVITY_CONFIG.startDateTime);
    const endDate = new Date(ACTIVITY_CONFIG.endDateTime);
    updateSingleCountdown(DOM.countdownStartDays, DOM.countdownStartHMS, startDate, 'eventStarted', currentLang);
    updateSingleCountdown(DOM.countdownEndDays, DOM.countdownEndHMS, endDate, 'eventEnded', currentLang);
}

/** 应用语言 */
function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;
    if (DOM.pageTitle) DOM.pageTitle.textContent = dict.pageTitle;
    if (DOM.mainTitle) DOM.mainTitle.innerHTML = dict.mainTitle;
    if (DOM.subTagline) DOM.subTagline.innerHTML = dict.subTagline;
    if (DOM.periodLabel) DOM.periodLabel.innerHTML = dict.periodLabel;
    if (DOM.totalPrizeStr) DOM.totalPrizeStr.innerHTML = dict.totalPrizeStr;
    if (DOM.winnerCountStr) DOM.winnerCountStr.innerHTML = dict.winnerCountStr;
    if (DOM.dailyScheduleTitle) DOM.dailyScheduleTitle.innerHTML = dict.dailyScheduleTitle;
    if (DOM.scoreTitle) DOM.scoreTitle.innerHTML = dict.scoreTitle;
    if (DOM.scoreFormula) DOM.scoreFormula.textContent = dict.scoreFormula;
    if (DOM.exampleNote) DOM.exampleNote.innerHTML = dict.exampleNote;
    if (DOM.rulesTitle) DOM.rulesTitle.innerHTML = dict.rulesTitle;
    if (DOM.qualifiedHint) DOM.qualifiedHint.innerHTML = dict.qualifiedHint;
    if (DOM.globalTerms) DOM.globalTerms.innerHTML = dict.globalTerms;
    if (DOM.countdownStartLabel) DOM.countdownStartLabel.innerHTML = dict.countdownStartLabel;
    if (DOM.countdownEndLabel) DOM.countdownEndLabel.innerHTML = dict.countdownEndLabel;
    if (DOM.periodDateRange) {
        DOM.periodDateRange.textContent = formatDateRange(ACTIVITY_CONFIG.startDateTime, ACTIVITY_CONFIG.endDateTime, lang);
    }
    buildScheduleList(dict);
    buildRulesList(dict);
    updateCountdowns(lang);
}

/** 设置Banner图片 */
function setupBanner() {
    if (!DOM.bannerImg) return;
    DOM.bannerImg.src = ACTIVITY_CONFIG.bannerImage;
    DOM.bannerImg.onerror = () => {
        if (DOM.bannerImg) DOM.bannerImg.src = ACTIVITY_CONFIG.bannerFallback;
    };
}

/** 保存语言偏好到localStorage */
function saveLanguagePreference(lang) {
    try { localStorage.setItem('preferred_language', lang); } catch (e) {}
}

/** 加载语言偏好 */
function loadLanguagePreference() {
    try { return localStorage.getItem('preferred_language'); } catch (e) { return null; }
}

/** 检测浏览器语言 */
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    const supported = ACTIVITY_CONFIG.languages.some(l => l.code === langCode);
    return supported ? langCode : 'zh';
}

/** 初始化语言（优先级：URL参数 > localStorage > 浏览器语言 > 默认中文） */
function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');  // 【可修改】URL参数名（当前为'lang'）
    let targetLang = 'zh';
    if (urlLang && TRANSLATIONS[urlLang]) {
        targetLang = urlLang;
    } else {
        const savedLang = loadLanguagePreference();
        if (savedLang && TRANSLATIONS[savedLang]) {
            targetLang = savedLang;
        } else {
            const browserLang = detectBrowserLanguage();
            if (browserLang) targetLang = browserLang;
        }
    }
    const targetBtn = document.querySelector(`.country-btn[data-lang="${targetLang}"]`);
    if (targetBtn) {
        document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
    }
    applyLanguage(targetLang);
    saveLanguagePreference(targetLang);
}

/** 初始化 */
function init() {
    setupBanner();
    buildLanguageSwitcher();
    initLanguage();
    // 【可修改】倒计时更新频率（当前1000ms = 1秒）
    setInterval(() => updateCountdowns(), 1000);
}

// 页面加载完成后执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}