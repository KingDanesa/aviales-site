'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type L = { ru: string; kz: string; en: string };

// ─────────────────────────────────────────────────────────────
// Документы. Чтобы поменять название — правь title/subtitle.
// Файлы лежат в public/anticorruption/ (скачиваются по клику).
// Названия документов — их официальные имена, не переводятся.
// ─────────────────────────────────────────────────────────────
type Doc = { title: string; subtitle: string; file: string };

const docsRu: Doc[] = [
  { title: 'Положение о противодействии коррупции', subtitle: 'PDF', file: 'polozhenie-ru.pdf' },
  { title: 'Антикоррупционная политика', subtitle: 'PDF', file: 'politika-ru.pdf' },
  { title: 'Политика уведомления о коррупционных правонарушениях', subtitle: 'PDF', file: 'politika-uvedomleniya-ru.pdf' },
  { title: 'Правила по противодействию коррупции', subtitle: 'PDF', file: 'pravila-ru.pdf' },
  { title: 'Кодекс деловой этики', subtitle: 'PDF', file: 'kodeks-ru.pdf' },
];

const docsKz: Doc[] = [
  { title: 'Сыбайлас жемқорлыққа қарсы саясат', subtitle: 'PDF', file: 'sayasat-kz.pdf' },
  { title: 'Іскерлік этика кодексі', subtitle: 'PDF', file: 'kodeks-kz.pdf' },
  { title: 'Стандарт', subtitle: 'PDF', file: 'standart-kz.pdf' },
  { title: 'Нұсқаулық', subtitle: 'PDF', file: 'nusqaulyq-kz.pdf' },
];

const principles: { icon: string; title: L; text: L }[] = [
  {
    icon: '🚫',
    title: { ru: 'Нулевая терпимость', kz: 'Нөлдік төзімділік', en: 'Zero tolerance' },
    text: {
      ru: 'Любые проявления коррупции недопустимы независимо от должности, статуса и обстоятельств.',
      kz: 'Сыбайлас жемқорлықтың кез келген көрінісі лауазымға, мәртебеге және жағдайға қарамастан жол берілмейді.',
      en: 'Any manifestation of corruption is unacceptable regardless of position, status or circumstances.',
    },
  },
  {
    icon: '⚖️',
    title: { ru: 'Законность', kz: 'Заңдылық', en: 'Legality' },
    text: {
      ru: 'Деятельность предприятия строится в строгом соответствии с законодательством Республики Казахстан.',
      kz: 'Кәсіпорынның қызметі Қазақстан Республикасының заңнамасына қатаң сәйкестікте құрылады.',
      en: 'The enterprise operates in strict compliance with the legislation of the Republic of Kazakhstan.',
    },
  },
  {
    icon: '🔍',
    title: { ru: 'Прозрачность', kz: 'Ашықтық', en: 'Transparency' },
    text: {
      ru: 'Открытость процедур, закупок и принятия решений, исключающая конфликт интересов.',
      kz: 'Рәсімдердің, сатып алулардың және шешім қабылдаудың ашықтығы, мүдделер қақтығысын болдырмайды.',
      en: 'Openness of procedures, procurement and decision-making that excludes conflicts of interest.',
    },
  },
  {
    icon: '🛡️',
    title: { ru: 'Защита заявителей', kz: 'Хабарлаушыларды қорғау', en: 'Protection of whistleblowers' },
    text: {
      ru: 'Лицам, сообщившим о фактах коррупции, гарантируется конфиденциальность и защита от преследования.',
      kz: 'Сыбайлас жемқорлық фактілері туралы хабарлаған адамдарға құпиялылық және қудалаудан қорғау кепілдендіріледі.',
      en: 'Persons who report corruption are guaranteed confidentiality and protection from persecution.',
    },
  },
];

const T = {
  orgName: { ru: 'РГКП «Казавиалесоохрана»', kz: '«Казавиалесоохрана» РМҚК', en: 'RGKP «Kazavialesookhrana»' },
  intro1: {
    ru: 'РГКП «Казавиалесоохрана» придерживается принципа нулевой терпимости к любым проявлениям коррупции. Предприятие последовательно реализует меры по предупреждению и противодействию коррупции в соответствии с Законом Республики Казахстан «О противодействии коррупции» и внутренними антикоррупционными документами.',
    kz: '«Казавиалесоохрана» РМҚК сыбайлас жемқорлықтың кез келген көріністеріне нөлдік төзімділік қағидатын ұстанады. Кәсіпорын Қазақстан Республикасының «Сыбайлас жемқорлыққа қарсы іс-қимыл туралы» Заңына және ішкі сыбайлас жемқорлыққа қарсы құжаттарға сәйкес сыбайлас жемқорлықтың алдын алу және оған қарсы іс-қимыл жөніндегі шараларды дәйекті түрде іске асырады.',
    en: 'RGKP «Kazavialesookhrana» maintains a policy of zero tolerance toward any manifestation of corruption. The enterprise consistently implements measures to prevent and counter corruption in accordance with the Law of the Republic of Kazakhstan “On Combating Corruption” and its internal anti-corruption documents.',
  },
  intro2: {
    ru: 'Работники предприятия обязаны соблюдать требования антикоррупционного законодательства, не допускать конфликта интересов и незамедлительно сообщать о ставших известными фактах коррупционных правонарушений.',
    kz: 'Кәсіпорын қызметкерлері сыбайлас жемқорлыққа қарсы заңнама талаптарын сақтауға, мүдделер қақтығысына жол бермеуге және белгілі болған сыбайлас жемқорлық құқық бұзушылықтары туралы дереу хабарлауға міндетті.',
    en: 'Employees of the enterprise are obliged to comply with anti-corruption legislation, avoid conflicts of interest, and immediately report any known facts of corruption offences.',
  },
  reportBadge: { ru: 'Сообщить о коррупции', kz: 'Сыбайлас жемқорлық туралы хабарлау', en: 'Report corruption' },
  reportHeading: { ru: 'Столкнулись с фактом коррупции?', kz: 'Сыбайлас жемқорлық фактісіне тап болдыңыз ба?', en: 'Encountered an act of corruption?' },
  reportDesc: {
    ru: 'Сообщите о коррупционном правонарушении. Обращения рассматриваются конфиденциально, заявителю гарантируется защита в соответствии с законодательством Республики Казахстан.',
    kz: 'Сыбайлас жемқорлық құқық бұзушылығы туралы хабарлаңыз. Өтініштер құпия түрде қаралады, өтініш берушіге Қазақстан Республикасының заңнамасына сәйкес қорғау кепілдендіріледі.',
    en: 'Report a corruption offence. Appeals are handled confidentially, and the applicant is guaranteed protection in accordance with the legislation of the Republic of Kazakhstan.',
  },
  callCenter: { ru: 'Единый call-центр', kz: 'Бірыңғай call-орталық', en: 'Unified call center' },
  agency: {
    ru: 'Агентство РК по противодействию коррупции',
    kz: 'ҚР Сыбайлас жемқорлыққа қарсы іс-қимыл агенттігі',
    en: 'Anti-Corruption Agency of the Republic of Kazakhstan',
  },
  freeCall: { ru: 'Звонок бесплатный, по всему Казахстану', kz: 'Қоңырау тегін, Қазақстан бойынша', en: 'Free call across Kazakhstan' },
  enterpriseLabel: { ru: 'Обращение в предприятие', kz: 'Кәсіпорынға өтініш', en: 'Contact the enterprise' },
  enterpriseText: {
    ru: 'Направьте сообщение руководству РГКП «Казавиалесоохрана» через форму обратной связи.',
    kz: '«Казавиалесоохрана» РМҚК басшылығына кері байланыс нысаны арқылы хабарлама жіберіңіз.',
    en: 'Send a message to the management of RGKP «Kazavialesookhrana» via the feedback form.',
  },
  writeBtn: { ru: 'Написать обращение →', kz: 'Өтініш жазу →', en: 'Send a message →' },
  docsTitle: { ru: 'Антикоррупционные документы', kz: 'Сыбайлас жемқорлыққа қарсы құжаттар', en: 'Anti-corruption documents' },
  docsHint: { ru: 'Нажмите на документ, чтобы скачать (PDF)', kz: 'Жүктеп алу үшін құжатты басыңыз (PDF)', en: 'Click a document to download (PDF)' },
  groupRu: { ru: 'На русском языке', kz: 'Орыс тілінде', en: 'In Russian' },
  groupKz: { ru: 'На казахском языке', kz: 'Қазақ тілінде', en: 'In Kazakh' },
};

function DocCard({ doc }: { doc: Doc }) {
  return (
    <a
      href={`/anticorruption/${doc.file}`}
      download
      className="group flex items-center gap-4 bg-white border border-border rounded-lg p-4 md:p-5 no-underline hover:border-forest hover:shadow-md transition-all"
    >
      <span className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-[13px] font-extrabold tracking-wide shrink-0">
        PDF
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[14.5px] font-bold text-forest leading-snug group-hover:text-amber-dark transition-colors">{doc.title}</span>
        <span className="block text-[12px] text-text-dim mt-0.5">{doc.subtitle}</span>
      </span>
      <span className="shrink-0 w-9 h-9 rounded-full bg-sky text-forest flex items-center justify-center text-[16px] group-hover:bg-forest group-hover:text-white transition-colors">
        ↓
      </span>
    </a>
  );
}

export default function AntiCorruptionPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  const L = (o: L) => o[(locale as 'ru' | 'kz' | 'en')] ?? o.ru;

  return (
    <>
      {/* Hero */}
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.anticorruption')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.08] max-w-[820px] relative z-[1]">{t('nav.anticorruption')}</h1>
        <p className="mt-3 text-[15px] text-white/55 relative z-[1]">{L(T.orgName)}</p>
      </div>

      <div className="max-w-[920px] mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col gap-6">
          {/* Вступление */}
          <section className="bg-white border border-border rounded-xl p-7 md:p-8 shadow-sm reveal from-bottom">
            <p className="text-[15px] text-text-mid leading-[1.85]">{L(T.intro1)}</p>
            <p className="text-[15px] text-text-mid leading-[1.85] mt-3">{L(T.intro2)}</p>
          </section>

          {/* Принципы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-stagger">
            {principles.map((p, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-11 h-11 rounded-lg bg-sky flex items-center justify-center text-xl shrink-0">{p.icon}</span>
                  <h3 className="text-[16px] font-extrabold text-forest leading-tight">{L(p.title)}</h3>
                </div>
                <p className="text-[13.5px] text-text-mid leading-[1.7]">{L(p.text)}</p>
              </div>
            ))}
          </div>

          {/* Сообщить о факте коррупции */}
          <section className="rounded-xl p-8 md:p-9 bg-gradient-to-br from-forest to-forest-mid text-white relative overflow-hidden reveal from-bottom">
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/[0.05]" />
            <span className="inline-block bg-amber text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 relative z-[1]">{L(T.reportBadge)}</span>
            <h2 className="text-[20px] md:text-[24px] font-extrabold mb-3 relative z-[1]">{L(T.reportHeading)}</h2>
            <p className="text-[14.5px] text-white/80 leading-[1.85] mb-6 relative z-[1] max-w-[640px]">{L(T.reportDesc)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-[1]">
              <div className="bg-white/[0.08] border border-white/15 rounded-lg p-5">
                <div className="text-[11px] text-white/50 font-bold tracking-widest uppercase mb-1">{L(T.callCenter)}</div>
                <div className="text-[12.5px] text-white/70 mb-2">{L(T.agency)}</div>
                <a href="tel:1424" className="inline-flex items-center gap-2 text-[26px] font-extrabold text-white no-underline hover:text-amber transition-colors leading-none">
                  📞 1424
                </a>
                <div className="text-[11px] text-white/40 mt-1.5">{L(T.freeCall)}</div>
              </div>
              <div className="bg-white/[0.08] border border-white/15 rounded-lg p-5 flex flex-col">
                <div className="text-[11px] text-white/50 font-bold tracking-widest uppercase mb-1">{L(T.enterpriseLabel)}</div>
                <div className="text-[12.5px] text-white/70 mb-3 flex-1">{L(T.enterpriseText)}</div>
                <Link href="/contacts" className="inline-flex items-center justify-center gap-2 bg-amber text-white text-[12.5px] font-bold tracking-wide uppercase px-5 py-2.5 rounded-sm no-underline hover:bg-amber-dark transition-colors">
                  {L(T.writeBtn)}
                </Link>
              </div>
            </div>
          </section>

          {/* Документы */}
          <section className="bg-sky border border-border rounded-xl p-7 md:p-8 reveal from-bottom">
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0 shadow-sm">📂</span>
              <div>
                <h2 className="text-[19px] md:text-[21px] font-extrabold text-forest leading-snug">{L(T.docsTitle)}</h2>
                <p className="text-[13px] text-text-dim mt-0.5">{L(T.docsHint)}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] font-bold tracking-widest uppercase text-text-dim mb-3">{L(T.groupRu)}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {docsRu.map((d, i) => <DocCard key={i} doc={d} />)}
              </div>
            </div>

            <div className="mt-7">
              <div className="text-[11px] font-bold tracking-widest uppercase text-text-dim mb-3">{L(T.groupKz)}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {docsKz.map((d, i) => <DocCard key={i} doc={d} />)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
