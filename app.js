// ============================================================
// Duo-Verse English - app.js  (PART 1 of 2)
// Sections 1-8: Data, Store Items, Onboarding, Tokens,
//               Sounds, Confetti, Speech, Navigation + Learn Hub
// ============================================================

// =============================================================
// 1. LEARNING DATA
// =============================================================

const alphabetData = [
    { letter: 'A', word: 'Apple 苹果', phonetic: 'eɪ' },
    { letter: 'B', word: 'Bear 熊', phonetic: 'biː' },
    { letter: 'C', word: 'Cat 猫', phonetic: 'siː' },
    { letter: 'D', word: 'Dog 狗', phonetic: 'diː' },
    { letter: 'E', word: 'Elephant 大象', phonetic: 'iː' },
    { letter: 'F', word: 'Fish 鱼', phonetic: 'ef' },
    { letter: 'G', word: 'Giraffe 长颈鹿', phonetic: 'dʒiː' },
    { letter: 'H', word: 'Hat 帽子', phonetic: 'eɪtʃ' },
    { letter: 'I', word: 'Ice cream 冰淇淋', phonetic: 'aɪ' },
    { letter: 'J', word: 'Juice 果汁', phonetic: 'dʒeɪ' },
    { letter: 'K', word: 'Kite 风筝', phonetic: 'keɪ' },
    { letter: 'L', word: 'Lion 狮子', phonetic: 'el' },
    { letter: 'M', word: 'Moon 月亮', phonetic: 'em' },
    { letter: 'N', word: 'Nest 鸟巢', phonetic: 'en' },
    { letter: 'O', word: 'Orange 橙子', phonetic: 'oʊ' },
    { letter: 'P', word: 'Panda 熊猫', phonetic: 'piː' },
    { letter: 'Q', word: 'Queen 女王', phonetic: 'kjuː' },
    { letter: 'R', word: 'Rabbit 兔子', phonetic: 'ɑːr' },
    { letter: 'S', word: 'Sun 太阳', phonetic: 'es' },
    { letter: 'T', word: 'Tiger 老虎', phonetic: 'tiː' },
    { letter: 'U', word: 'Umbrella 雨伞', phonetic: 'juː' },
    { letter: 'V', word: 'Violin 小提琴', phonetic: 'viː' },
    { letter: 'W', word: 'Water 水', phonetic: 'ˈdʌbəljuː' },
    { letter: 'X', word: 'Xylophone 木琴', phonetic: 'eks' },
    { letter: 'Y', word: 'Yellow 黄色', phonetic: 'waɪ' },
    { letter: 'Z', word: 'Zebra 斑马', phonetic: 'ziː' }
];

const numbersData = [
    { num: 1, en: 'One', cn: '一', emoji: '1️⃣', phonetic: 'wʌn' },
    { num: 2, en: 'Two', cn: '二', emoji: '2️⃣', phonetic: 'tuː' },
    { num: 3, en: 'Three', cn: '三', emoji: '3️⃣', phonetic: 'θriː' },
    { num: 4, en: 'Four', cn: '四', emoji: '4️⃣', phonetic: 'fɔːr' },
    { num: 5, en: 'Five', cn: '五', emoji: '5️⃣', phonetic: 'faɪv' },
    { num: 6, en: 'Six', cn: '六', emoji: '6️⃣', phonetic: 'sɪks' },
    { num: 7, en: 'Seven', cn: '七', emoji: '7️⃣', phonetic: 'ˈsevən' },
    { num: 8, en: 'Eight', cn: '八', emoji: '8️⃣', phonetic: 'eɪt' },
    { num: 9, en: 'Nine', cn: '九', emoji: '9️⃣', phonetic: 'naɪn' },
    { num: 10, en: 'Ten', cn: '十', emoji: '🔟', phonetic: 'ten' },
    { num: 11, en: 'Eleven', cn: '十一', emoji: '1️⃣1️⃣', phonetic: 'ɪˈlevən' },
    { num: 12, en: 'Twelve', cn: '十二', emoji: '1️⃣2️⃣', phonetic: 'twelv' },
    { num: 13, en: 'Thirteen', cn: '十三', emoji: '1️⃣3️⃣', phonetic: 'θɜːrˈtiːn' },
    { num: 14, en: 'Fourteen', cn: '十四', emoji: '1️⃣4️⃣', phonetic: 'fɔːrˈtiːn' },
    { num: 15, en: 'Fifteen', cn: '十五', emoji: '1️⃣5️⃣', phonetic: 'fɪfˈtiːn' },
    { num: 16, en: 'Sixteen', cn: '十六', emoji: '1️⃣6️⃣', phonetic: 'sɪksˈtiːn' },
    { num: 17, en: 'Seventeen', cn: '十七', emoji: '1️⃣7️⃣', phonetic: 'sevənˈtiːn' },
    { num: 18, en: 'Eighteen', cn: '十八', emoji: '1️⃣8️⃣', phonetic: 'eɪˈtiːn' },
    { num: 19, en: 'Nineteen', cn: '十九', emoji: '1️⃣9️⃣', phonetic: 'naɪnˈtiːn' },
    { num: 20, en: 'Twenty', cn: '二十', emoji: '2️⃣0️⃣', phonetic: 'ˈtwenti' }
];

const colorsData = [
    { en: 'Red', cn: '红色', hex: '#FF4444', phonetic: 'red' },
    { en: 'Orange', cn: '橙色', hex: '#FF8C00', phonetic: 'ˈɔːrɪndʒ' },
    { en: 'Yellow', cn: '黄色', hex: '#FFD700', phonetic: 'ˈjeloʊ' },
    { en: 'Green', cn: '绿色', hex: '#28A745', phonetic: 'ɡriːn' },
    { en: 'Blue', cn: '蓝色', hex: '#007BFF', phonetic: 'bluː' },
    { en: 'Purple', cn: '紫色', hex: '#8B5CF6', phonetic: 'ˈpɜːrpəl' },
    { en: 'Pink', cn: '粉色', hex: '#FF69B4', phonetic: 'pɪŋk' },
    { en: 'Brown', cn: '棕色', hex: '#8B4513', phonetic: 'braʊn' },
    { en: 'Black', cn: '黑色', hex: '#222222', phonetic: 'blæk' },
    { en: 'White', cn: '白色', hex: '#F5F5F5', phonetic: 'waɪt' },
    { en: 'Gray', cn: '灰色', hex: '#808080', phonetic: 'ɡreɪ' },
    { en: 'Gold', cn: '金色', hex: '#DAA520', phonetic: 'ɡoʊld' }
];

const animalsData = [
    { en: 'Cat', cn: '猫', emoji: '🐱', phonetic: 'kæt' },
    { en: 'Dog', cn: '狗', emoji: '🐶', phonetic: 'dɔːɡ' },
    { en: 'Fish', cn: '鱼', emoji: '🐟', phonetic: 'fɪʃ' },
    { en: 'Bird', cn: '鸟', emoji: '🐦', phonetic: 'bɜːrd' },
    { en: 'Rabbit', cn: '兔子', emoji: '🐰', phonetic: 'ˈræbɪt' },
    { en: 'Panda', cn: '熊猫', emoji: '🐼', phonetic: 'ˈpændə' },
    { en: 'Elephant', cn: '大象', emoji: '🐘', phonetic: 'ˈelɪfənt' },
    { en: 'Tiger', cn: '老虎', emoji: '🐯', phonetic: 'ˈtaɪɡər' },
    { en: 'Lion', cn: '狮子', emoji: '🦁', phonetic: 'ˈlaɪən' },
    { en: 'Monkey', cn: '猴子', emoji: '🐵', phonetic: 'ˈmʌŋki' },
    { en: 'Horse', cn: '马', emoji: '🐴', phonetic: 'hɔːrs' },
    { en: 'Cow', cn: '牛', emoji: '🐮', phonetic: 'kaʊ' },
    { en: 'Pig', cn: '猪', emoji: '🐷', phonetic: 'pɪɡ' },
    { en: 'Sheep', cn: '羊', emoji: '🐑', phonetic: 'ʃiːp' },
    { en: 'Duck', cn: '鸭子', emoji: '🦆', phonetic: 'dʌk' },
    { en: 'Frog', cn: '青蛙', emoji: '🐸', phonetic: 'frɔːɡ' },
    { en: 'Bear', cn: '熊', emoji: '🐻', phonetic: 'ber' },
    { en: 'Turtle', cn: '乌龟', emoji: '🐢', phonetic: 'ˈtɜːrtəl' },
    { en: 'Butterfly', cn: '蝴蝶', emoji: '🦋', phonetic: 'ˈbʌtərflaɪ' },
    { en: 'Dolphin', cn: '海豚', emoji: '🐬', phonetic: 'ˈdɑːlfɪn' }
];

const foodData = [
    { en: 'Apple', cn: '苹果', emoji: '🍎', phonetic: 'ˈæpəl' },
    { en: 'Banana', cn: '香蕉', emoji: '🍌', phonetic: 'bəˈnænə' },
    { en: 'Orange', cn: '橙子', emoji: '🍊', phonetic: 'ˈɔːrɪndʒ' },
    { en: 'Grape', cn: '葡萄', emoji: '🍇', phonetic: 'ɡreɪp' },
    { en: 'Watermelon', cn: '西瓜', emoji: '🍉', phonetic: 'ˈwɔːtərmelən' },
    { en: 'Strawberry', cn: '草莓', emoji: '🍓', phonetic: 'ˈstrɔːberi' },
    { en: 'Bread', cn: '面包', emoji: '🍞', phonetic: 'bred' },
    { en: 'Rice', cn: '米饭', emoji: '🍚', phonetic: 'raɪs' },
    { en: 'Noodles', cn: '面条', emoji: '🍜', phonetic: 'ˈnuːdəlz' },
    { en: 'Egg', cn: '鸡蛋', emoji: '🥚', phonetic: 'eɡ' },
    { en: 'Milk', cn: '牛奶', emoji: '🥛', phonetic: 'mɪlk' },
    { en: 'Water', cn: '水', emoji: '💧', phonetic: 'ˈwɔːtər' },
    { en: 'Cake', cn: '蛋糕', emoji: '🎂', phonetic: 'keɪk' },
    { en: 'Ice cream', cn: '冰淇淋', emoji: '🍦', phonetic: 'aɪs kriːm' },
    { en: 'Pizza', cn: '披萨', emoji: '🍕', phonetic: 'ˈpiːtsə' },
    { en: 'Chicken', cn: '鸡肉', emoji: '🍗', phonetic: 'ˈtʃɪkɪn' }
];

const bodyData = [
    { en: 'Head', cn: '头', emoji: '😊', phonetic: 'hed' },
    { en: 'Hair', cn: '头发', emoji: '💇', phonetic: 'her' },
    { en: 'Eye', cn: '眼睛', emoji: '👁️', phonetic: 'aɪ' },
    { en: 'Ear', cn: '耳朵', emoji: '👂', phonetic: 'ɪr' },
    { en: 'Nose', cn: '鼻子', emoji: '👃', phonetic: 'noʊz' },
    { en: 'Mouth', cn: '嘴巴', emoji: '👄', phonetic: 'maʊθ' },
    { en: 'Tooth', cn: '牙齿', emoji: '🦷', phonetic: 'tuːθ' },
    { en: 'Hand', cn: '手', emoji: '✋', phonetic: 'hænd' },
    { en: 'Finger', cn: '手指', emoji: '👆', phonetic: 'ˈfɪŋɡər' },
    { en: 'Arm', cn: '手臂', emoji: '💪', phonetic: 'ɑːrm' },
    { en: 'Leg', cn: '腿', emoji: '🦵', phonetic: 'leɡ' },
    { en: 'Foot', cn: '脚', emoji: '🦶', phonetic: 'fʊt' },
    { en: 'Heart', cn: '心脏', emoji: '❤️', phonetic: 'hɑːrt' },
    { en: 'Shoulder', cn: '肩膀', emoji: '🤷', phonetic: 'ˈʃoʊldər' },
    { en: 'Knee', cn: '膝盖', emoji: '🦵', phonetic: 'niː' },
    { en: 'Face', cn: '脸', emoji: '😀', phonetic: 'feɪs' }
];

const greetingsData = [
    { en: 'Hello!', cn: '你好！', emoji: '👋', phonetic: 'heˈloʊ' },
    { en: 'Good morning!', cn: '早上好！', emoji: '🌅', phonetic: 'ɡʊd ˈmɔːrnɪŋ' },
    { en: 'Good afternoon!', cn: '下午好！', emoji: '☀️', phonetic: 'ɡʊd æftərˈnuːn' },
    { en: 'Good evening!', cn: '晚上好！', emoji: '🌙', phonetic: 'ɡʊd ˈiːvnɪŋ' },
    { en: 'Good night!', cn: '晚安！', emoji: '😴', phonetic: 'ɡʊd naɪt' },
    { en: 'Goodbye!', cn: '再见！', emoji: '👋', phonetic: 'ɡʊdˈbaɪ' },
    { en: 'Thank you!', cn: '谢谢！', emoji: '🙏', phonetic: 'θæŋk juː' },
    { en: "You're welcome!", cn: '不客气！', emoji: '😊', phonetic: 'jʊr ˈwelkəm' },
    { en: 'Please.', cn: '请。', emoji: '🙏', phonetic: 'pliːz' },
    { en: "I'm sorry.", cn: '对不起。', emoji: '😔', phonetic: 'aɪm ˈsɑːri' },
    { en: 'Excuse me.', cn: '打扰一下。', emoji: '🙋', phonetic: 'ɪkˈskjuːz miː' },
    { en: 'How are you?', cn: '你好吗？', emoji: '😃', phonetic: 'haʊ ɑːr juː' }
];

const sentencesData = [
    { en: 'My name is...', cn: '我的名字是……', phonetic: 'maɪ neɪm ɪz', context: '自我介绍时说' },
    { en: 'I am ... years old.', cn: '我……岁了。', phonetic: 'aɪ æm ... jɪrz oʊld', context: '告诉别人你几岁' },
    { en: 'I like...', cn: '我喜欢……', phonetic: 'aɪ laɪk', context: '说你喜欢什么' },
    { en: "I don't like...", cn: '我不喜欢……', phonetic: 'aɪ doʊnt laɪk', context: '说你不喜欢什么' },
    { en: 'What is this?', cn: '这是什么？', phonetic: 'wʌt ɪz ðɪs', context: '问东西是什么' },
    { en: 'This is a...', cn: '这是一个……', phonetic: 'ðɪs ɪz ə', context: '回答东西是什么' },
    { en: 'I can see a...', cn: '我能看到一个……', phonetic: 'aɪ kæn siː ə', context: '描述你看到的东西' },
    { en: 'Where is the...?', cn: '……在哪里？', phonetic: 'wer ɪz ðə', context: '问东西在哪' },
    { en: 'I want...', cn: '我想要……', phonetic: 'aɪ wɑːnt', context: '说你想要什么' },
    { en: 'Can I have...?', cn: '我能要……吗？', phonetic: 'kæn aɪ hæv', context: '礼貌地请求' },
    { en: "Let's play!", cn: '我们一起玩吧！', phonetic: 'lets pleɪ', context: '邀请别人玩' },
    { en: 'I am happy.', cn: '我很开心。', phonetic: 'aɪ æm ˈhæpi', context: '表达开心的心情' },
    { en: 'I am hungry.', cn: '我饿了。', phonetic: 'aɪ æm ˈhʌŋɡri', context: '告诉别人你饿了' },
    { en: 'I love you.', cn: '我爱你。', phonetic: 'aɪ lʌv juː', context: '表达爱' },
    { en: 'Help me, please.', cn: '请帮帮我。', phonetic: 'help miː pliːz', context: '请求帮助' },
    { en: 'See you tomorrow!', cn: '明天见！', phonetic: 'siː juː təˈmɑːroʊ', context: '和朋友道别' }
];

// =============================================================
// LEVEL 2+ VOCABULARY (unlocked as player levels up)
// =============================================================

var level2Words = [
    { en: 'Family', cn: '家庭', emoji: '👨‍👩‍👧‍👦', phonetic: 'ˈfæməli', cat: 'people' },
    { en: 'Mother', cn: '妈妈', emoji: '👩', phonetic: 'ˈmʌðər', cat: 'people' },
    { en: 'Father', cn: '爸爸', emoji: '👨', phonetic: 'ˈfɑːðər', cat: 'people' },
    { en: 'Sister', cn: '姐妹', emoji: '👧', phonetic: 'ˈsɪstər', cat: 'people' },
    { en: 'Brother', cn: '兄弟', emoji: '👦', phonetic: 'ˈbrʌðər', cat: 'people' },
    { en: 'Friend', cn: '朋友', emoji: '🤝', phonetic: 'frend', cat: 'people' },
    { en: 'Teacher', cn: '老师', emoji: '👩‍🏫', phonetic: 'ˈtiːtʃər', cat: 'people' },
    { en: 'Happy', cn: '开心', emoji: '😊', phonetic: 'ˈhæpi', cat: 'feeling' },
    { en: 'Sad', cn: '伤心', emoji: '😢', phonetic: 'sæd', cat: 'feeling' },
    { en: 'Angry', cn: '生气', emoji: '😠', phonetic: 'ˈæŋɡri', cat: 'feeling' },
    { en: 'Tired', cn: '累了', emoji: '😫', phonetic: 'ˈtaɪərd', cat: 'feeling' },
    { en: 'Sunny', cn: '晴天', emoji: '☀️', phonetic: 'ˈsʌni', cat: 'weather' },
    { en: 'Rainy', cn: '下雨', emoji: '🌧️', phonetic: 'ˈreɪni', cat: 'weather' },
    { en: 'Snowy', cn: '下雪', emoji: '❄️', phonetic: 'ˈsnoʊi', cat: 'weather' },
    { en: 'Windy', cn: '刮风', emoji: '💨', phonetic: 'ˈwɪndi', cat: 'weather' },
    { en: 'Monday', cn: '星期一', emoji: '📅', phonetic: 'ˈmʌndeɪ', cat: 'days' },
    { en: 'School', cn: '学校', emoji: '🏫', phonetic: 'skuːl', cat: 'places' },
    { en: 'Home', cn: '家', emoji: '🏠', phonetic: 'hoʊm', cat: 'places' },
    { en: 'Park', cn: '公园', emoji: '🏞️', phonetic: 'pɑːrk', cat: 'places' },
    { en: 'Book', cn: '书', emoji: '📚', phonetic: 'bʊk', cat: 'things' },
    { en: 'Pencil', cn: '铅笔', emoji: '✏️', phonetic: 'ˈpensəl', cat: 'things' },
    { en: 'Chair', cn: '椅子', emoji: '🪑', phonetic: 'tʃer', cat: 'things' },
    { en: 'Table', cn: '桌子', emoji: '🪵', phonetic: 'ˈteɪbəl', cat: 'things' },
    { en: 'Door', cn: '门', emoji: '🚪', phonetic: 'dɔːr', cat: 'things' },
];

var level3Words = [
    { en: 'Beautiful', cn: '美丽的', emoji: '🌺', phonetic: 'ˈbjuːtɪfəl', cat: 'adjective' },
    { en: 'Different', cn: '不同的', emoji: '🔀', phonetic: 'ˈdɪfərənt', cat: 'adjective' },
    { en: 'Important', cn: '重要的', emoji: '⭐', phonetic: 'ɪmˈpɔːrtənt', cat: 'adjective' },
    { en: 'Because', cn: '因为', emoji: '💡', phonetic: 'bɪˈkɔːz', cat: 'connector' },
    { en: 'Together', cn: '一起', emoji: '🤝', phonetic: 'təˈɡeðər', cat: 'adverb' },
    { en: 'Sometimes', cn: '有时候', emoji: '🔄', phonetic: 'ˈsʌmtaɪmz', cat: 'adverb' },
    { en: 'Favorite', cn: '最喜欢的', emoji: '❤️', phonetic: 'ˈfeɪvərɪt', cat: 'adjective' },
    { en: 'Breakfast', cn: '早餐', emoji: '🥞', phonetic: 'ˈbrekfəst', cat: 'meal' },
    { en: 'Lunch', cn: '午餐', emoji: '🍱', phonetic: 'lʌntʃ', cat: 'meal' },
    { en: 'Dinner', cn: '晚餐', emoji: '🍽️', phonetic: 'ˈdɪnər', cat: 'meal' },
    { en: 'Tomorrow', cn: '明天', emoji: '📆', phonetic: 'təˈmɑːroʊ', cat: 'time' },
    { en: 'Yesterday', cn: '昨天', emoji: '⏪', phonetic: 'ˈjestərdeɪ', cat: 'time' },
    { en: 'Always', cn: '总是', emoji: '♾️', phonetic: 'ˈɔːlweɪz', cat: 'adverb' },
    { en: 'Never', cn: '从不', emoji: '🚫', phonetic: 'ˈnevər', cat: 'adverb' },
    { en: 'Chocolate', cn: '巧克力', emoji: '🍫', phonetic: 'ˈtʃɑːklət', cat: 'food' },
    { en: 'Birthday', cn: '生日', emoji: '🎂', phonetic: 'ˈbɜːrθdeɪ', cat: 'event' },
    { en: 'Christmas', cn: '圣诞节', emoji: '🎄', phonetic: 'ˈkrɪsməs', cat: 'event' },
    { en: 'Wonderful', cn: '奇妙的', emoji: '✨', phonetic: 'ˈwʌndərfəl', cat: 'adjective' },
    { en: 'Remember', cn: '记住', emoji: '🧠', phonetic: 'rɪˈmembər', cat: 'verb' },
    { en: 'Understand', cn: '理解', emoji: '🤔', phonetic: 'ˌʌndərˈstænd', cat: 'verb' },
];

// =============================================================
// 2. STORE ITEMS
// =============================================================

// Rarity: common, rare, epic, legendary
const storeItems = [
    // Badges
    { id: 'badge-star', name: '小星星徽章', nameEn: 'Star Badge', emoji: '⭐', price: 5, type: 'badge', rarity: 'common', desc: '闪亮的入门徽章！' },
    { id: 'badge-rocket', name: '火箭徽章', nameEn: 'Rocket Badge', emoji: '🚀', price: 10, type: 'badge', rarity: 'common', desc: '冲向宇宙！' },
    { id: 'badge-fire', name: '火焰徽章', nameEn: 'Fire Badge', emoji: '🔥', price: 15, type: 'badge', rarity: 'rare', desc: '你太厉害了！' },
    { id: 'badge-crown', name: '皇冠徽章', nameEn: 'Crown Badge', emoji: '👑', price: 20, type: 'badge', rarity: 'epic', desc: '学霸专属！' },
    { id: 'badge-rainbow', name: '彩虹徽章', nameEn: 'Rainbow Badge', emoji: '🌈', price: 25, type: 'badge', rarity: 'epic', desc: '七彩好心情～' },
    { id: 'badge-diamond', name: '钻石徽章', nameEn: 'Diamond Badge', emoji: '💎', price: 30, type: 'badge', rarity: 'legendary', desc: '最珍贵的宝石！' },
    // Pets
    { id: 'pet-cat', name: '小猫咪', nameEn: 'Kitty', emoji: '🐱', price: 15, type: 'pet', rarity: 'common', desc: '喵喵陪你学英语～' },
    { id: 'pet-dog', name: '小狗狗', nameEn: 'Puppy', emoji: '🐶', price: 15, type: 'pet', rarity: 'common', desc: '汪汪是你的好伙伴！' },
    { id: 'pet-panda', name: '小熊猫', nameEn: 'Panda', emoji: '🐼', price: 25, type: 'pet', rarity: 'rare', desc: '圆滚滚超可爱！' },
    { id: 'pet-unicorn', name: '独角兽', nameEn: 'Unicorn', emoji: '🦄', price: 40, type: 'pet', rarity: 'epic', desc: '传说中的神奇生物！' },
    { id: 'pet-dragon', name: '小龙龙', nameEn: 'Dragon', emoji: '🐲', price: 50, type: 'pet', rarity: 'legendary', desc: '最酷的宠物！' },
    // Themes
    { id: 'theme-ocean', name: '海洋主题', nameEn: 'Ocean Theme', emoji: '🌊', price: 35, type: 'theme', rarity: 'rare', desc: '蓝色海洋风格！' },
    { id: 'theme-forest', name: '森林主题', nameEn: 'Forest Theme', emoji: '🌲', price: 35, type: 'theme', rarity: 'rare', desc: '绿色大自然！' },
    { id: 'theme-candy', name: '糖果主题', nameEn: 'Candy Theme', emoji: '🍬', price: 35, type: 'theme', rarity: 'rare', desc: '甜甜的糖果世界！' },
    { id: 'theme-space', name: '太空主题', nameEn: 'Space Theme', emoji: '🌌', price: 45, type: 'theme', rarity: 'epic', desc: '探索无尽宇宙！' },
    // Accessories
    { id: 'acc-tophat', name: '礼帽', nameEn: 'Top Hat', emoji: '🎩', price: 10, type: 'acc', slot: 'hat', rarity: 'rare', desc: '绅士风度！' },
    { id: 'acc-crown-hat', name: '金冠', nameEn: 'Gold Crown', emoji: '👑', price: 25, type: 'acc', slot: 'hat', rarity: 'legendary', desc: '国王/女王驾到！' },
    { id: 'acc-cap', name: '棒球帽', nameEn: 'Baseball Cap', emoji: '🧢', price: 8, type: 'acc', slot: 'hat', rarity: 'common', desc: '酷酷的棒球帽！' },
    { id: 'acc-party-hat', name: '派对帽', nameEn: 'Party Hat', emoji: '🥳', price: 12, type: 'acc', slot: 'hat', rarity: 'rare', desc: '每天都是派对！' },
    { id: 'acc-glasses', name: '墨镜', nameEn: 'Sunglasses', emoji: '🕶️', price: 10, type: 'acc', slot: 'glasses', rarity: 'rare', desc: '超级酷！' },
    { id: 'acc-nerd', name: '书呆子眼镜', nameEn: 'Nerd Glasses', emoji: '🤓', price: 8, type: 'acc', slot: 'glasses', rarity: 'common', desc: '学霸标配！' },
    { id: 'acc-scarf', name: '围巾', nameEn: 'Scarf', emoji: '🧣', price: 10, type: 'acc', slot: 'scarf', rarity: 'common', desc: '暖暖的围巾！' },
    { id: 'acc-bow', name: '蝴蝶结', nameEn: 'Bow Tie', emoji: '🎀', price: 8, type: 'acc', slot: 'scarf', rarity: 'common', desc: '可爱的蝴蝶结！' },
    // Outfits (change character clothing)
    { id: 'outfit-red', name: '红色T恤', nameEn: 'Red Tee', emoji: '👕', price: 10, type: 'acc', slot: 'outfit', rarity: 'common', desc: '经典红色！', colors: { shirt: '#FF4444', shirtDark: '#CC3333' } },
    { id: 'outfit-purple', name: '紫色卫衣', nameEn: 'Purple Hoodie', emoji: '👚', price: 15, type: 'acc', slot: 'outfit', rarity: 'rare', desc: '超酷紫色！', colors: { shirt: '#8B5CF6', shirtDark: '#7C3AED' } },
    { id: 'outfit-gold', name: '金色夹克', nameEn: 'Gold Jacket', emoji: '🧥', price: 25, type: 'acc', slot: 'outfit', rarity: 'epic', desc: '闪闪发光的金色！', colors: { shirt: '#FFD700', shirtDark: '#DAA520' } },
    { id: 'outfit-black', name: '黑色酷装', nameEn: 'Black Cool', emoji: '🖤', price: 20, type: 'acc', slot: 'outfit', rarity: 'rare', desc: '酷到没朋友！', colors: { shirt: '#2D3436', shirtDark: '#1a1a1a' } },
    { id: 'outfit-rainbow', name: '彩虹裙', nameEn: 'Rainbow Dress', emoji: '🌈', price: 30, type: 'acc', slot: 'outfit', rarity: 'epic', desc: '七彩梦幻裙子！', colors: { shirt: '#FF69B4', shirtDark: '#FF1493' } },
    { id: 'outfit-white', name: '白色校服', nameEn: 'School Uniform', emoji: '👔', price: 12, type: 'acc', slot: 'outfit', rarity: 'common', desc: '干净整洁的校服风！', colors: { shirt: '#F0F0F0', shirtDark: '#D0D0D0' } },
    { id: 'outfit-ocean', name: '海洋蓝装', nameEn: 'Ocean Blue', emoji: '🌊', price: 20, type: 'acc', slot: 'outfit', rarity: 'rare', desc: '深海蓝超好看！', colors: { shirt: '#0077B6', shirtDark: '#005F8A' } },
    { id: 'outfit-legend', name: '传说战甲', nameEn: 'Legendary Armor', emoji: '⚔️', price: 50, type: 'acc', slot: 'outfit', rarity: 'legendary', desc: '最酷的传说级战甲！', colors: { shirt: '#FF6B6B', shirtDark: '#E55A5A' } },
    // Hairstyles
    { id: 'hair-spiky', name: '酷酷刺头', nameEn: 'Spiky', emoji: '💇‍♂️', price: 0, type: 'acc', slot: 'hair', rarity: 'common', desc: '经典帅气刺头！', hairStyle: 'spiky' },
    { id: 'hair-buzz', name: '短寸头', nameEn: 'Buzz Cut', emoji: '👨‍🦲', price: 8, type: 'acc', slot: 'hair', rarity: 'common', desc: '干净利落！', hairStyle: 'buzz' },
    { id: 'hair-long', name: '飘逸长发', nameEn: 'Long Hair', emoji: '💇‍♀️', price: 0, type: 'acc', slot: 'hair', rarity: 'common', desc: '美丽飘逸～', hairStyle: 'long' },
    { id: 'hair-ponytail', name: '马尾辫', nameEn: 'Ponytail', emoji: '🎀', price: 12, type: 'acc', slot: 'hair', rarity: 'rare', desc: '活泼可爱的马尾！', hairStyle: 'ponytail' },
    { id: 'hair-curly', name: '卷卷头', nameEn: 'Curly', emoji: '🌀', price: 15, type: 'acc', slot: 'hair', rarity: 'rare', desc: '蓬松可爱的卷发！', hairStyle: 'curly' },
    { id: 'hair-buns', name: '双丸子头', nameEn: 'Double Buns', emoji: '🍡', price: 20, type: 'acc', slot: 'hair', rarity: 'epic', desc: '超萌双丸子头！', hairStyle: 'buns' },
    // Hair colors
    { id: 'haircolor-black', name: '黑色头发', nameEn: 'Black Hair', emoji: '🖤', price: 5, type: 'acc', slot: 'haircolor', rarity: 'common', desc: '经典黑发！', hairColor: '#1a1a2e', hairLight: '#333' },
    { id: 'haircolor-brown', name: '棕色头发', nameEn: 'Brown Hair', emoji: '🤎', price: 5, type: 'acc', slot: 'haircolor', rarity: 'common', desc: '自然棕色～', hairColor: '#3D2314', hairLight: '#6B4C3B' },
    { id: 'haircolor-blonde', name: '金色头发', nameEn: 'Blonde Hair', emoji: '💛', price: 10, type: 'acc', slot: 'haircolor', rarity: 'rare', desc: '闪亮金发！', hairColor: '#DAA520', hairLight: '#FFD700' },
    { id: 'haircolor-red', name: '红色头发', nameEn: 'Red Hair', emoji: '❤️', price: 12, type: 'acc', slot: 'haircolor', rarity: 'rare', desc: '热情红发！', hairColor: '#B22222', hairLight: '#DC3545' },
    { id: 'haircolor-blue', name: '蓝色头发', nameEn: 'Blue Hair', emoji: '💙', price: 18, type: 'acc', slot: 'haircolor', rarity: 'epic', desc: '二次元蓝发！', hairColor: '#1E3A8A', hairLight: '#3B82F6' },
    { id: 'haircolor-pink', name: '粉色头发', nameEn: 'Pink Hair', emoji: '💗', price: 18, type: 'acc', slot: 'haircolor', rarity: 'epic', desc: '梦幻粉发！', hairColor: '#DB2777', hairLight: '#F472B6' },
    { id: 'haircolor-rainbow', name: '彩虹头发', nameEn: 'Rainbow Hair', emoji: '🌈', price: 35, type: 'acc', slot: 'haircolor', rarity: 'legendary', desc: '传说级彩虹发色！', hairColor: '#8B5CF6', hairLight: '#F59E0B' },
    // Decorations
    { id: 'deco-sparkle', name: '闪闪亮', nameEn: 'Sparkles', emoji: '✨', price: 10, type: 'deco', rarity: 'common', desc: '让主页闪闪发光！' },
    { id: 'deco-flower', name: '小花朵', nameEn: 'Flowers', emoji: '🌸', price: 10, type: 'deco', rarity: 'common', desc: '漂亮的花朵装饰！' },
    { id: 'deco-star', name: '闪亮星', nameEn: 'Shiny Star', emoji: '🌟', price: 15, type: 'deco', rarity: 'rare', desc: '星星点缀！' },
    { id: 'deco-party', name: '派对彩带', nameEn: 'Party Popper', emoji: '🎉', price: 20, type: 'deco', rarity: 'epic', desc: '庆祝每一次进步！' }
];

// =============================================================
// 3. ONBOARDING
// =============================================================

function obNext(stepId) {
    document.querySelectorAll('.ob-step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}

function obSaveName() {
    var nameVal = document.getElementById('ob-name-input').value.trim();
    var name = nameVal || '小朋友';
    localStorage.setItem('duoverse_name', name);
    obNext('ob-avatar');
}

function obPickAvatar(el) {
    var gender = el.getAttribute('data-gender');
    localStorage.setItem('duoverse_gender', gender);

    // Remove .selected from all siblings
    var siblings = el.parentElement.querySelectorAll('.avatar-option');
    siblings.forEach(function(sib) {
        sib.classList.remove('selected');
    });
    el.classList.add('selected');

    // Show avatar extras
    var extras = document.getElementById('avatar-extras');
    extras.classList.remove('hidden');

    // Populate skin picker
    var skinPicker = document.getElementById('skin-picker');
    skinPicker.innerHTML = '';

    var skins = gender === 'girl'
        ? ['👧', '👧🏻', '👧🏼', '👧🏽', '👧🏾', '👧🏿']
        : ['👦', '👦🏻', '👦🏼', '👦🏽', '👦🏾', '👦🏿'];

    skins.forEach(function(skin, index) {
        var span = document.createElement('span');
        span.className = 'skin-option';
        span.textContent = skin;
        span.onclick = function() {
            skinPicker.querySelectorAll('.skin-option').forEach(function(s) {
                s.classList.remove('selected');
            });
            span.classList.add('selected');
            localStorage.setItem('duoverse_avatar', skin);
        };
        skinPicker.appendChild(span);

        // Default select the first one
        if (index === 0) {
            span.classList.add('selected');
            localStorage.setItem('duoverse_avatar', skin);
        }
    });

    parseEmojis(document.getElementById('ob-avatar'));
}

function obFinish() {
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    localStorage.setItem('duoverse_onboarded', 'true');
    initApp();
    launchConfetti();
}

// =============================================================
// 4. TOKEN SYSTEM
// =============================================================

function getTokens() {
    return parseInt(localStorage.getItem('duoverse_tokens') || '0', 10);
}

function setTokens(n) {
    localStorage.setItem('duoverse_tokens', String(n));
    updateTokenDisplay();
}

function addTokens(n) {
    var current = getTokens();
    setTokens(current + n);
    if (n > 0) showTokenPopup(n);
}

function getOwned() {
    try {
        return JSON.parse(localStorage.getItem('duoverse_owned') || '[]');
    } catch (e) {
        return [];
    }
}

function addOwned(id) {
    var owned = getOwned();
    if (owned.indexOf(id) === -1) {
        owned.push(id);
        localStorage.setItem('duoverse_owned', JSON.stringify(owned));
    }
}

function getActiveTheme() {
    return localStorage.getItem('duoverse_active_theme') || '';
}

function setActiveTheme(id) {
    localStorage.setItem('duoverse_active_theme', id);
}

function getActivePet() {
    return localStorage.getItem('duoverse_active_pet') || '';
}

function setActivePet(id) {
    localStorage.setItem('duoverse_active_pet', id);
}

function getStreak() {
    return parseInt(localStorage.getItem('duoverse_streak') || '0', 10);
}

function addStreak() {
    var streak = getStreak() + 1;
    localStorage.setItem('duoverse_streak', String(streak));
}

function resetStreak() {
    localStorage.setItem('duoverse_streak', '0');
}

// Accessories: stored as JSON {hat:'acc-tophat', glasses:'', scarf:''}
function getEquipped() {
    try {
        return JSON.parse(localStorage.getItem('duoverse_equipped') || '{}');
    } catch(e) { return {}; }
}

function setEquipped(obj) {
    localStorage.setItem('duoverse_equipped', JSON.stringify(obj));
}

function equipAccessory(item) {
    var eq = getEquipped();
    if (eq[item.slot] === item.id) {
        // unequip
        eq[item.slot] = '';
    } else {
        eq[item.slot] = item.id;
    }
    setEquipped(eq);
}

function updateTokenDisplay() {
    var tokens = getTokens();
    var el1 = document.getElementById('token-count');
    var el2 = document.getElementById('store-token-count');
    var el3 = document.getElementById('hp-tokens');
    if (el1) el1.textContent = tokens;
    if (el2) el2.textContent = tokens;
    if (el3) el3.textContent = tokens;
}

function showTokenPopup(n) {
    var div = document.createElement('div');
    div.className = 'token-popup';
    div.textContent = '+' + n + ' 🪙';
    document.body.appendChild(div);
    requestAnimationFrame(function() {
        div.classList.add('show');
    });
    setTimeout(function() {
        div.remove();
    }, 1500);
}

// =============================================================
// LEVEL SYSTEM
// =============================================================

function getLevel() {
    return parseInt(localStorage.getItem('duoverse_level') || '1', 10);
}

function getXP() {
    return parseInt(localStorage.getItem('duoverse_xp') || '0', 10);
}

function xpForLevel(level) {
    return level * 10; // Level 1 needs 10xp, Level 2 needs 20xp, etc.
}

function addXP(amount) {
    var xp = getXP() + amount;
    var level = getLevel();
    var needed = xpForLevel(level);

    while (xp >= needed && level < 10) {
        xp -= needed;
        level++;
        needed = xpForLevel(level);
        // Level up!
        launchConfetti();
        playBigWinSound();
        addTokens(level * 2); // bonus tokens for leveling up
    }

    localStorage.setItem('duoverse_xp', String(xp));
    localStorage.setItem('duoverse_level', String(level));
    updateLevelDisplay();
}

function updateLevelDisplay() {
    var level = getLevel();
    var xp = getXP();
    var needed = xpForLevel(level);

    var badgeEl = document.getElementById('hp-level-badge');
    var fillEl = document.getElementById('hp-xp-fill');
    var textEl = document.getElementById('hp-xp-text');
    var quizLevelEl = document.getElementById('quiz-level-display');

    if (badgeEl) badgeEl.textContent = 'Lv.' + level;
    if (fillEl) fillEl.style.width = Math.min((xp / needed) * 100, 100) + '%';
    if (textEl) textEl.textContent = xp + '/' + needed;
    if (quizLevelEl) {
        var levelName = level <= 2 ? '初级 Beginner' : (level <= 4 ? '中级 Intermediate' : '高级 Advanced');
        quizLevelEl.innerHTML = '<span class="quiz-level-pill">Lv.' + level + ' ' + levelName + '</span>';
    }

    // Unlock America tab at level 10
    var americaBtn = document.getElementById('america-nav-btn');
    if (americaBtn) {
        if (level >= 10) {
            americaBtn.classList.remove('hidden');
        } else {
            americaBtn.classList.add('hidden');
        }
    }
}

// Get the quiz word pool based on current level
function getLevelQuizPool(category) {
    var level = getLevel();
    var pool = getQuizPool(category);

    // At level 3+, mix in level2 words
    if (level >= 3) {
        var extra = level2Words.map(function(w) {
            return { question: w.emoji, answer: w.en, chinese: w.cn };
        });
        pool = pool.concat(extra);
    }

    // At level 5+, mix in level3 words
    if (level >= 5) {
        var extra3 = level3Words.map(function(w) {
            return { question: w.emoji, answer: w.en, chinese: w.cn };
        });
        pool = pool.concat(extra3);
    }

    return pool;
}

// =============================================================
// SPELLING HELPERS - accept alternate spellings
// =============================================================

var altSpellings = {
    'gray': ['grey', 'gray'],
    'grey': ['grey', 'gray'],
    'home': ['home', 'house'],
    'house': ['home', 'house'],
    'mother': ['mother', 'mom', 'mum', 'mama'],
    'father': ['father', 'dad', 'papa'],
    'noodles': ['noodles', 'noodle'],
    'ice cream': ['ice cream', 'icecream'],
    'goodbye': ['goodbye', 'bye', 'bye bye'],
    'hello': ['hello', 'hi', 'hey'],
};

function isSpellingCorrect(attempt, correct) {
    var a = attempt.toLowerCase().trim();
    var c = correct.toLowerCase().trim();
    if (a === c) return true;
    // Check alternates
    var alts = altSpellings[c];
    if (alts && alts.indexOf(a) !== -1) return true;
    // Also check if the correct word has alts that include the attempt
    for (var key in altSpellings) {
        if (altSpellings[key].indexOf(c) !== -1 && altSpellings[key].indexOf(a) !== -1) return true;
    }
    return false;
}

// Gentle wrong-answer messages (rotate randomly)
var gentleWrongMsgs = [
    '差一点点！The answer is: ',
    '没关系！正确答案是: ',
    '好接近了！It\'s actually: ',
    '加油！答案是: ',
    '别灰心！The right one is: ',
];

function getGentleWrong() {
    return gentleWrongMsgs[Math.floor(Math.random() * gentleWrongMsgs.length)];
}

// =============================================================
// 5. SOUNDS (Web Audio API)
// =============================================================

var _audioCtx = null;

function getAudioCtx() {
    if (!_audioCtx) {
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return _audioCtx;
}

function playCorrectSound() {
    try {
        var ctx = getAudioCtx();
        var now = ctx.currentTime;
        // Ascending sine notes: C5, E5, G5, C6
        var notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach(function(freq, i) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.35);
        });
    } catch (e) {}
}

function playWrongSound() {
    try {
        var ctx = getAudioCtx();
        var now = ctx.currentTime;
        // Square wave descending buzz
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    } catch (e) {}
}

function playBigWinSound() {
    try {
        var ctx = getAudioCtx();
        var now = ctx.currentTime;
        // Longer ascending melody
        var melody = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        melody.forEach(function(freq, i) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.25, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.45);
        });
    } catch (e) {}
}

function playPurchaseSound() {
    try {
        var ctx = getAudioCtx();
        var now = ctx.currentTime;
        // Triangle arpeggio
        var arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25];
        arpeggio.forEach(function(freq, i) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.35);
        });
    } catch (e) {}
}

// =============================================================
// 6. CONFETTI
// =============================================================

function launchConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    var pieces = [];
    var colors = ['#FF4444', '#FF8C00', '#FFD700', '#28A745', '#007BFF', '#8B5CF6', '#FF69B4', '#00CED1'];

    for (var i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * -1,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            alpha: 1
        });
    }

    var frame;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var alive = false;
        pieces.forEach(function(p) {
            if (p.alpha <= 0) return;
            alive = true;
            p.x += p.vx;
            p.vy += 0.05; // gravity
            p.y += p.vy;
            p.rot += p.rotSpeed;

            // Fade out near bottom
            if (p.y > canvas.height * 0.75) {
                p.alpha -= 0.02;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (alive) {
            frame = requestAnimationFrame(animate);
        } else {
            // Cleanup
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            cancelAnimationFrame(frame);
        }
    }

    animate();
}

// =============================================================
// 7. SPEECH
// =============================================================

function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
}

// =============================================================
// 8. NAVIGATION + LEARN HUB
// =============================================================

function showSection(id) {
    // Always clear game intervals when navigating away from any section
    clearAllGameIntervals();

    // Toggle sections
    document.querySelectorAll('.section').forEach(function(sec) {
        sec.classList.remove('active');
    });
    var target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Toggle nav buttons
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    var activeBtn = document.querySelector('.nav-btn[data-section="' + id + '"]');
    if (activeBtn) activeBtn.classList.add('active');

    // Section-specific logic
    if (id === 'store') {
        buildStore();
    } else if (id === 'home') {
        refreshHomepage();
    } else if (id === 'games') {
        var gameSelect = document.getElementById('game-select');
        var gameArea = document.getElementById('game-area');
        if (gameSelect) gameSelect.style.display = '';
        if (gameArea) {
            gameArea.classList.add('hidden');
            gameArea.innerHTML = '';
        }
    } else if (id === 'leveltest') {
        startLevelTest();
    } else if (id === 'dressup') {
        buildDressUp();
    } else if (id === 'settings') {
        buildSettings();
    } else if (id === 'america') {
        buildAmericaFacts();
    } else if (id === 'sentences-workout') {
        buildSentenceWorkout();
    } else if (id === 'brain') {
        showBrainTab('riddles', document.querySelector('.brain-tab'));
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function showLearnTab(tab, btnEl) {
    // Toggle active tab button
    document.querySelectorAll('.learn-tab').forEach(function(t) {
        t.classList.remove('active');
    });
    if (btnEl) btnEl.classList.add('active');

    // Clear and build content
    var content = document.getElementById('learn-content');
    content.innerHTML = '';

    if (tab === 'alphabet') {
        var grid = document.createElement('div');
        grid.className = 'card-grid alphabet-grid';

        alphabetData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card letter-card';
            card.innerHTML =
                '<div class="card-letter">' + item.letter + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-word">' + item.word + '</div>';
            card.onclick = function() {
                speak(item.letter + '. ' + item.word.split(' ')[0]);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'numbers') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        numbersData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="card-emoji">' + item.emoji + '</div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'colors') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        colorsData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="color-swatch" style="background:' + item.hex + ';width:50px;height:50px;border-radius:50%;margin:0 auto 8px;border:3px solid rgba(0,0,0,0.1);"></div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'animals') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        animalsData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="card-emoji">' + item.emoji + '</div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'food') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        foodData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="card-emoji">' + item.emoji + '</div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'body') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        bodyData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="card-emoji">' + item.emoji + '</div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'greetings') {
        var grid = document.createElement('div');
        grid.className = 'card-grid';

        greetingsData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML =
                '<div class="card-emoji">' + item.emoji + '</div>' +
                '<div class="card-english">' + item.en + '</div>' +
                '<div class="card-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="card-chinese">' + item.cn + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            grid.appendChild(card);
        });

        content.appendChild(grid);

    } else if (tab === 'sentences') {
        var list = document.createElement('div');
        list.className = 'sentences-list';

        sentencesData.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'sentence-card';
            card.innerHTML =
                '<div class="sentence-en">' + item.en + '</div>' +
                '<div class="sentence-phonetic">/' + item.phonetic + '/</div>' +
                '<div class="sentence-cn">' + item.cn + '</div>' +
                '<div class="sentence-context">' + item.context + '</div>';
            card.onclick = function() {
                speak(item.en);
            };
            list.appendChild(card);
        });

        content.appendChild(list);

    } else if (tab === 'compare') {
        var comparisons = [
            { cn_think: '我要一个冰淇淋', cn_direct: 'I want one ice cream', en_real: 'Can I have a scoop of ice cream, please?', note: '美国人会说"一勺"(scoop)，还会加"please"表示礼貌！' },
            { cn_think: '你几岁了？', cn_direct: 'You how many years old?', en_real: 'How old are you?', note: '英语把"how old"放在前面，不说"几岁"！' },
            { cn_think: '我很喜欢吃苹果', cn_direct: 'I very like eat apple', en_real: 'I really like eating apples', note: '"很"不说"very"，用"really"。"吃"要变成"eating"，苹果要加"s"！' },
            { cn_think: '这个多少钱？', cn_direct: 'This how much money?', en_real: 'How much does this cost?', note: '英语把问题词放前面，还要加"does"和"cost"！' },
            { cn_think: '我的妈妈是老师', cn_direct: 'My mama is teacher', en_real: 'My mom is a teacher', note: '英语要在职业前加"a"，妈妈说"mom"更口语化！' },
            { cn_think: '外面下雨了', cn_direct: 'Outside down rain', en_real: 'It\'s raining outside', note: '英语用"It\'s raining"，要加"it"和"-ing"！' },
            { cn_think: '我有两个哥哥', cn_direct: 'I have two older brother', en_real: 'I have two older brothers', note: '两个以上要加"s"！英语的"哥哥"就是"older brother"。' },
            { cn_think: '你想吃什么？', cn_direct: 'You want eat what?', en_real: 'What would you like to eat?', note: '"什么"放在句子最前面！"would you like"比"want"更礼貌。' },
            { cn_think: '我昨天去了公园', cn_direct: 'I yesterday go park', en_real: 'I went to the park yesterday', note: '"去"变成过去式"went"，要加"to the"，时间放最后！' },
            { cn_think: '他跑得很快', cn_direct: 'He run very fast', en_real: 'He runs really fast', note: '他/她后面的动词要加"s"！"很"用"really"更地道。' },
            { cn_think: '这是我的好朋友', cn_direct: 'This is my good friend', en_real: 'This is my best friend', note: '这句差不多对！但"好朋友"用"best friend"更地道～' },
            { cn_think: '我不会游泳', cn_direct: 'I not can swim', en_real: 'I can\'t swim', note: '"不会"用"can\'t"，放在动词前面！' },
        ];

        var wrapper = document.createElement('div');
        wrapper.className = 'compare-area';
        wrapper.innerHTML = '<div class="compare-intro"><h3>🇨🇳 中文思维 vs 🇺🇸 美式英语</h3><p>看看中文直译和真正的英语有什么不同！</p></div>';

        comparisons.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'compare-card';
            card.innerHTML =
                '<div class="compare-cn">' +
                    '<div class="compare-label">🇨🇳 中文想法</div>' +
                    '<div class="compare-text">' + item.cn_think + '</div>' +
                '</div>' +
                '<div class="compare-wrong">' +
                    '<div class="compare-label">❌ 直接翻译</div>' +
                    '<div class="compare-text strikethrough">' + item.cn_direct + '</div>' +
                '</div>' +
                '<div class="compare-right">' +
                    '<div class="compare-label">✅ 美国人这样说</div>' +
                    '<div class="compare-text correct-text">' + item.en_real + '</div>' +
                '</div>' +
                '<div class="compare-note">💡 ' + item.note + '</div>';
            card.onclick = function() {
                speak(item.en_real);
            };
            wrapper.appendChild(card);
        });

        content.appendChild(wrapper);

    } else if (tab === 'spelling') {
        var level = getLevel();
        var wordPool = animalsData.concat(foodData, bodyData);
        if (level >= 3) wordPool = wordPool.concat(level2Words);
        if (level >= 5) wordPool = wordPool.concat(level3Words);
        shuffle(wordPool);
        var spellWords = wordPool.slice(0, 15);
        var spellIndex = 0;
        var spellCorrect = 0;

        var wrapper = document.createElement('div');
        wrapper.className = 'spelling-area';

        var prompt = document.createElement('div');
        prompt.className = 'spell-prompt';
        wrapper.appendChild(prompt);

        var inputRow = document.createElement('div');
        inputRow.className = 'spell-input-row';
        var spellInput = document.createElement('input');
        spellInput.type = 'text';
        spellInput.className = 'spell-input';
        spellInput.placeholder = '输入英文单词...';
        spellInput.autocomplete = 'off';
        spellInput.autocapitalize = 'off';
        inputRow.appendChild(spellInput);
        var checkBtn = document.createElement('button');
        checkBtn.className = 'writing-btn next-btn';
        checkBtn.textContent = '检查 Check ✓';
        inputRow.appendChild(checkBtn);
        wrapper.appendChild(inputRow);

        var feedback = document.createElement('div');
        feedback.className = 'spell-feedback';
        wrapper.appendChild(feedback);

        var scoreDiv = document.createElement('div');
        scoreDiv.className = 'spell-score';
        wrapper.appendChild(scoreDiv);

        content.appendChild(wrapper);

        function showSpellWord() {
            if (spellIndex >= spellWords.length) {
                // Done
                var pct = spellCorrect / spellWords.length;
                var reward = pct >= 0.8 ? 3 : (pct >= 0.5 ? 2 : 1);
                addTokens(reward);
                addXP(reward);
                if (pct >= 0.5) launchConfetti();
                prompt.innerHTML = '<div style="font-size:3rem;">🎉</div><div style="font-size:1.5rem;font-weight:bold;">完成！' + spellCorrect + '/' + spellWords.length + ' 正确</div><div>+' + reward + ' 🪙 +' + reward + ' XP</div>';
                inputRow.style.display = 'none';
                feedback.textContent = '';
                return;
            }
            var w = spellWords[spellIndex];
            prompt.innerHTML = '<div class="spell-emoji">' + (w.emoji || '📝') + '</div><div class="spell-chinese">' + w.cn + '</div><div class="spell-hint">拼写这个单词！ Spell this word!</div>';
            spellInput.value = '';
            spellInput.focus();
            feedback.textContent = '';
            scoreDiv.textContent = '第 ' + (spellIndex + 1) + '/' + spellWords.length + ' 题 | ✅ ' + spellCorrect;
        }

        checkBtn.onclick = function() {
            var answer = spellInput.value.trim();
            var correctWord = spellWords[spellIndex].en;
            if (isSpellingCorrect(answer, correctWord)) {
                spellCorrect++;
                feedback.innerHTML = '✅ 正确！Perfect! 🎉';
                feedback.style.color = '#28A745';
                playCorrectSound();
                addXP(1);
            } else {
                feedback.innerHTML = '🌟 ' + getGentleWrong() + '<strong>' + correctWord + '</strong>';
                feedback.style.color = '#FB923C';
                playWrongSound();
            }
            spellIndex++;
            setTimeout(showSpellWord, 1200);
        };

        spellInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') checkBtn.click();
        });

        showSpellWord();

    } else if (tab === 'scramble') {
        var level = getLevel();
        var wordPool = animalsData.concat(foodData);
        if (level >= 3) wordPool = wordPool.concat(level2Words);
        if (level >= 5) wordPool = wordPool.concat(level3Words);
        shuffle(wordPool);
        var scrambleWords = wordPool.slice(0, 10);
        var scrIndex = 0;
        var scrCorrect = 0;

        var wrapper = document.createElement('div');
        wrapper.className = 'scramble-area';

        var hintDiv = document.createElement('div');
        hintDiv.className = 'scramble-hint';
        wrapper.appendChild(hintDiv);

        var lettersDiv = document.createElement('div');
        lettersDiv.className = 'scramble-letters';
        wrapper.appendChild(lettersDiv);

        var answerDiv = document.createElement('div');
        answerDiv.className = 'scramble-answer';
        wrapper.appendChild(answerDiv);

        var controlsDiv = document.createElement('div');
        controlsDiv.className = 'scramble-controls';
        var clearScrBtn = document.createElement('button');
        clearScrBtn.className = 'writing-btn clear-btn';
        clearScrBtn.textContent = '🗑️ 重来 Reset';
        controlsDiv.appendChild(clearScrBtn);
        var speakScrBtn = document.createElement('button');
        speakScrBtn.className = 'writing-btn speak-btn';
        speakScrBtn.textContent = '🔊 听发音';
        controlsDiv.appendChild(speakScrBtn);
        wrapper.appendChild(controlsDiv);

        var scrFeedback = document.createElement('div');
        scrFeedback.className = 'scramble-feedback';
        wrapper.appendChild(scrFeedback);

        var scrScore = document.createElement('div');
        scrScore.className = 'spell-score';
        wrapper.appendChild(scrScore);

        content.appendChild(wrapper);

        var currentAnswer = [];
        var currentWord = '';

        function showScramble() {
            if (scrIndex >= scrambleWords.length) {
                var pct = scrCorrect / scrambleWords.length;
                var reward = pct >= 0.8 ? 3 : (pct >= 0.5 ? 2 : 1);
                addTokens(reward);
                addXP(reward);
                if (pct >= 0.5) launchConfetti();
                hintDiv.innerHTML = '<div style="font-size:3rem;">🎉</div><div style="font-size:1.5rem;font-weight:bold;">完成！' + scrCorrect + '/' + scrambleWords.length + ' 正确</div><div>+' + reward + ' 🪙</div>';
                lettersDiv.innerHTML = '';
                answerDiv.innerHTML = '';
                controlsDiv.style.display = 'none';
                scrFeedback.textContent = '';
                return;
            }
            var w = scrambleWords[scrIndex];
            currentWord = w.en.toUpperCase();
            currentAnswer = [];
            hintDiv.innerHTML = '<div class="scramble-emoji">' + (w.emoji || '📝') + '</div><div class="scramble-chinese">' + w.cn + '</div><div style="font-size:0.9rem;color:#999;">把字母拼成正确的单词！Unscramble!</div>';

            // Scramble letters
            var letters = currentWord.split('');
            // Keep shuffling until different from original
            var scrambled = letters.slice();
            for (var i = 0; i < 20; i++) shuffle(scrambled);
            if (scrambled.join('') === currentWord && letters.length > 1) {
                var tmp = scrambled[0];
                scrambled[0] = scrambled[scrambled.length - 1];
                scrambled[scrambled.length - 1] = tmp;
            }

            renderLetters(scrambled);
            renderAnswer();
            scrFeedback.textContent = '';
            scrScore.textContent = '第 ' + (scrIndex + 1) + '/' + scrambleWords.length + ' 题 | ✅ ' + scrCorrect;
        }

        function renderLetters(scrambled) {
            lettersDiv.innerHTML = '';
            scrambled.forEach(function(letter, i) {
                var btn = document.createElement('button');
                btn.className = 'scramble-letter-btn';
                btn.textContent = letter;
                btn.setAttribute('data-idx', i);
                btn.onclick = function() {
                    if (btn.disabled) return;
                    btn.disabled = true;
                    btn.classList.add('used');
                    currentAnswer.push(letter);
                    renderAnswer();
                    checkScrambleAnswer();
                };
                lettersDiv.appendChild(btn);
            });
        }

        function renderAnswer() {
            answerDiv.innerHTML = '';
            for (var i = 0; i < currentWord.length; i++) {
                var span = document.createElement('span');
                span.className = 'scramble-slot' + (currentAnswer[i] ? ' filled' : '');
                span.textContent = currentAnswer[i] || '_';
                answerDiv.appendChild(span);
            }
        }

        function checkScrambleAnswer() {
            if (currentAnswer.length === currentWord.length) {
                var attempt = currentAnswer.join('');
                if (attempt === currentWord) {
                    scrCorrect++;
                    scrFeedback.innerHTML = '✅ 太棒了！Correct!';
                    scrFeedback.style.color = '#28A745';
                    playCorrectSound();
                    launchConfetti();
                    addXP(1);
                    scrIndex++;
                    setTimeout(showScramble, 1200);
                } else {
                    scrFeedback.innerHTML = '💪 差一点！再试一次吧 Try again!';
                    scrFeedback.style.color = '#FF4444';
                    playWrongSound();
                    currentAnswer = [];
                    // Re-enable buttons
                    lettersDiv.querySelectorAll('.scramble-letter-btn').forEach(function(b) {
                        b.disabled = false;
                        b.classList.remove('used');
                    });
                    renderAnswer();
                }
            }
        }

        clearScrBtn.onclick = function() {
            currentAnswer = [];
            lettersDiv.querySelectorAll('.scramble-letter-btn').forEach(function(b) {
                b.disabled = false;
                b.classList.remove('used');
            });
            renderAnswer();
            scrFeedback.textContent = '';
        };

        speakScrBtn.onclick = function() {
            speak(scrambleWords[scrIndex < scrambleWords.length ? scrIndex : scrambleWords.length - 1].en);
        };

        showScramble();

    } else if (tab === 'writing') {
        var level = getLevel();
        // Words get harder based on level
        var easyWords = ['CAT', 'DOG', 'SUN', 'RED', 'BIG', 'RUN', 'EAT', 'HAT', 'PIG', 'CUP'];
        var medWords = ['APPLE', 'HAPPY', 'GREEN', 'WATER', 'TIGER', 'HELLO', 'HOUSE', 'MOUTH', 'CHAIR', 'BREAD'];
        var hardWords = ['BECAUSE', 'BEAUTIFUL', 'DIFFERENT', 'IMPORTANT', 'TOGETHER', 'SOMETIMES', 'WONDERFUL', 'REMEMBER', 'UNDERSTAND', 'BREAKFAST'];

        var words = easyWords;
        if (level >= 3) words = words.concat(medWords);
        if (level >= 5) words = words.concat(hardWords);

        var wrapper = document.createElement('div');
        wrapper.className = 'writing-area';

        var currentWordIndex = 0;
        shuffle(words);

        var wordDisplay = document.createElement('div');
        wordDisplay.className = 'writing-word-display';
        wrapper.appendChild(wordDisplay);

        var traceGuide = document.createElement('div');
        traceGuide.className = 'writing-trace-guide';
        traceGuide.id = 'trace-guide';
        wrapper.appendChild(traceGuide);

        var canvas = document.createElement('canvas');
        canvas.className = 'writing-canvas';
        canvas.id = 'writing-canvas';
        canvas.width = 600;
        canvas.height = 160;
        wrapper.appendChild(canvas);

        var controls = document.createElement('div');
        controls.className = 'writing-controls';
        controls.innerHTML =
            '<button class="writing-btn clear-btn" id="writing-clear">🗑️ 清除 Clear</button>' +
            '<button class="writing-btn next-btn" id="writing-next">下一个 Next →</button>' +
            '<button class="writing-btn speak-btn" id="writing-speak">🔊 听发音</button>' +
            '<button class="writing-btn" id="writing-feedback-btn" style="background:#28A745;color:white;">📝 给我反馈</button>';
        wrapper.appendChild(controls);

        var feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'writing-feedback';
        feedbackDiv.id = 'writing-feedback';
        wrapper.appendChild(feedbackDiv);

        content.appendChild(wrapper);

        // Setup
        function showWord() {
            var word = words[currentWordIndex % words.length];
            wordDisplay.innerHTML = '<span class="writing-prompt">描一描这个单词 Trace this word:</span><br><span class="writing-target">' + word + '</span>';
            traceGuide.textContent = word;

            // Clear canvas
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw dotted guide letters on canvas
            ctx.font = 'bold 100px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.setLineDash([4, 6]);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 2;
            ctx.strokeText(word, canvas.width / 2, canvas.height / 2);
            ctx.setLineDash([]);

            feedbackDiv.textContent = '';
        }

        showWord();

        // Drawing on canvas
        var drawing = false;
        var ctx = canvas.getContext('2d');

        function getPos(e) {
            var rect = canvas.getBoundingClientRect();
            var x, y;
            if (e.touches) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            // Scale for canvas resolution
            x = x * (canvas.width / rect.width);
            y = y * (canvas.height / rect.height);
            return { x: x, y: y };
        }

        function startDraw(e) {
            e.preventDefault();
            drawing = true;
            var pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        function doDraw(e) {
            if (!drawing) return;
            e.preventDefault();
            var pos = getPos(e);
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#FF6B6B';
            ctx.setLineDash([]);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }

        function endDraw(e) {
            if (drawing) {
                drawing = false;
                ctx.closePath();
            }
        }

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', doDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);
        canvas.addEventListener('touchstart', startDraw);
        canvas.addEventListener('touchmove', doDraw);
        canvas.addEventListener('touchend', endDraw);

        // Buttons
        document.getElementById('writing-clear').onclick = function() {
            var c = document.getElementById('writing-canvas');
            var cx = c.getContext('2d');
            cx.clearRect(0, 0, c.width, c.height);
            // Redraw guide
            var word = words[currentWordIndex % words.length];
            cx.font = 'bold 100px Arial';
            cx.textAlign = 'center';
            cx.textBaseline = 'middle';
            cx.setLineDash([4, 6]);
            cx.strokeStyle = '#ccc';
            cx.lineWidth = 2;
            cx.strokeText(word, c.width / 2, c.height / 2);
            cx.setLineDash([]);
        };

        document.getElementById('writing-next').onclick = function() {
            currentWordIndex++;
            addXP(1);
            feedbackDiv.textContent = '👏 做得好！Good job! +1 XP';
            feedbackDiv.style.color = '#28A745';
            showWord();
        };

        document.getElementById('writing-speak').onclick = function() {
            var word = words[currentWordIndex % words.length];
            speak(word);
        };

        document.getElementById('writing-feedback-btn').onclick = function() {
            var word = words[currentWordIndex % words.length];
            var feedbacks = [
                '写得不错哦！"' + word + '" 这个单词要记住每个字母的形状～ 继续练习！',
                '加油！试试把 "' + word + '" 写得更整齐一点，每个字母大小要一样哦！',
                '很棒的尝试！"' + word + '" 要注意字母之间的间距，不要太挤也不要太远～',
                '你在进步！"' + word + '" 写完可以大声读出来帮助记忆：' + word + '！',
                '继续努力！每个字母都要写在线上，"' + word + '" 多写几遍就熟练了！',
            ];
            feedbackDiv.textContent = feedbacks[Math.floor(Math.random() * feedbacks.length)];
            feedbackDiv.style.color = '#28A745';
        };
    }

    parseEmojis(content);
}

// =============================================================
// 9. QUIZ SYSTEM
// =============================================================

var quizQuestions = [];
var quizIndex = 0;
var quizScore = 0;
var quizAnswered = false;
var QUIZ_LENGTH = 10;

function getQuizPool(category) {
    var pool = [];
    if (category === 'numbers') {
        numbersData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
    } else if (category === 'colors') {
        colorsData.forEach(function(item) {
            var swatch = '<div style="background:' + item.hex + ';width:50px;height:50px;border-radius:50%;margin:0 auto;border:3px solid rgba(0,0,0,0.1);"></div>';
            pool.push({ question: swatch, answer: item.en, chinese: item.cn });
        });
    } else if (category === 'animals') {
        animalsData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
    } else if (category === 'food') {
        foodData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
    } else if (category === 'body') {
        bodyData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
    } else if (category === 'mixed') {
        numbersData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
        colorsData.forEach(function(item) {
            var swatch = '<div style="background:' + item.hex + ';width:50px;height:50px;border-radius:50%;margin:0 auto;border:3px solid rgba(0,0,0,0.1);"></div>';
            pool.push({ question: swatch, answer: item.en, chinese: item.cn });
        });
        animalsData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
        foodData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
        bodyData.forEach(function(item) {
            pool.push({ question: item.emoji, answer: item.en, chinese: item.cn });
        });
    }
    return pool;
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function startQuiz(category) {
    var pool = getLevelQuizPool(category);
    shuffle(pool);
    var selected = pool.slice(0, QUIZ_LENGTH);

    quizQuestions = [];
    selected.forEach(function(item) {
        // Build 4 choices: 1 correct + 3 wrong from the pool
        var wrongChoices = pool.filter(function(p) {
            return p.answer !== item.answer;
        });
        shuffle(wrongChoices);
        var choices = [item.answer, wrongChoices[0].answer, wrongChoices[1].answer, wrongChoices[2].answer];
        shuffle(choices);
        quizQuestions.push({
            question: item.question,
            answer: item.answer,
            chinese: item.chinese,
            choices: choices
        });
    });

    // Hide category select, show quiz area
    var categorySelect = document.querySelector('.quiz-category-select');
    var quizArea = document.getElementById('quiz-area');
    var quizResult = document.getElementById('quiz-result');
    if (categorySelect) categorySelect.style.display = 'none';
    if (quizArea) quizArea.classList.remove('hidden');
    if (quizResult) quizResult.classList.add('hidden');

    quizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-score').textContent = '0';
    document.getElementById('quiz-token-live').textContent = '0';

    showQuestion();
}

function showQuestion() {
    quizAnswered = false;

    var q = quizQuestions[quizIndex];
    var total = quizQuestions.length;

    // Update progress bar
    var pct = ((quizIndex) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-progress-text').textContent = (quizIndex + 1) + '/' + total;

    // Render question
    var questionDiv = document.getElementById('quiz-question');
    questionDiv.innerHTML =
        '<div class="quiz-emoji">' + q.question + '</div>' +
        '<div class="quiz-prompt">这个用英语怎么说呀？🤔</div>' +
        '<div class="quiz-hint">' + q.chinese + '</div>';

    // Render choices
    var choicesDiv = document.getElementById('quiz-choices');
    choicesDiv.innerHTML = '';
    q.choices.forEach(function(choice) {
        var btn = document.createElement('button');
        btn.className = 'quiz-choice-btn';
        btn.textContent = choice;
        btn.onclick = function() {
            checkAnswer(choice, q.answer);
        };
        choicesDiv.appendChild(btn);
    });

    // Hide feedback and next button
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-next').classList.add('hidden');

    parseEmojis(document.getElementById('quiz'));
}

function checkAnswer(selected, correct) {
    if (quizAnswered) return;
    quizAnswered = true;

    // Disable all choice buttons
    var buttons = document.querySelectorAll('.quiz-choice-btn');
    buttons.forEach(function(btn) {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });

    var feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden');

    if (selected === correct) {
        quizScore++;
        addStreak();
        document.getElementById('quiz-score').textContent = quizScore;
        launchConfetti();
        playCorrectSound();
        addTokens(1);
        addXP(1);
        document.getElementById('quiz-token-live').textContent = getTokens();
        var cheers = ['✅太棒啦！', '✅厉害呀！', '✅没错！', '✅完美！', '✅Bingo！'];
        feedback.textContent = cheers[Math.floor(Math.random() * cheers.length)];
        feedback.className = 'quiz-feedback correct';
    } else {
        resetStreak();
        playWrongSound();
        feedback.innerHTML = '🌟 ' + getGentleWrong() + '<strong>' + correct + '</strong>';
        feedback.className = 'quiz-feedback wrong';
        // Add shake to the wrong button
        buttons.forEach(function(btn) {
            if (btn.textContent === selected) {
                btn.classList.add('shake');
            }
        });
    }

    // Show next button or show result
    if (quizIndex < quizQuestions.length - 1) {
        document.getElementById('quiz-next').classList.remove('hidden');
    } else {
        setTimeout(showResult, 1200);
    }
}

function nextQuestion() {
    quizIndex++;
    showQuestion();
}

function showResult() {
    document.getElementById('quiz-area').classList.add('hidden');
    var resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');

    var total = quizQuestions.length;
    var pct = quizScore / total;
    var bonus = 0;
    var icon = '';
    var title = '';
    var message = '';

    if (pct >= 1) {
        bonus = 5;
        icon = '🏆';
        title = '满分！你是英语天才！';
        message = '太不可思议了，全部答对！';
    } else if (pct >= 0.7) {
        bonus = 3;
        icon = '🌟';
        title = '非常棒！';
        message = '你已经很厉害了，继续加油！';
    } else if (pct >= 0.4) {
        bonus = 1;
        icon = '💪';
        title = '不错哦！';
        message = '再多练习一下就更好了！';
    } else {
        bonus = 0;
        icon = '📖';
        title = '继续加油！';
        message = '先去学习一下，再来挑战吧！';
    }

    document.getElementById('result-icon').textContent = icon;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-message').textContent = message;
    document.getElementById('final-score').textContent = quizScore;
    document.getElementById('total-questions').textContent = total;

    var bonusEl = document.getElementById('result-bonus');
    if (bonus > 0) {
        bonusEl.classList.remove('hidden');
        bonusEl.textContent = '🎁 额外奖励: +' + bonus + ' 🪙';
        addTokens(bonus);
        addXP(bonus);
    } else {
        bonusEl.classList.add('hidden');
    }

    if (pct >= 0.7) {
        launchConfetti();
        playBigWinSound();
    }
}

function showQuizSelect() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    var categorySelect = document.querySelector('.quiz-category-select');
    if (categorySelect) categorySelect.style.display = '';
}

// =============================================================
// 10. STORE
// =============================================================

var themes = {
    'theme-ocean': {
        '--primary': '#0077B6',
        '--bg': '#F0F9FF',
        '--card-bg': '#E0F2FE',
        '--accent1': '#00B4D8',
        '--accent2': '#0096C7',
        '--accent3': '#48CAE4'
    },
    'theme-forest': {
        '--primary': '#2D6A4F',
        '--bg': '#F0FFF4',
        '--card-bg': '#D8F3DC',
        '--accent1': '#40916C',
        '--accent2': '#52B788',
        '--accent3': '#74C69D'
    },
    'theme-space': {
        '--primary': '#7B2CBF',
        '--bg': '#F5F0FF',
        '--card-bg': '#E9D5FF',
        '--accent1': '#9D4EDD',
        '--accent2': '#C77DFF',
        '--accent3': '#E0AAFF'
    },
    'theme-candy': {
        '--primary': '#FF006E',
        '--bg': '#FFF0F6',
        '--card-bg': '#FFE0EB',
        '--accent1': '#FF5C8A',
        '--accent2': '#FF85A1',
        '--accent3': '#FFACC7'
    }
};

function buildStore() {
    var grid = document.getElementById('store-grid');
    grid.innerHTML = '';

    var owned = getOwned();
    var tokens = getTokens();
    var activeTheme = getActiveTheme();
    var activePet = getActivePet();

    // Group items by type
    var groups = {};
    storeItems.forEach(function(item) {
        if (!groups[item.type]) groups[item.type] = [];
        groups[item.type].push(item);
    });

    var equipped = getEquipped();

    var typeLabels = {
        badge: '🏅 徽章',
        acc: '👒 配饰（戴在角色上！）',
        pet: '🐾 宠物伙伴',
        theme: '🎨 主题',
        deco: '✨ 装饰'
    };

    var typeOrder = ['acc', 'badge', 'pet', 'theme', 'deco'];

    typeOrder.forEach(function(type) {
        if (!groups[type]) return;

        var heading = document.createElement('h3');
        heading.className = 'store-group-heading';
        heading.textContent = typeLabels[type] || type;
        grid.appendChild(heading);

        var row = document.createElement('div');
        row.className = 'store-row';

        groups[type].forEach(function(item) {
            var isOwned = owned.indexOf(item.id) !== -1;
            var canAfford = tokens >= item.price;
            var isActiveTheme = (item.type === 'theme' && activeTheme === item.id);
            var isActivePet = (item.type === 'pet' && activePet === item.id);
            var isEquipped = (item.type === 'acc' && item.slot && equipped[item.slot] === item.id);

            var card = document.createElement('div');
            var rarity = item.rarity || 'common';
            card.className = 'store-card rarity-' + rarity;
            if (isOwned) card.classList.add('owned');
            if (isEquipped) card.classList.add('active-item');

            var rarityLabels = {common:'普通 Common', rare:'稀有 Rare ★', epic:'史诗 Epic ★★', legendary:'传说 Legendary ★★★'};
            var statusText = '';
            if (isActiveTheme || isActivePet || isEquipped) {
                statusText = '<div class="store-status active-status">✅ 装备中</div>';
            } else if (isOwned) {
                statusText = '<div class="store-status owned-status">' + (item.type === 'acc' ? '👆 点击装备' : '✓ 已拥有') + '</div>';
            }

            card.innerHTML =
                '<div class="rarity-badge rarity-badge-' + rarity + '">' + rarityLabels[rarity] + '</div>' +
                '<div class="store-card-emoji">' + item.emoji + '</div>' +
                '<div class="store-card-name">' + item.name + '</div>' +
                '<div class="store-card-desc">' + item.desc + '</div>' +
                (isOwned
                    ? statusText
                    : '<div class="store-card-price">🪙 ' + item.price + '</div>'
                );

            if (!isOwned && canAfford) {
                card.classList.add('affordable');
                card.onclick = function() {
                    buyItem(item);
                };
            } else if (isOwned && item.type === 'acc') {
                card.classList.add('activatable');
                card.onclick = function() {
                    equipAccessory(item);
                    playPurchaseSound();
                    buildStore();
                    refreshHomepage();
                };
            } else if (isOwned && (item.type === 'theme' || item.type === 'pet') && !isActiveTheme && !isActivePet) {
                card.classList.add('activatable');
                card.onclick = function() {
                    activateItem(item);
                };
            }

            row.appendChild(card);
        });

        grid.appendChild(row);
    });

    updateTokenDisplay();
    buildCollection();
    parseEmojis(document.getElementById('store'));
}

function buyItem(item) {
    var tokens = getTokens();
    if (tokens < item.price) return;
    setTokens(tokens - item.price);
    addOwned(item.id);
    // Auto-equip accessories when bought
    if (item.type === 'acc' && item.slot) {
        equipAccessory(item);
    }
    playPurchaseSound();
    launchConfetti();
    buildStore();
    refreshHomepage();
}

function activateItem(item) {
    if (item.type === 'theme') {
        setActiveTheme(item.id);
        applyTheme(item.id);
    } else if (item.type === 'pet') {
        setActivePet(item.id);
        applyPet(item.id);
    }
    playPurchaseSound();
    buildStore();
    refreshHomepage();
}

function buildCollection() {
    var container = document.getElementById('my-collection');
    container.innerHTML = '';
    var owned = getOwned();

    if (owned.length === 0) {
        container.innerHTML = '<p style="color:#999;font-size:0.95rem;">还没有收藏呢，快去赚代币买东西吧！</p>';
        return;
    }

    owned.forEach(function(id) {
        var item = storeItems.find(function(si) { return si.id === id; });
        if (item) {
            var span = document.createElement('span');
            span.className = 'collection-item';
            span.textContent = item.emoji;
            span.title = item.name;
            container.appendChild(span);
        }
    });
}

function applyTheme(id) {
    var root = document.documentElement;
    if (!id || !themes[id]) {
        // Remove custom properties
        var allProps = ['--primary', '--bg', '--card-bg', '--accent1', '--accent2', '--accent3'];
        allProps.forEach(function(prop) {
            root.style.removeProperty(prop);
        });
        return;
    }
    var themeVars = themes[id];
    Object.keys(themeVars).forEach(function(prop) {
        root.style.setProperty(prop, themeVars[prop]);
    });
}

function applyPet(id) {
    var petEl = document.getElementById('floating-pet');
    if (!id) {
        petEl.textContent = '';
        petEl.classList.add('hidden');
        return;
    }
    var item = storeItems.find(function(si) { return si.id === id; });
    if (item) {
        petEl.textContent = item.emoji;
        petEl.classList.remove('hidden');
    } else {
        petEl.textContent = '';
        petEl.classList.add('hidden');
    }
}

// =============================================================
// 11. HOMEPAGE
// =============================================================

function refreshHomepage() {
    var charDisplay = document.getElementById('char-display');
    var nameEl = document.getElementById('hp-name');
    var tokensEl = document.getElementById('hp-tokens');
    var itemsEl = document.getElementById('hp-items');
    var badgesEl = document.getElementById('hp-badges');
    var titleEl = document.getElementById('hp-title');
    var decosEl = document.getElementById('hp-decos');
    var streakEl = document.getElementById('hp-streak');

    var avatar = localStorage.getItem('duoverse_avatar') || '👦';
    var name = localStorage.getItem('duoverse_name') || '小朋友';
    var tokens = getTokens();
    var owned = getOwned();
    var equipped = getEquipped();

    if (nameEl) nameEl.textContent = name;
    if (tokensEl) tokensEl.textContent = tokens;
    if (itemsEl) itemsEl.textContent = owned.length;
    if (streakEl) streakEl.textContent = getStreak();

    // Build mini SVG character for homepage
    if (charDisplay) {
        var gender = localStorage.getItem('duoverse_gender') || 'boy';
        var hatItem = equipped.hat ? storeItems.find(function(s) { return s.id === equipped.hat; }) : null;
        var glassItem = equipped.glasses ? storeItems.find(function(s) { return s.id === equipped.glasses; }) : null;
        var scarfItem = equipped.scarf ? storeItems.find(function(s) { return s.id === equipped.scarf; }) : null;
        var activePetId = getActivePet();
        var petItem = activePetId ? storeItems.find(function(s) { return s.id === activePetId; }) : null;

        var skinTones = {
            '👦': '#FFDBB4', '👦🏻': '#FFE4C4', '👦🏼': '#F5C08B', '👦🏽': '#D4A373', '👦🏾': '#8D6748', '👦🏿': '#5C3D2E',
            '👧': '#FFDBB4', '👧🏻': '#FFE4C4', '👧🏼': '#F5C08B', '👧🏽': '#D4A373', '👧🏾': '#8D6748', '👧🏿': '#5C3D2E'
        };
        var skinTone = skinTones[avatar] || '#FFDBB4';

        // Get equipped customizations
        var outfitItem = equipped.outfit ? storeItems.find(function(s) { return s.id === equipped.outfit; }) : null;
        var outfitColors = outfitItem && outfitItem.colors ? outfitItem.colors : {};
        var hairItem = equipped.hair ? storeItems.find(function(s) { return s.id === equipped.hair; }) : null;
        var hairColorItem = equipped.haircolor ? storeItems.find(function(s) { return s.id === equipped.haircolor; }) : null;

        var html = '<div style="position:relative;display:inline-block;">';
        html += buildCharacterSVG({
            gender: gender, skinTone: skinTone, scale: 0.55,
            shirtColor: outfitColors.shirt, shirtDark: outfitColors.shirtDark,
            hairStyle: hairItem ? hairItem.hairStyle : undefined,
            hairColor: hairColorItem ? hairColorItem.hairColor : undefined,
            hairLight: hairColorItem ? hairColorItem.hairLight : undefined
        });

        if (hatItem) html += '<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);font-size:2rem;z-index:10;">' + hatItem.emoji + '</div>';
        if (glassItem) html += '<div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:1.5rem;z-index:10;">' + glassItem.emoji + '</div>';
        if (scarfItem) html += '<div style="position:absolute;top:48%;left:50%;transform:translateX(-50%);font-size:1.3rem;z-index:10;">' + scarfItem.emoji + '</div>';
        if (petItem) html += '<div style="position:absolute;bottom:5px;right:-30px;font-size:1.8rem;animation:petBounce 2s ease-in-out infinite;">' + petItem.emoji + '</div>';

        html += '</div>';
        charDisplay.innerHTML = html;
    }

    // Badge display
    if (badgesEl) {
        badgesEl.innerHTML = '';
        owned.forEach(function(id) {
            var item = storeItems.find(function(si) { return si.id === id && si.type === 'badge'; });
            if (item) {
                var span = document.createElement('span');
                span.className = 'hp-badge';
                span.textContent = item.emoji;
                span.title = item.name;
                badgesEl.appendChild(span);
            }
        });
    }

    // Decorations floating on homepage
    if (decosEl) {
        decosEl.innerHTML = '';
        owned.forEach(function(id) {
            var item = storeItems.find(function(si) { return si.id === id && si.type === 'deco'; });
            if (item) {
                for (var d = 0; d < 5; d++) {
                    var span = document.createElement('span');
                    span.className = 'hp-deco-particle';
                    span.textContent = item.emoji;
                    span.style.left = Math.random() * 90 + 5 + '%';
                    span.style.top = Math.random() * 80 + 10 + '%';
                    span.style.animationDelay = (Math.random() * 4) + 's';
                    span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
                    decosEl.appendChild(span);
                }
            }
        });
    }

    // Title based on tokens
    if (titleEl) {
        if (tokens >= 61) {
            titleEl.textContent = '传奇大师 👑';
        } else if (tokens >= 31) {
            titleEl.textContent = '英语达人 🔥';
        } else if (tokens >= 11) {
            titleEl.textContent = '学习之星 ⭐';
        } else {
            titleEl.textContent = '新手冒险家';
        }
    }

    updateLevelDisplay();

    parseEmojis(document.getElementById('home'));
}

// =============================================================
// 12. MINI-GAMES
// =============================================================

function startGame(type) {
    var gameSelect = document.getElementById('game-select');
    var gameArea = document.getElementById('game-area');
    gameSelect.style.display = 'none';
    gameArea.classList.remove('hidden');
    gameArea.innerHTML = '';

    if (type === 'tictactoe') {
        buildTicTacToe();
    } else if (type === 'memory') {
        buildMemoryGame();
    } else if (type === 'rps') {
        buildRPS();
    } else if (type === 'catch') {
        buildCatchGame();
    } else if (type === 'hangman') {
        buildHangman();
    } else if (type === 'simon') {
        buildSimon();
    } else if (type === 'whack') {
        buildWhackAMole();
    } else if (type === 'connect4') {
        buildConnect4();
    } else if (type === 'reaction') {
        buildReaction();
    } else if (type === 'snake') {
        buildSnake();
    } else if (type === 'numguess') { buildNumGuess();
    } else if (type === 'colormatch') { buildColorMatch();
    } else if (type === 'mathrace') { buildMathRace();
    } else if (type === 'typing') { buildTypingGame();
    } else if (type === 'bubblepop') { buildBubblePop();
    } else if (type === 'dodge') { buildDodge();
    } else if (type === 'emoji2048') { buildEmoji2048();
    } else if (type === 'wordbomb') { buildWordBomb();
    } else if (type === 'maze') { buildMaze();
    } else if (type === 'pong') { buildPong();
    }

    parseEmojis(gameArea);
}

// Global array to track all active game intervals so they can be cleared on nav
var _activeGameIntervals = [];

function registerGameInterval(id) {
    _activeGameIntervals.push(id);
    return id;
}

function clearAllGameIntervals() {
    _activeGameIntervals.forEach(function(id) { clearInterval(id); });
    _activeGameIntervals = [];
}

function backToGameSelect() {
    clearAllGameIntervals();
    var gameSelect = document.getElementById('game-select');
    var gameArea = document.getElementById('game-area');
    gameSelect.style.display = '';
    gameArea.classList.add('hidden');
    gameArea.innerHTML = '';
}

// --- Tic Tac Toe ---

function buildTicTacToe() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">⭕❌</div>' +
        '<h3>井字棋 Tic Tac Toe</h3>' +
        '<p>两个人轮流下棋！把三个同样的符号连成一行就赢了。⭕先走！</p>' +
        '<p class="game-intro-en">Take turns with a friend. Get 3 in a row to win!</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var status = document.createElement('div');
    status.className = 'game-status';
    status.textContent = '⭕ 的回合';
    gameArea.appendChild(status);

    var grid = document.createElement('div');
    grid.className = 'ttt-grid';
    gameArea.appendChild(grid);

    var replayBtn = document.createElement('button');
    replayBtn.className = 'game-replay-btn hidden';
    replayBtn.textContent = '再来一局！🔁';
    gameArea.appendChild(replayBtn);

    var board = Array(9).fill('');
    var currentPlayer = 'O';
    var gameOver = false;
    var cells = [];

    for (var i = 0; i < 9; i++) {
        (function(index) {
            var cell = document.createElement('button');
            cell.className = 'ttt-cell';
            cell.onclick = function() {
                if (board[index] !== '' || gameOver) return;
                board[index] = currentPlayer;
                if (currentPlayer === 'O') {
                    cell.textContent = '⭕';
                    cell.classList.add('o');
                } else {
                    cell.textContent = '❌';
                    cell.classList.add('x');
                }
                var winner = checkTTTWin(board);
                if (winner) {
                    gameOver = true;
                    var winnerSymbol = winner === 'O' ? '⭕' : '❌';
                    status.textContent = winnerSymbol + ' 赢了！🎉';
                    launchConfetti();
                    playCorrectSound();
                    addTokens(2);
                    replayBtn.classList.remove('hidden');
                } else if (board.indexOf('') === -1) {
                    gameOver = true;
                    status.textContent = '平局！🤝';
                    replayBtn.classList.remove('hidden');
                } else {
                    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
                    var nextSymbol = currentPlayer === 'O' ? '⭕' : '❌';
                    status.textContent = nextSymbol + ' 的回合';
                }
            };
            cells.push(cell);
            grid.appendChild(cell);
        })(i);
    }

    replayBtn.onclick = function() {
        board = Array(9).fill('');
        currentPlayer = 'O';
        gameOver = false;
        cells.forEach(function(c) {
            c.textContent = '';
            c.className = 'ttt-cell';
        });
        status.textContent = '⭕ 的回合';
        replayBtn.classList.add('hidden');
    };

    };
}

function checkTTTWin(board) {
    var lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0], b = lines[i][1], c = lines[i][2];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// --- Memory Match ---

function buildMemoryGame() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">🃏</div>' +
        '<h3>翻翻乐 Memory Match</h3>' +
        '<p>翻开两张卡片，找到一样的就配对成功！用最少的次数找到所有配对。</p>' +
        '<p class="game-intro-en">Flip 2 cards - find matching pairs! Try to remember where each one is.</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var status = document.createElement('div');
    status.className = 'game-status';
    status.textContent = '翻牌次数: 0';
    gameArea.appendChild(status);

    var animalEmojis = ['🐱','🐶','🐸','🐼','🦁','🐯','🐰','🐬'];
    var cards = animalEmojis.concat(animalEmojis);
    shuffle(cards);

    var grid = document.createElement('div');
    grid.className = 'mem-grid';
    gameArea.appendChild(grid);

    var flipped = [];
    var matched = 0;
    var moves = 0;
    var canFlip = true;
    var cardElements = [];

    cards.forEach(function(emoji, index) {
        var card = document.createElement('button');
        card.className = 'mem-card';
        card.textContent = '❓';
        card.setAttribute('data-emoji', emoji);
        card.setAttribute('data-index', index);

        card.onclick = function() {
            if (!canFlip) return;
            if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

            card.classList.add('flipped');
            card.textContent = emoji;
            flipped.push(card);

            if (flipped.length === 2) {
                moves++;
                status.textContent = '翻牌次数: ' + moves;

                var first = flipped[0];
                var second = flipped[1];

                if (first.getAttribute('data-emoji') === second.getAttribute('data-emoji')) {
                    first.classList.add('matched');
                    second.classList.add('matched');
                    matched++;
                    flipped = [];

                    if (matched === 8) {
                        var reward = moves < 12 ? 3 : (moves < 18 ? 2 : 1);
                        launchConfetti();
                        playCorrectSound();
                        addTokens(reward);
                        status.textContent = '完成！🎉 翻了 ' + moves + ' 次 | +' + reward + ' 🪙';
                    }
                } else {
                    canFlip = false;
                    setTimeout(function() {
                        first.classList.remove('flipped');
                        first.textContent = '❓';
                        second.classList.remove('flipped');
                        second.textContent = '❓';
                        flipped = [];
                        canFlip = true;
                    }, 800);
                }
            }
        };

        cardElements.push(card);
        grid.appendChild(card);
    });

    };
}

// --- Rock Paper Scissors ---

function buildRPS() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">✊✋✌️</div>' +
        '<h3>石头剪刀布 Rock Paper Scissors</h3>' +
        '<p>两个人玩！玩家1先选（玩家2别偷看！），然后玩家2选。三局两胜！石头赢剪刀，剪刀赢布，布赢石头。</p>' +
        '<p class="game-intro-en">2 players! Player 1 picks first (Player 2 look away!). Best of 3. Rock beats Scissors, Scissors beats Paper, Paper beats Rock.</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var status = document.createElement('div');
    status.className = 'game-status';
    status.textContent = '玩家1选择（玩家2别看！）';
    gameArea.appendChild(status);

    var scoreDiv = document.createElement('div');
    scoreDiv.className = 'rps-score';
    scoreDiv.innerHTML = '玩家1: <span id="rps-p1">0</span> — 玩家2: <span id="rps-p2">0</span>';
    gameArea.appendChild(scoreDiv);

    var choiceArea = document.createElement('div');
    choiceArea.className = 'rps-choices';
    gameArea.appendChild(choiceArea);

    var resultArea = document.createElement('div');
    resultArea.className = 'rps-result';
    gameArea.appendChild(resultArea);

    var p1Score = 0;
    var p2Score = 0;
    var round = 1;
    var phase = 'p1';
    var p1Choice = '';

    var choices = [
        { name: 'rock', emoji: '✊', label: '✊石头' },
        { name: 'paper', emoji: '✋', label: '✋布' },
        { name: 'scissors', emoji: '✌️', label: '✌️剪刀' }
    ];

    function renderChoices() {
        choiceArea.innerHTML = '';
        resultArea.innerHTML = '';
        choices.forEach(function(c) {
            var btn = document.createElement('button');
            btn.className = 'rps-btn';
            btn.textContent = c.label;
            btn.onclick = function() {
                if (phase === 'p1') {
                    p1Choice = c.name;
                    choiceArea.innerHTML = '<p style="font-size:1.5rem;">玩家1已选好！👍</p>';
                    phase = 'p2';
                    status.textContent = '玩家2选择！';
                    setTimeout(function() {
                        renderChoices();
                    }, 800);
                } else if (phase === 'p2') {
                    var p2Choice = c.name;
                    revealResult(p1Choice, p2Choice);
                }
            };
            choiceArea.appendChild(btn);
        });
    }

    function getEmoji(name) {
        var found = choices.find(function(c) { return c.name === name; });
        return found ? found.emoji : '';
    }

    function revealResult(p1, p2) {
        choiceArea.innerHTML = '';
        phase = 'reveal';

        var p1Emoji = getEmoji(p1);
        var p2Emoji = getEmoji(p2);

        var resultText = '';
        if (p1 === p2) {
            resultText = '平局！';
        } else if (
            (p1 === 'rock' && p2 === 'scissors') ||
            (p1 === 'scissors' && p2 === 'paper') ||
            (p1 === 'paper' && p2 === 'rock')
        ) {
            p1Score++;
            resultText = '玩家1赢了这局！🎉';
        } else {
            p2Score++;
            resultText = '玩家2赢了这局！🎉';
        }

        document.getElementById('rps-p1').textContent = p1Score;
        document.getElementById('rps-p2').textContent = p2Score;

        resultArea.innerHTML =
            '<div style="font-size:3rem;margin:10px 0;">' + p1Emoji + ' VS ' + p2Emoji + '</div>' +
            '<p style="font-size:1.3rem;font-weight:bold;">' + resultText + '</p>';

        // Check if someone won the series (best of 3: first to 2)
        if (p1Score >= 2 || p2Score >= 2) {
            var seriesWinner = p1Score >= 2 ? '玩家1' : '玩家2';
            resultArea.innerHTML +=
                '<p style="font-size:1.5rem;margin-top:10px;">🏆 ' + seriesWinner + ' 获胜！</p>';
            launchConfetti();
            playCorrectSound();
            addTokens(2);

            var replayBtn = document.createElement('button');
            replayBtn.className = 'game-replay-btn';
            replayBtn.textContent = '再来一局！🔁';
            replayBtn.onclick = function() {
                p1Score = 0;
                p2Score = 0;
                round = 1;
                phase = 'p1';
                p1Choice = '';
                document.getElementById('rps-p1').textContent = '0';
                document.getElementById('rps-p2').textContent = '0';
                status.textContent = '玩家1选择（玩家2别看！）';
                resultArea.innerHTML = '';
                renderChoices();
            };
            resultArea.appendChild(replayBtn);
        } else {
            round++;
            var nextBtn = document.createElement('button');
            nextBtn.className = 'game-replay-btn';
            nextBtn.textContent = '下一局 →';
            nextBtn.onclick = function() {
                phase = 'p1';
                p1Choice = '';
                status.textContent = '玩家1选择（玩家2别看！）';
                resultArea.innerHTML = '';
                renderChoices();
            };
            resultArea.appendChild(nextBtn);
        }
    }

    renderChoices();

    };
}

// --- Catch Stars ---

function buildCatchGame() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var gameInterval = null;
    var spawnInterval = null;

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = function() {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        backToGameSelect();
    };
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">⭐</div>' +
        '<h3>接星星 Catch the Stars</h3>' +
        '<p>星星会从天上掉下来！用手指点它们，30秒内接到越多越好！</p>' +
        '<p class="game-intro-en">Stars fall from the sky! Tap them before they disappear. 30 seconds!</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var hud = document.createElement('div');
    hud.className = 'catch-hud';
    hud.innerHTML = '⭐ 得分: <span id="catch-score">0</span> &nbsp;|&nbsp; ⏱️ <span id="catch-timer">30</span>s';
    gameArea.appendChild(hud);

    var catchArea = document.createElement('div');
    catchArea.className = 'catch-area';
    gameArea.appendChild(catchArea);

    var score = 0;
    var timeLeft = 30;

    var scoreEl = document.getElementById('catch-score');
    var timerEl = document.getElementById('catch-timer');

    // Spawn stars
    spawnInterval = setInterval(function() {
        var star = document.createElement('div');
        star.className = 'catch-star';
        star.textContent = '⭐';
        var areaWidth = catchArea.offsetWidth || 300;
        star.style.left = Math.floor(Math.random() * (areaWidth - 40)) + 'px';
        star.style.top = '-30px';
        catchArea.appendChild(star);

        var fallInterval = setInterval(function() {
            var currentTop = parseInt(star.style.top) || 0;
            currentTop += 3;
            star.style.top = currentTop + 'px';

            var areaHeight = catchArea.offsetHeight || 400;
            if (currentTop > areaHeight) {
                clearInterval(fallInterval);
                if (star.parentNode) star.parentNode.removeChild(star);
            }
        }, 50);
        registerGameInterval(fallInterval);

        star.onclick = function() {
            score++;
            scoreEl.textContent = score;
            playCorrectSound();
            clearInterval(fallInterval);
            if (star.parentNode) star.parentNode.removeChild(star);
        };
    }, 600);
    registerGameInterval(spawnInterval);

    // Timer
    gameInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(spawnInterval);

            // Remove remaining stars
            var stars = catchArea.querySelectorAll('.catch-star');
            stars.forEach(function(s) {
                if (s.parentNode) s.parentNode.removeChild(s);
            });

            var reward = score >= 10 ? 3 : (score >= 5 ? 2 : 1);

            catchArea.innerHTML =
                '<div style="text-align:center;padding:40px 20px;">' +
                '<div style="font-size:3rem;">🌟</div>' +
                '<h3>时间到！</h3>' +
                '<p style="font-size:1.3rem;">你接到了 <strong>' + score + '</strong> 颗星星！</p>' +
                '<p>🪙 +' + reward + ' 代币</p>' +
                '</div>';

            addTokens(reward);
            if (score >= 5) {
                launchConfetti();
            }
            playCorrectSound();
        }
    }, 1000);
    registerGameInterval(gameInterval);

    };
}

// --- Hangman ---

function buildHangman() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">🔤</div>' +
        '<h3>猜字母 Guess the Word</h3>' +
        '<p>猜一个英语单词！每次选一个字母，如果单词里有这个字母就会显示出来。你有6次猜错的机会，用完就输了！</p>' +
        '<p class="game-intro-en">Guess the hidden word one letter at a time. You have 6 wrong guesses!</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var wordPool = animalsData.concat(foodData, colorsData).map(function(w) { return w.en.toUpperCase(); });
    if (getLevel() >= 3) wordPool = wordPool.concat(level2Words.map(function(w) { return w.en.toUpperCase(); }));
    shuffle(wordPool);
    var word = wordPool[0];
    var guessed = [];
    var wrong = 0;
    var maxWrong = 6;

    var hangParts = ['😵', '🫥', '😰', '😟', '🙁', '😐', '😊']; // 6 wrong = dead, 0 = happy

    var faceDiv = document.createElement('div');
    faceDiv.style.cssText = 'font-size:4rem;margin:1rem 0;';
    faceDiv.textContent = '😊';
    gameArea.appendChild(faceDiv);

    var livesDiv = document.createElement('div');
    livesDiv.className = 'game-status';
    livesDiv.textContent = '❤️'.repeat(maxWrong);
    gameArea.appendChild(livesDiv);

    var wordDiv = document.createElement('div');
    wordDiv.style.cssText = 'font-size:2rem;letter-spacing:8px;font-weight:800;margin:1rem 0;color:var(--primary);';
    gameArea.appendChild(wordDiv);

    var hintDiv = document.createElement('div');
    hintDiv.style.cssText = 'font-size:0.9rem;color:#999;margin-bottom:1rem;';
    var hintItem = animalsData.concat(foodData, colorsData, level2Words || []).find(function(w) { return w.en.toUpperCase() === word; });
    if (hintItem) hintDiv.textContent = '提示 Hint: ' + (hintItem.emoji || '') + ' ' + (hintItem.cn || '');
    gameArea.appendChild(hintDiv);

    var keysDiv = document.createElement('div');
    keysDiv.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:400px;margin:0 auto;';
    gameArea.appendChild(keysDiv);

    var feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'game-status';
    feedbackDiv.style.marginTop = '1rem';
    gameArea.appendChild(feedbackDiv);

    function renderWord() {
        var display = '';
        for (var i = 0; i < word.length; i++) {
            if (word[i] === ' ') { display += '  '; }
            else if (guessed.indexOf(word[i]) !== -1) { display += word[i]; }
            else { display += '_'; }
        }
        wordDiv.textContent = display;
        return display.indexOf('_') === -1;
    }

    function renderKeys() {
        keysDiv.innerHTML = '';
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(letter) {
            var btn = document.createElement('button');
            btn.textContent = letter;
            btn.style.cssText = 'width:36px;height:36px;border:2px solid #ddd;border-radius:8px;background:white;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;';
            if (guessed.indexOf(letter) !== -1) {
                btn.disabled = true;
                btn.style.opacity = '0.3';
                if (word.indexOf(letter) !== -1) {
                    btn.style.background = '#D4EDDA';
                    btn.style.borderColor = '#28A745';
                } else {
                    btn.style.background = '#FFE3E3';
                    btn.style.borderColor = '#FF6B6B';
                }
            }
            btn.onclick = function() {
                if (guessed.indexOf(letter) !== -1) return;
                guessed.push(letter);
                if (word.indexOf(letter) === -1) {
                    wrong++;
                    playWrongSound();
                } else {
                    playCorrectSound();
                }
                faceDiv.textContent = hangParts[Math.min(wrong, 6)].split('').reverse().join('') || hangParts[6];
                faceDiv.textContent = wrong >= 6 ? '😵' : wrong >= 4 ? '😰' : wrong >= 2 ? '🙁' : '😊';
                livesDiv.textContent = '❤️'.repeat(Math.max(0, maxWrong - wrong)) + '🖤'.repeat(wrong);

                var won = renderWord();
                renderKeys();

                if (won) {
                    feedbackDiv.innerHTML = '🎉 你猜对了！<strong>' + word + '</strong>';
                    feedbackDiv.style.color = '#28A745';
                    launchConfetti();
                    addTokens(2);
                    addXP(2);
                    disableAllKeys();
                    addReplayBtn();
                } else if (wrong >= maxWrong) {
                    feedbackDiv.innerHTML = '💪 ' + getGentleWrong() + '<strong>' + word + '</strong>';
                    feedbackDiv.style.color = '#FB923C';
                    renderFullWord();
                    disableAllKeys();
                    addReplayBtn();
                }
            };
            keysDiv.appendChild(btn);
        });
    }

    function disableAllKeys() {
        keysDiv.querySelectorAll('button').forEach(function(b) { b.disabled = true; b.style.opacity = '0.4'; });
    }

    function renderFullWord() {
        wordDiv.textContent = word;
    }

    function addReplayBtn() {
        var btn = document.createElement('button');
        btn.className = 'game-replay-btn';
        btn.textContent = '再来一个！🔄';
        btn.style.marginTop = '1rem';
        btn.onclick = function() { buildHangman(); };
        gameArea.appendChild(btn);
    }

    renderWord();
    renderKeys();

    };
}

// --- Simon Says (Color Memory) ---

function buildSimon() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML =
        '<div class="game-intro-icon">🔴🟢🔵🟡</div>' +
        '<h3>记忆闪灯 Simon Says</h3>' +
        '<p>看好彩色按钮闪亮的顺序，然后按同样的顺序点击！每一轮会多一个，看你能记住多长！</p>' +
        '<p class="game-intro-en">Watch the colored buttons flash, then repeat the pattern! It gets longer each round.</p>' +
        '<button class="ob-btn" id="game-start-btn">开始玩！ Start! →</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();

    var status = document.createElement('div');
    status.className = 'game-status';
    status.textContent = '看好顺序，然后按同样的顺序！Watch and repeat!';
    gameArea.appendChild(status);

    var scoreDiv = document.createElement('div');
    scoreDiv.style.cssText = 'text-align:center;font-size:1.1rem;font-weight:600;color:var(--accent2);margin-bottom:1rem;';
    scoreDiv.textContent = '回合 Round: 1';
    gameArea.appendChild(scoreDiv);

    var colors = [
        { color: '#FF4444', name: 'Red' },
        { color: '#28A745', name: 'Green' },
        { color: '#007BFF', name: 'Blue' },
        { color: '#FFD700', name: 'Yellow' }
    ];

    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:260px;margin:0 auto 1rem;';
    gameArea.appendChild(grid);

    var pads = [];
    colors.forEach(function(c, i) {
        var pad = document.createElement('button');
        pad.style.cssText = 'width:120px;height:120px;border-radius:20px;border:4px solid rgba(0,0,0,0.1);cursor:pointer;transition:all 0.2s;opacity:0.6;background:' + c.color + ';';
        pad.setAttribute('data-idx', i);
        pad.onclick = function() { playerPress(i); };
        pads.push(pad);
        grid.appendChild(pad);
    });

    var sequence = [];
    var playerSeq = [];
    var round = 1;
    var canPress = false;

    function flashPad(idx, duration) {
        pads[idx].style.opacity = '1';
        pads[idx].style.transform = 'scale(1.08)';
        pads[idx].style.boxShadow = '0 0 20px ' + colors[idx].color;
        setTimeout(function() {
            pads[idx].style.opacity = '0.6';
            pads[idx].style.transform = 'scale(1)';
            pads[idx].style.boxShadow = 'none';
        }, duration);
    }

    function playSequence() {
        canPress = false;
        status.textContent = '看好顺序！Watch!';
        var i = 0;
        var interval = setInterval(function() {
            if (i >= sequence.length) {
                clearInterval(interval);
                canPress = true;
                playerSeq = [];
                status.textContent = '你的回合！按同样的顺序！Your turn!';
                return;
            }
            flashPad(sequence[i], 500);
            playCorrectSound();
            i++;
        }, 700);
        registerGameInterval(interval);
    }

    function addToSequence() {
        sequence.push(Math.floor(Math.random() * 4));
        scoreDiv.textContent = '回合 Round: ' + round;
        setTimeout(playSequence, 600);
    }

    function playerPress(idx) {
        if (!canPress) return;
        flashPad(idx, 300);
        playerSeq.push(idx);

        var pos = playerSeq.length - 1;
        if (playerSeq[pos] !== sequence[pos]) {
            // Wrong!
            canPress = false;
            playWrongSound();
            status.textContent = '💪 到了第 ' + round + ' 回合！';
            var reward = round >= 8 ? 3 : (round >= 4 ? 2 : 1);
            addTokens(reward);
            addXP(reward);
            if (round >= 4) launchConfetti();

            var btn = document.createElement('button');
            btn.className = 'game-replay-btn';
            btn.textContent = '再来一次！🔄';
            btn.onclick = function() { buildSimon(); };
            gameArea.appendChild(btn);
            return;
        }

        if (playerSeq.length === sequence.length) {
            // Completed this round!
            canPress = false;
            playCorrectSound();
            round++;
            status.textContent = '✅ 正确！下一回合...';
            setTimeout(addToSequence, 1000);
        }
    }

    // Start game
    addToSequence();

    };
}

// =============================================================
// AMERICAN FACTS (unlocked at Lv.10)
// =============================================================

var americaFacts = [
    { title: 'The Statue of Liberty 自由女神像', emoji: '🗽', fact: 'The Statue of Liberty was a gift from France in 1886. She is 93 meters tall and stands in New York Harbor.', factCn: '自由女神像是法国在1886年送给美国的礼物。她高93米，矗立在纽约港。', vocab: 'statue（雕像）, liberty（自由）, harbor（港口）' },
    { title: 'The Bald Eagle 白头鹰', emoji: '🦅', fact: 'The bald eagle is America\'s national bird. It represents freedom and strength. They can fly at 160 km/h!', factCn: '白头鹰是美国的国鸟，代表自由和力量。它们能以160公里/小时的速度飞行！', vocab: 'eagle（鹰）, freedom（自由）, strength（力量）' },
    { title: 'The 50 States 五十个州', emoji: '🗺️', fact: 'America has 50 states. The biggest is Alaska, and the smallest is Rhode Island. Hawaii is in the middle of the Pacific Ocean!', factCn: '美国有50个州。最大的是阿拉斯加，最小的是罗德岛。夏威夷在太平洋中间！', vocab: 'state（州）, biggest（最大的）, ocean（海洋）' },
    { title: 'Thanksgiving 感恩节', emoji: '🦃', fact: 'Americans celebrate Thanksgiving on the 4th Thursday of November. Families eat turkey, mashed potatoes, and pumpkin pie together.', factCn: '美国人在11月第四个星期四过感恩节。家人们一起吃火鸡、土豆泥和南瓜派。', vocab: 'thanksgiving（感恩节）, turkey（火鸡）, pumpkin pie（南瓜派）' },
    { title: 'Hollywood 好莱坞', emoji: '🎬', fact: 'Hollywood in Los Angeles is the movie capital of the world. The famous Hollywood sign was built in 1923 and is 14 meters tall.', factCn: '洛杉矶的好莱坞是世界电影之都。著名的好莱坞标志建于1923年，高14米。', vocab: 'movie（电影）, capital（首都/中心）, famous（著名的）' },
    { title: 'Pizza in America 美国披萨', emoji: '🍕', fact: 'Americans eat about 3 billion pizzas every year! New York style is thin and foldable, Chicago style is thick like a pie.', factCn: '美国人每年吃大约30亿个披萨！纽约风格是薄的可以折叠的，芝加哥风格像派一样厚。', vocab: 'billion（十亿）, style（风格）, thick（厚的）, thin（薄的）' },
    { title: 'NASA and Space 太空探索', emoji: '🚀', fact: 'In 1969, American astronaut Neil Armstrong became the first person to walk on the moon. He said: "One small step for man, one giant leap for mankind."', factCn: '1969年，美国宇航员尼尔·阿姆斯特朗成为第一个登上月球的人。他说："这是个人的一小步，却是人类的一大步。"', vocab: 'astronaut（宇航员）, moon（月球）, mankind（人类）' },
    { title: 'The Grand Canyon 大峡谷', emoji: '🏜️', fact: 'The Grand Canyon in Arizona is 446 km long and up to 1.8 km deep. It was carved by the Colorado River over millions of years!', factCn: '亚利桑那州的大峡谷长446公里，最深1.8公里。它是科罗拉多河经过数百万年冲刷形成的！', vocab: 'canyon（峡谷）, deep（深的）, river（河流）, million（百万）' },
    { title: 'Baseball ⚾ 棒球', emoji: '⚾', fact: 'Baseball is called "America\'s pastime." The first World Series was played in 1903. Hot dogs and peanuts are popular foods at baseball games!', factCn: '棒球被称为"美国的消遣"。第一届世界大赛在1903年举行。热狗和花生是棒球比赛的经典美食！', vocab: 'pastime（消遣）, series（系列赛）, peanuts（花生）' },
    { title: 'School in America 美国学校', emoji: '🏫', fact: 'American kids start school at age 5-6. They ride yellow school buses! In high school, students choose their own classes and have lockers.', factCn: '美国孩子5-6岁开始上学。他们坐黄色校车！在高中，学生自己选课，还有储物柜。', vocab: 'school bus（校车）, choose（选择）, locker（储物柜）' },
    { title: 'Halloween 万圣节', emoji: '🎃', fact: 'On October 31st, American kids dress up in costumes and go trick-or-treating for candy! People also carve pumpkins into jack-o\'-lanterns.', factCn: '10月31日，美国小孩穿上各种服装去挨家挨户要糖！人们还会把南瓜雕刻成灯笼。', vocab: 'costume（服装）, trick-or-treat（不给糖就捣蛋）, carve（雕刻）' },
    { title: 'The White House 白宫', emoji: '🏛️', fact: 'The White House in Washington D.C. is where the President lives. It has 132 rooms, 35 bathrooms, and a movie theater!', factCn: '白宫位于华盛顿特区，是总统的住所。它有132个房间、35个浴室，还有一个电影院！', vocab: 'president（总统）, bathroom（浴室）, theater（剧院/影院）' },
    { title: 'American Inventions 美国发明', emoji: '💡', fact: 'Americans invented the light bulb (Edison), the airplane (Wright Brothers), the internet, and the iPhone! Many things you use every day came from America.', factCn: '美国人发明了灯泡（爱迪生）、飞机（莱特兄弟）、互联网和iPhone！你每天用的很多东西都来自美国。', vocab: 'invent（发明）, light bulb（灯泡）, airplane（飞机）' },
    { title: 'American Food Culture 美国饮食', emoji: '🍔', fact: 'Americans love burgers, fries, and milkshakes. But America also has food from everywhere: Chinese food, Mexican tacos, Italian pasta, and Japanese sushi!', factCn: '美国人爱汉堡、薯条和奶昔。但美国也有来自世界各地的美食：中国菜、墨西哥卷饼、意大利面和日本寿司！', vocab: 'burger（汉堡）, fries（薯条）, milkshake（奶昔）' },
    { title: 'Yellowstone 黄石公园', emoji: '🌋', fact: 'Yellowstone was the world\'s first national park, created in 1872. It has geysers that shoot hot water into the air! The most famous is Old Faithful.', factCn: '黄石是世界第一个国家公园，建于1872年。那里有间歇泉能把热水喷到空中！最有名的叫"老忠实泉"。', vocab: 'national park（国家公园）, geyser（间歇泉）, faithful（忠实的）' },
];

function buildAmericaFacts() {
    var container = document.getElementById('america-content');
    container.innerHTML = '';

    americaFacts.forEach(function(fact, i) {
        var card = document.createElement('div');
        card.className = 'america-card';
        card.innerHTML =
            '<div class="america-header">' +
                '<span class="america-emoji">' + fact.emoji + '</span>' +
                '<span class="america-num">#' + (i + 1) + '</span>' +
            '</div>' +
            '<h3 class="america-title">' + fact.title + '</h3>' +
            '<div class="america-fact-en">' + fact.fact + '</div>' +
            '<div class="america-fact-cn">' + fact.factCn + '</div>' +
            '<div class="america-vocab">📖 新词汇: ' + fact.vocab + '</div>';
        card.onclick = function() { speak(fact.fact); };
        container.appendChild(card);
    });

    parseEmojis(container);
}

// =============================================================
// DRESSING ROOM
// =============================================================

function buildCharacterSVG(options) {
    var gender = options.gender || 'boy';
    var s = options.scale || 1;
    var sz = Math.round(180 * s);
    var customImg = localStorage.getItem('duoverse_custom_avatar');
    if (customImg) {
        return '<img src="'+customImg+'" width="'+sz+'" style="display:block;margin:0 auto;border-radius:16px;max-height:'+(sz*1.3)+'px;object-fit:contain;border:3px solid white;box-shadow:0 5px 20px rgba(0,0,0,0.15);background:white;" alt="avatar">';
    }
    var skin = options.skinTone || '#FFDBB4';
    var hair = options.hairColor || '#2c1810';
    var eye = options.eyeColor || localStorage.getItem('duoverse_eye_color') || '#4a90d9';
    var hs = options.hairStyle || (gender==='girl'?'long':'spiky');
    var shirt = options.shirtColor || (gender==='girl'?'#FF69B4':'#4ECDC4');

    // CSS character - face portrait + small shoulders
    var face = sz, pad = Math.round(10*s);
    var h = '';
    h += '<div class="anime-char" style="width:'+face+'px;height:'+Math.round(face*1.2)+'px;position:relative;margin:0 auto;">';

    // Hair back (behind face)
    if (hs==='long'||hs==='ponytail'||hs==='curly'||hs==='buns') {
        h += '<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:'+Math.round(face*1.05)+'px;height:'+Math.round(face*0.95)+'px;background:'+hair+';border-radius:50% 50% 45% 45%;z-index:1;"></div>';
        // Side hair
        h += '<div style="position:absolute;top:'+Math.round(face*0.25)+'px;left:'+Math.round(face*-0.03)+'px;width:'+Math.round(face*0.14)+'px;height:'+Math.round(face*0.55)+'px;background:'+hair+';border-radius:40%;z-index:3;"></div>';
        h += '<div style="position:absolute;top:'+Math.round(face*0.25)+'px;right:'+Math.round(face*-0.03)+'px;width:'+Math.round(face*0.14)+'px;height:'+Math.round(face*0.55)+'px;background:'+hair+';border-radius:40%;z-index:3;"></div>';
    }
    if (hs==='spiky'||hs==='buzz') {
        h += '<div style="position:absolute;top:'+Math.round(face*-0.02)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(face*1.02)+'px;height:'+Math.round(face*0.6)+'px;background:'+hair+';border-radius:50% 50% 30% 30%;z-index:1;"></div>';
    }
    if (hs==='buns') {
        var bunSz = Math.round(face*0.22);
        h += '<div style="position:absolute;top:'+Math.round(-bunSz*0.5)+'px;left:'+Math.round(face*0.1)+'px;width:'+bunSz+'px;height:'+bunSz+'px;background:'+hair+';border-radius:50%;z-index:4;"></div>';
        h += '<div style="position:absolute;top:'+Math.round(-bunSz*0.5)+'px;right:'+Math.round(face*0.1)+'px;width:'+bunSz+'px;height:'+bunSz+'px;background:'+hair+';border-radius:50%;z-index:4;"></div>';
    }
    if (hs==='ponytail') {
        h += '<div style="position:absolute;top:'+Math.round(face*0.08)+'px;right:'+Math.round(face*-0.08)+'px;width:'+Math.round(face*0.12)+'px;height:'+Math.round(face*0.5)+'px;background:'+hair+';border-radius:30%;z-index:0;"></div>';
    }

    // Face
    h += '<div style="position:absolute;top:'+Math.round(face*0.12)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(face*0.85)+'px;height:'+Math.round(face*0.82)+'px;background:linear-gradient(170deg,'+skin+','+darken(skin,15)+');border-radius:42% 42% 38% 38%;z-index:2;box-shadow:inset 0 -'+Math.round(3*s)+'px '+Math.round(8*s)+'px rgba(0,0,0,0.04);"></div>';

    // Eyes container
    var eyeY = Math.round(face*0.38), eyeH = Math.round(face*0.22), eyeW = Math.round(face*0.18);
    var eyeGap = Math.round(face*0.08);

    // Left eye
    var lx = Math.round(face*0.5 - eyeGap - eyeW);
    h += buildAnimeEye(lx, eyeY, eyeW, eyeH, eye, hair, gender==='girl', s);
    // Right eye
    var rx = Math.round(face*0.5 + eyeGap);
    h += buildAnimeEye(rx, eyeY, eyeW, eyeH, eye, hair, gender==='girl', s);

    // Blush
    var blushY = Math.round(face*0.55);
    h += '<div style="position:absolute;top:'+blushY+'px;left:'+Math.round(lx-face*0.03)+'px;width:'+Math.round(face*0.12)+'px;height:'+Math.round(face*0.06)+'px;background:rgba(255,150,150,0.3);border-radius:50%;z-index:5;"></div>';
    h += '<div style="position:absolute;top:'+blushY+'px;right:'+Math.round(face-rx-eyeW-face*0.03)+'px;width:'+Math.round(face*0.12)+'px;height:'+Math.round(face*0.06)+'px;background:rgba(255,150,150,0.3);border-radius:50%;z-index:5;"></div>';

    // Nose (tiny)
    h += '<div style="position:absolute;top:'+Math.round(face*0.56)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(3*s)+'px;height:'+Math.round(3*s)+'px;background:rgba(0,0,0,0.08);border-radius:50%;z-index:5;"></div>';

    // Mouth
    h += '<div style="position:absolute;top:'+Math.round(face*0.64)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(face*0.1)+'px;height:'+Math.round(face*0.04)+'px;border-bottom:'+Math.round(2*s)+'px solid #d4836b;border-radius:0 0 50% 50%;z-index:5;"></div>';

    // Front hair / bangs
    var bangsH = Math.round(face*0.22);
    if (hs==='spiky') {
        for (var i=0;i<7;i++) {
            var sx=Math.round(face*0.08+i*face*0.13), sw=Math.round(face*0.15), sh=Math.round(bangsH+Math.sin(i*1.5)*face*0.08);
            h += '<div style="position:absolute;top:'+Math.round(face*0.02)+'px;left:'+sx+'px;width:'+sw+'px;height:'+sh+'px;background:'+hair+';clip-path:polygon(50% 0%, 0% 100%, 100% 100%);z-index:6;transform:rotate('+(i%2===0?'-5':'5')+'deg);"></div>';
        }
    } else {
        // Smooth bangs
        h += '<div style="position:absolute;top:'+Math.round(face*0.05)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(face*0.9)+'px;height:'+bangsH+'px;background:'+hair+';border-radius:0 0 '+Math.round(face*0.3)+'px '+Math.round(face*0.3)+'px;z-index:6;"></div>';
        // Parted bangs effect
        h += '<div style="position:absolute;top:'+Math.round(face*0.05)+'px;left:50%;transform:translateX(-50%);width:'+Math.round(face*0.05)+'px;height:'+Math.round(bangsH*0.7)+'px;background:linear-gradient(180deg,'+darken(hair,-30)+',transparent);z-index:7;border-radius:0 0 50% 50%;"></div>';
    }

    // Hair shine
    h += '<div style="position:absolute;top:'+Math.round(face*0.06)+'px;left:'+Math.round(face*0.25)+'px;width:'+Math.round(face*0.25)+'px;height:'+Math.round(face*0.06)+'px;background:rgba(255,255,255,0.15);border-radius:50%;z-index:8;"></div>';

    // Small shoulders/shirt hint at bottom
    h += '<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:'+Math.round(face*0.7)+'px;height:'+Math.round(face*0.15)+'px;background:'+shirt+';border-radius:'+Math.round(face*0.2)+'px '+Math.round(face*0.2)+'px 0 0;z-index:1;"></div>';

    h += '</div>';
    return h;
}

function buildAnimeEye(x, y, w, h, eyeColor, hairColor, isGirl, s) {
    var o = '';
    // White
    o += '<div style="position:absolute;top:'+y+'px;left:'+x+'px;width:'+w+'px;height:'+h+'px;background:white;border-radius:40%;z-index:4;box-shadow:inset 0 0 '+Math.round(2*s)+'px rgba(0,0,0,0.05);"></div>';
    // Iris
    var iW = Math.round(w*0.78), iH = Math.round(h*0.85);
    o += '<div style="position:absolute;top:'+Math.round(y+h*0.12)+'px;left:'+Math.round(x+w*0.11)+'px;width:'+iW+'px;height:'+iH+'px;background:linear-gradient(180deg,'+eyeColor+','+darken(eyeColor,40)+');border-radius:40%;z-index:5;"></div>';
    // Pupil
    var pW = Math.round(w*0.45), pH = Math.round(h*0.55);
    o += '<div style="position:absolute;top:'+Math.round(y+h*0.25)+'px;left:'+Math.round(x+w*0.28)+'px;width:'+pW+'px;height:'+pH+'px;background:#0a0a18;border-radius:40%;z-index:6;"></div>';
    // Big highlight
    var hlW = Math.round(w*0.35), hlH = Math.round(h*0.3);
    o += '<div style="position:absolute;top:'+Math.round(y+h*0.08)+'px;left:'+Math.round(x+w*0.12)+'px;width:'+hlW+'px;height:'+hlH+'px;background:white;border-radius:50%;z-index:7;"></div>';
    // Small highlight
    o += '<div style="position:absolute;top:'+Math.round(y+h*0.55)+'px;left:'+Math.round(x+w*0.55)+'px;width:'+Math.round(w*0.18)+'px;height:'+Math.round(h*0.15)+'px;background:white;border-radius:50%;z-index:7;opacity:0.7;"></div>';
    // Upper eyelid line
    o += '<div style="position:absolute;top:'+Math.round(y-h*0.08)+'px;left:'+Math.round(x-w*0.05)+'px;width:'+Math.round(w*1.1)+'px;height:'+Math.round(h*0.2)+'px;background:'+darken(hairColor,20)+';border-radius:50% 50% 30% 30%;z-index:6;"></div>';
    // Girl lashes
    if (isGirl) {
        o += '<div style="position:absolute;top:'+Math.round(y-h*0.18)+'px;left:'+Math.round(x-w*0.1)+'px;width:'+Math.round(3*s)+'px;height:'+Math.round(h*0.2)+'px;background:'+darken(hairColor,20)+';border-radius:50%;z-index:7;transform:rotate(-20deg);"></div>';
        o += '<div style="position:absolute;top:'+Math.round(y-h*0.22)+'px;left:'+Math.round(x+w*0.02)+'px;width:'+Math.round(2.5*s)+'px;height:'+Math.round(h*0.18)+'px;background:'+darken(hairColor,20)+';border-radius:50%;z-index:7;transform:rotate(-10deg);"></div>';
    }
    return o;
}

function darken(hex, amt) {
    hex = hex.replace('#','');
    if (hex.length===3) hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r=Math.max(0,Math.min(255,parseInt(hex.substring(0,2),16)-amt));
    var g=Math.max(0,Math.min(255,parseInt(hex.substring(2,4),16)-amt));
    var b=Math.max(0,Math.min(255,parseInt(hex.substring(4,6),16)-amt));
    return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

// Old SVG character code removed - using DiceBear API now
// Users can upload their own anime character image in the dressing room
function _oldCharCode() { var eye = '#2563eb';
    var hs = options.hairStyle || (gender==='girl'?'long':'spiky');
    var W=160,H=220,w=W*s,h=H*s;
    var d = function(c){var n=parseInt(c.replace('#',''),16);var r=Math.max(0,(n>>16)-30);var g=Math.max(0,((n>>8)&255)-30);var b=Math.max(0,(n&255)-30);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);};
    var o='<svg viewBox="0 0 '+W+' '+H+'" width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg">';
    // Body
    o+='<rect x="58" y="142" width="44" height="38" rx="8" fill="'+shirt+'"/>';
    o+='<rect x="42" y="145" width="16" height="28" rx="8" fill="'+shirt+'"/>';
    o+='<rect x="102" y="145" width="16" height="28" rx="8" fill="'+shirt+'"/>';
    o+='<circle cx="50" cy="176" r="6" fill="'+skin+'"/>';
    o+='<circle cx="110" cy="176" r="6" fill="'+skin+'"/>';
    if(gender==='girl'){
        o+='<path d="M58 178 L52 210 L108 210 L102 178Z" fill="#7C5CBF"/>';
    } else {
        o+='<rect x="62" y="178" width="15" height="30" rx="4" fill="#3B5998"/>';
        o+='<rect x="83" y="178" width="15" height="30" rx="4" fill="#3B5998"/>';
    }
    o+='<ellipse cx="72" cy="212" rx="11" ry="5" fill="#e74c3c"/>';
    o+='<ellipse cx="88" cy="212" rx="11" ry="5" fill="#e74c3c"/>';
    // Neck
    o+='<rect x="72" y="135" width="16" height="12" rx="4" fill="'+skin+'"/>';
    // Head
    o+='<ellipse cx="80" cy="78" rx="52" ry="56" fill="'+skin+'"/>';
    // Hair back
    if(hs==='long'||hs==='ponytail'){o+='<ellipse cx="80" cy="42" rx="56" ry="40" fill="'+hair+'"/>';o+='<rect x="26" y="48" width="16" height="68" rx="8" fill="'+hair+'"/>';o+='<rect x="118" y="48" width="16" height="68" rx="8" fill="'+hair+'"/>';}
    if(hs==='ponytail'){o+='<rect x="120" y="38" width="12" height="56" rx="6" fill="'+hair+'"/>';o+='<circle cx="126" cy="35" r="5" fill="#FF69B4"/>';}
    if(hs==='spiky'||hs==='buzz'){o+='<ellipse cx="80" cy="40" rx="54" ry="36" fill="'+hair+'"/>';}
    if(hs==='curly'){o+='<ellipse cx="80" cy="40" rx="56" ry="38" fill="'+hair+'"/>';o+='<circle cx="30" cy="60" r="12" fill="'+hair+'"/>';o+='<circle cx="130" cy="60" r="12" fill="'+hair+'"/>';o+='<circle cx="32" cy="82" r="10" fill="'+hair+'"/>';o+='<circle cx="128" cy="82" r="10" fill="'+hair+'"/>';}
    if(hs==='buns'){o+='<ellipse cx="80" cy="42" rx="54" ry="36" fill="'+hair+'"/>';o+='<circle cx="40" cy="28" r="15" fill="'+hair+'"/>';o+='<circle cx="120" cy="28" r="15" fill="'+hair+'"/>';}
    // EYES -- the key anime feature
    // White
    o+='<ellipse cx="60" cy="82" rx="15" ry="17" fill="white"/>';
    o+='<ellipse cx="100" cy="82" rx="15" ry="17" fill="white"/>';
    // Iris (colored, large)
    o+='<ellipse cx="61" cy="84" rx="12" ry="14" fill="'+eye+'"/>';
    o+='<ellipse cx="99" cy="84" rx="12" ry="14" fill="'+eye+'"/>';
    // Pupil
    o+='<ellipse cx="61" cy="86" rx="7" ry="9" fill="#0f0f1a"/>';
    o+='<ellipse cx="99" cy="86" rx="7" ry="9" fill="#0f0f1a"/>';
    // Big highlight (top-left)
    o+='<ellipse cx="55" cy="77" rx="6" ry="5" fill="white"/>';
    o+='<ellipse cx="93" cy="77" rx="6" ry="5" fill="white"/>';
    // Small highlight (bottom-right)
    o+='<circle cx="66" cy="90" r="3" fill="white" opacity="0.7"/>';
    o+='<circle cx="104" cy="90" r="3" fill="white" opacity="0.7"/>';
    // Upper lash line (thick, defines the eye)
    o+='<path d="M44 68 Q52 63 60 65 Q68 63 76 68" fill="none" stroke="'+d(hair)+'" stroke-width="3.5" stroke-linecap="round"/>';
    o+='<path d="M84 68 Q92 63 100 65 Q108 63 116 68" fill="none" stroke="'+d(hair)+'" stroke-width="3.5" stroke-linecap="round"/>';
    // Girl lashes
    if(gender==='girl'){
        o+='<line x1="43" y1="70" x2="38" y2="64" stroke="'+d(hair)+'" stroke-width="2.5" stroke-linecap="round"/>';
        o+='<line x1="46" y1="67" x2="42" y2="61" stroke="'+d(hair)+'" stroke-width="2" stroke-linecap="round"/>';
        o+='<line x1="117" y1="70" x2="122" y2="64" stroke="'+d(hair)+'" stroke-width="2.5" stroke-linecap="round"/>';
        o+='<line x1="114" y1="67" x2="118" y2="61" stroke="'+d(hair)+'" stroke-width="2" stroke-linecap="round"/>';
    }
    // Eyebrows
    o+='<path d="M47 60 Q60 54 73 60" fill="none" stroke="'+hair+'" stroke-width="2" opacity="0.5" stroke-linecap="round"/>';
    o+='<path d="M87 60 Q100 54 113 60" fill="none" stroke="'+hair+'" stroke-width="2" opacity="0.5" stroke-linecap="round"/>';
    // Nose (tiny line)
    o+='<path d="M78 100 Q80 103 82 100" fill="none" stroke="'+d(skin)+'" stroke-width="1.2" opacity="0.5"/>';
    // Mouth
    o+='<path d="M72 110 Q77 115 80 114 Q83 115 88 110" fill="none" stroke="#c97b63" stroke-width="1.8" stroke-linecap="round"/>';
    // Blush
    o+='<ellipse cx="46" cy="100" rx="9" ry="5" fill="#ffaaaa" opacity="0.35"/>';
    o+='<ellipse cx="114" cy="100" rx="9" ry="5" fill="#ffaaaa" opacity="0.35"/>';
    // Front hair (bangs -- ABOVE eyes, wavy bottom edge)
    if(hs==='spiky'){
        o+='<path d="M28 44 L35 16 L48 38 L55 8 L68 34 L78 4 L88 34 L100 8 L108 38 L118 16 L132 44 Q120 54 108 50 Q90 56 80 52 Q60 56 50 50 Q38 54 28 44Z" fill="'+hair+'"/>';
    }
    if(hs==='long'||hs==='ponytail'){
        o+='<path d="M28 50 Q42 42 55 48 Q65 36 80 42 Q95 36 105 48 Q118 42 132 50 Q126 56 118 52 Q100 58 80 54 Q60 58 42 52 Q34 56 28 50Z" fill="'+hair+'"/>';
    }
    if(hs==='curly'){
        o+='<circle cx="40" cy="42" r="12" fill="'+hair+'"/>';o+='<circle cx="56" cy="34" r="13" fill="'+hair+'"/>';o+='<circle cx="76" cy="30" r="14" fill="'+hair+'"/>';o+='<circle cx="96" cy="34" r="13" fill="'+hair+'"/>';o+='<circle cx="116" cy="42" r="12" fill="'+hair+'"/>';
    }
    if(hs==='buzz'){
        o+='<path d="M30 48 Q55 38 80 40 Q105 38 130 48 Q126 54 118 50 Q100 56 80 52 Q60 56 42 50 Q34 54 30 48Z" fill="'+hair+'"/>';
    }
    if(hs==='buns'){
        o+='<path d="M30 48 Q45 40 58 46 Q68 34 80 40 Q92 34 102 46 Q115 40 130 48 Q126 54 118 50 Q100 56 80 52 Q60 56 42 50 Q34 54 30 48Z" fill="'+hair+'"/>';
    }
    // Hair shine
    o+='<ellipse cx="65" cy="32" rx="16" ry="4" fill="white" opacity="0.1"/>';
    o+='</svg>';
    return o;
}

function _unused1(options) { return ''; } function _unused1b(options) {
    var gender = options.gender || 'boy';
    var s = options.scale || 1;
    var W = 200, H = 340;
    var w = W * s, h = H * s;
    var skin = options.skinTone || '#FFDBB4';
    var skinShadow = adjustColor(skin, -25);
    var hair = options.hairColor || '#2c1810';
    var hairHi = adjustColor(hair, 40);
    var shirt = options.shirtColor || (gender === 'girl' ? '#FF69B4' : '#4ECDC4');
    var shirtDk = options.shirtDark || adjustColor(shirt, -30);
    var pants = gender === 'girl' ? '#7C5CBF' : '#3B5998';
    var hairStyle = options.hairStyle || (gender === 'girl' ? 'long' : 'spiky');
    var eyeCol = options.eyeColor || localStorage.getItem('duoverse_eye_color') || '#3a6db5';

    var o = '<svg viewBox="0 0 '+W+' '+H+'" width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg">';

    // ---- BODY (behind head) ----
    // Neck
    o += '<rect x="90" y="148" width="20" height="18" rx="5" fill="'+skin+'"/>';
    // Torso
    o += '<path d="M68 165 Q68 158 78 158 L122 158 Q132 158 132 165 L135 220 Q135 228 125 228 L75 228 Q65 228 65 220 Z" fill="'+shirt+'"/>';
    o += '<path d="M78 158 L90 158 L90 228 L75 228 Q65 228 65 220 L68 165 Q68 158 78 158 Z" fill="'+shirtDk+'" opacity="0.2"/>';
    // Collar
    o += '<path d="M88 158 L100 172 L112 158" fill="none" stroke="white" stroke-width="1.5" opacity="0.35"/>';
    // Arms
    o += '<path d="M68 165 Q55 168 50 180 L48 210 Q47 218 55 218 L60 218 Q65 218 65 212 L68 180" fill="'+shirt+'"/>';
    o += '<path d="M132 165 Q145 168 150 180 L152 210 Q153 218 145 218 L140 218 Q135 218 135 212 L132 180" fill="'+shirt+'"/>';
    // Hands
    o += '<ellipse cx="55" cy="220" rx="9" ry="8" fill="'+skin+'"/>';
    o += '<ellipse cx="145" cy="220" rx="9" ry="8" fill="'+skin+'"/>';
    // Legs
    if (gender === 'girl') {
        o += '<path d="M75 225 L65 270 Q63 278 73 278 L95 278 Q100 278 98 270 L92 225 Z" fill="'+pants+'"/>';
        o += '<path d="M108 225 L102 270 Q100 278 105 278 L127 278 Q137 278 135 270 L125 225 Z" fill="'+pants+'"/>';
    } else {
        o += '<rect x="72" y="225" width="24" height="52" rx="6" fill="'+pants+'"/>';
        o += '<rect x="104" y="225" width="24" height="52" rx="6" fill="'+pants+'"/>';
    }
    // Shoes
    o += '<ellipse cx="84" cy="280" rx="16" ry="8" fill="#e74c3c"/>';
    o += '<ellipse cx="116" cy="280" rx="16" ry="8" fill="#e74c3c"/>';
    o += '<ellipse cx="84" cy="278" rx="13" ry="4" fill="white" opacity="0.2"/>';
    o += '<ellipse cx="116" cy="278" rx="13" ry="4" fill="white" opacity="0.2"/>';

    // ---- HEAD ----
    o += '<ellipse cx="100" cy="88" rx="58" ry="62" fill="'+skin+'"/>';
    // Face shadow
    o += '<ellipse cx="100" cy="95" rx="50" ry="52" fill="'+skinShadow+'" opacity="0.08"/>';

    // ---- BACK HAIR (behind head but we draw hair outline) ----
    if (hairStyle === 'long' || hairStyle === 'ponytail') {
        o += '<ellipse cx="100" cy="52" rx="64" ry="44" fill="'+hair+'"/>';
        o += '<rect x="38" y="55" width="20" height="90" rx="10" fill="'+hair+'"/>';
        o += '<rect x="142" y="55" width="20" height="90" rx="10" fill="'+hair+'"/>';
    }
    if (hairStyle === 'ponytail') {
        o += '<rect x="148" y="45" width="15" height="70" rx="7" fill="'+hair+'"/>';
        o += '<circle cx="155" cy="42" r="7" fill="#FF69B4"/>';
    }
    if (hairStyle === 'curly') {
        o += '<ellipse cx="100" cy="48" rx="66" ry="44" fill="'+hair+'"/>';
        for (var ci=0;ci<8;ci++) {
            var ca = (ci/8)*Math.PI*2-0.3;
            var cx = 100+Math.cos(ca)*62, cy = 75+Math.sin(ca)*55;
            o += '<circle cx="'+cx+'" cy="'+cy+'" r="14" fill="'+hair+'"/>';
        }
    }
    if (hairStyle === 'buns') {
        o += '<ellipse cx="100" cy="50" rx="63" ry="42" fill="'+hair+'"/>';
        o += '<circle cx="55" cy="32" r="20" fill="'+hair+'"/>';
        o += '<circle cx="145" cy="32" r="20" fill="'+hair+'"/>';
        o += '<circle cx="55" cy="30" r="10" fill="'+hairHi+'" opacity="0.15"/>';
        o += '<circle cx="145" cy="30" r="10" fill="'+hairHi+'" opacity="0.15"/>';
    }
    if (hairStyle === 'spiky' || hairStyle === 'buzz') {
        o += '<ellipse cx="100" cy="48" rx="62" ry="40" fill="'+hair+'"/>';
    }

    // ---- EYES (drawn AFTER head, always visible) ----
    var ey = 90;
    // Left eye
    o += '<ellipse cx="76" cy="'+ey+'" rx="16" ry="18" fill="white"/>';
    o += '<ellipse cx="76" cy="'+(ey+1)+'" rx="16" ry="18" fill="white" stroke="#c0c0c0" stroke-width="0.3"/>';
    o += '<ellipse cx="77" cy="'+(ey+3)+'" rx="11" ry="14" fill="'+eyeCol+'"/>';
    o += '<ellipse cx="77" cy="'+(ey+5)+'" rx="7" ry="10" fill="#1a1a30"/>';
    o += '<ellipse cx="73" cy="'+(ey-4)+'" rx="5" ry="5" fill="white"/>';
    o += '<circle cx="81" cy="'+(ey+6)+'" r="2.5" fill="white" opacity="0.6"/>';
    // Upper lid / lash line
    o += '<path d="M60 '+(ey-14)+' Q68 '+(ey-20)+' 76 '+(ey-18)+' Q84 '+(ey-20)+' 92 '+(ey-14)+'" fill="none" stroke="'+hair+'" stroke-width="3" stroke-linecap="round"/>';

    // Right eye
    o += '<ellipse cx="124" cy="'+ey+'" rx="16" ry="18" fill="white"/>';
    o += '<ellipse cx="124" cy="'+(ey+1)+'" rx="16" ry="18" fill="white" stroke="#c0c0c0" stroke-width="0.3"/>';
    o += '<ellipse cx="123" cy="'+(ey+3)+'" rx="11" ry="14" fill="'+eyeCol+'"/>';
    o += '<ellipse cx="123" cy="'+(ey+5)+'" rx="7" ry="10" fill="#1a1a30"/>';
    o += '<ellipse cx="119" cy="'+(ey-4)+'" rx="5" ry="5" fill="white"/>';
    o += '<circle cx="127" cy="'+(ey+6)+'" r="2.5" fill="white" opacity="0.6"/>';
    // Upper lid / lash line
    o += '<path d="M108 '+(ey-14)+' Q116 '+(ey-20)+' 124 '+(ey-18)+' Q132 '+(ey-20)+' 140 '+(ey-14)+'" fill="none" stroke="'+hair+'" stroke-width="3" stroke-linecap="round"/>';

    // Girl extra lashes
    if (gender === 'girl') {
        o += '<line x1="59" y1="'+(ey-12)+'" x2="54" y2="'+(ey-19)+'" stroke="'+hair+'" stroke-width="2.5" stroke-linecap="round"/>';
        o += '<line x1="62" y1="'+(ey-15)+'" x2="58" y2="'+(ey-22)+'" stroke="'+hair+'" stroke-width="2" stroke-linecap="round"/>';
        o += '<line x1="141" y1="'+(ey-12)+'" x2="146" y2="'+(ey-19)+'" stroke="'+hair+'" stroke-width="2.5" stroke-linecap="round"/>';
        o += '<line x1="138" y1="'+(ey-15)+'" x2="142" y2="'+(ey-22)+'" stroke="'+hair+'" stroke-width="2" stroke-linecap="round"/>';
    }

    // Eyebrows
    o += '<path d="M63 '+(ey-22)+' Q76 '+(ey-28)+' 89 '+(ey-22)+'" fill="none" stroke="'+hair+'" stroke-width="2" stroke-linecap="round" opacity="0.6"/>';
    o += '<path d="M111 '+(ey-22)+' Q124 '+(ey-28)+' 137 '+(ey-22)+'" fill="none" stroke="'+hair+'" stroke-width="2" stroke-linecap="round" opacity="0.6"/>';

    // Nose
    o += '<path d="M98 110 Q100 114 102 110" fill="none" stroke="'+skinShadow+'" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>';

    // Mouth
    o += '<path d="M90 122 Q96 128 100 127 Q104 128 110 122" fill="none" stroke="#d4836b" stroke-width="2" stroke-linecap="round"/>';
    // Small mouth highlight
    o += '<path d="M95 124 Q100 126 105 124" fill="#e8a090" opacity="0.3"/>';

    // Blush
    o += '<ellipse cx="62" cy="112" rx="11" ry="6" fill="#ff9999" opacity="0.3"/>';
    o += '<ellipse cx="138" cy="112" rx="11" ry="6" fill="#ff9999" opacity="0.3"/>';

    // ---- FRONT HAIR (bangs only - sits on forehead ABOVE eyes) ----
    if (hairStyle === 'spiky') {
        o += '<path d="M40 52 L48 22 L62 46 L68 12 L82 40 L92 8 L100 38 L108 8 L118 40 L132 12 L138 46 L152 22 L160 52 Q150 60 140 56 Q120 64 100 58 Q80 64 60 56 Q50 60 40 52 Z" fill="'+hair+'"/>';
    }
    if (hairStyle === 'long' || hairStyle === 'ponytail') {
        o += '<path d="M40 58 Q55 50 70 56 Q82 44 100 50 Q118 44 130 56 Q145 50 160 58 Q155 64 148 60 Q125 68 100 62 Q75 68 52 60 Q45 64 40 58 Z" fill="'+hair+'"/>';
    }
    if (hairStyle === 'curly') {
        var bx = [52,68,84,100,116,132,148];
        for (var bi=0;bi<bx.length;bi++) {
            o += '<circle cx="'+bx[bi]+'" cy="'+(44+Math.sin(bi*1.2)*6)+'" r="'+(14-Math.abs(bi-3))+'" fill="'+hair+'"/>';
        }
    }
    if (hairStyle === 'buzz') {
        o += '<path d="M42 54 Q70 44 100 46 Q130 44 158 54 Q155 60 148 56 Q125 62 100 58 Q75 62 52 56 Q45 60 42 54 Z" fill="'+hair+'"/>';
    }
    if (hairStyle === 'buns') {
        o += '<path d="M42 56 Q60 48 75 54 Q88 42 100 48 Q112 42 125 54 Q140 48 158 56 Q155 62 148 58 Q125 66 100 60 Q75 66 52 58 Q45 62 42 56 Z" fill="'+hair+'"/>';
    }
    // Hair shine
    o += '<ellipse cx="82" cy="38" rx="18" ry="5" fill="'+hairHi+'" opacity="0.15"/>';

    o += '</svg>';
    return o;
}

// Darken/lighten a hex color
function adjustColor(hex, amt) {
    hex = hex.replace('#','');
    var r = Math.max(0,Math.min(255,parseInt(hex.substring(0,2),16)+amt));
    var g = Math.max(0,Math.min(255,parseInt(hex.substring(2,4),16)+amt));
    var b = Math.max(0,Math.min(255,parseInt(hex.substring(4,6),16)+amt));
    return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

function _unused2(options) { return ''; } function _unused2b(options) {
    var skin = options.skinTone || '#FFDBB4';
    var gender = options.gender || 'boy';
    var s = options.scale || 1;
    var w = 200 * s;
    var h = 300 * s;
    var hairStyle = options.hairStyle || (gender === 'girl' ? 'long' : 'spiky');
    var hairColor = options.hairColor || '#3D2314';
    var hairLight = options.hairLight || '#6B4C3B';
    var shirtColor = options.shirtColor || (gender === 'girl' ? '#FF69B4' : '#4ECDC4');
    var shirtDark = options.shirtDark || (gender === 'girl' ? '#E05AA0' : '#3BB5AD');
    var pantsColor = gender === 'girl' ? '#A78BFA' : '#3B5998';
    var eyeColor = options.eyeColor || '#1a1a2e';

    var svg = '<svg viewBox="0 0 200 300" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">';

    // --- BODY ---
    svg += '<rect x="72" y="158" width="56" height="58" rx="12" fill="' + shirtColor + '"/>';
    svg += '<rect x="78" y="158" width="18" height="58" rx="6" fill="' + shirtDark + '" opacity="0.25"/>';
    svg += '<path d="M88 158 L100 170 L112 158" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>';
    svg += '<rect x="52" y="162" width="22" height="44" rx="11" fill="' + shirtColor + '"/>';
    svg += '<rect x="126" y="162" width="22" height="44" rx="11" fill="' + shirtColor + '"/>';
    svg += '<circle cx="63" cy="210" r="9" fill="' + skin + '"/>';
    svg += '<circle cx="137" cy="210" r="9" fill="' + skin + '"/>';
    if (gender === 'girl') {
        svg += '<path d="M72 212 L62 252 L138 252 L128 212 Z" fill="' + pantsColor + '"/>';
        svg += '<rect x="80" y="246" width="16" height="32" rx="8" fill="' + skin + '"/>';
        svg += '<rect x="104" y="246" width="16" height="32" rx="8" fill="' + skin + '"/>';
    } else {
        svg += '<rect x="76" y="212" width="20" height="42" rx="6" fill="' + pantsColor + '"/>';
        svg += '<rect x="104" y="212" width="20" height="42" rx="6" fill="' + pantsColor + '"/>';
    }
    svg += '<ellipse cx="88" cy="285" rx="15" ry="7" fill="#FF6B6B"/>';
    svg += '<ellipse cx="112" cy="285" rx="15" ry="7" fill="#FF6B6B"/>';
    svg += '<ellipse cx="88" cy="283" rx="12" ry="4" fill="white" opacity="0.25"/>';
    svg += '<ellipse cx="112" cy="283" rx="12" ry="4" fill="white" opacity="0.25"/>';

    // --- HAIR BACK (behind head) ---
    if (hairStyle === 'long' || hairStyle === 'ponytail') {
        svg += '<ellipse cx="100" cy="52" rx="67" ry="45" fill="' + hairColor + '"/>';
        svg += '<rect x="36" y="60" width="20" height="80" rx="10" fill="' + hairColor + '"/>';
        svg += '<rect x="144" y="60" width="20" height="80" rx="10" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'ponytail') {
        svg += '<ellipse cx="155" cy="55" rx="12" ry="10" fill="' + hairColor + '"/>';
        svg += '<rect x="150" y="50" width="16" height="65" rx="8" fill="' + hairColor + '"/>';
        svg += '<circle cx="158" cy="45" r="6" fill="#FF69B4"/>';
    }
    if (hairStyle === 'spiky' || hairStyle === 'buzz') {
        svg += '<ellipse cx="100" cy="50" rx="64" ry="38" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'curly') {
        svg += '<ellipse cx="100" cy="48" rx="68" ry="42" fill="' + hairColor + '"/>';
        svg += '<circle cx="42" cy="70" r="14" fill="' + hairColor + '"/>';
        svg += '<circle cx="158" cy="70" r="14" fill="' + hairColor + '"/>';
        svg += '<circle cx="45" cy="95" r="12" fill="' + hairColor + '"/>';
        svg += '<circle cx="155" cy="95" r="12" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'buns') {
        svg += '<ellipse cx="100" cy="52" rx="66" ry="42" fill="' + hairColor + '"/>';
        svg += '<circle cx="55" cy="35" r="18" fill="' + hairColor + '"/>';
        svg += '<circle cx="145" cy="35" r="18" fill="' + hairColor + '"/>';
        svg += '<circle cx="55" cy="35" r="12" fill="' + hairLight + '" opacity="0.2"/>';
        svg += '<circle cx="145" cy="35" r="12" fill="' + hairLight + '" opacity="0.2"/>';
    }

    // --- HEAD ---
    svg += '<circle cx="100" cy="88" r="60" fill="' + skin + '"/>';
    svg += '<ellipse cx="108" cy="92" rx="52" ry="50" fill="white" opacity="0.06"/>';

    // --- FACE (always on top of head, never covered) ---
    // Eyes - big round anime style
    var ey = 92;
    // Left eye white
    svg += '<ellipse cx="78" cy="' + ey + '" rx="13" ry="15" fill="white" stroke="#ddd" stroke-width="0.5"/>';
    // Left iris
    svg += '<ellipse cx="78" cy="' + (ey+2) + '" rx="9" ry="11" fill="' + eyeColor + '"/>';
    // Left pupil
    svg += '<ellipse cx="78" cy="' + (ey+3) + '" rx="5" ry="7" fill="#0a0a15"/>';
    // Left shine
    svg += '<ellipse cx="74" cy="' + (ey-3) + '" rx="4.5" ry="3.5" fill="white"/>';
    svg += '<circle cx="82" cy="' + (ey+5) + '" r="2" fill="white" opacity="0.7"/>';

    // Right eye white
    svg += '<ellipse cx="122" cy="' + ey + '" rx="13" ry="15" fill="white" stroke="#ddd" stroke-width="0.5"/>';
    // Right iris
    svg += '<ellipse cx="122" cy="' + (ey+2) + '" rx="9" ry="11" fill="' + eyeColor + '"/>';
    // Right pupil
    svg += '<ellipse cx="122" cy="' + (ey+3) + '" rx="5" ry="7" fill="#0a0a15"/>';
    // Right shine
    svg += '<ellipse cx="118" cy="' + (ey-3) + '" rx="4.5" ry="3.5" fill="white"/>';
    svg += '<circle cx="126" cy="' + (ey+5) + '" r="2" fill="white" opacity="0.7"/>';

    // Eyebrows
    svg += '<path d="M65 ' + (ey-18) + ' Q78 ' + (ey-23) + ' 91 ' + (ey-18) + '" fill="none" stroke="' + hairColor + '" stroke-width="2.5" stroke-linecap="round"/>';
    svg += '<path d="M109 ' + (ey-18) + ' Q122 ' + (ey-23) + ' 135 ' + (ey-18) + '" fill="none" stroke="' + hairColor + '" stroke-width="2.5" stroke-linecap="round"/>';

    // Girl lashes
    if (gender === 'girl') {
        svg += '<line x1="64" y1="' + (ey-10) + '" x2="60" y2="' + (ey-16) + '" stroke="' + hairColor + '" stroke-width="2" stroke-linecap="round"/>';
        svg += '<line x1="136" y1="' + (ey-10) + '" x2="140" y2="' + (ey-16) + '" stroke="' + hairColor + '" stroke-width="2" stroke-linecap="round"/>';
    }

    // Nose
    svg += '<ellipse cx="100" cy="108" rx="2" ry="1.5" fill="' + hairColor + '" opacity="0.15"/>';

    // Mouth
    svg += '<path d="M93 118 Q100 124 107 118" fill="none" stroke="#D4836B" stroke-width="2" stroke-linecap="round"/>';

    // Blush
    svg += '<ellipse cx="66" cy="110" rx="9" ry="5" fill="#FFB3B3" opacity="0.45"/>';
    svg += '<ellipse cx="134" cy="110" rx="9" ry="5" fill="#FFB3B3" opacity="0.45"/>';

    // --- HAIR FRONT (bangs - drawn AFTER face so only top part covers forehead, NOT eyes) ---
    if (hairStyle === 'spiky') {
        svg += '<path d="M38 55 L42 28 L58 48 L60 18 L78 42 L85 12 L100 38 L115 12 L122 42 L140 18 L142 48 L158 28 L162 55" fill="' + hairColor + '"/>';
        svg += '<path d="M40 60 Q70 68 100 62 Q130 68 160 60 L160 50 Q130 58 100 50 Q70 58 40 50 Z" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'long' || hairStyle === 'ponytail') {
        svg += '<path d="M38 62 Q50 55 65 60 Q80 48 100 55 Q120 48 135 60 Q150 55 162 62 L162 52 Q130 40 100 48 Q70 40 38 52 Z" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'curly') {
        svg += '<circle cx="55" cy="50" r="12" fill="' + hairColor + '"/>';
        svg += '<circle cx="75" cy="42" r="13" fill="' + hairColor + '"/>';
        svg += '<circle cx="100" cy="38" r="14" fill="' + hairColor + '"/>';
        svg += '<circle cx="125" cy="42" r="13" fill="' + hairColor + '"/>';
        svg += '<circle cx="145" cy="50" r="12" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'buzz') {
        svg += '<path d="M40 58 Q70 50 100 52 Q130 50 160 58 L160 48 Q130 40 100 42 Q70 40 40 48 Z" fill="' + hairColor + '"/>';
    }
    if (hairStyle === 'buns') {
        svg += '<path d="M38 60 Q50 52 70 58 Q85 46 100 52 Q115 46 130 58 Q150 52 162 60 L162 50 Q130 38 100 45 Q70 38 38 50 Z" fill="' + hairColor + '"/>';
    }

    // Hair shine
    svg += '<ellipse cx="82" cy="40" rx="14" ry="4" fill="white" opacity="0.12"/>';

    svg += '</svg>';
    return svg;
}

function buildDressUp() {
    var stage = document.getElementById('dressup-stage');
    var wardrobe = document.getElementById('dressup-wardrobe');
    stage.innerHTML = '';
    wardrobe.innerHTML = '';

    var avatar = localStorage.getItem('duoverse_avatar') || '👦';
    var equipped = getEquipped();
    var owned = getOwned();
    var activePetId = getActivePet();

    var hatItem = equipped.hat ? storeItems.find(function(s) { return s.id === equipped.hat; }) : null;
    var glassItem = equipped.glasses ? storeItems.find(function(s) { return s.id === equipped.glasses; }) : null;
    var scarfItem = equipped.scarf ? storeItems.find(function(s) { return s.id === equipped.scarf; }) : null;
    var petItem = activePetId ? storeItems.find(function(s) { return s.id === activePetId; }) : null;

    // Determine skin tone
    var skinTones = {
        '👦': '#FFDBB4', '👦🏻': '#FFE4C4', '👦🏼': '#F5C08B', '👦🏽': '#D4A373', '👦🏾': '#8D6748', '👦🏿': '#5C3D2E',
        '👧': '#FFDBB4', '👧🏻': '#FFE4C4', '👧🏼': '#F5C08B', '👧🏽': '#D4A373', '👧🏾': '#8D6748', '👧🏿': '#5C3D2E'
    };
    var skinTone = skinTones[avatar] || '#FFDBB4';
    var gender = localStorage.getItem('duoverse_gender') || 'boy';

    // Get equipped customizations
    var outfitItem = equipped.outfit ? storeItems.find(function(s) { return s.id === equipped.outfit; }) : null;
    var outfitColors = outfitItem && outfitItem.colors ? outfitItem.colors : {};
    var hairItem = equipped.hair ? storeItems.find(function(s) { return s.id === equipped.hair; }) : null;
    var hairColorItem = equipped.haircolor ? storeItems.find(function(s) { return s.id === equipped.haircolor; }) : null;

    // Build character display
    var charDiv = document.createElement('div');
    charDiv.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0.5rem;';

    // Equipped items row (hat above avatar)
    if (hatItem) {
        var hatEl = document.createElement('div');
        hatEl.style.cssText = 'font-size:3rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));margin-bottom:-15px;z-index:2;position:relative;';
        hatEl.textContent = hatItem.emoji;
        charDiv.appendChild(hatEl);
    }

    // Avatar image
    var avatarWrap = document.createElement('div');
    avatarWrap.style.cssText = 'position:relative;';
    avatarWrap.innerHTML = buildCharacterSVG({
        gender: gender, skinTone: skinTone, scale: 1,
        hairStyle: hairItem ? hairItem.hairStyle : undefined,
        hairColor: hairColorItem ? hairColorItem.hairColor : undefined,
    });

    // Glasses overlay on face
    if (glassItem) {
        var glEl = document.createElement('div');
        glEl.style.cssText = 'position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:2.5rem;z-index:5;';
        glEl.textContent = glassItem.emoji;
        avatarWrap.appendChild(glEl);
    }

    charDiv.appendChild(avatarWrap);

    // Scarf below avatar
    if (scarfItem) {
        var scEl = document.createElement('div');
        scEl.style.cssText = 'font-size:2.5rem;margin-top:-15px;z-index:2;position:relative;';
        scEl.textContent = scarfItem.emoji;
        charDiv.appendChild(scEl);
    }

    // Equipped accessories row
    var accRow = document.createElement('div');
    accRow.style.cssText = 'display:flex;gap:0.8rem;justify-content:center;align-items:center;margin-top:0.5rem;';
    var allAcc = [hatItem, glassItem, scarfItem, outfitItem, hairItem, hairColorItem].filter(Boolean);
    if (allAcc.length > 0) {
        allAcc.forEach(function(item) {
            var tag = document.createElement('span');
            tag.style.cssText = 'background:rgba(255,255,255,0.8);padding:0.3rem 0.6rem;border-radius:12px;font-size:0.8rem;border:1px solid #eee;';
            tag.textContent = item.emoji + ' ' + item.name;
            accRow.appendChild(tag);
        });
    }
    charDiv.appendChild(accRow);

    // Pet buddy
    if (petItem) {
        var peEl = document.createElement('div');
        peEl.style.cssText = 'font-size:3rem;margin-top:0.5rem;animation:petBounce 2s ease-in-out infinite;';
        peEl.textContent = petItem.emoji;
        charDiv.appendChild(peEl);
    }

    stage.appendChild(charDiv);

    var nameTag = document.createElement('div');
    nameTag.style.cssText = 'margin-top:0.8rem;font-size:1.2rem;font-weight:700;color:var(--accent2);';
    nameTag.textContent = localStorage.getItem('duoverse_name') || 'Friend';
    stage.appendChild(nameTag);

    // Build wardrobe
    var slots = [
        { slot: 'hair', label: '💇 ' + t('发型', 'Hairstyles'), type: 'acc' },
        { slot: 'haircolor', label: '🎨 ' + t('发色', 'Hair Color'), type: 'acc' },
        { slot: 'outfit', label: '👕 ' + t('服装', 'Outfits'), type: 'acc' },
        { slot: 'hat', label: '🎩 ' + t('帽子', 'Hats'), type: 'acc' },
        { slot: 'glasses', label: '🕶️ ' + t('眼镜', 'Glasses'), type: 'acc' },
        { slot: 'scarf', label: '🧣 ' + t('围巾', 'Scarves'), type: 'acc' },
        { slot: 'pet', label: '🐾 ' + t('宠物', 'Pets'), type: 'pet' },
    ];

    slots.forEach(function(slotInfo) {
        var section = document.createElement('div');
        section.className = 'wardrobe-section';
        var title = document.createElement('div');
        title.className = 'wardrobe-title';
        title.textContent = slotInfo.label;
        section.appendChild(title);

        var items = document.createElement('div');
        items.className = 'wardrobe-items';

        var slotItems = slotInfo.type === 'pet'
            ? storeItems.filter(function(i) { return i.type === 'pet'; })
            : storeItems.filter(function(i) { return i.type === 'acc' && i.slot === slotInfo.slot; });

        slotItems.forEach(function(item) {
            var isOwned = owned.indexOf(item.id) !== -1;
            var isEquipped = slotInfo.type === 'pet' ? activePetId === item.id : equipped[slotInfo.slot] === item.id;

            var el = document.createElement('div');
            el.className = 'wardrobe-item' + (isEquipped ? ' equipped' : '') + (!isOwned ? ' locked' : '');
            el.textContent = item.emoji;
            el.title = item.name + (isOwned ? '' : ' (' + item.price + '🪙)');

            if (isOwned) {
                el.onclick = function() {
                    if (slotInfo.type === 'pet') {
                        if (isEquipped) { setActivePet(''); applyPet(''); }
                        else { setActivePet(item.id); applyPet(item.id); }
                    } else {
                        equipAccessory(item);
                    }
                    playPurchaseSound();
                    buildDressUp();
                    refreshHomepage();
                };
            }
            items.appendChild(el);
        });

        // Unequip button
        var currentEq = slotInfo.type === 'pet' ? activePetId : equipped[slotInfo.slot];
        if (currentEq) {
            var unBtn = document.createElement('div');
            unBtn.className = 'wardrobe-item';
            unBtn.textContent = '❌';
            unBtn.title = t('取下', 'Remove');
            unBtn.style.cssText = 'background:#FFE3E3;border-color:#FF6B6B;';
            unBtn.onclick = function() {
                if (slotInfo.type === 'pet') { setActivePet(''); applyPet(''); }
                else { var eq = getEquipped(); eq[slotInfo.slot] = ''; setEquipped(eq); }
                playPurchaseSound();
                buildDressUp();
                refreshHomepage();
            };
            items.appendChild(unBtn);
        }

        section.appendChild(items);
        wardrobe.appendChild(section);
    });

    // Avatar style picker
    var styleSection = document.createElement('div');
    styleSection.className = 'wardrobe-section';
    var styleTitle = document.createElement('div');
    styleTitle.className = 'wardrobe-title';
    styleTitle.textContent = '👁️ ' + t('眼睛颜色', 'Eye Color');
    styleSection.appendChild(styleTitle);

    var styleItems = document.createElement('div');
    styleItems.className = 'wardrobe-items';
    var styles = [
        { id: 'blue', label: '💙', eyeCol: '#3a6db5' },
        { id: 'green', label: '💚', eyeCol: '#2d8a4e' },
        { id: 'purple', label: '💜', eyeCol: '#7c3aed' },
        { id: 'brown', label: '🤎', eyeCol: '#8B4513' },
        { id: 'red', label: '❤️', eyeCol: '#c0392b' },
        { id: 'gold', label: '💛', eyeCol: '#d4a017' },
    ];
    var currentEyeColor = localStorage.getItem('duoverse_eye_color') || '#3a6db5';
    styles.forEach(function(st) {
        var btn = document.createElement('div');
        btn.className = 'wardrobe-item' + (currentEyeColor === st.eyeCol ? ' equipped' : '');
        btn.textContent = st.label;
        btn.title = st.label;
        btn.style.cssText += 'font-size:1.5rem;';
        btn.onclick = function() {
            localStorage.setItem('duoverse_eye_color', st.eyeCol);
            buildDressUp();
            refreshHomepage();
        };
        styleItems.appendChild(btn);
    });
    styleSection.appendChild(styleItems);
    wardrobe.appendChild(styleSection);

    // Upload custom avatar button
    var uploadSection = document.createElement('div');
    uploadSection.className = 'wardrobe-section';
    var uploadTitle = document.createElement('div');
    uploadTitle.className = 'wardrobe-title';
    uploadTitle.textContent = '📸 ' + t('自定义头像', 'Custom Avatar');
    uploadSection.appendChild(uploadTitle);
    var uploadDesc = document.createElement('div');
    uploadDesc.style.cssText = 'font-size:0.85rem;color:#999;margin-bottom:0.5rem;';
    uploadDesc.textContent = t('上传你喜欢的动漫角色图片！', 'Upload any anime character image you like!');
    uploadSection.appendChild(uploadDesc);
    var uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'image/*';
    uploadInput.style.cssText = 'display:none;';
    uploadInput.id = 'avatar-upload';
    uploadSection.appendChild(uploadInput);
    var uploadBtn = document.createElement('button');
    uploadBtn.className = 'wardrobe-go-store';
    uploadBtn.style.background = 'linear-gradient(135deg, #FF69B4, #A78BFA)';
    uploadBtn.textContent = '📸 ' + t('上传图片', 'Upload Image');
    uploadBtn.onclick = function() { uploadInput.click(); };
    uploadSection.appendChild(uploadBtn);
    if (localStorage.getItem('duoverse_custom_avatar')) {
        var clearBtn = document.createElement('button');
        clearBtn.className = 'wardrobe-go-store';
        clearBtn.style.cssText = 'background:#FF6B6B;margin-left:0.5rem;';
        clearBtn.textContent = '❌ ' + t('删除自定义', 'Remove Custom');
        clearBtn.onclick = function() {
            localStorage.removeItem('duoverse_custom_avatar');
            buildDressUp();
            refreshHomepage();
        };
        uploadSection.appendChild(clearBtn);
    }
    uploadInput.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) {
            localStorage.setItem('duoverse_custom_avatar', ev.target.result);
            buildDressUp();
            refreshHomepage();
        };
        reader.readAsDataURL(file);
    };
    wardrobe.appendChild(uploadSection);

    // Randomize button
    var randomBtn = document.createElement('button');
    randomBtn.className = 'wardrobe-go-store';
    randomBtn.style.background = 'linear-gradient(135deg, #A78BFA, #7C3AED)';
    randomBtn.textContent = '🎲 ' + t('随机新造型', 'Randomize Look!');
    randomBtn.onclick = function() {
        // Change seed to get a different character
        localStorage.setItem('duoverse_random_seed', String(Math.random()));
        buildDressUp();
        refreshHomepage();
    };
    wardrobe.appendChild(randomBtn);

    var storeBtn = document.createElement('button');
    storeBtn.className = 'wardrobe-go-store';
    storeBtn.textContent = '🛍️ ' + t('去商店买更多', 'Shop for more!');
    storeBtn.onclick = function() { showSection('store'); };
    wardrobe.appendChild(storeBtn);

    parseEmojis(stage);
    parseEmojis(wardrobe);
}

// =============================================================
// SENTENCE WORKOUT
// =============================================================

var sentenceComparisons = [
    { cn_think: '我要一个冰淇淋', cn_direct: 'I want one ice cream', en_real: 'Can I have a scoop of ice cream, please?', note: '美国人会说"一勺"(scoop)，还会加"please"表示礼貌！' },
    { cn_think: '你几岁了？', cn_direct: 'You how many years old?', en_real: 'How old are you?', note: '英语把"how old"放在前面，不说"几岁"！' },
    { cn_think: '我很喜欢吃苹果', cn_direct: 'I very like eat apple', en_real: 'I really like eating apples', note: '"很"不说"very"，用"really"。"吃"要变成"eating"，苹果要加"s"！' },
    { cn_think: '这个多少钱？', cn_direct: 'This how much money?', en_real: 'How much does this cost?', note: '英语把问题词放前面，还要加"does"和"cost"！' },
    { cn_think: '我的妈妈是老师', cn_direct: 'My mama is teacher', en_real: 'My mom is a teacher', note: '英语要在职业前加"a"，妈妈说"mom"更口语化！' },
    { cn_think: '外面下雨了', cn_direct: 'Outside down rain', en_real: "It's raining outside", note: '英语用"It\'s raining"，要加"it"和"-ing"！' },
    { cn_think: '我有两个哥哥', cn_direct: 'I have two older brother', en_real: 'I have two older brothers', note: '两个以上要加"s"！英语的"哥哥"就是"older brother"。' },
    { cn_think: '你想吃什么？', cn_direct: 'You want eat what?', en_real: 'What would you like to eat?', note: '"什么"放在句子最前面！"would you like"比"want"更礼貌。' },
    { cn_think: '我昨天去了公园', cn_direct: 'I yesterday go park', en_real: 'I went to the park yesterday', note: '"去"变成过去式"went"，要加"to the"，时间放最后！' },
    { cn_think: '他跑得很快', cn_direct: 'He run very fast', en_real: 'He runs really fast', note: '他/她后面的动词要加"s"！"很"用"really"更地道。' },
    { cn_think: '这是我的好朋友', cn_direct: 'This is my good friend', en_real: 'This is my best friend', note: '这句差不多对！但"好朋友"用"best friend"更地道～' },
    { cn_think: '我不会游泳', cn_direct: 'I not can swim', en_real: "I can't swim", note: '"不会"用"can\'t"，放在动词前面！' },
    { cn_think: '你在哪里？', cn_direct: 'You at where?', en_real: 'Where are you?', note: '"哪里"放最前面，然后是"are you"！' },
    { cn_think: '我每天六点起床', cn_direct: 'I every day six clock get up', en_real: 'I get up at 6 o\'clock every day', note: '时间前要加"at"，"o\'clock"是一个词，"every day"放最后！' },
    { cn_think: '这个苹果很好吃', cn_direct: 'This apple very delicious', en_real: 'This apple is really delicious', note: '要加"is"！英语的形容词前必须有"is/are"。' },
    { cn_think: '我弟弟比我高', cn_direct: 'My brother than me tall', en_real: 'My brother is taller than me', note: '比较级：tall变taller，"比"用"than"，放在形容词后面！' },
    { cn_think: '你有没有宠物？', cn_direct: 'You have not have pet?', en_real: 'Do you have a pet?', note: '英语问问题要加"Do"在前面，不说"有没有"！' },
    { cn_think: '我正在做作业', cn_direct: 'I now doing homework', en_real: "I'm doing my homework", note: '"正在"用"I\'m doing"，作业前要加"my"！' },
    { cn_think: '她唱歌很好听', cn_direct: 'She sing song very good hear', en_real: 'She sings really well', note: '"唱歌好听"直接说"sings well"，不用说"song"！' },
    { cn_think: '请帮我开门', cn_direct: 'Please help me open door', en_real: 'Could you open the door for me, please?', note: '"Could you...for me"是更礼貌的说法，门前要加"the"！' },
    { cn_think: '我们明天见', cn_direct: 'We tomorrow see', en_real: 'See you tomorrow!', note: '英语说"See you"不说"we see"，简洁多了！' },
    { cn_think: '你怎么了？', cn_direct: 'You how?', en_real: "What's wrong?", note: '"怎么了"英语说"What\'s wrong?"，完全不同的说法！' },
    { cn_think: '我肚子饿了', cn_direct: 'My stomach hungry', en_real: "I'm hungry", note: '英语不说"肚子饿"，直接说"I\'m hungry"就好！' },
    { cn_think: '这本书是谁的？', cn_direct: 'This book is who?', en_real: 'Whose book is this?', note: '"谁的"用"whose"，放在最前面！' },
    { cn_think: '我喜欢红色的裙子', cn_direct: 'I like red color dress', en_real: 'I like the red dress', note: '不用说"color"，直接"red dress"，加"the"表示特指！' },
    { cn_think: '你吃早饭了吗？', cn_direct: 'You eat breakfast already?', en_real: 'Have you had breakfast yet?', note: '用"Have you had...yet?"来问过去的事！' },
    { cn_think: '我家有三口人', cn_direct: 'My family have three mouth people', en_real: 'There are three people in my family', note: '"口人"英语说"people"，用"There are...in"的句型！' },
    { cn_think: '别着急', cn_direct: 'Don\'t hurry', en_real: 'Take your time', note: '"别着急"美国人更常说"Take your time"（慢慢来）！' },
    { cn_think: '这件衣服太贵了', cn_direct: 'This clothes too expensive', en_real: 'This is too expensive', note: '一件衣服说"this"就好，不用再说"clothes"！' },
    { cn_think: '我头疼', cn_direct: 'My head painful', en_real: 'I have a headache', note: '"头疼"英语有专门的词"headache"，用"I have"来说！' },
    { cn_think: '你先走吧', cn_direct: 'You first go', en_real: 'You go ahead', note: '"先走"说"go ahead"，不用说"first"！' },
    { cn_think: '我给你打电话', cn_direct: 'I give you make phone call', en_real: "I'll call you", note: '英语简单多了！直接说"I\'ll call you"就行。' },
    { cn_think: '把窗户关上', cn_direct: 'Put window close', en_real: 'Close the window, please', note: '直接说"Close the window"，记得加"please"！' },
    { cn_think: '我看不懂这个', cn_direct: 'I look not understand this', en_real: "I don't understand this", note: '"看不懂"直接说"don\'t understand"！' },
    { cn_think: '随便你', cn_direct: 'Random you', en_real: "It's up to you", note: '"随便你"说"It\'s up to you"（由你决定）！' },
    { cn_think: '等一下', cn_direct: 'Wait one moment', en_real: 'Hold on / Just a sec', note: '"等一下"美国小孩常说"Hold on"或"Just a sec"！' },
    { cn_think: '我忘了带钱', cn_direct: 'I forget bring money', en_real: 'I forgot to bring my money', note: '"忘了"用过去式"forgot"，要加"to bring"和"my"！' },
    { cn_think: '你在开玩笑吧', cn_direct: 'You at open joke?', en_real: 'Are you kidding me?', note: '"开玩笑"用"kidding"，整个说法完全不一样！' },
    { cn_think: '我没有空', cn_direct: 'I not have empty', en_real: "I'm busy / I don't have time", note: '"没空"可以说"I\'m busy"或"I don\'t have time"！' },
    { cn_think: '这个菜好辣', cn_direct: 'This dish very spicy hot', en_real: 'This is so spicy!', note: '"辣"直接说"spicy"就好，不用说"hot"！用"so"表示"好/很"更口语化。' },
    { cn_think: '我们走吧', cn_direct: 'We go', en_real: "Let's go!", note: '"我们走吧"用"Let\'s go!"，这是最常用的！' },
];

function buildSentenceWorkout() {
    var container = document.getElementById('sw-content');
    container.innerHTML = '';

    var wrapper = document.createElement('div');
    wrapper.className = 'compare-area';

    // Shuffle for variety
    var items = sentenceComparisons.slice();
    shuffle(items);

    items.forEach(function(item, index) {
        var card = document.createElement('div');
        card.className = 'compare-card';
        card.innerHTML =
            '<div class="sw-number">#' + (index + 1) + '</div>' +
            '<div class="compare-cn">' +
                '<div class="compare-label">🇨🇳 中文想法</div>' +
                '<div class="compare-text">' + item.cn_think + '</div>' +
            '</div>' +
            '<div class="compare-wrong">' +
                '<div class="compare-label">❌ 直接翻译（错的！）</div>' +
                '<div class="compare-text strikethrough">' + item.cn_direct + '</div>' +
            '</div>' +
            '<div class="compare-right">' +
                '<div class="compare-label">✅ 美国人这样说</div>' +
                '<div class="compare-text correct-text">' + item.en_real + '</div>' +
            '</div>' +
            '<div class="compare-note">💡 ' + item.note + '</div>';
        card.onclick = function() {
            speak(item.en_real);
        };
        wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
    parseEmojis(container);
}

// =============================================================
// BRAIN WORKOUT
// =============================================================

var riddlesData = [
    { q: 'What has hands but can\'t clap?', a: 'A clock! 钟表有"hands"（指针/手）但不能拍手！', qCn: '什么东西有"手"但不能拍手？' },
    { q: 'What has a head and a tail but no body?', a: 'A coin! 硬币有"head"（正面/头）和"tail"（反面/尾巴）！', qCn: '什么有头有尾但没有身体？' },
    { q: 'What gets wetter the more it dries?', a: 'A towel! 毛巾擦干东西时自己会变湿！', qCn: '什么东西越擦越湿？' },
    { q: 'What can you catch but not throw?', a: 'A cold! "Catch a cold"是感冒的意思！', qCn: '什么能"接住"但不能扔出去？' },
    { q: 'What has 4 legs but never walks?', a: 'A table! 桌子有4条"腿"但不会走路！', qCn: '什么有4条腿但不会走？' },
    { q: 'What has keys but no locks?', a: 'A piano! 钢琴有"keys"（琴键/钥匙）！', qCn: '什么有钥匙但没有锁？' },
    { q: 'What begins with E and ends with E but has one letter?', a: 'An envelope! 信封(envelope)以E开头和结尾，里面装一封信(letter)！', qCn: '什么以E开头E结尾，但只有一个letter？' },
    { q: 'What has teeth but cannot bite?', a: 'A comb! 梳子有"齿"但不能咬人！', qCn: '什么有牙齿但不能咬东西？' },
    { q: 'I\'m tall when I\'m young and short when I\'m old. What am I?', a: 'A candle! 蜡烛新的时候高，燃烧后变矮！', qCn: '年轻时高，老了就矮，我是什么？' },
    { q: 'What word becomes shorter when you add two letters?', a: 'Short! "Short" + "er" = "Shorter"（更短），但单词本身意思是变短了！', qCn: '什么单词加两个字母后变"更短"？' },
    { q: 'I have cities but no houses, mountains but no trees, water but no fish. What am I?', a: 'A map! 地图有城市、山和水，但都是画的！', qCn: '我有城市但没有房子，有山但没有树，有水但没有鱼，我是什么？' },
    { q: 'What runs but never walks?', a: 'Water! 水会"run"（流动/跑）但不会走！', qCn: '什么会跑但不会走？' },
    { q: 'The more you take, the more you leave behind. What am I?', a: 'Footsteps! 你走的越多，留下的脚印越多！', qCn: '你拿走的越多，留下的越多，我是什么？' },
    { q: 'What can travel around the world while staying in a corner?', a: 'A stamp! 邮票待在信封角落却能环游世界！', qCn: '什么能环游世界但一直待在角落里？' },
    { q: 'What has many rings but no fingers?', a: 'A tree! 树有年轮(rings)但没有手指！', qCn: '什么有很多环但没有手指？' },
    { q: 'I am not alive but I grow. I have no lungs but I need air. What am I?', a: 'Fire! 火不是活的但会"长大"，没有肺但需要空气！', qCn: '我不是活的但会长大，没有肺但需要空气，我是什么？' },
    { q: 'What gets broken without being held?', a: 'A promise! 承诺会被"break"（打破/违背）！', qCn: '什么不用拿着就能被打破？' },
    { q: 'What has one eye but cannot see?', a: 'A needle! 针有一个"eye"（针眼/眼睛）但看不见！', qCn: '什么有一只眼睛但看不见？' },
    { q: 'What goes up but never comes down?', a: 'Your age! 年龄只会上升不会下降！', qCn: '什么只上升不下降？' },
    { q: 'What can you hold in your right hand but not in your left?', a: 'Your left elbow! 你的左手肘只能用右手抓！', qCn: '什么只能用右手拿但不能用左手拿？' },
];

var jokesData = [
    { setup: 'Why did the student eat his homework?', punchline: 'Because the teacher told him it was a piece of cake! 🍰', explain: '"piece of cake"既是"一块蛋糕"也是"很简单"的意思！' },
    { setup: 'What do you call a bear with no teeth?', punchline: 'A gummy bear! 🐻', explain: '"gummy"既是"没牙的"也是"软糖"(gummy bear)！' },
    { setup: 'Why did the banana go to the doctor?', punchline: 'Because it wasn\'t peeling well! 🍌', explain: '"peeling"像"feeling"（感觉），香蕉的皮是"peel"！' },
    { setup: 'What do you call a sleeping dinosaur?', punchline: 'A dino-snore! 🦕💤', explain: '"snore"是打呼噜，和"dinosaur"组合成"dino-snore"！' },
    { setup: 'Why can\'t your nose be 12 inches long?', punchline: 'Because then it would be a foot! 👃🦶', explain: '12英寸=1英尺(foot)，"foot"也是"脚"！' },
    { setup: 'What do you call a fish without eyes?', punchline: 'A fsh! 🐟', explain: '把"fish"的"i"(眼睛eye的谐音)去掉就变成"fsh"！' },
    { setup: 'Why did the math book look so sad?', punchline: 'Because it had too many problems! 📚', explain: '"problems"既是"问题/难题"也是"烦恼"！' },
    { setup: 'What do you call cheese that isn\'t yours?', punchline: 'Nacho cheese! 🧀', explain: '"Nacho"听起来像"not your"（不是你的）！' },
    { setup: 'Why don\'t scientists trust atoms?', punchline: 'Because they make up everything! ⚛️', explain: '"make up"既是"组成"也是"编造"的意思！' },
    { setup: 'What did the ocean say to the beach?', punchline: 'Nothing, it just waved! 🌊', explain: '"wave"既是"海浪"也是"挥手"！' },
    { setup: 'Why did the scarecrow win an award?', punchline: 'Because he was outstanding in his field! 🌾', explain: '"outstanding in his field"既是"在田里站着"也是"在领域中出色"！' },
    { setup: 'What do you call a dog that does magic?', punchline: 'A Labracadabra! 🐕✨', explain: '"Labrador"(拉布拉多犬)+"Abracadabra"(变魔术的咒语)！' },
    { setup: 'Why don\'t eggs tell jokes?', punchline: 'They\'d crack each other up! 🥚', explain: '"crack up"是"笑裂了"，鸡蛋真的会"crack"（裂开）！' },
    { setup: 'What do you call a fake noodle?', punchline: 'An impasta! 🍝', explain: '"impostor"(冒牌货)+"pasta"(意面)=impasta！' },
    { setup: 'Why was the math test sad?', punchline: 'Because it had too many problems! 📝😢', explain: '"problems"既是"数学题"也是"烦恼"！（和前面那个类似但换了主角）' },
    { setup: 'What do you call a lazy kangaroo?', punchline: 'A pouch potato! 🦘🥔', explain: '"couch potato"是"沙发土豆"(懒人)，袋鼠的袋子是"pouch"！' },
    { setup: 'Why did the cookie go to the doctor?', punchline: 'Because it was feeling crumby! 🍪', explain: '"crumby"听起来像"crummy"(不舒服)，cookie的碎屑是"crumbs"！' },
    { setup: 'What do you call a snowman with a six-pack?', punchline: 'An abdominal snowman! ☃️💪', explain: '"abominable snowman"(雪人怪)里的"abominable"换成"abdominal"(腹肌的)！' },
];

function showBrainTab(tab, btnEl) {
    document.querySelectorAll('.brain-tab').forEach(function(t) { t.classList.remove('active'); });
    if (btnEl) btnEl.classList.add('active');

    var content = document.getElementById('brain-content');
    content.innerHTML = '';

    if (tab === 'riddles') {
        shuffle(riddlesData);
        riddlesData.forEach(function(r) {
            var card = document.createElement('div');
            card.className = 'brain-card riddle-card';
            card.innerHTML =
                '<div class="brain-q">' + r.q + '</div>' +
                '<div class="brain-q-cn">' + r.qCn + '</div>' +
                '<button class="brain-reveal-btn">🤫 看答案 Reveal</button>' +
                '<div class="brain-answer hidden">' + r.a + '</div>';
            var revealBtn = card.querySelector('.brain-reveal-btn');
            var answerDiv = card.querySelector('.brain-answer');
            revealBtn.onclick = function(e) {
                e.stopPropagation();
                answerDiv.classList.toggle('hidden');
                revealBtn.textContent = answerDiv.classList.contains('hidden') ? '🤫 看答案 Reveal' : '🙈 隐藏 Hide';
            };
            card.onclick = function() { speak(r.q); };
            content.appendChild(card);
        });
    } else if (tab === 'jokes') {
        shuffle(jokesData);
        jokesData.forEach(function(j) {
            var card = document.createElement('div');
            card.className = 'brain-card joke-card';
            card.innerHTML =
                '<div class="joke-setup">' + j.setup + '</div>' +
                '<button class="brain-reveal-btn">😂 听笑点 Punchline</button>' +
                '<div class="joke-punchline hidden">' + j.punchline + '</div>' +
                '<div class="joke-explain hidden">💡 ' + j.explain + '</div>';
            var revealBtn = card.querySelector('.brain-reveal-btn');
            var punchDiv = card.querySelector('.joke-punchline');
            var explainDiv = card.querySelector('.joke-explain');
            revealBtn.onclick = function(e) {
                e.stopPropagation();
                punchDiv.classList.toggle('hidden');
                explainDiv.classList.toggle('hidden');
                revealBtn.textContent = punchDiv.classList.contains('hidden') ? '😂 听笑点 Punchline' : '🙈 隐藏 Hide';
            };
            card.onclick = function() { speak(j.setup); };
            content.appendChild(card);
        });
    }

    parseEmojis(content);
}

// --- Number Guess ---
function buildNumGuess() {
    var ga = document.getElementById('game-area'); ga.innerHTML = '';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回'; bb.onclick=backToGameSelect; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🔢</div><h3>猜数字 Number Guess</h3><p>电脑想了一个1到100之间的数字，你来猜！每次会告诉你"太大"还是"太小"。</p><p class="game-intro-en">Guess a number 1-100. I\'ll tell you higher or lower!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var target = Math.floor(Math.random()*100)+1, tries=0;
        var st = document.createElement('div'); st.className='game-status'; st.textContent='猜一个1-100的数字！'; ga.appendChild(st);
        var row = document.createElement('div'); row.className='spell-input-row';
        var inp = document.createElement('input'); inp.type='number'; inp.className='spell-input'; inp.placeholder='输入数字...'; inp.min=1; inp.max=100;
        var btn = document.createElement('button'); btn.className='writing-btn next-btn'; btn.textContent='猜！Guess';
        row.appendChild(inp); row.appendChild(btn); ga.appendChild(row);
        var fb = document.createElement('div'); fb.className='game-status'; ga.appendChild(fb);
        function doGuess() {
            var g = parseInt(inp.value); if(isNaN(g)) return; tries++;
            if(g===target){fb.innerHTML='🎉 答对了！猜了'+tries+'次！'; playCorrectSound(); launchConfetti(); var rw=tries<=5?3:(tries<=8?2:1); addTokens(rw); addXP(rw); inp.disabled=true; btn.disabled=true;
                var rb=document.createElement('button'); rb.className='game-replay-btn'; rb.textContent='再来！🔄'; rb.onclick=function(){buildNumGuess();}; ga.appendChild(rb);
            } else if(g<target){fb.textContent='📈 太小了！再大一点 Higher!'; playWrongSound();}
            else{fb.textContent='📉 太大了！再小一点 Lower!'; playWrongSound();}
            inp.value=''; inp.focus();
        }
        btn.onclick=doGuess; inp.onkeydown=function(e){if(e.key==='Enter')doGuess();};
        inp.focus();
    }; parseEmojis(ga);
}

// --- Color Match ---
function buildColorMatch() {
    var ga = document.getElementById('game-area'); ga.innerHTML='';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回'; bb.onclick=backToGameSelect; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🟥🔵</div><h3>颜色陷阱 Color Match</h3><p>屏幕会显示一个颜色名字，但文字的颜色可能不一样！你要判断文字颜色和单词意思是否一致。</p><p class="game-intro-en">Is the color of the text the same as what the word says? Tap YES or NO!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var colors=[{name:'RED',hex:'#FF4444'},{name:'BLUE',hex:'#007BFF'},{name:'GREEN',hex:'#28A745'},{name:'YELLOW',hex:'#FFD700'},{name:'PURPLE',hex:'#8B5CF6'},{name:'ORANGE',hex:'#FF8C00'}];
        var score=0,total=0,maxRounds=15;
        var hud=document.createElement('div'); hud.className='catch-hud'; hud.innerHTML='✅ <span id="cm-score">0</span>/'+maxRounds; ga.appendChild(hud);
        var wordDiv=document.createElement('div'); wordDiv.style.cssText='font-size:4rem;font-weight:900;text-align:center;margin:2rem 0;'; ga.appendChild(wordDiv);
        var btns=document.createElement('div'); btns.style.cssText='display:flex;gap:1rem;justify-content:center;';
        var yesBtn=document.createElement('button'); yesBtn.className='writing-btn next-btn'; yesBtn.style.cssText='font-size:1.3rem;padding:1rem 2.5rem;'; yesBtn.textContent='✅ 一样 YES';
        var noBtn=document.createElement('button'); noBtn.className='writing-btn clear-btn'; noBtn.style.cssText='font-size:1.3rem;padding:1rem 2.5rem;'; noBtn.textContent='❌ 不一样 NO';
        btns.appendChild(yesBtn); btns.appendChild(noBtn); ga.appendChild(btns);
        var fb=document.createElement('div'); fb.className='game-status'; ga.appendChild(fb);
        var isMatch;
        function showRound() {
            if(total>=maxRounds){var rw=score>=12?3:(score>=8?2:1); addTokens(rw); if(score>=8)launchConfetti(); fb.innerHTML='🎉 得分:'+score+'/'+maxRounds+' | +'+rw+' 🪙';
                yesBtn.disabled=true; noBtn.disabled=true;
                var rb=document.createElement('button'); rb.className='game-replay-btn'; rb.textContent='再来！🔄'; rb.onclick=function(){buildColorMatch();}; ga.appendChild(rb); return;}
            var wordColor=colors[Math.floor(Math.random()*colors.length)];
            isMatch=Math.random()>0.5;
            var displayColor=isMatch?wordColor:colors[Math.floor(Math.random()*colors.length)];
            while(!isMatch&&displayColor.name===wordColor.name) displayColor=colors[Math.floor(Math.random()*colors.length)];
            wordDiv.textContent=wordColor.name; wordDiv.style.color=displayColor.hex;
            fb.textContent='';
        }
        function answer(playerSaysMatch) {
            total++;
            if(playerSaysMatch===isMatch){score++; playCorrectSound(); fb.textContent='✅ 对！';}
            else{playWrongSound(); fb.textContent='❌ 错了！';}
            document.getElementById('cm-score').textContent=score;
            setTimeout(showRound,500);
        }
        yesBtn.onclick=function(){answer(true);}; noBtn.onclick=function(){answer(false);};
        showRound();
    }; parseEmojis(ga);
}

// --- Math Race ---
function buildMathRace() {
    var ga = document.getElementById('game-area'); ga.innerHTML='';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回'; bb.onclick=backToGameSelect; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">➕</div><h3>数学闪电 Math Race</h3><p>30秒内答对尽可能多的数学题！加减乘除都有～</p><p class="game-intro-en">Solve as many math problems as you can in 30 seconds!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var score=0,timeLeft=30,timer;
        var hud=document.createElement('div'); hud.className='catch-hud'; hud.innerHTML='✅ <span id="mr-score">0</span> | ⏱️ <span id="mr-timer">30</span>s'; ga.appendChild(hud);
        var qDiv=document.createElement('div'); qDiv.style.cssText='font-size:3rem;font-weight:900;text-align:center;margin:1.5rem 0;color:var(--primary);'; ga.appendChild(qDiv);
        var row=document.createElement('div'); row.className='spell-input-row';
        var inp=document.createElement('input'); inp.type='number'; inp.className='spell-input'; inp.placeholder='=?';
        var btn=document.createElement('button'); btn.className='writing-btn next-btn'; btn.textContent='答！';
        row.appendChild(inp); row.appendChild(btn); ga.appendChild(row);
        var fb=document.createElement('div'); fb.className='game-status'; ga.appendChild(fb);
        var answer;
        function genQ() {
            var ops=['+','-','×']; var op=ops[Math.floor(Math.random()*ops.length)];
            var a,b;
            if(op==='+'){a=Math.floor(Math.random()*50)+1;b=Math.floor(Math.random()*50)+1;answer=a+b;}
            else if(op==='-'){a=Math.floor(Math.random()*50)+10;b=Math.floor(Math.random()*a);answer=a-b;}
            else{a=Math.floor(Math.random()*12)+1;b=Math.floor(Math.random()*12)+1;answer=a*b;}
            qDiv.textContent=a+' '+op+' '+b+' = ?'; inp.value=''; inp.focus();
        }
        function check() {
            var v=parseInt(inp.value); if(isNaN(v))return;
            if(v===answer){score++;document.getElementById('mr-score').textContent=score;playCorrectSound();fb.textContent='✅';}
            else{playWrongSound();fb.textContent='❌ ='+answer;}
            setTimeout(function(){fb.textContent='';genQ();},400);
        }
        btn.onclick=check; inp.onkeydown=function(e){if(e.key==='Enter')check();};
        timer=setInterval(function(){timeLeft--;document.getElementById('mr-timer').textContent=timeLeft;
            if(timeLeft<=0){clearInterval(timer);inp.disabled=true;btn.disabled=true;var rw=score>=15?3:(score>=8?2:1);addTokens(rw);addXP(rw);if(score>=8)launchConfetti();
                fb.innerHTML='🎉 答对了'+score+'题！ +'+rw+' 🪙';
                var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildMathRace();};ga.appendChild(rb);}
        },1000);
        registerGameInterval(timer);
        genQ();
    }; parseEmojis(ga);
}

// --- Typing Speed ---
function buildTypingGame() {
    var ga = document.getElementById('game-area'); ga.innerHTML='';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回'; bb.onclick=backToGameSelect; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">⌨️</div><h3>打字高手 Typing Speed</h3><p>英文单词会出现在屏幕上，尽快打出来！打完一个自动跳到下一个。30秒！</p><p class="game-intro-en">Type the English words as fast as you can! 30 seconds!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var pool=animalsData.concat(foodData,colorsData).map(function(w){return w.en;});
        shuffle(pool);
        var idx=0,score=0,timeLeft=30,timer;
        var hud=document.createElement('div'); hud.className='catch-hud'; hud.innerHTML='✅ <span id="tp-score">0</span> | ⏱️ <span id="tp-timer">30</span>s'; ga.appendChild(hud);
        var wordDiv=document.createElement('div'); wordDiv.style.cssText='font-size:2.5rem;font-weight:800;text-align:center;margin:1.5rem 0;color:var(--primary);'; ga.appendChild(wordDiv);
        var inp=document.createElement('input'); inp.type='text'; inp.className='spell-input'; inp.style.cssText='display:block;margin:0 auto;width:80%;max-width:300px;'; inp.placeholder='在这里打字...'; inp.autocomplete='off'; ga.appendChild(inp);
        var fb=document.createElement('div'); fb.className='game-status'; ga.appendChild(fb);
        function showWord(){if(idx>=pool.length)idx=0; wordDiv.textContent=pool[idx]; inp.value=''; inp.focus();}
        inp.oninput=function(){if(inp.value.toLowerCase().trim()===pool[idx].toLowerCase()){score++;idx++;document.getElementById('tp-score').textContent=score;playCorrectSound();showWord();}};
        timer=setInterval(function(){timeLeft--;document.getElementById('tp-timer').textContent=timeLeft;
            if(timeLeft<=0){clearInterval(timer);inp.disabled=true;var rw=score>=15?3:(score>=8?2:1);addTokens(rw);addXP(rw);if(score>=10)launchConfetti();
                fb.innerHTML='🎉 打了'+score+'个单词！ +'+rw+' 🪙';
                var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildTypingGame();};ga.appendChild(rb);}
        },1000);
        registerGameInterval(timer);
        showWord();
    }; parseEmojis(ga);
}

// --- Bubble Pop ---
function buildBubblePop() {
    var ga = document.getElementById('game-area'); ga.innerHTML='';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回';
    var bTimer,sTimer;
    bb.onclick=function(){clearInterval(bTimer);clearInterval(sTimer);backToGameSelect();}; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🫧</div><h3>泡泡大战 Bubble Pop</h3><p>泡泡会飘上来！点击它们让它们爆掉！20秒内点越多越好～</p><p class="game-intro-en">Bubbles float up! Pop them by tapping! 20 seconds!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var score=0,timeLeft=20;
        var hud=document.createElement('div'); hud.className='catch-hud'; hud.innerHTML='🫧 <span id="bp-score">0</span> | ⏱️ <span id="bp-timer">20</span>s'; ga.appendChild(hud);
        var area=document.createElement('div'); area.className='catch-area'; ga.appendChild(area);
        var bubColors=['#FF6B6B','#4ECDC4','#FFE66D','#A78BFA','#FF69B4','#007BFF'];
        sTimer=setInterval(function(){
            var bub=document.createElement('div');
            var size=30+Math.floor(Math.random()*30);
            var color=bubColors[Math.floor(Math.random()*bubColors.length)];
            bub.style.cssText='position:absolute;width:'+size+'px;height:'+size+'px;border-radius:50%;background:'+color+';opacity:0.8;cursor:pointer;bottom:-40px;left:'+Math.floor(Math.random()*(area.offsetWidth-size))+'px;transition:opacity 0.1s;';
            area.appendChild(bub);
            var rise=setInterval(function(){var b=parseInt(bub.style.bottom)||0;b+=2;bub.style.bottom=b+'px';if(b>area.offsetHeight){clearInterval(rise);if(bub.parentNode)bub.remove();}},30);
            registerGameInterval(rise);
            bub.onclick=function(){score++;document.getElementById('bp-score').textContent=score;bub.style.opacity='0';clearInterval(rise);setTimeout(function(){if(bub.parentNode)bub.remove();},100);playCorrectSound();};
        },400);
        registerGameInterval(sTimer);
        bTimer=setInterval(function(){timeLeft--;document.getElementById('bp-timer').textContent=timeLeft;
            if(timeLeft<=0){clearInterval(bTimer);clearInterval(sTimer);area.innerHTML='';var rw=score>=20?3:(score>=10?2:1);addTokens(rw);if(score>=10)launchConfetti();
                hud.innerHTML='🎉 爆了'+score+'个泡泡！+'+rw+' 🪙';
                var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildBubblePop();};ga.appendChild(rb);}
        },1000);
        registerGameInterval(bTimer);
    }; parseEmojis(ga);
}

// --- Dodge ---
function buildDodge() {
    var ga = document.getElementById('game-area'); ga.innerHTML='';
    var bb = document.createElement('button'); bb.className='game-back-btn'; bb.textContent='← 返回';
    var dTimer,fTimer;
    bb.onclick=function(){clearInterval(dTimer);clearInterval(fTimer);backToGameSelect();}; ga.appendChild(bb);
    var intro = document.createElement('div'); intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🏃</div><h3>躲避大师 Dodge</h3><p>左右移动你的角色，躲开从上面掉下来的石头！撑得越久越好！</p><p class="game-intro-en">Move left/right to dodge falling rocks! How long can you survive?</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick = function() {
        intro.remove();
        var area=document.createElement('div'); area.className='catch-area'; area.style.cssText+='cursor:none;'; ga.appendChild(area);
        var player=document.createElement('div'); player.style.cssText='position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-size:2.5rem;transition:left 0.1s;'; player.textContent='🏃'; area.appendChild(player);
        var hud=document.createElement('div'); hud.className='catch-hud'; hud.innerHTML='⏱️ <span id="dg-time">0</span>s'; ga.appendChild(hud);
        var alive=true,elapsed=0,px=area.offsetWidth/2;
        area.onmousemove=function(e){if(!alive)return;var r=area.getBoundingClientRect();px=e.clientX-r.left;player.style.left=Math.max(15,Math.min(px,area.offsetWidth-15))+'px';};
        area.ontouchmove=function(e){if(!alive)return;e.preventDefault();var r=area.getBoundingClientRect();px=e.touches[0].clientX-r.left;player.style.left=Math.max(15,Math.min(px,area.offsetWidth-15))+'px';};
        fTimer=setInterval(function(){if(!alive)return;
            var rock=document.createElement('div');rock.className='catch-star';rock.textContent='🪨';rock.style.left=Math.floor(Math.random()*(area.offsetWidth-30))+'px';rock.style.top='-30px';area.appendChild(rock);
            var fall=setInterval(function(){var t=parseInt(rock.style.top)||0;t+=4;rock.style.top=t+'px';
                if(t>area.offsetHeight){clearInterval(fall);if(rock.parentNode)rock.remove();return;}
                var pLeft=parseInt(player.style.left)||area.offsetWidth/2;var rLeft=parseInt(rock.style.left)||0;
                if(t>area.offsetHeight-50&&Math.abs(pLeft-rLeft)<25){alive=false;clearInterval(fall);clearInterval(fTimer);clearInterval(dTimer);
                    player.textContent='💀';var rw=elapsed>=20?3:(elapsed>=10?2:1);addTokens(rw);if(elapsed>=10)launchConfetti();
                    hud.innerHTML='💪 撑了'+elapsed+'秒！+'+rw+' 🪙';
                    var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildDodge();};ga.appendChild(rb);}
            },30);
            registerGameInterval(fall);
        },600);
        registerGameInterval(fTimer);
        dTimer=setInterval(function(){if(!alive)return;elapsed++;document.getElementById('dg-time').textContent=elapsed;},1000);
        registerGameInterval(dTimer);
    }; parseEmojis(ga);
}

// --- Emoji 2048 ---
function buildEmoji2048() {
    var ga=document.getElementById('game-area');ga.innerHTML='';
    var bb=document.createElement('button');bb.className='game-back-btn';bb.textContent='← 返回';bb.onclick=backToGameSelect;ga.appendChild(bb);
    var intro=document.createElement('div');intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">2️⃣0️⃣4️⃣8️⃣</div><h3>Emoji合成</h3><p>滑动方块让相同的emoji合并！看你能合成到多高级～</p><p class="game-intro-en">Swipe to merge matching emojis! How far can you go?</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick=function(){
        intro.remove();
        var emojis=['🐛','🐸','🐔','🦊','🐱','🐶','🦁','🐯','🐲','🦄','👑'];
        var grid=Array(16).fill(0);var score=0;
        function addTile(){var empty=[];grid.forEach(function(v,i){if(v===0)empty.push(i);});if(empty.length===0)return;var i=empty[Math.floor(Math.random()*empty.length)];grid[i]=Math.random()>0.9?2:1;}
        addTile();addTile();
        var hud=document.createElement('div');hud.className='catch-hud';hud.innerHTML='得分: <span id="e2-score">0</span>';ga.appendChild(hud);
        var gDiv=document.createElement('div');gDiv.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:280px;margin:1rem auto;';ga.appendChild(gDiv);
        function render(){gDiv.innerHTML='';grid.forEach(function(v){var c=document.createElement('div');c.style.cssText='width:60px;height:60px;background:'+(v?'white':'#eee')+';border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:'+(v>5?'1.8rem':'1.5rem')+';border:2px solid #ddd;';c.textContent=v?emojis[Math.min(v-1,emojis.length-1)]:'';gDiv.appendChild(c);});document.getElementById('e2-score').textContent=score;}
        function slide(row){var f=row.filter(function(v){return v>0;});var n=[];for(var i=0;i<f.length;i++){if(i<f.length-1&&f[i]===f[i+1]){n.push(f[i]+1);score+=Math.pow(2,f[i]);i++;}else{n.push(f[i]);}}while(n.length<4)n.push(0);return n;}
        function move(dir){var changed=false;var ng=grid.slice();
            if(dir==='left'){for(var r=0;r<4;r++){var row=[ng[r*4],ng[r*4+1],ng[r*4+2],ng[r*4+3]];var s=slide(row);for(var c=0;c<4;c++){if(ng[r*4+c]!==s[c])changed=true;ng[r*4+c]=s[c];}}}
            else if(dir==='right'){for(var r=0;r<4;r++){var row=[ng[r*4+3],ng[r*4+2],ng[r*4+1],ng[r*4]];var s=slide(row);for(var c=0;c<4;c++){if(ng[r*4+(3-c)]!==s[c])changed=true;ng[r*4+(3-c)]=s[c];}}}
            else if(dir==='up'){for(var c=0;c<4;c++){var row=[ng[c],ng[c+4],ng[c+8],ng[c+12]];var s=slide(row);for(var r=0;r<4;r++){if(ng[r*4+c]!==s[r])changed=true;ng[r*4+c]=s[r];}}}
            else if(dir==='down'){for(var c=0;c<4;c++){var row=[ng[c+12],ng[c+8],ng[c+4],ng[c]];var s=slide(row);for(var r=0;r<4;r++){if(ng[(3-r)*4+c]!==s[r])changed=true;ng[(3-r)*4+c]=s[r];}}}
            if(changed){grid=ng;addTile();render();if(grid.indexOf(0)===-1){var rw=score>=100?3:(score>=30?2:1);addTokens(rw);hud.innerHTML='游戏结束！得分:'+score+' +'+rw+'🪙';if(score>=50)launchConfetti();var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildEmoji2048();};ga.appendChild(rb);}}
        }
        document.addEventListener('keydown',function h(e){if(e.key==='ArrowLeft')move('left');else if(e.key==='ArrowRight')move('right');else if(e.key==='ArrowUp')move('up');else if(e.key==='ArrowDown')move('down');});
        var ctrls=document.createElement('div');ctrls.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;max-width:180px;margin:0.5rem auto;';
        ctrls.innerHTML='<div></div><button class="ttt-cell" style="width:50px;height:50px" onclick="document.dispatchEvent(new KeyboardEvent(\'keydown\',{key:\'ArrowUp\'}))">↑</button><div></div><button class="ttt-cell" style="width:50px;height:50px" onclick="document.dispatchEvent(new KeyboardEvent(\'keydown\',{key:\'ArrowLeft\'}))">←</button><button class="ttt-cell" style="width:50px;height:50px" onclick="document.dispatchEvent(new KeyboardEvent(\'keydown\',{key:\'ArrowDown\'}))">↓</button><button class="ttt-cell" style="width:50px;height:50px" onclick="document.dispatchEvent(new KeyboardEvent(\'keydown\',{key:\'ArrowRight\'}))">→</button>';
        ga.appendChild(ctrls);
        render();
    };parseEmojis(ga);
}

// --- Word Bomb ---
function buildWordBomb() {
    var ga=document.getElementById('game-area');ga.innerHTML='';
    var bb=document.createElement('button');bb.className='game-back-btn';bb.textContent='← 返回';bb.onclick=backToGameSelect;ga.appendChild(bb);
    var intro=document.createElement('div');intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">💣</div><h3>单词炸弹 Word Bomb</h3><p>两个人轮流！看到一组字母，说一个包含这些字母的英文单词。说不出来就"爆炸"！输入单词然后按Enter。</p><p class="game-intro-en">2 players take turns! Type a word containing the shown letters before the bomb explodes!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick=function(){
        intro.remove();
        var combos=['AT','AN','OT','IN','EA','OU','TH','RE','ER','AL','EN','IT','AR','OR','ON'];
        shuffle(combos);var ci=0,p1Score=0,p2Score=0,current=1;
        var st=document.createElement('div');st.className='game-status';ga.appendChild(st);
        var bombDiv=document.createElement('div');bombDiv.style.cssText='font-size:3rem;text-align:center;margin:1rem 0;';ga.appendChild(bombDiv);
        var row=document.createElement('div');row.className='spell-input-row';
        var inp=document.createElement('input');inp.type='text';inp.className='spell-input';inp.placeholder='输入包含这些字母的单词...';inp.autocomplete='off';
        var btn=document.createElement('button');btn.className='writing-btn next-btn';btn.textContent='提交！';
        row.appendChild(inp);row.appendChild(btn);ga.appendChild(row);
        var fb=document.createElement('div');fb.className='game-status';ga.appendChild(fb);
        var scDiv=document.createElement('div');scDiv.style.cssText='text-align:center;font-size:1rem;margin-top:0.5rem;';ga.appendChild(scDiv);
        function showRound(){var combo=combos[ci%combos.length];st.textContent='玩家'+current+'的回合！';bombDiv.innerHTML='💣 包含 <strong style="color:var(--primary);font-size:2rem;">'+combo+'</strong> 的单词？';inp.value='';inp.focus();fb.textContent='';scDiv.textContent='玩家1: '+p1Score+' 💀 | 玩家2: '+p2Score+' 💀';}
        function submit(){var word=inp.value.trim().toUpperCase();var combo=combos[ci%combos.length];
            if(word.length>=3&&word.indexOf(combo)!==-1){playCorrectSound();fb.textContent='✅ 好词！Nice!';ci++;current=current===1?2:1;setTimeout(showRound,800);}
            else{playWrongSound();fb.textContent='💥 BOOM! 玩家'+current+'爆炸了！';if(current===1)p1Score++;else p2Score++;
                if(p1Score>=3||p2Score>=3){var winner=p1Score>=3?'玩家2':'玩家1';fb.innerHTML='🏆 '+winner+' 赢了！';launchConfetti();addTokens(2);inp.disabled=true;btn.disabled=true;
                    var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildWordBomb();};ga.appendChild(rb);
                }else{ci++;current=current===1?2:1;setTimeout(showRound,1200);}
            }}
        btn.onclick=submit;inp.onkeydown=function(e){if(e.key==='Enter')submit();};
        showRound();
    };parseEmojis(ga);
}

// --- Maze ---
function buildMaze() {
    var ga=document.getElementById('game-area');ga.innerHTML='';
    var bb=document.createElement('button');bb.className='game-back-btn';bb.textContent='← 返回';bb.onclick=backToGameSelect;ga.appendChild(bb);
    var intro=document.createElement('div');intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🏰</div><h3>走迷宫 Maze</h3><p>用箭头键或按钮移动你的角色🐭，找到出口🧀！别撞墙哦～</p><p class="game-intro-en">Navigate the maze to reach the cheese!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick=function(){
        intro.remove();
        // Simple 9x9 maze (1=wall, 0=path)
        var maze=[
            [1,1,1,1,1,1,1,1,1],
            [0,0,0,1,0,0,0,0,1],
            [1,1,0,1,0,1,1,0,1],
            [1,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,0,1,0,1],
            [1,0,0,0,1,0,0,0,1],
            [1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1]
        ];
        var px=0,py=1,moves=0; // start at left side row 1
        var st=document.createElement('div');st.className='game-status';st.textContent='步数: 0';ga.appendChild(st);
        var gDiv=document.createElement('div');gDiv.style.cssText='display:grid;grid-template-columns:repeat(9,1fr);gap:2px;max-width:315px;margin:0.5rem auto;';ga.appendChild(gDiv);
        function render(){gDiv.innerHTML='';for(var r=0;r<9;r++){for(var c=0;c<9;c++){var cell=document.createElement('div');cell.style.cssText='width:33px;height:33px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;';
            if(r===py&&c===px){cell.style.background='#4ECDC4';cell.textContent='🐭';}
            else if(r===7&&c===8){cell.style.background='#FFE66D';cell.textContent='🧀';}
            else if(maze[r][c]===1){cell.style.background='#2D3436';}
            else{cell.style.background='#f0f0f0';}
            gDiv.appendChild(cell);}}}
        function tryMove(dx,dy){var nx=px+dx,ny=py+dy;if(nx>=0&&nx<9&&ny>=0&&ny<9&&maze[ny][nx]===0){px=nx;py=ny;moves++;st.textContent='步数: '+moves;render();
            if(px===8&&py===7){st.textContent='🎉 到达终点！步数:'+moves;launchConfetti();playCorrectSound();var rw=moves<=15?3:(moves<=25?2:1);addTokens(rw);
                var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildMaze();};ga.appendChild(rb);}}}
        document.addEventListener('keydown',function h(e){if(e.key==='ArrowUp')tryMove(0,-1);else if(e.key==='ArrowDown')tryMove(0,1);else if(e.key==='ArrowLeft')tryMove(-1,0);else if(e.key==='ArrowRight')tryMove(1,0);});
        var ctrls=document.createElement('div');ctrls.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;max-width:180px;margin:0.5rem auto;';
        ctrls.innerHTML='<div></div><button class="ttt-cell" style="width:50px;height:50px" id="mz-up">↑</button><div></div><button class="ttt-cell" style="width:50px;height:50px" id="mz-left">←</button><button class="ttt-cell" style="width:50px;height:50px" id="mz-down">↓</button><button class="ttt-cell" style="width:50px;height:50px" id="mz-right">→</button>';
        ga.appendChild(ctrls);
        document.getElementById('mz-up').onclick=function(){tryMove(0,-1);};document.getElementById('mz-down').onclick=function(){tryMove(0,1);};
        document.getElementById('mz-left').onclick=function(){tryMove(-1,0);};document.getElementById('mz-right').onclick=function(){tryMove(1,0);};
        render();
    };parseEmojis(ga);
}

// --- Pong ---
function buildPong() {
    var ga=document.getElementById('game-area');ga.innerHTML='';
    var bb=document.createElement('button');bb.className='game-back-btn';bb.textContent='← 返回';
    var pongInterval;
    bb.onclick=function(){clearInterval(pongInterval);backToGameSelect();};ga.appendChild(bb);
    var intro=document.createElement('div');intro.className='game-intro';
    intro.innerHTML='<div class="game-intro-icon">🏓</div><h3>弹球对战 Pong</h3><p>两个人对打！玩家1用W/S键，玩家2用↑/↓键。先得5分赢！也可以用屏幕上的按钮。</p><p class="game-intro-en">2 player pong! P1: W/S keys, P2: ↑/↓ keys. First to 5 wins!</p><button class="ob-btn" id="game-start-btn">开始！→</button>';
    ga.appendChild(intro);
    document.getElementById('game-start-btn').onclick=function(){
        intro.remove();
        var canvas=document.createElement('canvas');canvas.width=400;canvas.height=250;canvas.style.cssText='display:block;margin:0.5rem auto;border:3px solid #ddd;border-radius:8px;background:#1a1a2e;';ga.appendChild(canvas);
        var ctx=canvas.getContext('2d');
        var p1y=100,p2y=100,p1s=0,p2s=0,bx=200,by=125,bdx=3,bdy=2,pw=8,ph=50;
        var hud=document.createElement('div');hud.className='catch-hud';hud.innerHTML='P1: <span id="pn-p1">0</span> | P2: <span id="pn-p2">0</span>';ga.appendChild(hud);
        var keys={};document.addEventListener('keydown',function(e){keys[e.key]=true;});document.addEventListener('keyup',function(e){keys[e.key]=false;});
        // Touch controls
        var ctrls=document.createElement('div');ctrls.style.cssText='display:flex;justify-content:space-between;max-width:400px;margin:0.5rem auto;';
        ctrls.innerHTML='<div><button class="ttt-cell" style="width:45px;height:45px;font-size:0.8rem" id="pn-1u">P1↑</button><button class="ttt-cell" style="width:45px;height:45px;font-size:0.8rem" id="pn-1d">P1↓</button></div><div><button class="ttt-cell" style="width:45px;height:45px;font-size:0.8rem" id="pn-2u">P2↑</button><button class="ttt-cell" style="width:45px;height:45px;font-size:0.8rem" id="pn-2d">P2↓</button></div>';
        ga.appendChild(ctrls);
        ['pn-1u','pn-1d','pn-2u','pn-2d'].forEach(function(id){var el=document.getElementById(id);el.onmousedown=function(){keys[id]=true;};el.onmouseup=function(){keys[id]=false;};el.ontouchstart=function(e){e.preventDefault();keys[id]=true;};el.ontouchend=function(){keys[id]=false;};});
        function draw(){ctx.clearRect(0,0,400,250);ctx.fillStyle='#16213e';ctx.fillRect(0,0,400,250);
            ctx.setLineDash([5,5]);ctx.strokeStyle='#333';ctx.beginPath();ctx.moveTo(200,0);ctx.lineTo(200,250);ctx.stroke();ctx.setLineDash([]);
            ctx.fillStyle='#4ECDC4';ctx.fillRect(5,p1y,pw,ph);ctx.fillStyle='#FF6B6B';ctx.fillRect(400-5-pw,p2y,pw,ph);
            ctx.fillStyle='white';ctx.beginPath();ctx.arc(bx,by,6,0,Math.PI*2);ctx.fill();}
        function update(){
            if(keys['w']||keys['pn-1u'])p1y=Math.max(0,p1y-5);if(keys['s']||keys['pn-1d'])p1y=Math.min(200,p1y+5);
            if(keys['ArrowUp']||keys['pn-2u'])p2y=Math.max(0,p2y-5);if(keys['ArrowDown']||keys['pn-2d'])p2y=Math.min(200,p2y+5);
            bx+=bdx;by+=bdy;
            if(by<=6||by>=244)bdy=-bdy;
            if(bx<=13+pw&&by>p1y&&by<p1y+ph){bdx=Math.abs(bdx);playCorrectSound();}
            if(bx>=400-13-pw&&by>p2y&&by<p2y+ph){bdx=-Math.abs(bdx);playCorrectSound();}
            if(bx<0){p2s++;document.getElementById('pn-p2').textContent=p2s;reset();}
            if(bx>400){p1s++;document.getElementById('pn-p1').textContent=p1s;reset();}
            if(p1s>=5||p2s>=5){clearInterval(pongInterval);var w=p1s>=5?'P1':'P2';hud.innerHTML='🏆 '+w+' 赢了！';launchConfetti();addTokens(2);
                var rb=document.createElement('button');rb.className='game-replay-btn';rb.textContent='再来！🔄';rb.onclick=function(){buildPong();};ga.appendChild(rb);return;}
            draw();}
        function reset(){bx=200;by=125;bdx=3*(Math.random()>0.5?1:-1);bdy=2*(Math.random()>0.5?1:-1);}
        draw();pongInterval=setInterval(update,16);
        registerGameInterval(pongInterval);
    };parseEmojis(ga);
}

// --- Whack-a-Mole ---
function buildWhackAMole() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = function() { clearInterval(moleTimer); clearInterval(gameTimer); backToGameSelect(); };
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML = '<div class="game-intro-icon">🔨🐹</div><h3>打地鼠 Whack-a-Mole</h3><p>地鼠会从洞里冒出来！快点敲它们！30秒内敲到越多越好～</p><p class="game-intro-en">Moles pop up from holes! Tap them before they hide! 30 seconds!</p><button class="ob-btn" id="game-start-btn">开始玩！→</button>';
    gameArea.appendChild(introDiv);

    var moleTimer, gameTimer;

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();
        var score = 0;
        var timeLeft = 30;

        var hud = document.createElement('div');
        hud.className = 'catch-hud';
        hud.innerHTML = '🐹 得分: <span id="whack-score">0</span> | ⏱️ <span id="whack-timer">30</span>s';
        gameArea.appendChild(hud);

        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:300px;margin:1rem auto;';
        gameArea.appendChild(grid);

        var holes = [];
        for (var i = 0; i < 9; i++) {
            var hole = document.createElement('div');
            hole.style.cssText = 'width:80px;height:80px;background:#8B4513;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;cursor:pointer;border:3px solid #654321;transition:all 0.1s;';
            hole.textContent = '🕳️';
            hole.setAttribute('data-idx', i);
            (function(h) {
                h.onclick = function() {
                    if (h.getAttribute('data-active') === 'true') {
                        score++;
                        document.getElementById('whack-score').textContent = score;
                        h.textContent = '💥';
                        h.setAttribute('data-active', 'false');
                        playCorrectSound();
                        setTimeout(function() { h.textContent = '🕳️'; }, 300);
                    }
                };
            })(hole);
            holes.push(hole);
            grid.appendChild(hole);
        }

        moleTimer = setInterval(function() {
            // Hide all active moles
            holes.forEach(function(h) { if (h.getAttribute('data-active') === 'true') { h.textContent = '🕳️'; h.setAttribute('data-active', 'false'); } });
            // Show 1-2 random moles
            var count = Math.random() > 0.6 ? 2 : 1;
            for (var c = 0; c < count; c++) {
                var idx = Math.floor(Math.random() * 9);
                holes[idx].textContent = '🐹';
                holes[idx].setAttribute('data-active', 'true');
            }
        }, 800);
        registerGameInterval(moleTimer);

        gameTimer = setInterval(function() {
            timeLeft--;
            document.getElementById('whack-timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(moleTimer);
                clearInterval(gameTimer);
                holes.forEach(function(h) { h.onclick = null; h.textContent = '🕳️'; });
                var reward = score >= 15 ? 3 : (score >= 8 ? 2 : 1);
                addTokens(reward);
                if (score >= 8) launchConfetti();
                hud.innerHTML = '🎉 打到了 ' + score + ' 只地鼠！ +' + reward + ' 🪙';
                var btn = document.createElement('button');
                btn.className = 'game-replay-btn';
                btn.textContent = '再来！🔄';
                btn.onclick = function() { buildWhackAMole(); };
                gameArea.appendChild(btn);
            }
        }, 1000);
        registerGameInterval(gameTimer);
    };
    parseEmojis(gameArea);
}

// --- Connect Four ---
function buildConnect4() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML = '<div class="game-intro-icon">🔴🟡</div><h3>四子棋 Connect Four</h3><p>两个人轮流往棋盘里放棋子！把4个同色棋子连成一行（横、竖、斜都行）就赢了！🔴先走。</p><p class="game-intro-en">Take turns dropping pieces. Get 4 in a row (horizontal, vertical, or diagonal) to win!</p><button class="ob-btn" id="game-start-btn">开始玩！→</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();
        var ROWS = 6, COLS = 7;
        var board = [];
        for (var r = 0; r < ROWS; r++) { board.push(Array(COLS).fill('')); }
        var currentPlayer = 'R';
        var gameOver = false;

        var status = document.createElement('div');
        status.className = 'game-status';
        status.textContent = '🔴 的回合';
        gameArea.appendChild(status);

        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:350px;margin:1rem auto;background:#007BFF;padding:8px;border-radius:12px;';
        gameArea.appendChild(grid);

        var cells = [];
        for (var r = 0; r < ROWS; r++) {
            cells.push([]);
            for (var c = 0; c < COLS; c++) {
                var cell = document.createElement('div');
                cell.style.cssText = 'width:42px;height:42px;background:white;border-radius:50%;cursor:pointer;transition:background 0.2s;';
                cell.setAttribute('data-col', c);
                (function(col) {
                    cell.onclick = function() {
                        if (gameOver) return;
                        // Find lowest empty row in this column
                        var row = -1;
                        for (var rr = ROWS - 1; rr >= 0; rr--) {
                            if (board[rr][col] === '') { row = rr; break; }
                        }
                        if (row === -1) return; // Column full
                        board[row][col] = currentPlayer;
                        cells[row][col].style.background = currentPlayer === 'R' ? '#FF4444' : '#FFD700';
                        if (checkC4Win(board, row, col, currentPlayer)) {
                            gameOver = true;
                            var winner = currentPlayer === 'R' ? '🔴' : '🟡';
                            status.textContent = winner + ' 赢了！🎉';
                            launchConfetti();
                            playCorrectSound();
                            addTokens(2);
                        } else if (isBoardFull(board)) {
                            gameOver = true;
                            status.textContent = '平局！🤝';
                        } else {
                            currentPlayer = currentPlayer === 'R' ? 'Y' : 'R';
                            status.textContent = (currentPlayer === 'R' ? '🔴' : '🟡') + ' 的回合';
                        }
                    };
                })(c);
                cells[r].push(cell);
                grid.appendChild(cell);
            }
        }

        function checkC4Win(b, r, c, p) {
            var dirs = [[0,1],[1,0],[1,1],[1,-1]];
            for (var d = 0; d < dirs.length; d++) {
                var count = 1;
                for (var s = 1; s <= 3; s++) { var nr = r + dirs[d][0]*s, nc = c + dirs[d][1]*s; if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&b[nr][nc]===p) count++; else break; }
                for (var s = 1; s <= 3; s++) { var nr = r - dirs[d][0]*s, nc = c - dirs[d][1]*s; if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&b[nr][nc]===p) count++; else break; }
                if (count >= 4) return true;
            }
            return false;
        }

        function isBoardFull(b) {
            for (var c = 0; c < COLS; c++) { if (b[0][c] === '') return false; }
            return true;
        }

        var replayBtn = document.createElement('button');
        replayBtn.className = 'game-replay-btn';
        replayBtn.textContent = '再来一局！🔄';
        replayBtn.onclick = function() { buildConnect4(); };
        gameArea.appendChild(replayBtn);
    };
    parseEmojis(gameArea);
}

// --- Reaction Time ---
function buildReaction() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = backToGameSelect;
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML = '<div class="game-intro-icon">⚡</div><h3>反应测试 Reaction Time</h3><p>等屏幕变绿色的时候，以最快的速度点击！测测你的反应有多快～</p><p class="game-intro-en">Wait for GREEN, then click as fast as you can! How fast are you?</p><button class="ob-btn" id="game-start-btn">开始测试！→</button>';
    gameArea.appendChild(introDiv);

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();
        var box = document.createElement('div');
        box.style.cssText = 'width:100%;height:300px;background:#FF4444;border-radius:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;margin:1rem 0;transition:background 0.1s;user-select:none;';
        box.innerHTML = '<div style="color:white;text-align:center;"><div style="font-size:2rem;">🔴</div><div style="font-size:1.3rem;font-weight:bold;">等一下... Wait...</div><div style="font-size:0.9rem;">变绿色时点击！Click when GREEN!</div></div>';
        gameArea.appendChild(box);

        var results = document.createElement('div');
        results.className = 'game-status';
        gameArea.appendChild(results);

        var times = [];
        var round = 0;
        var maxRounds = 5;
        var startTime = 0;
        var waiting = true;
        var timeout = null;

        function startRound() {
            waiting = true;
            box.style.background = '#FF4444';
            box.innerHTML = '<div style="color:white;text-align:center;"><div style="font-size:2rem;">🔴</div><div style="font-size:1.3rem;font-weight:bold;">等一下... Wait...</div><div style="font-size:0.9rem;">第 ' + (round + 1) + '/' + maxRounds + ' 轮</div></div>';
            var delay = 1000 + Math.random() * 3000;
            timeout = setTimeout(function() {
                waiting = false;
                startTime = Date.now();
                box.style.background = '#28A745';
                box.innerHTML = '<div style="color:white;text-align:center;"><div style="font-size:3rem;">👆</div><div style="font-size:1.5rem;font-weight:bold;">快点！NOW!</div></div>';
            }, delay);
        }

        box.onclick = function() {
            if (waiting) {
                clearTimeout(timeout);
                box.style.background = '#FF4444';
                box.innerHTML = '<div style="color:white;text-align:center;"><div style="font-size:2rem;">😅</div><div style="font-size:1.2rem;">太早了！Too early!</div></div>';
                setTimeout(startRound, 1000);
                return;
            }
            var reactionTime = Date.now() - startTime;
            times.push(reactionTime);
            round++;
            box.style.background = '#007BFF';
            box.innerHTML = '<div style="color:white;text-align:center;"><div style="font-size:2rem;">⚡</div><div style="font-size:1.5rem;font-weight:bold;">' + reactionTime + 'ms</div></div>';
            if (round < maxRounds) {
                setTimeout(startRound, 1000);
            } else {
                var avg = Math.round(times.reduce(function(a,b){return a+b;},0) / times.length);
                var reward = avg < 300 ? 3 : (avg < 500 ? 2 : 1);
                addTokens(reward);
                if (avg < 400) launchConfetti();
                results.innerHTML = '平均反应时间: <strong>' + avg + 'ms</strong> | +' + reward + ' 🪙';
                var btn = document.createElement('button');
                btn.className = 'game-replay-btn';
                btn.textContent = '再测一次！🔄';
                btn.onclick = function() { buildReaction(); };
                gameArea.appendChild(btn);
            }
        };

        startRound();
    };
    parseEmojis(gameArea);
}

// --- Snake ---
function buildSnake() {
    var gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    var backBtn = document.createElement('button');
    backBtn.className = 'game-back-btn';
    backBtn.textContent = '← 返回';
    backBtn.onclick = function() { clearInterval(snakeInterval); backToGameSelect(); };
    gameArea.appendChild(backBtn);

    var introDiv = document.createElement('div');
    introDiv.className = 'game-intro';
    introDiv.innerHTML = '<div class="game-intro-icon">🐍</div><h3>贪吃蛇 Snake</h3><p>用箭头键（←↑→↓）或滑动控制蛇的方向，吃苹果🍎会变长！别撞到自己或墙壁！</p><p class="game-intro-en">Use arrow keys or swipe to move. Eat apples to grow. Don\'t hit yourself or walls!</p><button class="ob-btn" id="game-start-btn">开始玩！→</button>';
    gameArea.appendChild(introDiv);

    var snakeInterval;

    document.getElementById('game-start-btn').onclick = function() {
        introDiv.remove();
        var GRID = 15;
        var CELL = 22;
        var score = 0;

        var hud = document.createElement('div');
        hud.className = 'catch-hud';
        hud.innerHTML = '🍎 得分: <span id="snake-score">0</span>';
        gameArea.appendChild(hud);

        var canvas = document.createElement('canvas');
        canvas.width = GRID * CELL;
        canvas.height = GRID * CELL;
        canvas.style.cssText = 'display:block;margin:0.5rem auto;border:3px solid #ddd;border-radius:8px;background:#f0f0f0;';
        gameArea.appendChild(canvas);
        var ctx = canvas.getContext('2d');

        // Touch controls
        var controls = document.createElement('div');
        controls.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;max-width:180px;margin:0.5rem auto;';
        controls.innerHTML = '<div></div><button class="ttt-cell" style="width:50px;height:50px;font-size:1.5rem;" id="btn-up">↑</button><div></div><button class="ttt-cell" style="width:50px;height:50px;font-size:1.5rem;" id="btn-left">←</button><button class="ttt-cell" style="width:50px;height:50px;font-size:1.5rem;" id="btn-down">↓</button><button class="ttt-cell" style="width:50px;height:50px;font-size:1.5rem;" id="btn-right">→</button>';
        gameArea.appendChild(controls);

        var snake = [{x:7,y:7}];
        var dir = {x:1,y:0};
        var food = spawnFood();
        var alive = true;

        function spawnFood() {
            var pos;
            do {
                pos = {x: Math.floor(Math.random()*GRID), y: Math.floor(Math.random()*GRID)};
            } while (snake.some(function(s){return s.x===pos.x&&s.y===pos.y;}));
            return pos;
        }

        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            // Draw food
            ctx.fillStyle = '#FF4444';
            ctx.beginPath();
            ctx.arc(food.x*CELL+CELL/2, food.y*CELL+CELL/2, CELL/2-2, 0, Math.PI*2);
            ctx.fill();
            // Draw snake
            snake.forEach(function(s,i) {
                ctx.fillStyle = i===0 ? '#28A745' : '#4ECDC4';
                ctx.fillRect(s.x*CELL+1, s.y*CELL+1, CELL-2, CELL-2);
                if (i===0) { ctx.fillStyle='white'; ctx.fillRect(s.x*CELL+CELL/2-2,s.y*CELL+CELL/3,4,4); }
            });
        }

        function step() {
            if (!alive) return;
            var head = {x: snake[0].x+dir.x, y: snake[0].y+dir.y};
            if (head.x<0||head.x>=GRID||head.y<0||head.y>=GRID||snake.some(function(s){return s.x===head.x&&s.y===head.y;})) {
                alive = false;
                clearInterval(snakeInterval);
                var reward = score >= 10 ? 3 : (score >= 5 ? 2 : 1);
                addTokens(reward);
                if (score >= 5) launchConfetti();
                hud.innerHTML = '💀 游戏结束！得分: ' + score + ' | +' + reward + ' 🪙';
                var btn = document.createElement('button');
                btn.className = 'game-replay-btn';
                btn.textContent = '再来！🔄';
                btn.onclick = function() { buildSnake(); };
                gameArea.appendChild(btn);
                return;
            }
            snake.unshift(head);
            if (head.x===food.x&&head.y===food.y) {
                score++;
                document.getElementById('snake-score').textContent = score;
                food = spawnFood();
                playCorrectSound();
            } else {
                snake.pop();
            }
            draw();
        }

        document.addEventListener('keydown', function handler(e) {
            if (!alive) { document.removeEventListener('keydown', handler); return; }
            if (e.key==='ArrowUp'&&dir.y!==1) dir={x:0,y:-1};
            else if (e.key==='ArrowDown'&&dir.y!==-1) dir={x:0,y:1};
            else if (e.key==='ArrowLeft'&&dir.x!==1) dir={x:-1,y:0};
            else if (e.key==='ArrowRight'&&dir.x!==-1) dir={x:1,y:0};
        });

        document.getElementById('btn-up').onclick = function() { if(dir.y!==1) dir={x:0,y:-1}; };
        document.getElementById('btn-down').onclick = function() { if(dir.y!==-1) dir={x:0,y:1}; };
        document.getElementById('btn-left').onclick = function() { if(dir.x!==1) dir={x:-1,y:0}; };
        document.getElementById('btn-right').onclick = function() { if(dir.x!==-1) dir={x:1,y:0}; };

        draw();
        snakeInterval = setInterval(step, 180);
        registerGameInterval(snakeInterval);
    };
    parseEmojis(gameArea);
}

// =============================================================
// LEVEL TEST
// =============================================================

function startLevelTest() {
    var container = document.getElementById('leveltest-content');
    container.innerHTML = '';

    var level = getLevel();
    var needed = level <= 2 ? 6 : (level <= 4 ? 7 : 8); // Higher levels need more correct

    // Build test pool - HARDER at higher levels
    var pool = [];
    var base = animalsData.concat(foodData, colorsData, bodyData).map(function(w) {
        return { question: w.emoji || '', answer: w.en, chinese: w.cn };
    });
    var mid = level2Words.map(function(w) {
        return { question: w.emoji, answer: w.en, chinese: w.cn };
    });
    var hard = level3Words.map(function(w) {
        return { question: w.emoji, answer: w.en, chinese: w.cn };
    });

    // ALL words available for wrong answer choices
    var allWords = base.concat(mid, hard);

    // Level 1-2: easy words only
    // Level 3-4: medium + some easy
    // Level 5-6: hard + some medium
    // Level 7+: all hard, need to spell most
    if (level <= 2) {
        shuffle(base);
        pool = base.slice(0, 10);
    } else if (level <= 4) {
        shuffle(mid); shuffle(base);
        pool = mid.slice(0, 7).concat(base.slice(0, 3));
    } else if (level <= 6) {
        shuffle(hard); shuffle(mid);
        pool = hard.slice(0, 7).concat(mid.slice(0, 3));
    } else {
        // Level 7+: ALL hard words, shuffled fresh each time
        shuffle(hard); shuffle(mid);
        pool = hard.concat(mid.slice(0, 5));
        shuffle(pool);
        pool = pool.slice(0, 10);
    }

    shuffle(pool);
    var testQs = pool.slice(0, 10);

    // More spelling at higher levels
    // Lv1-2: 3 spelling, Lv3-4: 5, Lv5-6: 7, Lv7+: 8
    var spellStart = level <= 2 ? 7 : (level <= 4 ? 5 : (level <= 6 ? 3 : 2));

    // Mix question types: first N are multiple choice, rest are spelling
    var testIndex = 0;
    var testScore = 0;
    var testAnswered = false;

    var info = document.createElement('div');
    info.className = 'lt-info';
    var levelNames = {1:'入门级',2:'初级',3:'中级',4:'中高级',5:'高级',6:'挑战级',7:'大师级',8:'传说级',9:'王者级',10:'满级'};
    var diffName = levelNames[level] || ('Lv.'+level);
    var nextDiffName = levelNames[level+1] || ('Lv.'+(level+1));
    info.innerHTML = '<div class="lt-level-badge">当前 Lv.' + level + ' ' + diffName + '</div>' +
        '<div class="lt-level-badge" style="background:linear-gradient(135deg,#4ECDC4,#28A745);margin-top:0.5rem;">→ 升级到 Lv.' + (level + 1) + ' ' + nextDiffName + '</div>' +
        '<div class="lt-requirement" style="margin-top:0.8rem;">需要答对 <strong>' + needed + '/10</strong> 题 | ' + (10 - spellStart) + '题拼写 | 难度：' + diffName + '</div>';
    container.appendChild(info);

    var progressDiv = document.createElement('div');
    progressDiv.className = 'quiz-progress';
    progressDiv.innerHTML = '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="lt-progress-fill"></div></div><span id="lt-progress-text">1/10</span>';
    container.appendChild(progressDiv);

    var scoreDiv = document.createElement('div');
    scoreDiv.className = 'quiz-score';
    scoreDiv.id = 'lt-score';
    scoreDiv.textContent = '✅ 0 / ❌ 0';
    container.appendChild(scoreDiv);

    var questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.id = 'lt-question';
    container.appendChild(questionDiv);

    var choicesDiv = document.createElement('div');
    choicesDiv.className = 'quiz-choices';
    choicesDiv.id = 'lt-choices';
    container.appendChild(choicesDiv);

    var feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'quiz-feedback hidden';
    feedbackDiv.id = 'lt-feedback';
    container.appendChild(feedbackDiv);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn hidden';
    nextBtn.id = 'lt-next';
    nextBtn.textContent = '下一题 →';
    container.appendChild(nextBtn);

    var testWrong = 0;

    function showTestQ() {
        testAnswered = false;
        if (testIndex >= 10) {
            showTestResult();
            return;
        }

        document.getElementById('lt-progress-fill').style.width = ((testIndex) / 10 * 100) + '%';
        document.getElementById('lt-progress-text').textContent = (testIndex + 1) + '/10';
        document.getElementById('lt-score').textContent = '✅ ' + testScore + ' / ❌ ' + testWrong;

        var q = testQs[testIndex];
        var isSpelling = testIndex >= spellStart; // Higher level = more spelling

        feedbackDiv.classList.add('hidden');
        nextBtn.classList.add('hidden');

        if (!isSpelling) {
            // Multiple choice - use ALL words for wrong options so they're varied
            var wrongs = allWords.filter(function(p) { return p.answer !== q.answer; });
            shuffle(wrongs);
            var choices = [q.answer, wrongs[0].answer, wrongs[1].answer, wrongs[2].answer];
            shuffle(choices);

            questionDiv.innerHTML = '<div class="quiz-emoji">' + q.question + '</div><div class="quiz-prompt">' + q.chinese + ' 的英文是？</div>';
            choicesDiv.innerHTML = '';
            choicesDiv.style.display = '';

            choices.forEach(function(c) {
                var btn = document.createElement('button');
                btn.className = 'quiz-choice-btn';
                btn.textContent = c;
                btn.onclick = function() {
                    if (testAnswered) return;
                    testAnswered = true;
                    choicesDiv.querySelectorAll('.quiz-choice-btn').forEach(function(b) {
                        b.disabled = true;
                        if (b.textContent === q.answer) b.classList.add('correct');
                        if (b.textContent === c && c !== q.answer) b.classList.add('wrong');
                    });
                    if (c === q.answer) {
                        testScore++;
                        playCorrectSound();
                        feedbackDiv.textContent = '✅ 正确！';
                        feedbackDiv.className = 'quiz-feedback correct';
                    } else {
                        testWrong++;
                        playWrongSound();
                        feedbackDiv.innerHTML = '🌟 ' + getGentleWrong() + q.answer;
                        feedbackDiv.className = 'quiz-feedback wrong';
                    }
                    nextBtn.classList.remove('hidden');
                };
                choicesDiv.appendChild(btn);
            });
        } else {
            // Spelling question
            questionDiv.innerHTML = '<div class="quiz-emoji">' + q.question + '</div><div class="quiz-prompt">' + q.chinese + '</div><div style="font-size:0.9rem;color:#999;">拼写这个单词 Type the English word</div>';
            choicesDiv.innerHTML = '<div class="spell-input-row"><input type="text" class="spell-input" id="lt-spell-input" placeholder="输入英文..." autocomplete="off" autocapitalize="off"><button class="writing-btn next-btn" id="lt-spell-check">检查 ✓</button></div>';

            var spInput = document.getElementById('lt-spell-input');
            var spCheck = document.getElementById('lt-spell-check');
            setTimeout(function() { spInput.focus(); }, 100);

            function doSpellCheck() {
                if (testAnswered) return;
                testAnswered = true;
                var ans = spInput.value.trim();
                if (isSpellingCorrect(ans, q.answer)) {
                    testScore++;
                    playCorrectSound();
                    feedbackDiv.textContent = '✅ 拼写正确！Nice!';
                    feedbackDiv.className = 'quiz-feedback correct';
                } else {
                    testWrong++;
                    playWrongSound();
                    feedbackDiv.innerHTML = '🌟 ' + getGentleWrong() + '<strong>' + q.answer + '</strong>';
                    feedbackDiv.className = 'quiz-feedback wrong';
                }
                spInput.disabled = true;
                spCheck.disabled = true;
                nextBtn.classList.remove('hidden');
            }

            spCheck.onclick = doSpellCheck;
            spInput.onkeydown = function(e) { if (e.key === 'Enter') doSpellCheck(); };
        }
    }

    nextBtn.onclick = function() {
        testIndex++;
        showTestQ();
    };

    function showTestResult() {
        var passed = testScore >= needed;
        questionDiv.innerHTML = '';
        choicesDiv.innerHTML = '';
        feedbackDiv.classList.add('hidden');
        nextBtn.classList.add('hidden');
        document.getElementById('lt-progress-fill').style.width = '100%';

        var resultHTML = '<div style="text-align:center;padding:2rem;">';
        if (passed) {
            resultHTML += '<div style="font-size:4rem;">🎉🏆</div>';
            resultHTML += '<h3 style="font-size:1.5rem;margin:0.5rem 0;">恭喜通过！Level Up!</h3>';
            resultHTML += '<p>你从 Lv.' + level + ' 升级到了 <strong>Lv.' + (level + 1) + '</strong>！</p>';
            resultHTML += '<p style="color:#DAA520;font-weight:bold;">🪙 +' + ((level + 1) * 3) + ' 代币奖励！</p>';

            // Actually level up
            var newLevel = level + 1;
            localStorage.setItem('duoverse_level', String(newLevel));
            localStorage.setItem('duoverse_xp', '0');
            addTokens((level + 1) * 3);
            launchConfetti();
            setTimeout(launchConfetti, 500);
            playBigWinSound();
            updateLevelDisplay();
        } else {
            resultHTML += '<div style="font-size:4rem;">💪</div>';
            resultHTML += '<h3 style="font-size:1.5rem;margin:0.5rem 0;">差一点点！Almost!</h3>';
            resultHTML += '<p>得分 ' + testScore + '/10，需要 ' + needed + ' 分才能通过</p>';
            resultHTML += '<p style="color:#999;">多练习一下再来挑战吧！</p>';
        }
        resultHTML += '<div style="font-size:1.3rem;margin:1rem 0;font-weight:bold;">✅ ' + testScore + ' / ❌ ' + testWrong + '</div>';
        resultHTML += '<button class="restart-btn" onclick="startLevelTest()">再考一次 🔄</button>';
        resultHTML += ' <button class="restart-btn" style="background:var(--secondary)" onclick="showSection(\'home\')">回主页 🏠</button>';
        resultHTML += '</div>';

        questionDiv.innerHTML = resultHTML;
        parseEmojis(questionDiv);
    }

    showTestQ();
    parseEmojis(container);
}

// =============================================================
// 13. TWEMOJI - Convert emojis to cartoon images
// =============================================================

function parseEmojis(el) {
    if (typeof twemoji !== 'undefined') {
        twemoji.parse(el || document.body, {
            folder: 'svg',
            ext: '.svg',
            className: 'twemoji'
        });
    }
}

// =============================================================
// 14. INIT
// =============================================================

function initApp() {
    showLearnTab('alphabet', document.querySelector('.learn-tab'));
    updateTokenDisplay();
    refreshHomepage();
    applyTheme(getActiveTheme());
    applyPet(getActivePet());
    updateLevelDisplay();
    parseEmojis();
}

// =============================================================
// LANGUAGE SYSTEM
// =============================================================

function getLang() { return localStorage.getItem('duoverse_lang') || 'cn'; }

function setLang(lang) {
    localStorage.setItem('duoverse_lang', lang);
    // Show enter button, update tagline
    var btn = document.getElementById('splash-enter');
    var tagline = document.getElementById('splash-tagline');
    if (btn) btn.classList.remove('hidden');
    if (tagline) tagline.textContent = lang === 'cn' ? '你的英语冒险，从这里开始！' : 'Your English adventure starts here!';
    if (btn) btn.textContent = lang === 'cn' ? '进入 Enter →' : 'Enter →';
    // Highlight selected based on lang value
    document.querySelectorAll('.splash-lang-btn').forEach(function(b) {
        b.classList.remove('selected');
    });
    // Find the button that matches this lang and highlight it
    var langBtns = document.querySelectorAll('.splash-lang-btn');
    langBtns.forEach(function(b) {
        if (b.textContent.indexOf(lang === 'en' ? 'English' : '中文') !== -1) {
            b.classList.add('selected');
        }
    });
}

// Simple translation helper for key UI strings
function t(cn, en) {
    return getLang() === 'en' ? en : cn;
}

// =============================================================
// SETTINGS
// =============================================================

var soundEnabled = localStorage.getItem('duoverse_sound') !== 'off';

function buildSettings() {
    var container = document.getElementById('settings-container');
    container.innerHTML = '';
    var lang = getLang();

    var html = '<div class="settings-list">';

    // Language
    html += '<div class="setting-item">';
    html += '<div class="setting-label">🌐 ' + t('语言 Language', 'Language') + '</div>';
    html += '<div class="setting-control">';
    html += '<button class="setting-btn ' + (lang === 'cn' ? 'active' : '') + '" onclick="changeSetting(\'lang\',\'cn\')">🇨🇳 中文</button>';
    html += '<button class="setting-btn ' + (lang === 'en' ? 'active' : '') + '" onclick="changeSetting(\'lang\',\'en\')">🇺🇸 English</button>';
    html += '</div></div>';

    // Sound
    html += '<div class="setting-item">';
    html += '<div class="setting-label">🔊 ' + t('声音 Sound', 'Sound') + '</div>';
    html += '<div class="setting-control">';
    html += '<button class="setting-btn ' + (soundEnabled ? 'active' : '') + '" onclick="changeSetting(\'sound\',\'on\')">' + t('开 On', 'On') + '</button>';
    html += '<button class="setting-btn ' + (!soundEnabled ? 'active' : '') + '" onclick="changeSetting(\'sound\',\'off\')">' + t('关 Off', 'Off') + '</button>';
    html += '</div></div>';

    // Character
    var avatar = localStorage.getItem('duoverse_avatar') || '👦';
    var gender = localStorage.getItem('duoverse_gender') || 'boy';
    html += '<div class="setting-item">';
    html += '<div class="setting-label">🧑 ' + t('角色 Character', 'Character') + '</div>';
    html += '<div class="setting-control">';
    html += '<span style="font-size:2.5rem;margin-right:0.5rem;">' + avatar + '</span>';
    html += '<button class="setting-btn" onclick="changeSetting(\'gender\',\'boy\')">' + t('👦 男孩', '👦 Boy') + '</button>';
    html += '<button class="setting-btn" onclick="changeSetting(\'gender\',\'girl\')">' + t('👧 女孩', '👧 Girl') + '</button>';
    html += '</div></div>';

    // Skin tone
    var skins = gender === 'girl' ? ['👧','👧🏻','👧🏼','👧🏽','👧🏾','👧🏿'] : ['👦','👦🏻','👦🏼','👦🏽','👦🏾','👦🏿'];
    html += '<div class="setting-item">';
    html += '<div class="setting-label">🎨 ' + t('肤色 Skin Tone', 'Skin Tone') + '</div>';
    html += '<div class="setting-control skin-row">';
    skins.forEach(function(s) {
        var sel = s === avatar ? ' selected' : '';
        html += '<span class="skin-option-setting' + sel + '" onclick="changeSetting(\'skin\',\'' + s + '\')">' + s + '</span>';
    });
    html += '</div></div>';

    // Name
    var name = localStorage.getItem('duoverse_name') || '';
    html += '<div class="setting-item">';
    html += '<div class="setting-label">📝 ' + t('名字 Name', 'Name') + '</div>';
    html += '<div class="setting-control">';
    html += '<input type="text" class="setting-input" id="setting-name" value="' + name + '" placeholder="' + t('输入你的名字', 'Enter your name') + '">';
    html += '<button class="setting-btn active" onclick="changeSetting(\'name\',document.getElementById(\'setting-name\').value)">' + t('保存', 'Save') + '</button>';
    html += '</div></div>';

    // Speech speed
    html += '<div class="setting-item">';
    html += '<div class="setting-label">🗣️ ' + t('语速 Speech Speed', 'Speech Speed') + '</div>';
    html += '<div class="setting-control">';
    var spd = localStorage.getItem('duoverse_speed') || 'normal';
    html += '<button class="setting-btn ' + (spd === 'slow' ? 'active' : '') + '" onclick="changeSetting(\'speed\',\'slow\')">' + t('慢 Slow', 'Slow') + '</button>';
    html += '<button class="setting-btn ' + (spd === 'normal' ? 'active' : '') + '" onclick="changeSetting(\'speed\',\'normal\')">' + t('正常 Normal', 'Normal') + '</button>';
    html += '<button class="setting-btn ' + (spd === 'fast' ? 'active' : '') + '" onclick="changeSetting(\'speed\',\'fast\')">' + t('快 Fast', 'Fast') + '</button>';
    html += '</div></div>';

    // Reset
    html += '<div class="setting-item setting-danger">';
    html += '<div class="setting-label">🗑️ ' + t('重置进度', 'Reset Progress') + '</div>';
    html += '<div class="setting-control">';
    html += '<button class="setting-btn danger-btn" onclick="if(confirm(\'' + t('确定要重置所有进度吗？', 'Reset all progress?') + '\')){localStorage.clear();location.reload();}">' + t('重置所有数据', 'Reset Everything') + '</button>';
    html += '</div></div>';

    html += '</div>';
    container.innerHTML = html;
    parseEmojis(container);
}

function changeSetting(key, value) {
    if (key === 'lang') {
        localStorage.setItem('duoverse_lang', value);
    } else if (key === 'sound') {
        soundEnabled = value === 'on';
        localStorage.setItem('duoverse_sound', value);
    } else if (key === 'gender') {
        localStorage.setItem('duoverse_gender', value);
        var skins = value === 'girl' ? ['👧','👧🏻','👧🏼','👧🏽','👧🏾','👧🏿'] : ['👦','👦🏻','👦🏼','👦🏽','👦🏾','👦🏿'];
        localStorage.setItem('duoverse_avatar', skins[0]);
    } else if (key === 'skin') {
        localStorage.setItem('duoverse_avatar', value);
    } else if (key === 'name') {
        localStorage.setItem('duoverse_name', value || t('小朋友', 'Friend'));
    } else if (key === 'speed') {
        localStorage.setItem('duoverse_speed', value);
    }
    buildSettings();
    refreshHomepage();
}

// Override sound functions to respect sound setting
var _origPlayCorrect = playCorrectSound;
var _origPlayWrong = playWrongSound;
var _origPlayBig = playBigWinSound;
var _origPlayPurchase = playPurchaseSound;
var _origSpeak = speak;

playCorrectSound = function() { if (soundEnabled) _origPlayCorrect(); };
playWrongSound = function() { if (soundEnabled) _origPlayWrong(); };
playBigWinSound = function() { if (soundEnabled) _origPlayBig(); };
playPurchaseSound = function() { if (soundEnabled) _origPlayPurchase(); };
speak = function(text) {
    if (!soundEnabled) return;
    var spd = localStorage.getItem('duoverse_speed') || 'normal';
    var rate = spd === 'slow' ? 0.6 : (spd === 'fast' ? 1.2 : 0.85);
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
};

// =============================================================
// INIT + SPLASH
// =============================================================

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');

    // If they already picked a language, show enter button right away
    var savedLang = localStorage.getItem('duoverse_lang');
    if (savedLang) {
        document.getElementById('splash-enter').classList.remove('hidden');
        document.getElementById('splash-tagline').textContent = savedLang === 'cn' ? '你的英语冒险，从这里开始！' : 'Your English adventure starts here!';
        document.getElementById('splash-enter').textContent = savedLang === 'cn' ? '进入 Enter →' : 'Enter →';
        document.getElementById('splash-lang').style.display = 'none';
    }

    document.getElementById('splash-enter').onclick = function() {
        var splash = document.getElementById('splash');
        splash.classList.add('fade-out');
        setTimeout(function() {
            splash.style.display = 'none';
            if (localStorage.getItem('duoverse_onboarded') === 'true') {
                document.getElementById('app').classList.remove('hidden');
                initApp();
            } else {
                document.getElementById('onboarding').classList.remove('hidden');
                parseEmojis(document.getElementById('onboarding'));
            }
        }, 600);
    };

    parseEmojis(document.getElementById('splash'));
});
