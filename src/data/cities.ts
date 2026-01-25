// المدن المفتوحة والفتوحات العثمانية

export interface City {
  id: number;
  name: string;
  nameAr: string;
  year: number;
  sultanId: number;
  sultanName: string;
  forces: string;
  battleId: number;
  description: string;
  significance: string;
}

export const cities: City[] = [
  { id: 1, name: "Karacahisar", nameAr: "قره جه حصار", year: 1288, sultanId: 1, sultanName: "عثمان الأول", forces: "3,000 فارس", battleId: 0, description: "أول فتح عثماني كبير", significance: "بداية التوسع العثماني" },
  { id: 2, name: "Bursa", nameAr: "بورصة", year: 1326, sultanId: 2, sultanName: "أورخان غازي", forces: "15,000 جندي", battleId: 2, description: "أول عاصمة عثمانية", significance: "تحول القبيلة إلى دولة" },
  { id: 3, name: "Nicaea", nameAr: "نيقية (إزنيق)", year: 1331, sultanId: 2, sultanName: "أورخان غازي", forces: "20,000 جندي", battleId: 0, description: "مدينة المجامع المسيحية", significance: "سقوط رمز مسيحي مهم" },
  { id: 4, name: "Nicomedia", nameAr: "نيقوميديا (إزميت)", year: 1337, sultanId: 2, sultanName: "أورخان غازي", forces: "25,000 جندي", battleId: 0, description: "عاصمة بيزنطية سابقة", significance: "الاقتراب من القسطنطينية" },
  { id: 5, name: "Gallipoli", nameAr: "غاليبولي", year: 1354, sultanId: 2, sultanName: "أورخان غازي", forces: "5,000 جندي", battleId: 0, description: "أول موطئ قدم في أوروبا", significance: "بداية الفتوحات الأوروبية" },
  { id: 6, name: "Adrianople", nameAr: "أدرنة", year: 1362, sultanId: 3, sultanName: "مراد الأول", forces: "40,000 جندي", battleId: 0, description: "العاصمة العثمانية الجديدة", significance: "تحول العثمانيين لقوة أوروبية" },
  { id: 7, name: "Sofia", nameAr: "صوفيا", year: 1382, sultanId: 3, sultanName: "مراد الأول", forces: "30,000 جندي", battleId: 0, description: "عاصمة بلغاريا", significance: "إخضاع البلقان" },
  { id: 8, name: "Thessaloniki", nameAr: "سالونيك", year: 1387, sultanId: 3, sultanName: "مراد الأول", forces: "50,000 جندي", battleId: 0, description: "ثاني أكبر مدينة بيزنطية", significance: "تضييق الخناق على البيزنطيين" },
  { id: 9, name: "Constantinople", nameAr: "القسطنطينية", year: 1453, sultanId: 7, sultanName: "محمد الفاتح", forces: "100,000 جندي", battleId: 8, description: "عاصمة الإمبراطورية البيزنطية", significance: "نهاية العصور الوسطى" },
  { id: 10, name: "Trebizond", nameAr: "طرابزون", year: 1461, sultanId: 7, sultanName: "محمد الفاتح", forces: "60,000 جندي", battleId: 0, description: "آخر دولة يونانية مستقلة", significance: "نهاية البيزنطيين نهائياً" },
  { id: 11, name: "Otranto", nameAr: "أوترانتو", year: 1480, sultanId: 7, sultanName: "محمد الفاتح", forces: "18,000 جندي", battleId: 0, description: "أول فتح في إيطاليا", significance: "تهديد مباشر لروما" },
  { id: 12, name: "Tabriz", nameAr: "تبريز", year: 1514, sultanId: 9, sultanName: "سليم الأول", forces: "100,000 جندي", battleId: 9, description: "عاصمة الصفويين", significance: "كسر القوة الصفوية" },
  { id: 13, name: "Aleppo", nameAr: "حلب", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 10, description: "أكبر مدن الشام", significance: "بداية سقوط المماليك" },
  { id: 14, name: "Damascus", nameAr: "دمشق", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 10, description: "عاصمة الأمويين سابقاً", significance: "سقوط الشام" },
  { id: 15, name: "Jerusalem", nameAr: "القدس", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "40,000 جندي", battleId: 0, description: "المدينة المقدسة", significance: "العثمانيون حماة المقدسات" },
  { id: 16, name: "Cairo", nameAr: "القاهرة", year: 1517, sultanId: 9, sultanName: "سليم الأول", forces: "50,000 جندي", battleId: 11, description: "عاصمة المماليك", significance: "نهاية دولة المماليك" },
  { id: 17, name: "Mecca", nameAr: "مكة المكرمة", year: 1517, sultanId: 9, sultanName: "سليم الأول", forces: "استسلام سلمي", battleId: 0, description: "أقدس مدينة في الإسلام", significance: "العثمانيون حماة الحرمين" },
  { id: 18, name: "Belgrade", nameAr: "بلغراد", year: 1521, sultanId: 10, sultanName: "سليمان القانوني", forces: "100,000 جندي", battleId: 0, description: "بوابة أوروبا الوسطى", significance: "فتح الطريق للمجر" },
  { id: 19, name: "Rhodes", nameAr: "رودس", year: 1522, sultanId: 10, sultanName: "سليمان القانوني", forces: "200,000 جندي", battleId: 0, description: "قاعدة فرسان القديس يوحنا", significance: "إنهاء آخر معقل صليبي" },
  { id: 20, name: "Budapest", nameAr: "بودابست", year: 1541, sultanId: 10, sultanName: "سليمان القانوني", forces: "80,000 جندي", battleId: 12, description: "عاصمة المجر", significance: "المجر ولاية عثمانية" },
  { id: 21, name: "Baghdad", nameAr: "بغداد", year: 1534, sultanId: 10, sultanName: "سليمان القانوني", forces: "90,000 جندي", battleId: 0, description: "عاصمة الخلافة العباسية سابقاً", significance: "توحيد العالم الإسلامي" },
  { id: 22, name: "Aden", nameAr: "عدن", year: 1538, sultanId: 10, sultanName: "سليمان القانوني", forces: "20,000 جندي", battleId: 0, description: "بوابة المحيط الهندي", significance: "السيطرة على التجارة البحرية" },
  { id: 23, name: "Algiers", nameAr: "الجزائر", year: 1529, sultanId: 10, sultanName: "سليمان القانوني", forces: "انضمام طوعي", battleId: 0, description: "قاعدة خير الدين بربروس", significance: "توسع غرب المتوسط" },
  { id: 24, name: "Tripoli", nameAr: "طرابلس", year: 1551, sultanId: 10, sultanName: "سليمان القانوني", forces: "10,000 جندي", battleId: 0, description: "مدينة ليبية ساحلية", significance: "السيطرة على شمال أفريقيا" },
  { id: 25, name: "Cyprus", nameAr: "قبرص", year: 1571, sultanId: 11, sultanName: "سليم الثاني", forces: "100,000 جندي", battleId: 0, description: "جزيرة استراتيجية", significance: "السيطرة على شرق المتوسط" },
  { id: 26, name: "Tunis", nameAr: "تونس", year: 1574, sultanId: 11, sultanName: "سليم الثاني", forces: "40,000 جندي", battleId: 0, description: "عاصمة إفريقية", significance: "طرد الإسبان من تونس" },
  { id: 27, name: "Tbilisi", nameAr: "تبليسي", year: 1578, sultanId: 12, sultanName: "مراد الثالث", forces: "50,000 جندي", battleId: 0, description: "عاصمة جورجيا", significance: "التوسع في القوقاز" },
  { id: 28, name: "Yerevan", nameAr: "يريفان", year: 1635, sultanId: 17, sultanName: "مراد الرابع", forces: "100,000 جندي", battleId: 0, description: "مدينة أرمينية", significance: "انتصار على الصفويين" },
  { id: 29, name: "Baghdad Recapture", nameAr: "استعادة بغداد", year: 1638, sultanId: 17, sultanName: "مراد الرابع", forces: "100,000 جندي", battleId: 0, description: "استعادة العاصمة العباسية", significance: "آخر انتصار سلطاني كبير" },
  { id: 30, name: "Crete", nameAr: "كريت", year: 1669, sultanId: 19, sultanName: "محمد الرابع", forces: "70,000 جندي", battleId: 0, description: "أكبر جزر اليونان", significance: "حصار 25 عاماً" }
];

export default cities;
