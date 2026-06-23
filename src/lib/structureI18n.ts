// Переводы для оргструктуры (KZ/EN). Ключ — русский исходник.
// Если перевода нет — показывается русский текст.

type TL = { kz: string; en: string };

export const DICT: Record<string, TL> = {
  // Руководство и блоки
  'Генеральный директор': { kz: 'Бас директор', en: 'General Director' },
  'Заместитель генерального директора': { kz: 'Бас директордың орынбасары', en: 'Deputy General Director' },
  'административно-хозяйственный блок': { kz: 'әкімшілік-шаруашылық блок', en: 'administrative & support unit' },
  'авиационный блок': { kz: 'авиациялық блок', en: 'aviation unit' },

  // Отделы
  'Главный бухгалтер': { kz: 'Бас бухгалтер', en: 'Chief accountant' },
  'Отдел государственных закупок': { kz: 'Мемлекеттік сатып алу бөлімі', en: 'Public procurement department' },
  'Отдел по работе с персоналом': { kz: 'Кадрмен жұмыс бөлімі', en: 'HR department' },
  'Главный экономист': { kz: 'Бас экономист', en: 'Chief economist' },
  'Офицер-комплаенс': { kz: 'Комплаенс-офицер', en: 'Compliance officer' },
  'Отдел административно-хозяйственной службы': { kz: 'Әкімшілік-шаруашылық қызмет бөлімі', en: 'Administrative & maintenance department' },
  'Юридический отдел': { kz: 'Заң бөлімі', en: 'Legal department' },
  'Главный механик': { kz: 'Бас механик', en: 'Chief mechanic' },
  'Инженер-программист': { kz: 'Инженер-бағдарламашы', en: 'Software engineer' },
  'Инженер ОТ и ТБ': { kz: 'ЕҚ және ҚТ инженері', en: 'OSH engineer' },
  'Менеджер-контент': { kz: 'Контент-менеджер', en: 'Content manager' },
  'Менеджер': { kz: 'Менеджер', en: 'Manager' },

  // Службы и звенья
  'Лётно-производственная служба': { kz: 'Ұшу-өндірістік қызмет', en: 'Flight & Production Service' },
  'Республиканская диспетчерская служба': { kz: 'Республикалық диспетчерлік қызмет', en: 'Republican Dispatch Service' },
  'Северное авиационное звено': { kz: 'Солтүстік авиациялық буын', en: 'Northern Air Unit' },
  'Восточное авиационное звено': { kz: 'Шығыс авиациялық буын', en: 'Eastern Air Unit' },

  // Авиаотделения
  'Алматинское авиационное отделение': { kz: 'Алматы авиациялық бөлімшесі', en: 'Almaty Aviation Branch' },
  'Талдыкорганское авиационное отделение': { kz: 'Талдықорған авиациялық бөлімшесі', en: 'Taldykorgan Aviation Branch' },
  'Жамбылское авиационное отделение': { kz: 'Жамбыл авиациялық бөлімшесі', en: 'Zhambyl Aviation Branch' },
  'Туркестанское авиационное отделение': { kz: 'Түркістан авиациялық бөлімшесі', en: 'Turkestan Aviation Branch' },
  'Западно-Казахстанское авиационное отделение': { kz: 'Батыс Қазақстан авиациялық бөлімшесі', en: 'West Kazakhstan Aviation Branch' },
  'Акмолинское авиационное отделение': { kz: 'Ақмола авиациялық бөлімшесі', en: 'Akmola Aviation Branch' },
  'Боровское авиационное отделение': { kz: 'Бурабай авиациялық бөлімшесі', en: 'Borovoye Aviation Branch' },
  'Каркаралинское авиационное отделение': { kz: 'Қарқаралы авиациялық бөлімшесі', en: 'Karkaraly Aviation Branch' },
  'Кокшетауское авиационное отделение': { kz: 'Көкшетау авиациялық бөлімшесі', en: 'Kokshetau Aviation Branch' },
  'Костанайское авиационное отделение': { kz: 'Қостанай авиациялық бөлімшесі', en: 'Kostanay Aviation Branch' },
  'Авиационное отделение «Жасыл Аймак»': { kz: '«Жасыл Аймақ» авиациялық бөлімшесі', en: '«Zhasyl Aimak» Aviation Branch' },
  'Усть-Каменогорское авиационное отделение': { kz: 'Өскемен авиациялық бөлімшесі', en: 'Ust-Kamenogorsk Aviation Branch' },
  'Букебайское авиационное отделение': { kz: 'Бөкебай авиациялық бөлімшесі', en: 'Bukebay Aviation Branch' },
  'Бородулихинское авиационное отделение': { kz: 'Бородулиха авиациялық бөлімшесі', en: 'Borodulikha Aviation Branch' },
  'Риддерское авиационное отделение': { kz: 'Риддер авиациялық бөлімшесі', en: 'Ridder Aviation Branch' },
  'Катон-Карагайское авиационное отделение': { kz: 'Катонқарағай авиациялық бөлімшесі', en: 'Katon-Karagay Aviation Branch' },
  'Павлодарское авиационное отделение': { kz: 'Павлодар авиациялық бөлімшесі', en: 'Pavlodar Aviation Branch' },
  'Баянаульское авиационное отделение': { kz: 'Баянауыл авиациялық бөлімшесі', en: 'Bayanaul Aviation Branch' },

  // Должности
  'Бухгалтер': { kz: 'Бухгалтер', en: 'Accountant' },
  'Руководитель': { kz: 'Басшы', en: 'Head' },
  'Менеджер гос. закупок': { kz: 'Мемлекеттік сатып алу менеджері', en: 'Procurement manager' },
  'Переводчик': { kz: 'Аудармашы', en: 'Translator' },
  'Инспектор по кадрам': { kz: 'Кадр инспекторы', en: 'HR inspector' },
  'Архивариус': { kz: 'Мұрағатшы', en: 'Archivist' },
  'Экономист': { kz: 'Экономист', en: 'Economist' },
  'Инженер по снабжению': { kz: 'Жабдықтау инженері', en: 'Supply engineer' },
  'Уборщик помещений': { kz: 'Үй-жай тазалаушысы', en: 'Cleaner' },
  'Дворник': { kz: 'Аула сыпырушысы', en: 'Yard keeper' },
  'Юрист': { kz: 'Заңгер', en: 'Lawyer' },
  'Механик': { kz: 'Механик', en: 'Mechanic' },
  'Слесарь по ремонту автомашин': { kz: 'Автокөлік жөндеу слесарі', en: 'Vehicle repair mechanic' },
  'Водитель': { kz: 'Жүргізуші', en: 'Driver' },
  'Начальник ЛПС': { kz: 'ЛПС бастығы', en: 'Head of LPS' },
  'Инженер-инспектор': { kz: 'Инженер-инспектор', en: 'Engineer-inspector' },
  'Начальник РДС': { kz: 'РДС бастығы', en: 'Head of RDS' },
  'Диспетчер РДС': { kz: 'РДС диспетчері', en: 'RDS dispatcher' },
  'Командир авиационного звена': { kz: 'Авиабуын командирі', en: 'Air unit commander' },
  'Начальник ав/о': { kz: 'Авиабөлімше бастығы', en: 'Branch head' },
  'Лётчик-наблюдатель': { kz: 'Ұшқыш-бақылаушы', en: 'Observer pilot' },
  'Инструктор АПГ': { kz: 'АПГ нұсқаушысы', en: 'APG instructor' },
  'Инструктор АПС': { kz: 'АПС нұсқаушысы', en: 'APS instructor' },
  'Инспектор ЛПС': { kz: 'ЛПС инспекторы', en: 'LPS inspector' },
  'Десантник-пожарный': { kz: 'Парашютист-өрт сөндіруші', en: 'Firefighter-paratrooper' },
  'Диспетчер РДП': { kz: 'РДП диспетчері', en: 'RDP dispatcher' },
  'Радиооператор': { kz: 'Радиооператор', en: 'Radio operator' },
  'Сторож': { kz: 'Күзетші', en: 'Watchman' },
};

export function tx(ru: string, locale: string): string {
  if (locale === 'ru') return ru;
  const e = DICT[ru];
  if (!e) return ru;
  return locale === 'kz' ? e.kz : locale === 'en' ? e.en : ru;
}

// «всего N ед.»
export function totalLabel(total: string, locale: string): string {
  if (locale === 'kz') return `барлығы ${total} бірлік`;
  if (locale === 'en') return `total ${total} units`;
  return `всего ${total} ед.`;
}

// Подписи интерфейса
export const OC_UI: Record<'ru' | 'kz' | 'en', Record<string, string>> = {
  ru: { less: '− Меньше', more: 'Больше +', fit: 'По ширине', print: 'Печать / PDF', leadership: 'Руководство', deputies: 'Заместители', services: 'Службы и звенья', branches: 'Авиаотделения', depts: 'Отделы' },
  kz: { less: '− Кішірейту', more: 'Үлкейту +', fit: 'Еніне сай', print: 'Басып шығару / PDF', leadership: 'Басшылық', deputies: 'Орынбасарлар', services: 'Қызметтер мен буындар', branches: 'Авиабөлімшелер', depts: 'Бөлімдер' },
  en: { less: '− Zoom out', more: 'Zoom in +', fit: 'Fit width', print: 'Print / PDF', leadership: 'Management', deputies: 'Deputies', services: 'Services & units', branches: 'Aviation branches', depts: 'Departments' },
};
