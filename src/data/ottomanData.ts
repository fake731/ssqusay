// Ottoman Empire Historical Data

export interface Sultan {
  id: number;
  name: string;
  nameAr: string;
  reign: string;
  reignYears: string;
  title: string;
  majorConquests: string[];
  majorBattles: string[];
  militaryDecisions: string[];
  description: string;
}

export interface Battle {
  id: number;
  name: string;
  nameAr: string;
  year: number;
  location: string;
  opponents: string[];
  sultanId: number;
  sultanName: string;
  ottomanForces: string;
  enemyForces: string;
  result: "victory" | "defeat" | "stalemate";
  significance: string;
  militaryStrategy: string;
  weaponsUsed: string[];
  narrative: string;
}

export interface Weapon {
  id: number;
  name: string;
  nameAr: string;
  type: string;
  era: string;
  introducedBy: string;
  description: string;
  impact: string;
}

export interface City {
  id: number;
  name: string;
  nameAr: string;
  year: number;
  sultanName: string;
  forces: string;
  battleId: number;
}

export const sultans: Sultan[] = [
  {
    id: 1,
    name: "Osman I",
    nameAr: "عثمان الأول",
    reign: "1299-1326",
    reignYears: "27 سنة",
    title: "مؤسس الدولة العثمانية",
    majorConquests: ["قره جه حصار", "بلجيك", "يني شهر"],
    majorBattles: ["معركة بافيوس (1302)"],
    militaryDecisions: ["تأسيس الجيش الأول", "نظام الغزوات", "التحالف مع القبائل التركمانية"],
    description: "المحارب الذي أسس إمبراطورية امتدت لستة قرون. بدأ بقبيلة صغيرة وحوّلها إلى دولة عظمى."
  },
  {
    id: 2,
    name: "Orhan",
    nameAr: "أورخان غازي",
    reign: "1326-1362",
    reignYears: "36 سنة",
    title: "الفاتح الأول لأوروبا",
    majorConquests: ["بورصة", "نيقوميديا (إزميت)", "أنقرة", "غاليبولي"],
    majorBattles: ["فتح بورصة (1326)", "معركة بيليجيك"],
    militaryDecisions: ["إنشاء أول جيش نظامي", "تأسيس الإنكشارية", "ضم الأناضول"],
    description: "الباني الحقيقي للدولة. أنشأ أول عملة عثمانية وأول جيش منظم."
  },
  {
    id: 3,
    name: "Murad I",
    nameAr: "مراد الأول",
    reign: "1362-1389",
    reignYears: "27 سنة",
    title: "سلطان الغزوات",
    majorConquests: ["أدرنة", "صوفيا", "سالونيك", "صربيا"],
    majorBattles: ["معركة قوصوفو (1389)", "معركة ماريتزا (1371)"],
    militaryDecisions: ["تطوير نظام الدفشرمة", "إنشاء سلاح الفرسان الثقيل", "فتح البلقان"],
    description: "استشهد في ساحة المعركة بعد نصر عظيم في قوصوفو. أول سلطان يُلقب بالسلطان."
  },
  {
    id: 4,
    name: "Bayezid I",
    nameAr: "بايزيد الأول (الصاعقة)",
    reign: "1389-1402",
    reignYears: "13 سنة",
    title: "الصاعقة",
    majorConquests: ["بلغاريا", "اليونان", "حصار القسطنطينية"],
    majorBattles: ["معركة نيكوبوليس (1396)", "معركة أنقرة (1402)"],
    militaryDecisions: ["الحصار الأول للقسطنطينية", "هزيمة الحملة الصليبية"],
    description: "لُقب بالصاعقة لسرعة تحركاته العسكرية. هزم أكبر حملة صليبية لكنه سقط أسيراً أمام تيمورلنك."
  },
  {
    id: 5,
    name: "Mehmed I",
    nameAr: "محمد الأول",
    reign: "1413-1421",
    reignYears: "8 سنوات",
    title: "المُجدد",
    majorConquests: ["إعادة توحيد الدولة"],
    majorBattles: ["حروب الفترة الأهلية"],
    militaryDecisions: ["إعادة بناء الجيش", "توحيد الأناضول"],
    description: "أعاد توحيد الدولة بعد الفوضى التي تلت هزيمة أنقرة."
  },
  {
    id: 6,
    name: "Murad II",
    nameAr: "مراد الثاني",
    reign: "1421-1451",
    reignYears: "30 سنة",
    title: "أبو الفاتح",
    majorConquests: ["سالونيك", "صربيا", "ألبانيا"],
    majorBattles: ["معركة فارنا (1444)", "معركة قوصوفو الثانية (1448)"],
    militaryDecisions: ["تطوير المدفعية", "إصلاح الإنكشارية"],
    description: "والد السلطان محمد الفاتح. هزم حملتين صليبيتين وأعد الطريق لفتح القسطنطينية."
  },
  {
    id: 7,
    name: "Mehmed II",
    nameAr: "محمد الفاتح",
    reign: "1451-1481",
    reignYears: "30 سنة",
    title: "فاتح القسطنطينية",
    majorConquests: ["القسطنطينية", "صربيا", "البوسنة", "ألبانيا", "اليونان", "شبه جزيرة القرم"],
    majorBattles: ["فتح القسطنطينية (1453)", "معركة أوتلوق بيلي"],
    militaryDecisions: ["استخدام المدفعية العملاقة", "نقل السفن براً", "بناء قلعة روملي حصار"],
    description: "الفاتح العظيم الذي غيّر مجرى التاريخ. فتح القسطنطينية بعد حصار 53 يوماً وأنهى الإمبراطورية البيزنطية."
  },
  {
    id: 8,
    name: "Bayezid II",
    nameAr: "بايزيد الثاني",
    reign: "1481-1512",
    reignYears: "31 سنة",
    title: "الوليّ",
    majorConquests: ["الساحل اليوناني", "كيليكيا"],
    majorBattles: ["الحروب مع المماليك", "معارك البحر المتوسط"],
    militaryDecisions: ["تطوير الأسطول البحري", "استقبال مسلمي الأندلس"],
    description: "سلطان العلم والثقافة. طوّر الأسطول العثماني واستقبل المسلمين واليهود المطرودين من إسبانيا."
  },
  {
    id: 9,
    name: "Selim I",
    nameAr: "سليم الأول (ياووز)",
    reign: "1512-1520",
    reignYears: "8 سنوات",
    title: "القاهر",
    majorConquests: ["مصر", "الشام", "الحجاز", "فلسطين"],
    majorBattles: ["معركة مرج دابق (1516)", "معركة الريدانية (1517)", "معركة جالديران (1514)"],
    militaryDecisions: ["ضم الخلافة للعثمانيين", "السيطرة على طرق التجارة"],
    description: "في 8 سنوات فقط، ضاعف مساحة الدولة. أسقط المماليك ونقل الخلافة لإسطنبول."
  },
  {
    id: 10,
    name: "Suleiman I",
    nameAr: "سليمان القانوني",
    reign: "1520-1566",
    reignYears: "46 سنة",
    title: "القانوني / العظيم",
    majorConquests: ["بلغراد", "رودس", "بودابست", "بغداد", "عدن", "الجزائر"],
    majorBattles: ["معركة موهاكس (1526)", "حصار فيينا (1529)", "معركة بريفيزا (1538)"],
    militaryDecisions: ["إصلاح الجيش الشامل", "تطوير سلاح البحرية", "التحالف مع فرنسا"],
    description: "أطول فترة حكم وأعظم توسع. قاد 13 حملة عسكرية وجعل الدولة العثمانية القوة العظمى الأولى في العالم."
  }
];

export const battles: Battle[] = [
  {
    id: 1,
    name: "Fall of Constantinople",
    nameAr: "فتح القسطنطينية",
    year: 1453,
    location: "القسطنطينية (إسطنبول)",
    opponents: ["الإمبراطورية البيزنطية"],
    sultanId: 7,
    sultanName: "محمد الفاتح",
    ottomanForces: "80,000 - 100,000 جندي",
    enemyForces: "7,000 - 10,000 مدافع",
    result: "victory",
    significance: "سقوط الإمبراطورية البيزنطية ونهاية العصور الوسطى",
    militaryStrategy: "استخدام المدافع العملاقة لهدم الأسوار، نقل السفن براً لتجاوز السلسلة البحرية، الهجوم المتزامن من البر والبحر",
    weaponsUsed: ["مدفع أوربان العملاق", "السفن الحربية", "أبراج الحصار", "الإنكشارية"],
    narrative: "في فجر يوم 29 مايو 1453، وبعد حصار استمر 53 يوماً، اخترق العثمانيون أسوار القسطنطينية العظيمة. كان السلطان محمد الفاتح، البالغ من العمر 21 عاماً فقط، قد أعد خطة عبقرية: نقل 70 سفينة براً عبر الجبال لتجاوز السلسلة الحديدية التي تحمي القرن الذهبي..."
  },
  {
    id: 2,
    name: "Battle of Mohacs",
    nameAr: "معركة موهاكس",
    year: 1526,
    location: "موهاكس، المجر",
    opponents: ["مملكة المجر"],
    sultanId: 10,
    sultanName: "سليمان القانوني",
    ottomanForces: "100,000 جندي",
    enemyForces: "25,000 - 30,000 جندي",
    result: "victory",
    significance: "سقوط مملكة المجر وفتح أوروبا الوسطى",
    militaryStrategy: "استدراج سلاح الفرسان المجري للهجوم ثم تطويقه، استخدام المدفعية المكثفة",
    weaponsUsed: ["المدافع الميدانية", "الإنكشارية", "السيباهي (الفرسان)"],
    narrative: "في ساعتين فقط، دمّر الجيش العثماني مملكة المجر بالكامل. الملك لويس الثاني غرق وهو يفر، و15,000 مجري قُتلوا في المعركة. كانت المدافع العثمانية تحصد صفوف الفرسان المجريين كحصاد القمح..."
  },
  {
    id: 3,
    name: "Battle of Marj Dabiq",
    nameAr: "معركة مرج دابق",
    year: 1516,
    location: "حلب، سوريا",
    opponents: ["دولة المماليك"],
    sultanId: 9,
    sultanName: "سليم الأول",
    ottomanForces: "60,000 جندي",
    enemyForces: "30,000 جندي",
    result: "victory",
    significance: "سقوط الشام وبداية نهاية المماليك",
    militaryStrategy: "تفوق المدفعية والبنادق على سلاح الفرسان التقليدي، خيانة بعض أمراء المماليك",
    weaponsUsed: ["البنادق", "المدافع الميدانية", "السيباهي"],
    narrative: "رفض المماليك استخدام البنادق واعتبروها سلاح الجبناء. دفعوا ثمن غرورهم غالياً. السلطان قانصوه الغوري سقط قتيلاً في المعركة، والمدافع العثمانية أثبتت أن عصر الفرسان قد انتهى..."
  },
  {
    id: 4,
    name: "Battle of Kosovo",
    nameAr: "معركة قوصوفو",
    year: 1389,
    location: "قوصوفو، صربيا",
    opponents: ["صربيا", "البوسنة", "تحالف بلقاني"],
    sultanId: 3,
    sultanName: "مراد الأول",
    ottomanForces: "30,000 - 40,000 جندي",
    enemyForces: "25,000 - 30,000 جندي",
    result: "victory",
    significance: "السيطرة على البلقان واستشهاد السلطان",
    militaryStrategy: "تكتيك الهجوم المتتالي، استخدام الرماة والفرسان بتناغم",
    weaponsUsed: ["السيوف المنحنية", "الأقواس المركبة", "الرماح", "الفرسان"],
    narrative: "انتصر العثمانيون لكن السلطان مراد استُشهد على يد ميلوش كوبيليتش الذي تسلل للخيمة السلطانية. ابنه بايزيد تولى القيادة فوراً وأكمل النصر..."
  },
  {
    id: 5,
    name: "Battle of Nicopolis",
    nameAr: "معركة نيكوبوليس",
    year: 1396,
    location: "نيكوبوليس، بلغاريا",
    opponents: ["فرنسا", "المجر", "إنجلترا", "ألمانيا", "بورغندي"],
    sultanId: 4,
    sultanName: "بايزيد الأول",
    ottomanForces: "60,000 - 100,000 جندي",
    enemyForces: "100,000 - 130,000 جندي",
    result: "victory",
    significance: "سحق أكبر حملة صليبية وتثبيت الوجود العثماني في أوروبا",
    militaryStrategy: "استدراج الفرسان للهجوم المتسرع ثم تطويقهم، الصبر الاستراتيجي",
    weaponsUsed: ["السهام", "السيوف", "الفرسان السيباهي", "المشاة الإنكشارية"],
    narrative: "اندفع الفرسان الفرنسيون بغرور دون انتظار بقية الجيش. وقعوا في الفخ العثماني المحكم. كانت الهزيمة مذلة لأوروبا، والأسرى النبلاء فُديوا بثروات طائلة..."
  },
  {
    id: 6,
    name: "Battle of Preveza",
    nameAr: "معركة بريفيزا",
    year: 1538,
    location: "بريفيزا، اليونان",
    opponents: ["الأسطول المقدس (إسبانيا، البندقية، جنوة، البابوية)"],
    sultanId: 10,
    sultanName: "سليمان القانوني",
    ottomanForces: "122 سفينة حربية",
    enemyForces: "300+ سفينة",
    result: "victory",
    significance: "السيطرة المطلقة على البحر المتوسط",
    militaryStrategy: "المناورة والهجوم المباغت، استغلال الرياح والتيارات",
    weaponsUsed: ["السفن الحربية (القادرغة)", "المدافع البحرية", "النيران اليونانية"],
    narrative: "خير الدين بربروس، القائد العبقري، واجه أسطولاً يفوقه عدداً بثلاث مرات. بمناورة بارعة، دمّر الأسطول المسيحي وأثبت أن البحر المتوسط بحيرة عثمانية..."
  }
];

export const weapons: Weapon[] = [
  {
    id: 1,
    name: "Kilij",
    nameAr: "السيف العثماني (قلج)",
    type: "سيف",
    era: "القرن 13 - القرن 19",
    introducedBy: "أورخان غازي",
    description: "السيف المنحني المميز للفرسان العثمانيين، مثالي للضرب من على ظهر الحصان",
    impact: "أصبح رمزاً للقوة العثمانية وأساس تقنيات القتال العثماني"
  },
  {
    id: 2,
    name: "Ottoman Bow",
    nameAr: "القوس المركّب العثماني",
    type: "قوس",
    era: "القرن 14 - القرن 17",
    introducedBy: "مراد الأول",
    description: "قوس مركب قصير وقوي، يمكن استخدامه من على ظهر الحصان",
    impact: "منح الفرسان العثمانيين تفوقاً في المناوشات والمطاردة"
  },
  {
    id: 3,
    name: "Great Bombard",
    nameAr: "المدفع العملاق (أوربان)",
    type: "مدفعية",
    era: "1453",
    introducedBy: "محمد الفاتح",
    description: "مدفع ضخم يزن 17 طناً، صنعه المهندس أوربان، قادر على إطلاق كرات حجرية تزن 600 كيلو",
    impact: "غيّر فن الحرب للأبد وأسقط أسوار القسطنطينية التي صمدت ألف عام"
  },
  {
    id: 4,
    name: "Janissary Musket",
    nameAr: "بندقية الإنكشارية",
    type: "أسلحة نارية",
    era: "القرن 15 - القرن 19",
    introducedBy: "بايزيد الثاني",
    description: "بندقية فتيلية متطورة، جعلت الإنكشارية أول قوة مشاة نظامية تستخدم البنادق",
    impact: "حسمت معارك كثيرة ضد جيوش تقليدية ترفض التقنية الجديدة"
  },
  {
    id: 5,
    name: "Ottoman Galley",
    nameAr: "القادرغة العثمانية",
    type: "سفينة حربية",
    era: "القرن 15 - القرن 18",
    introducedBy: "محمد الفاتح",
    description: "سفينة حربية سريعة بمجاديف ومدافع، أساس الأسطول العثماني",
    impact: "سيطرت على البحر المتوسط لقرون وهزمت الأساطيل الأوروبية المتحالفة"
  },
  {
    id: 6,
    name: "Topuz Mace",
    nameAr: "الطبرزين (توبوز)",
    type: "سلاح ثقيل",
    era: "القرن 14 - القرن 17",
    introducedBy: "الفرسان السيباهي",
    description: "مطرقة حربية ثقيلة لتحطيم الدروع والخوذات",
    impact: "سلاح فعّال ضد الفرسان الأوروبيين المدرعين"
  }
];

export const cities: City[] = [
  { id: 1, name: "Constantinople", nameAr: "القسطنطينية", year: 1453, sultanName: "محمد الفاتح", forces: "100,000 جندي", battleId: 1 },
  { id: 2, name: "Belgrade", nameAr: "بلغراد", year: 1521, sultanName: "سليمان القانوني", forces: "100,000 جندي", battleId: 0 },
  { id: 3, name: "Rhodes", nameAr: "رودس", year: 1522, sultanName: "سليمان القانوني", forces: "200,000 جندي", battleId: 0 },
  { id: 4, name: "Buda", nameAr: "بودابست", year: 1541, sultanName: "سليمان القانوني", forces: "80,000 جندي", battleId: 2 },
  { id: 5, name: "Baghdad", nameAr: "بغداد", year: 1534, sultanName: "سليمان القانوني", forces: "90,000 جندي", battleId: 0 },
  { id: 6, name: "Cairo", nameAr: "القاهرة", year: 1517, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 0 },
  { id: 7, name: "Damascus", nameAr: "دمشق", year: 1516, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 3 },
  { id: 8, name: "Thessaloniki", nameAr: "سالونيك", year: 1430, sultanName: "مراد الثاني", forces: "50,000 جندي", battleId: 0 },
];
