'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Branch = {
  name: string;
  region: string;
  address: string;
  head?: string;
  role?: string;
  phones?: string[];
  email?: string;
};

// Авиационные отделения РГКП «Казавиалесоохрана» (18) с начальниками и контактами.
const branches: Branch[] = [
  { name: 'Алматинское', region: 'г. Алматы', address: 'г. Алматы, Наурызбайский район, ул. Мереке, 24', head: 'Байшалов Бекзат Ерденович', role: 'Начальник авиаотделения', phones: ['8708 338 6812', '8771 993 6143'], email: 'Almaty@aviales.kz' },
  { name: 'Усть-Каменогорское', region: 'ВКО', address: 'г. Усть-Каменогорск, ул. Тохтарова, 40/1, офис 307', head: 'Лесной Юрий Николаевич', role: 'Начальник авиаотделения', phones: ['87774118685'], email: 'avialesvko@mail.ru' },
  { name: 'Костанайское', region: 'Костанайская область', address: 'Костанайская область, Ауликольский район, с. Лесное, Семиозерное ГУ, Калининское лесничество, кв. 109', head: 'Тенизов Арман Бекжанович', role: 'Начальник авиаотделения', phones: ['87776060616'], email: 'tenk2@mail.ru' },
  { name: 'Риддерское', region: 'ВКО, Риддер', address: 'ВКО, г. Риддер, ул. Полевая, 181а', head: 'Кузьмин Михаил Анатольевич', role: 'Инструктор АПГ', phones: ['8705 417 4701', '8 723 36 3 02 99'], email: 'mihailkuzmin1982@mail.ru' },
  { name: 'Павлодарское', region: 'Павлодарская область', address: 'Павлодарская область, Щербактинский район, п. Шалдай, ул. Жамбыла, 8', head: 'Шайзатхан Шынгысхан', role: 'Начальник авиаотделения', phones: ['8771 993 61 67', '87071961221'], email: 'pavlodar@aviales.kz' },
  { name: 'Каркаралинское', region: 'Карагандинская область', address: 'Карагандинская область, Каркаралинский район, г. Каркаралинск, ГНПП Горное лесничество, кв. 126', head: 'Плотников Тимофей Владимирович', role: 'Начальник авиаотделения', phones: ['87719936141'], email: 'timoha23_ru@mail.ru' },
  { name: 'Талдыкорганское', region: 'Жетысуская область', address: 'Жетысуская область, г. Талдыкорган, ул. Лесная поляна, Кардон №1', head: 'Базарбеков Мурат Кожабекович', role: 'Начальник авиаотделения', phones: ['8702 658 7150'], email: 'Akmolinskaya_g@mail.ru' },
  { name: 'Боровское', region: 'Акмолинская область', address: 'Акмолинская область, Бурабайский район, п. Сарыбулак, ул. Жайлау, 30', head: 'Загоруйко Виктор Викторович', role: 'Начальник авиаотделения', phones: ['8771 255 7182', '8 716 367 30 40'], email: 'zvv.999@mail.ru' },
  { name: 'Букебайское', region: 'Абайская область', address: 'Абайская область, Бескарагайский район, п. Букебай, ул. Черемуховая, 15', head: 'Мусин Сапарбек', role: 'Инструктор АПС', phones: ['87716247699'], email: 'bukebai@aviales.kz' },
  { name: 'Бородулихинское', region: 'Абайская область', address: 'Абайская область, Бородулихинский район, п. Бородулиха, ул. Лесхоз, 54', head: 'Лебединский Александр Петрович', role: 'Начальник авиаотделения', phones: ['87053181750', '8 723 51 2 44 43'], email: 'lebedinskaya_1973@mail.ru' },
  { name: 'Жамбылское', region: 'Жамбылская область', address: 'Жамбылская область, Мойынкумский район, п. Мойынкум, ул. Куанышбаева, 33', head: 'Дандыбаев Ермек', role: 'Начальник авиаотделения', phones: ['87471367236'], email: 'jambyl@aviales.kz' },
  { name: 'Катон-Карагайское', region: 'ВКО', address: 'ВКО, Катон-Карагайский район, с. Катон-Карагай, аэропорт', head: 'Василков В. В.', role: 'Начальник авиаотделения', phones: ['8 705 499 1117'], email: 'avialesvko@mail.ru' },
  { name: 'Баянаульское', region: 'Павлодарская область', address: 'Павлодарская область, Баянаульский район, п. Кардон Жасыбай', head: 'Сатпаев Жасулан', role: 'Начальник авиаотделения', phones: ['8 707 268 1626', '8 718 40 9 07 71'], email: 'bayanaul@aviales.kz' },
  { name: 'Кокшетауское', region: 'Акмолинская область', address: 'Акмолинская область, Зерендинский район, с. Красный Кардон, ул. Орталык, 62', head: 'Умаров Ренат Сеилханович', role: 'Начальник авиаотделения', phones: ['8777 480 8217', '8 716 32 25500'], email: 'Kokshetau@aviales.kz' },
  { name: 'Акмолинское', region: 'Акмолинская область', address: 'Акмолинская область, Аккольский район, г. Акколь, ул. Береговая, 104', head: 'Лесной Николай Николаевич', role: 'Начальник авиаотделения', phones: ['87719936173'], email: 'nikolailesnoi1@bk.ru' },
  { name: 'Туркестанское', region: 'Туркестанская область', address: 'Туркестанская область, Тюлькубасский район, с.о. Жабаглынский, с. Жабаглы, кв. 106 (уч. 532)', head: 'Тулепбергенов Бауржан', role: 'Начальник авиаотделения', phones: ['87005588242'], email: 'turkesran@aviales.kz' },
  { name: '«Жасыл Аймак»', region: 'Акмолинская область', address: 'Акмолинская область, Целиноградский район, с. Шубар, Кызылжарское лесничество, кв. №79, выдел 73', head: 'Абдрахманов Дастан Сагындыкович', role: 'Командир Северного авиазвена', phones: ['8 705 781 1132'], email: 'zhasyla@list.ru' },
  { name: 'Западно-Казахстанское', region: 'Западно-Казахстанская область', address: 'ЗКО, Акжаикский район, с.о. Чапаевский, с. Чапаев, ул. О. Исаева, уч. 131', head: 'Мурат Газымжан', role: 'Начальник авиаотделения', phones: ['87002150538'], email: 'zapadaviales@qmail.com' },
];

export default function BranchesPage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.branches')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.branches')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[620px] leading-relaxed">{t('branchesPage.subtitle')}</p>
      </div>

      <div className="bg-sky px-8 md:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
          {branches.map((b, i) => (
            <div key={i} className="bg-white border border-border p-6 flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-[17px] font-extrabold text-forest leading-tight">{b.name}</div>
                  <div className="text-[11px] text-text-dim font-semibold tracking-wide uppercase mt-1">{b.region}</div>
                </div>
                <span className="w-9 h-9 bg-sky flex items-center justify-center text-base shrink-0">📍</span>
              </div>

              <div className="text-[13px] text-text-mid leading-relaxed mb-4 flex-1">{b.address}</div>

              {b.head && (
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{b.role}</div>
                  <div className="text-[14px] font-bold text-forest mb-2.5">{b.head}</div>
                  <div className="flex flex-col gap-1.5">
                    {b.phones?.map((p, j) => (
                      <a key={j} href={`tel:${p.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest no-underline hover:text-amber-dark">
                        <span className="text-text-dim">📞</span>{p}
                      </a>
                    ))}
                    {b.email && (
                      <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest-light no-underline hover:text-amber-dark break-all">
                        <span className="text-text-dim">✉️</span>{b.email}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
