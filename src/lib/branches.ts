// Единый источник данных по авиационным отделениям РГКП «Казавиалесоохрана».
// Используется на странице «Филиалы и отделения» и на интерактивной карте.

export type Localized = { ru: string; kz: string; en: string };

export type Branch = {
  id: string;
  name: Localized;
  region: Localized;
  address: Localized;
  head?: string;
  role?: Localized;
  phones?: string[];
  email?: string;
  // Географические координаты для карты (Leaflet)
  lat: number;
  lng: number;
};

export type Locale = 'ru' | 'kz' | 'en';

export function tr(v: Localized, locale: string): string {
  return v[(locale as Locale)] ?? v.ru;
}

const ROLE_HEAD: Localized = { ru: 'Начальник авиаотделения', kz: 'Авиабөлімше бастығы', en: 'Head of aviation branch' };
const ROLE_APG: Localized = { ru: 'Инструктор АПГ', kz: 'АПГ нұсқаушысы', en: 'APG instructor' };
const ROLE_APS: Localized = { ru: 'Инструктор АПС', kz: 'АПС нұсқаушысы', en: 'APS instructor' };
const ROLE_NORTH: Localized = { ru: 'Командир Северного авиазвена', kz: 'Солтүстік авиабуын командирі', en: 'Commander of the Northern air unit' };

export const branches: Branch[] = [
  {
    id: 'almaty',
    name: { ru: 'Алматинское', kz: 'Алматы', en: 'Almaty' },
    region: { ru: 'г. Алматы', kz: 'Алматы қ.', en: 'Almaty city' },
    address: { ru: 'г. Алматы, Наурызбайский район, ул. Мереке, 24', kz: 'Алматы қ., Наурызбай ауданы, Мереке к-сі, 24', en: 'Almaty, Nauryzbay district, Mereke St. 24' },
    head: 'Байшалов Бекзат Ерденович', role: ROLE_HEAD, phones: ['8708 338 6812', '8771 993 6143'], email: 'Almaty@aviales.kz', lat: 43.24, lng: 76.89,
  },
  {
    id: 'ust',
    name: { ru: 'Усть-Каменогорское', kz: 'Өскемен', en: 'Ust-Kamenogorsk' },
    region: { ru: 'ВКО', kz: 'ШҚО', en: 'East Kazakhstan' },
    address: { ru: 'г. Усть-Каменогорск, ул. Тохтарова, 40/1, офис 307', kz: 'Өскемен қ., Тохтаров к-сі, 40/1, 307-кеңсе', en: 'Ust-Kamenogorsk, Tokhtarov St. 40/1, office 307' },
    head: 'Лесной Юрий Николаевич', role: ROLE_HEAD, phones: ['87774118685'], email: 'avialesvko@mail.ru', lat: 49.95, lng: 82.61,
  },
  {
    id: 'kostanay',
    name: { ru: 'Костанайское', kz: 'Қостанай', en: 'Kostanay' },
    region: { ru: 'Костанайская область', kz: 'Қостанай облысы', en: 'Kostanay region' },
    address: { ru: 'Костанайская область, Ауликольский район, с. Лесное, Семиозерное ГУ, Калининское лесничество, кв. 109', kz: 'Қостанай облысы, Әулиекөл ауданы, Лесное ауылы, Семиозёрное ММ, Калинин орманшылығы, 109-кв.', en: 'Kostanay region, Auliekol district, Lesnoye village, Semiozyornoye SI, Kalinin forestry, block 109' },
    head: 'Тенизов Арман Бекжанович', role: ROLE_HEAD, phones: ['87776060616'], email: 'tenk2@mail.ru', lat: 52.5, lng: 64.2,
  },
  {
    id: 'ridder',
    name: { ru: 'Риддерское', kz: 'Риддер', en: 'Ridder' },
    region: { ru: 'ВКО, Риддер', kz: 'ШҚО, Риддер', en: 'East Kazakhstan, Ridder' },
    address: { ru: 'ВКО, г. Риддер, ул. Полевая, 181а', kz: 'ШҚО, Риддер қ., Полевая к-сі, 181а', en: 'East Kazakhstan, Ridder, Polevaya St. 181a' },
    head: 'Кузьмин Михаил Анатольевич', role: ROLE_APG, phones: ['8705 417 4701', '8 723 36 3 02 99'], email: 'mihailkuzmin1982@mail.ru', lat: 50.34, lng: 83.51,
  },
  {
    id: 'pavlodar',
    name: { ru: 'Павлодарское', kz: 'Павлодар', en: 'Pavlodar' },
    region: { ru: 'Павлодарская область', kz: 'Павлодар облысы', en: 'Pavlodar region' },
    address: { ru: 'Павлодарская область, Щербактинский район, п. Шалдай, ул. Жамбыла, 8', kz: 'Павлодар облысы, Шарбақты ауданы, Шалдай кенті, Жамбыл к-сі, 8', en: 'Pavlodar region, Shcherbakty district, Shaldai settlement, Zhambyl St. 8' },
    head: 'Шайзатхан Шынгысхан', role: ROLE_HEAD, phones: ['8771 993 61 67', '87071961221'], email: 'pavlodar@aviales.kz', lat: 51.7, lng: 78.2,
  },
  {
    id: 'karkaralinsk',
    name: { ru: 'Каркаралинское', kz: 'Қарқаралы', en: 'Karkaraly' },
    region: { ru: 'Карагандинская область', kz: 'Қарағанды облысы', en: 'Karaganda region' },
    address: { ru: 'Карагандинская область, Каркаралинский район, г. Каркаралинск, ГНПП Горное лесничество, кв. 126', kz: 'Қарағанды облысы, Қарқаралы ауданы, Қарқаралы қ., МҰТП Таулы орманшылығы, 126-кв.', en: 'Karaganda region, Karkaraly district, Karkaraly, SNNP Gornoye forestry, block 126' },
    head: 'Плотников Тимофей Владимирович', role: ROLE_HEAD, phones: ['87719936141'], email: 'timoha23_ru@mail.ru', lat: 49.41, lng: 75.47,
  },
  {
    id: 'taldykorgan',
    name: { ru: 'Талдыкорганское', kz: 'Талдықорған', en: 'Taldykorgan' },
    region: { ru: 'Жетысуская область', kz: 'Жетісу облысы', en: 'Zhetysu region' },
    address: { ru: 'Жетысуская область, г. Талдыкорган, ул. Лесная поляна, Кардон №1', kz: 'Жетісу облысы, Талдықорған қ., Лесная поляна к-сі, №1 Кордон', en: 'Zhetysu region, Taldykorgan, Lesnaya Polyana St., Cordon No. 1' },
    head: 'Базарбеков Мурат Кожабекович', role: ROLE_HEAD, phones: ['8702 658 7150'], email: 'Akmolinskaya_g@mail.ru', lat: 45.0, lng: 78.37,
  },
  {
    id: 'borovoe',
    name: { ru: 'Боровское', kz: 'Бурабай', en: 'Borovoye' },
    region: { ru: 'Акмолинская область', kz: 'Ақмола облысы', en: 'Akmola region' },
    address: { ru: 'Акмолинская область, Бурабайский район, п. Сарыбулак, ул. Жайлау, 30', kz: 'Ақмола облысы, Бурабай ауданы, Сарыбұлақ кенті, Жайлау к-сі, 30', en: 'Akmola region, Burabay district, Sarybulak settlement, Zhailau St. 30' },
    head: 'Загоруйко Виктор Викторович', role: ROLE_HEAD, phones: ['8771 255 7182', '8 716 367 30 40'], email: 'zvv.999@mail.ru', lat: 53.08, lng: 70.30,
  },
  {
    id: 'bukebay',
    name: { ru: 'Букебайское', kz: 'Бөкебай', en: 'Bukebay' },
    region: { ru: 'Абайская область', kz: 'Абай облысы', en: 'Abai region' },
    address: { ru: 'Абайская область, Бескарагайский район, п. Букебай, ул. Черемуховая, 15', kz: 'Абай облысы, Бесқарағай ауданы, Бөкебай кенті, Черемуховая к-сі, 15', en: 'Abai region, Beskaragay district, Bukebay settlement, Cheremukhovaya St. 15' },
    head: 'Мусин Сапарбек', role: ROLE_APS, phones: ['87716247699'], email: 'bukebai@aviales.kz', lat: 50.9, lng: 78.3,
  },
  {
    id: 'borodulikha',
    name: { ru: 'Бородулихинское', kz: 'Бородулиха', en: 'Borodulikha' },
    region: { ru: 'Абайская область', kz: 'Абай облысы', en: 'Abai region' },
    address: { ru: 'Абайская область, Бородулихинский район, п. Бородулиха, ул. Лесхоз, 54', kz: 'Абай облысы, Бородулиха ауданы, Бородулиха кенті, Лесхоз к-сі, 54', en: 'Abai region, Borodulikha district, Borodulikha settlement, Leskhoz St. 54' },
    head: 'Лебединский Александр Петрович', role: ROLE_HEAD, phones: ['87053181750', '8 723 51 2 44 43'], email: 'lebedinskaya_1973@mail.ru', lat: 50.72, lng: 80.90,
  },
  {
    id: 'zhambyl',
    name: { ru: 'Жамбылское', kz: 'Жамбыл', en: 'Zhambyl' },
    region: { ru: 'Жамбылская область', kz: 'Жамбыл облысы', en: 'Zhambyl region' },
    address: { ru: 'Жамбылская область, Мойынкумский район, п. Мойынкум, ул. Куанышбаева, 33', kz: 'Жамбыл облысы, Мойынқұм ауданы, Мойынқұм кенті, Қуанышбаев к-сі, 33', en: 'Zhambyl region, Moyynkum district, Moyynkum settlement, Kuanyshbayev St. 33' },
    head: 'Дандыбаев Ермек', role: ROLE_HEAD, phones: ['87471367236'], email: 'jambyl@aviales.kz', lat: 44.27, lng: 72.94,
  },
  {
    id: 'katonkaragay',
    name: { ru: 'Катон-Карагайское', kz: 'Катонқарағай', en: 'Katon-Karagay' },
    region: { ru: 'ВКО', kz: 'ШҚО', en: 'East Kazakhstan' },
    address: { ru: 'ВКО, Катон-Карагайский район, с. Катон-Карагай, аэропорт', kz: 'ШҚО, Катонқарағай ауданы, Катонқарағай ауылы, әуежай', en: 'East Kazakhstan, Katon-Karagay district, Katon-Karagay village, airport' },
    head: 'Василков В. В.', role: ROLE_HEAD, phones: ['8 705 499 1117'], email: 'avialesvko@mail.ru', lat: 49.17, lng: 85.61,
  },
  {
    id: 'bayanaul',
    name: { ru: 'Баянаульское', kz: 'Баянауыл', en: 'Bayanaul' },
    region: { ru: 'Павлодарская область', kz: 'Павлодар облысы', en: 'Pavlodar region' },
    address: { ru: 'Павлодарская область, Баянаульский район, п. Кардон Жасыбай', kz: 'Павлодар облысы, Баянауыл ауданы, Жасыбай Кордоны кенті', en: 'Pavlodar region, Bayanaul district, Zhasybay Cordon settlement' },
    head: 'Сатпаев Жасулан', role: ROLE_HEAD, phones: ['8 707 268 1626', '8 718 40 9 07 71'], email: 'bayanaul@aviales.kz', lat: 50.78, lng: 75.70,
  },
  {
    id: 'kokshetau',
    name: { ru: 'Кокшетауское', kz: 'Көкшетау', en: 'Kokshetau' },
    region: { ru: 'Акмолинская область', kz: 'Ақмола облысы', en: 'Akmola region' },
    address: { ru: 'Акмолинская область, Зерендинский район, с. Красный Кардон, ул. Орталык, 62', kz: 'Ақмола облысы, Зеренді ауданы, Красный Кордон ауылы, Орталық к-сі, 62', en: 'Akmola region, Zerendi district, Krasny Kordon village, Ortalyk St. 62' },
    head: 'Умаров Ренат Сеилханович', role: ROLE_HEAD, phones: ['8777 480 8217', '8 716 32 25500'], email: 'Kokshetau@aviales.kz', lat: 52.9, lng: 69.1,
  },
  {
    id: 'akmola',
    name: { ru: 'Акмолинское', kz: 'Ақмола', en: 'Akmola' },
    region: { ru: 'Акмолинская область', kz: 'Ақмола облысы', en: 'Akmola region' },
    address: { ru: 'Акмолинская область, Аккольский район, г. Акколь, ул. Береговая, 104', kz: 'Ақмола облысы, Ақкөл ауданы, Ақкөл қ., Береговая к-сі, 104', en: 'Akmola region, Akkol district, Akkol, Beregovaya St. 104' },
    head: 'Лесной Николай Николаевич', role: ROLE_HEAD, phones: ['87719936173'], email: 'nikolailesnoi1@bk.ru', lat: 51.99, lng: 70.94,
  },
  {
    id: 'turkestan',
    name: { ru: 'Туркестанское', kz: 'Түркістан', en: 'Turkestan' },
    region: { ru: 'Туркестанская область', kz: 'Түркістан облысы', en: 'Turkestan region' },
    address: { ru: 'Туркестанская область, Тюлькубасский район, с.о. Жабаглынский, с. Жабаглы, кв. 106 (уч. 532)', kz: 'Түркістан облысы, Түлкібас ауданы, Жабағлы а.о., Жабағлы ауылы, 106-кв. (532-уч.)', en: 'Turkestan region, Tulkubas district, Zhabagly rural okrug, Zhabagly village, block 106 (plot 532)' },
    head: 'Тулепбергенов Бауржан', role: ROLE_HEAD, phones: ['87005588242'], email: 'turkesran@aviales.kz', lat: 42.4, lng: 70.46,
  },
  {
    id: 'zhasyl',
    name: { ru: '«Жасыл Аймак»', kz: '«Жасыл Аймақ»', en: '«Zhasyl Aimak»' },
    region: { ru: 'Акмолинская область', kz: 'Ақмола облысы', en: 'Akmola region' },
    address: { ru: 'Акмолинская область, Целиноградский район, с. Шубар, Кызылжарское лесничество, кв. №79, выдел 73', kz: 'Ақмола облысы, Целиноград ауданы, Шұбар ауылы, Қызылжар орманшылығы, №79-кв., 73-бөлік', en: 'Akmola region, Tselinograd district, Shubar village, Kyzylzhar forestry, block No. 79, compartment 73' },
    head: 'Абдрахманов Дастан Сагындыкович', role: ROLE_NORTH, phones: ['8 705 781 1132'], email: 'zhasyla@list.ru', lat: 51.0, lng: 71.3,
  },
  {
    id: 'zko',
    name: { ru: 'Западно-Казахстанское', kz: 'Батыс Қазақстан', en: 'West Kazakhstan' },
    region: { ru: 'Западно-Казахстанская область', kz: 'Батыс Қазақстан облысы', en: 'West Kazakhstan region' },
    address: { ru: 'ЗКО, Акжаикский район, с.о. Чапаевский, с. Чапаев, ул. О. Исаева, уч. 131', kz: 'БҚО, Ақжайық ауданы, Чапаев а.о., Чапаев ауылы, О. Исаев к-сі, 131-уч.', en: 'West Kazakhstan, Akzhaik district, Chapaev rural okrug, Chapaev village, O. Isayev St., plot 131' },
    head: 'Мурат Газымжан', role: ROLE_HEAD, phones: ['87002150538'], email: 'zapadaviales@qmail.com', lat: 50.2, lng: 51.15,
  },
];
