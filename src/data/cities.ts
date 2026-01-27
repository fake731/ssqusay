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
  // عصر التأسيس (1299-1400)
  { id: 1, name: "Karacahisar", nameAr: "قره جه حصار", year: 1288, sultanId: 1, sultanName: "عثمان الأول", forces: "3,000 فارس", battleId: 0, description: "أول فتح عثماني كبير", significance: "بداية التوسع العثماني - من شمال الأناضول" },
  { id: 2, name: "Bursa", nameAr: "بورصة", year: 1326, sultanId: 2, sultanName: "أورخان غازي", forces: "15,000 جندي", battleId: 2, description: "أول عاصمة عثمانية", significance: "السيطرة على غرب الأناضول حتى بحر مرمرة" },
  { id: 3, name: "Nicaea", nameAr: "نيقية (إزنيق)", year: 1331, sultanId: 2, sultanName: "أورخان غازي", forces: "20,000 جندي", battleId: 0, description: "مدينة المجامع المسيحية", significance: "توسع نحو البوسفور" },
  { id: 4, name: "Nicomedia", nameAr: "نيقوميديا (إزميت)", year: 1337, sultanId: 2, sultanName: "أورخان غازي", forces: "25,000 جندي", battleId: 0, description: "عاصمة بيزنطية سابقة", significance: "الاقتراب من القسطنطينية" },
  { id: 5, name: "Gallipoli", nameAr: "غاليبولي", year: 1354, sultanId: 2, sultanName: "أورخان غازي", forces: "5,000 جندي", battleId: 0, description: "أول موطئ قدم في أوروبا", significance: "عبور مضيق الدردنيل - بداية الفتوحات الأوروبية" },
  { id: 6, name: "Adrianople", nameAr: "أدرنة", year: 1362, sultanId: 3, sultanName: "مراد الأول", forces: "40,000 جندي", battleId: 0, description: "العاصمة العثمانية الجديدة", significance: "السيطرة على تراقيا - حتى نهر ماريتزا" },
  { id: 7, name: "Sofia", nameAr: "صوفيا", year: 1382, sultanId: 3, sultanName: "مراد الأول", forces: "30,000 جندي", battleId: 0, description: "عاصمة بلغاريا", significance: "إخضاع بلغاريا بالكامل" },
  { id: 8, name: "Thessaloniki", nameAr: "سالونيك", year: 1387, sultanId: 3, sultanName: "مراد الأول", forces: "50,000 جندي", battleId: 0, description: "ثاني أكبر مدينة بيزنطية", significance: "السيطرة على مقدونيا" },
  
  // عصر التوسع الكبير (1400-1520)
  { id: 9, name: "Constantinople", nameAr: "القسطنطينية", year: 1453, sultanId: 7, sultanName: "محمد الفاتح", forces: "100,000 جندي", battleId: 8, description: "عاصمة الإمبراطورية البيزنطية", significance: "نهاية العصور الوسطى - السيطرة على البوسفور" },
  { id: 10, name: "Athens", nameAr: "أثينا", year: 1458, sultanId: 7, sultanName: "محمد الفاتح", forces: "20,000 جندي", battleId: 0, description: "عاصمة اليونان القديمة", significance: "إخضاع اليونان" },
  { id: 11, name: "Trebizond", nameAr: "طرابزون", year: 1461, sultanId: 7, sultanName: "محمد الفاتح", forces: "60,000 جندي", battleId: 0, description: "آخر دولة يونانية مستقلة", significance: "السيطرة على ساحل البحر الأسود" },
  { id: 12, name: "Bosnia", nameAr: "البوسنة", year: 1463, sultanId: 7, sultanName: "محمد الفاتح", forces: "50,000 جندي", battleId: 0, description: "مملكة البوسنة", significance: "التوسع في غرب البلقان" },
  { id: 13, name: "Otranto", nameAr: "أوترانتو", year: 1480, sultanId: 7, sultanName: "محمد الفاتح", forces: "18,000 جندي", battleId: 0, description: "أول فتح في إيطاليا", significance: "تهديد مباشر لروما" },
  
  // عصر سليم الأول (1512-1520)
  { id: 14, name: "Tabriz", nameAr: "تبريز", year: 1514, sultanId: 9, sultanName: "سليم الأول", forces: "100,000 جندي", battleId: 9, description: "عاصمة الصفويين", significance: "كسر القوة الصفوية - التوسع شرقاً" },
  { id: 15, name: "Aleppo", nameAr: "حلب", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 10, description: "أكبر مدن الشام", significance: "بداية سقوط المماليك" },
  { id: 16, name: "Damascus", nameAr: "دمشق", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "60,000 جندي", battleId: 10, description: "عاصمة الأمويين سابقاً", significance: "سقوط الشام بالكامل" },
  { id: 17, name: "Jerusalem", nameAr: "القدس", year: 1516, sultanId: 9, sultanName: "سليم الأول", forces: "40,000 جندي", battleId: 0, description: "المدينة المقدسة", significance: "العثمانيون حماة المقدسات" },
  { id: 18, name: "Cairo", nameAr: "القاهرة", year: 1517, sultanId: 9, sultanName: "سليم الأول", forces: "50,000 جندي", battleId: 11, description: "عاصمة المماليك", significance: "نهاية دولة المماليك - السيطرة على مصر" },
  { id: 19, name: "Mecca", nameAr: "مكة المكرمة", year: 1517, sultanId: 9, sultanName: "سليم الأول", forces: "استسلام سلمي", battleId: 0, description: "أقدس مدينة في الإسلام", significance: "العثمانيون حماة الحرمين الشريفين" },
  { id: 20, name: "Medina", nameAr: "المدينة المنورة", year: 1517, sultanId: 9, sultanName: "سليم الأول", forces: "استسلام سلمي", battleId: 0, description: "ثاني أقدس مدينة", significance: "السيطرة على الحجاز" },
  
  // عصر سليمان القانوني (1520-1566)
  { id: 21, name: "Belgrade", nameAr: "بلغراد", year: 1521, sultanId: 10, sultanName: "سليمان القانوني", forces: "100,000 جندي", battleId: 0, description: "بوابة أوروبا الوسطى", significance: "فتح الطريق للمجر والنمسا" },
  { id: 22, name: "Rhodes", nameAr: "رودس", year: 1522, sultanId: 10, sultanName: "سليمان القانوني", forces: "200,000 جندي", battleId: 0, description: "قاعدة فرسان القديس يوحنا", significance: "إنهاء آخر معقل صليبي في المتوسط" },
  { id: 23, name: "Budapest", nameAr: "بودابست", year: 1541, sultanId: 10, sultanName: "سليمان القانوني", forces: "80,000 جندي", battleId: 12, description: "عاصمة المجر", significance: "المجر ولاية عثمانية" },
  { id: 24, name: "Baghdad", nameAr: "بغداد", year: 1534, sultanId: 10, sultanName: "سليمان القانوني", forces: "90,000 جندي", battleId: 0, description: "عاصمة الخلافة العباسية سابقاً", significance: "توحيد العراق - من البصرة للموصل" },
  { id: 25, name: "Aden", nameAr: "عدن", year: 1538, sultanId: 10, sultanName: "سليمان القانوني", forces: "20,000 جندي", battleId: 0, description: "بوابة المحيط الهندي", significance: "السيطرة على التجارة البحرية" },
  { id: 26, name: "Algiers", nameAr: "الجزائر", year: 1529, sultanId: 10, sultanName: "سليمان القانوني", forces: "انضمام طوعي", battleId: 0, description: "قاعدة خير الدين بربروس", significance: "التوسع في غرب البحر المتوسط" },
  { id: 27, name: "Tripoli", nameAr: "طرابلس الغرب", year: 1551, sultanId: 10, sultanName: "سليمان القانوني", forces: "10,000 جندي", battleId: 0, description: "مدينة ليبية ساحلية", significance: "السيطرة على شمال أفريقيا" },
  { id: 28, name: "Basra", nameAr: "البصرة", year: 1546, sultanId: 10, sultanName: "سليمان القانوني", forces: "30,000 جندي", battleId: 0, description: "ميناء الخليج العربي", significance: "السيطرة على الخليج" },
  
  // عصر التوسع المتأخر (1566-1700)
  { id: 29, name: "Cyprus", nameAr: "قبرص", year: 1571, sultanId: 11, sultanName: "سليم الثاني", forces: "100,000 جندي", battleId: 0, description: "جزيرة استراتيجية", significance: "السيطرة على شرق المتوسط" },
  { id: 30, name: "Tunis", nameAr: "تونس", year: 1574, sultanId: 11, sultanName: "سليم الثاني", forces: "40,000 جندي", battleId: 0, description: "عاصمة إفريقية", significance: "طرد الإسبان نهائياً" },
  { id: 31, name: "Tbilisi", nameAr: "تبليسي", year: 1578, sultanId: 12, sultanName: "مراد الثالث", forces: "50,000 جندي", battleId: 0, description: "عاصمة جورجيا", significance: "التوسع في القوقاز" },
  { id: 32, name: "Yerevan", nameAr: "يريفان", year: 1635, sultanId: 17, sultanName: "مراد الرابع", forces: "100,000 جندي", battleId: 0, description: "مدينة أرمينية", significance: "انتصار على الصفويين" },
  { id: 33, name: "Baghdad Recapture", nameAr: "استعادة بغداد", year: 1638, sultanId: 17, sultanName: "مراد الرابع", forces: "100,000 جندي", battleId: 0, description: "استعادة العاصمة العباسية", significance: "آخر انتصار سلطاني كبير" },
  { id: 34, name: "Crete", nameAr: "كريت", year: 1669, sultanId: 19, sultanName: "محمد الرابع", forces: "70,000 جندي", battleId: 0, description: "أكبر جزر اليونان", significance: "حصار استمر 25 عاماً" },
  
  // عصر التراجع (1700-1922)
  { id: 35, name: "Belgrade Recovery", nameAr: "استعادة بلغراد", year: 1739, sultanId: 24, sultanName: "محمود الأول", forces: "100,000 جندي", battleId: 19, description: "استعادة من النمسا", significance: "آخر انتصار كبير على أوروبا" },
  { id: 36, name: "Loss of Crimea", nameAr: "خسارة القرم", year: 1783, sultanId: 27, sultanName: "عبد الحميد الأول", forces: "-", battleId: 0, description: "ضمتها روسيا", significance: "بداية فقدان البحر الأسود" },
  { id: 37, name: "Loss of Greece", nameAr: "استقلال اليونان", year: 1829, sultanId: 30, sultanName: "محمود الثاني", forces: "-", battleId: 21, description: "استقلال اليونان", significance: "أول انفصال أوروبي" },
  { id: 38, name: "Loss of Algeria", nameAr: "خسارة الجزائر", year: 1830, sultanId: 30, sultanName: "محمود الثاني", forces: "-", battleId: 0, description: "احتلال فرنسي", significance: "فقدان شمال أفريقيا" },
  { id: 39, name: "Loss of Egypt", nameAr: "استقلال مصر الفعلي", year: 1805, sultanId: 29, sultanName: "مصطفى الرابع", forces: "-", battleId: 0, description: "حكم محمد علي", significance: "مصر شبه مستقلة" },
  { id: 40, name: "Loss of Serbia", nameAr: "استقلال صربيا", year: 1878, sultanId: 34, sultanName: "عبد الحميد الثاني", forces: "-", battleId: 0, description: "استقلال صربيا", significance: "تفكك البلقان" },
  { id: 41, name: "Loss of Romania", nameAr: "استقلال رومانيا", year: 1878, sultanId: 34, sultanName: "عبد الحميد الثاني", forces: "-", battleId: 0, description: "استقلال رومانيا", significance: "تراجع في البلقان" },
  { id: 42, name: "Loss of Bulgaria", nameAr: "استقلال بلغاريا", year: 1908, sultanId: 34, sultanName: "عبد الحميد الثاني", forces: "-", battleId: 0, description: "استقلال بلغاريا", significance: "نهاية البلقان العثماني" },
  { id: 43, name: "Loss of Libya", nameAr: "خسارة ليبيا", year: 1912, sultanId: 35, sultanName: "محمد الخامس", forces: "-", battleId: 0, description: "احتلال إيطالي", significance: "آخر أراضي أفريقيا" },
  { id: 44, name: "Balkan Wars", nameAr: "حروب البلقان", year: 1913, sultanId: 35, sultanName: "محمد الخامس", forces: "-", battleId: 0, description: "خسارة معظم الأراضي الأوروبية", significance: "بقاء تراقيا الشرقية فقط" },
  { id: 45, name: "End of Empire", nameAr: "نهاية السلطنة", year: 1922, sultanId: 36, sultanName: "محمد السادس", forces: "-", battleId: 30, description: "إلغاء السلطنة", significance: "قيام الجمهورية التركية" }
];

export default cities;
