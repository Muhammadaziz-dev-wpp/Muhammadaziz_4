const productCatalog = [
  {
    id: "iphone",
    name: "iPhone",
    subtitle: "Har bir lahzaga yaqinroq.",
    description:
      "Yorqin displey, kundalik hayot uchun tayyor kamera va kun bo‘yi yetadigan quvvat — nafis va puxta o‘ylangan dizaynda.",
    details: ["Yorqin, ranglarga boy displey", "Har lahzaga tayyor kamera", "Kun bo‘yi ishlaydigan batareya"],
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1400&q=85",
    alt: "Yorqin displeyli zamonaviy smartfon",
    keywords: ["iphone", "phone", "mobile", "telefon"],
    finish: "Tabiiy ranglar",
    category: "Kundalik hayot uchun",
  },
  {
    id: "mac",
    name: "MacBook",
    subtitle: "G‘oyalaringizga kenglik bering.",
    description:
      "Katta g‘oyalar uchun kuchli, o‘zingiz bilan olib yurish uchun yengil. Keyingi ajoyib ishingiz shu yerdan boshlanadi.",
    details: ["Kundalik ishlar uchun tezkor", "Yengil va olib yurishga qulay", "Katta va ravshan ekran"],
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=85",
    alt: "Yorug‘ ish stolida turgan yupqa noutbuk",
    keywords: ["mac", "macbook", "laptop", "noutbuk"],
    finish: "Yupqa alyuminiy korpus",
    category: "Ish va ijod uchun",
  },
  {
    id: "ipad",
    name: "iPad",
    subtitle: "G‘oyalar uchun yangi maydon.",
    description:
      "O‘qish, chizish va ijod qilish uchun keng imkoniyatlar — hammasi yengil, ixcham planshetda.",
    details: ["Ranglarga boy katta ekran", "O‘qish va ijod uchun qulay", "Yengil va ixcham dizayn"],
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1400&q=85",
    alt: "Ijodiy ish uchun tayyor planshet",
    keywords: ["ipad", "tablet", "planshet"],
    finish: "Sodda, ixcham dizayn",
    category: "Ijod va kundalik foydalanish uchun",
  },
  {
    id: "watch",
    name: "Apple Watch",
    subtitle: "Har kuningizga mos vaqt.",
    description:
      "Faollikni kuzatish va kun tartibingizni boshqarishning qulay usuli — bilagingizda.",
    details: ["Kundalik faollikni kuzatish", "Qulay bildirishnomalar", "Harakatda ham oson boshqaruv"],
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1400&q=85",
    alt: "Qora tasmasi bor zamonaviy aqlli soat",
    keywords: ["watch", "apple watch", "soat"],
    finish: "Kundalik taqishga mos",
    category: "Faol hayot uchun",
  },
  {
    id: "audio",
    name: "AirPods",
    subtitle: "Har bir ohangni his eting.",
    description:
      "Sevimli musiqangiz va podkastlaringiz uchun tiniq, chuqur ovoz va qulay tinglash tajribasi.",
    details: ["Tiniq va muvozanatli ovoz", "Qulay, ixcham dizayn", "Musiqa va qo‘ng‘iroqlar uchun"],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85",
    alt: "Minimalistik dizayndagi sifatli quloqchinlar",
    keywords: ["audio", "airpods", "headphones", "quloqchin"],
    finish: "Ixcham va qulay",
    category: "Musiqa va suhbatlar uchun",
  },
  {
    id: "forma-one",
    name: "Forma One",
    subtitle: "Yangi imkoniyatlar, kaftingizda.",
    description:
      "Kundalik muloqot, suratga olish va sevimli ilovalaringiz uchun qulay zamonaviy smartfon.",
    details: ["Yorqin va ravshan ekran", "Kundalik suratlar uchun kamera", "Qulay va ixcham korpus"],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=85",
    alt: "Zamonaviy smartfonning orqa tomoni",
    keywords: ["forma one", "android", "smartfon", "smartphone", "telefon"],
    finish: "Zamonaviy, ixcham dizayn",
    category: "Telefonlar",
  },
  {
    id: "forma-display",
    name: "Forma Display",
    subtitle: "Katta tasvir, tiniq tafsilotlar.",
    description:
      "Ish, ijod va ko‘ngilochar mashg‘ulotlar uchun keng va ravshan displey.",
    details: ["Keng ish maydoni", "Ranglarga boy tasvir", "Ish stoli uchun sodda dizayn"],
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1400&q=85",
    alt: "Ish stolida joylashgan keng kompyuter monitori",
    keywords: ["monitor", "display", "ekran", "forma display"],
    finish: "Minimalistik ish stoli dizayni",
    category: "Monitorlar va displeylar",
  },
  {
    id: "forma-sound",
    name: "Forma Sound",
    subtitle: "Xonangizga mos jarang.",
    description:
      "Sevimli musiqangiz, podkastlaringiz va kundalik tinglash uchun qulay simsiz karnay.",
    details: ["To‘yingan va tiniq ovoz", "Simsiz foydalanish qulayligi", "Uy va ish joyiga mos"],
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
    alt: "Zamonaviy simsiz karnay",
    keywords: ["speaker", "sound", "karnay", "kolonka", "forma sound"],
    finish: "Ixcham simsiz dizayn",
    category: "Karnaylar va ovoz",
  },
];
