'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

type L3 = { ru: string; kz: string; en: string };

// ── Раздел «Вид деятельности» (казахский оригинал + перевод RU/EN) ──
const activity = {
  eyebrow: { ru: 'Деятельность', kz: 'Қызмет', en: 'Activity' } as L3,
  title: { ru: 'Вид деятельности', kz: 'Қызмет түрі', en: 'Type of activity' } as L3,
  intro: {
    ru: 'РГКП «Казахская база авиационной охраны лесов и обслуживания лесного хозяйства» (далее — Казавиалесоохрана) в качестве основных видов деятельности осуществляет авиационную охрану лесов от пожаров на территории РК, защиту от болезней и вредителей и обслуживание лесного хозяйства.',
    kz: 'РМҚК «Қазақ ормандарды авиациялық қорғау және орман шаруашылығына қызмет көрсету базасы» (бұдан былай Қазавиаорманқорғау) негізгі қызметінің түрлері ҚР аумағында ормандарды авиациямен өрттен қорғауды жүзеге асырады, аурулар мен зиянкестерден қорғап орман шаруашылығына қызмет көрсетеді.',
    en: 'RSEM «Kazakh Base of Aerial Forest Protection and Forestry Services» (hereinafter — Kazavialesoohrana) carries out, as its principal activities, aerial protection of forests from fire in the territory of Kazakhstan, protection against pests and diseases, and forestry services.',
  } as L3,
  servicesHeader: {
    ru: 'Предприятие Казавиалесоохрана выполняет установленные его уставом виды деятельности, указанные ниже:',
    kz: 'Қазавиаорманқорғау кәсіпорынының жарғысымен белгіленген төменде көрсетілген қызметтерді атқарады:',
    en: 'The Kazavialesoohrana enterprise performs the following activities established by its charter:',
  } as L3,
  services: [
    {
      ru: 'Выявление и пресечение нарушителей лесного законодательства, своевременное обнаружение и оперативное тушение лесных пожаров;',
      kz: 'Орман заңнамаларын бұзушыларды табу және жол бермеу, орман өрттерін уақтылы тауып және қолма-қол өшіру;',
      en: 'Detecting and preventing violations of forest legislation, timely detection and prompt suppression of forest fires;',
    },
    {
      ru: 'Проведение работ по сохранению и охране лесов и особо охраняемых природных территорий;',
      kz: 'Ормандармен ерекше қорғалатын табиғи аумақтарын сақтау және қорғау бойынша жұмыстар жүргізу;',
      en: 'Carrying out work to preserve and protect forests and specially protected natural areas;',
    },
    {
      ru: 'Мониторинг патологического состояния лесов, выполнение авиахимических работ по борьбе с вредителями и болезнями;',
      kz: 'Ормандардың қалыптан ауытқуынан (патология) бақылау жасау, зиянкестер және аурулармен күрес жүргізу бойынша авиахимиялық жұмыстарды орындау;',
      en: 'Monitoring the pathological condition of forests and performing aerochemical work to control pests and diseases;',
    },
    {
      ru: 'Выполнение полётов для нужд лесного, охотничьего хозяйства и особо охраняемых природных территорий;',
      kz: 'Орман, аңшылық және ерекше қорғалатын табиғи аумақтардың қажетіне қарай ұшуларды орындау;',
      en: 'Performing flights for the needs of forestry, hunting management and specially protected natural areas;',
    },
    {
      ru: 'Организация распространения информационно-рекламных материалов в сфере охраны и сохранения лесов от пожаров и животного мира, проведение массовой разъяснительной и агитационной работы среди местного населения;',
      kz: 'Ормандарды өрттен қорғау, сақтау және жануарлар әлемі саласында жарнама ақпарат тарату іс-әрекеттерін ұйымдастыру, жергілікті тұрғындар арасында жаппай үгіт-насихат түсіндіру жұмыстарын жүргізу;',
      en: 'Organizing the distribution of informational and promotional materials in the sphere of forest fire protection, conservation and wildlife, and conducting mass awareness and outreach work among the local population;',
    },
  ] as L3[],
  historyTitle: {
    ru: 'Краткая история создания авиационной охраны лесов в Казахстане',
    kz: 'Қазақстанда авиаорман қорғауды құрудың қысқаша тарихы',
    en: 'A brief history of aerial forest protection in Kazakhstan',
  } as L3,
  history: [
    {
      ru: 'Авиационная охрана лесов в Казахстане началась в 1948 году в трёх наиболее пожароопасных областях: Восточно-Казахстанской, Павлодарской и Семипалатинской. В связи с организацией наземной противопожарной службы (ПХС и другие объекты) авиапатрулирование в Павлодарской и Семипалатинской областях в 1960 году было временно приостановлено. В 1962 году средства, затраченные на авиалесоохрану, составили 52 тысячи рублей. Через два года авиапатрулирование было возобновлено на площади 4,8 млн га. В начале 1970-х годов работы по охране лесов велись на наиболее ценных и пожароопасных хвойных лесах на площади 5,2 млн га силами 11 авиаподразделений с использованием 8 вертолётов Ми-1, одного Ми-2 и двух самолётов Ан-2. Все авиаподразделения подчинялись Западно-Сибирскому авиазвену (Новосибирск). Казахский авиарайон Западно-Сибирской авиабазы, созданной в 1972 году, в то время не мог в полной мере отвечать требованиям и задачам, поставленным перед этой службой. В связи с ростом числа местных жителей, отдыхающих и непрерывного потока посетителей лесов Казахстана, а также из-за недостаточности их экологических знаний, сокращать лесные пожары и их площади имеющимися средствами и силами было крайне трудно, а иногда и вовсе невозможно. Поэтому в 1978 году было принято решение о создании в республике независимой специализированной службы — Казахской базы авиационной охраны лесов (Казавиалесоохрана).',
      kz: 'Қазақстанда авиациамен орман қорғау 1948 жылы өрт қауіптілігі аса күшті үш облыста басталды: ШҚО, Павлодар және Семей. Жерден өртке қарсы қызмет ұйымдастырылуына байланысты (ӨХС және басқа нысандар) авиашолғындау 1960 жылы Павлодар жэне Семей облыстарында уақытша тоқтатылды. 1962 жылы авиаорманқорғауға жұмсалған қаражат 52 мың сом болды. Екі жылдан кейін авиашолғындау 4,8 млн га алқапта қайтадан жаңартылды. 1970 жылдардың басында орман қорғау жұмыстары аса бағалы және өрт қауіптілігі күшті қылқан жапырақты ормандарда 5,2 млн га алқапта 11 авиабөлім күштерімен 8 МИ-1 тіқұшақтарын, бір МИ-2 және екі АН-2 ұшақтарын қолданып жүргізілді. Барлық авиабөлімдер Батыс-Сібір авиазвеносына (Новосибирск) бағынды. 1972 жылы құрылған Батыс-Сібір авиабазасының Қазақ авиауданы сол уақытта осы қызметке қойылған талаптармен міндеттерге толық жауап бере алмады. Жергілікті халықтардың, демалушылардың Қазақстан ормандарына үздіксіз келушілердің саны өсуіне байланысты және олардың экологиялық білімдерінің жеткіліксіздіктерінен орман өрттерін және олардың алқабын қолда бар құралдармен, күштермен азайту төтенше қиын кейде тіптен мүмкін болмады. Сондықтан 1978 жылы Республикада тәуелсіз арнайы қызмет — Қазақтың авиациаменорманқорғау базасын (Қазавиаорманқорғау) құру туралы шешім кабылданды.',
      en: 'Aerial forest protection in Kazakhstan began in 1948 in the three most fire-prone regions: East Kazakhstan, Pavlodar and Semipalatinsk. Following the organization of a ground-based fire service (fire-chemical stations and other facilities), aerial patrolling in the Pavlodar and Semipalatinsk regions was temporarily suspended in 1960. In 1962, the funds spent on aerial forest protection amounted to 52 thousand rubles. Two years later, aerial patrolling was resumed over an area of 4.8 million hectares. In the early 1970s, forest protection was carried out over the most valuable and fire-prone coniferous forests across 5.2 million hectares by 11 aviation units using 8 Mi-1 helicopters, one Mi-2 and two An-2 aircraft. All aviation units were subordinate to the West Siberian air unit (Novosibirsk). The Kazakh air district of the West Siberian air base, established in 1972, could not at that time fully meet the requirements and tasks set for the service. Owing to the growing number of local residents, holidaymakers and the continuous flow of visitors to Kazakhstan’s forests, and their insufficient environmental awareness, reducing forest fires and their extent with the available means was extremely difficult and at times impossible. Therefore, in 1978, a decision was made to establish an independent specialized service in the republic — the Kazakh Base of Aerial Forest Protection (Kazavialesoohrana).',
    },
    {
      ru: 'При массовых лесных пожарах в Алматинской, Талдыкорганской и других областях авиапожарная служба неоднократно демонстрировала высокий уровень организованности и мастерства в борьбе со стихийным огнём в сложнейших условиях.',
      kz: 'Алматы, Талдықорған және басқа облыстарда жаппай орман өрттері тұтанғанда авиаөрт қызметі өте күрделі жағдайда сұрапыл өртпен күресудің жоғары деңгейдегі ұйымшылдық іскерлігін бірнеше рет көрсетті.',
      en: 'During mass forest fires in the Almaty, Taldykorgan and other regions, the aerial firefighting service repeatedly demonstrated a high level of organization and skill in combating wildfire under the most difficult conditions.',
    },
    {
      ru: 'В конце 1980-х годов (1989 г.) 14 авиалесоохранных подразделений (Алматинское, Уральское, Талдыкорганское, Петропавловское, Кокшетауское, Бурабайское, Целиноградское, Карагандинское, Павлодарское, Семипалатинское, Лениногорское, Зыряновское и Катон-Карагайское авиаотделения) охраняли более 6,5 млн га лесов. Для авиапатрулирования и тушения лесных пожаров Казавиалесоохрана арендовала 29 воздушных судов у подразделений Гражданской авиации.',
      kz: '1980 жылдардың аяғында (1989ж.) 14 авиаөрманқорғау бөлімшелерінің (Алматы, Орал, Талдықорған, Петропавл, Көкшетау, Бурабай, Целиноград, Қарағанды, Павлодар, Семей, Ленинагорск, Зырьяновск және Қатон-Қарағай авиабөлімі) 6,5 млн га астам орманды күзетті. Авиашолғындау және орман өрттерін өшіруге Қазавиаорманқорғау Азаматтық авиациа бөлімшелерінен 29 әуе кемесін жалдады.',
      en: 'In the late 1980s (1989), 14 aerial forest protection units (the Almaty, Uralsk, Taldykorgan, Petropavlovsk, Kokshetau, Burabay, Tselinograd, Karaganda, Pavlodar, Semipalatinsk, Leninogorsk, Zyryanovsk and Katon-Karagay air branches) protected more than 6.5 million hectares of forest. For aerial patrolling and forest fire suppression, Kazavialesoohrana leased 29 aircraft from Civil Aviation units.',
    },
    {
      ru: 'К настоящему времени в республике нет ни одной альтернативной организации (фирмы), оказывающей услуги в полном объёме, кроме учреждения «Казавиалесоохрана». Продолжается эксплуатация вертолётов Ми-2, Ми-8, Ми-171 в авиакомпаниях. Казавиалесоохрана переходит к использованию и других типов зарубежных летательных аппаратов — Bell-206, MD-600, EC-120B, BO-105. В связи с распадом Советского Союза и наступившим экономическим кризисом финансирование лесных авиационных работ было сокращено в 8 раз. Это привело к сокращению годового налёта с 7–8 тысяч до 300–2000 часов (с 1985 по 1992 год). С 2003 года по настоящее время налёт стабилен — 6200–9000 часов в год.',
      kz: 'Осы уақытқа барлық жиынтығымен қызмет көрсетудің балама мекемесі (фирма) «Қазавиаорманқорғау» мекемесінен басқа Республикада ешкім жоқ. Авиакомпаниялардағы МИ-2, МИ-8, МИ-171 тік ұшақтарын пайдалану жалғасып жатыр. Қазавиаорманқорғау шет елдік ұшу аппараттарының басқа Белл-206, МD-600, ЕС-120-В, ВО-105 түрлерін пайдалануға көшіп жатыр. Советтер одағының тарқауына байланысты экономикалық дағдарысқа ұшырағандықтан орман авиациалық жұмыстарын қаржыландыру 8 есе қысқартылды. Мұның әсері барлық ұшу сағаттарын жылына 7-8 мыңнан 300-2000 сағатқа дейін қысқартуға әкеліп соқты (1985 жылдан 1992 жылға дейін). 2003 жылдан осы уақытқа дейін ұшу сағаты біркелкі 6200-9000 сағат жылына.',
      en: 'To date, there is no alternative organization (company) in the republic providing the full range of services other than the Kazavialesoohrana institution. The operation of Mi-2, Mi-8 and Mi-171 helicopters in airlines continues. Kazavialesoohrana is transitioning to the use of other types of foreign aircraft — Bell-206, MD-600, EC-120B, BO-105. Owing to the collapse of the Soviet Union and the ensuing economic crisis, funding for forest aviation work was cut eightfold. This reduced annual flight hours from 7,000–8,000 to 300–2,000 (from 1985 to 1992). From 2003 to the present, flight time has remained stable at 6,200–9,000 hours per year.',
    },
    {
      ru: 'Авиационная охрана лесов прочно вошла в практику лесного хозяйства и заняла ведущее место в системе противопожарных мероприятий в лесных районах Казахстана.',
      kz: 'Авиациаменорманқорғау орман шаруашылығы іс-тәжірибесіне берік кірді және Қазақстан орманды аудандарында өртке қарсы шаралар жүйесінде жетекші орын алды.',
      en: 'Aerial forest protection has become firmly established in forestry practice and has taken a leading place in the system of fire-prevention measures in the forest regions of Kazakhstan.',
    },
  ] as L3[],
};

const timeline = [
  { year: '1978', active: true, title: 'Основание Казавиалесоохраны', desc: 'В республике организована самостоятельная специализированная служба — Казахская база авиационной охраны лесов.' },
  { year: '1989', active: false, title: 'Расцвет службы', desc: '14 авиалесоохранных подразделений охраняли более 6,5 млн га лесов.' },
  { year: '2003', active: false, title: 'Восстановление и рост', desc: 'С 2003 года налёты стали стабильными: от 6 200 до 9 000 часов в год.' },
  { year: '2015', active: false, title: 'Модернизация парка', desc: 'Обновление авиационного парка и оснащение современной техникой наблюдения.' },
  { year: '2026', active: true, title: 'Сегодня', desc: '«Казавиалесоохрана» продолжает выполнять миссию по защите лесов Казахстана — 18 авиационных отделений по всей республике.' },
];

const functions = [
  { num: '01', icon: '🔥' },
  { num: '02', icon: '🌲' },
  { num: '03', icon: '🔬' },
  { num: '04', icon: '🚁' },
  { num: '05', icon: '🦌' },
  { num: '06', icon: '📢' },
];

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  const L = (o: L3) => o[(locale as 'ru' | 'kz' | 'en')] ?? o.ru;

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('aboutPage.title')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.05] max-w-[700px] relative z-[1]">{t('aboutPage.title')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed relative z-[1]">{t('aboutPage.subtitle')}</p>
      </div>

      {/* Lead */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 px-8 md:px-14 py-18 items-center">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
            <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.whoWeAre')}
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom" style={{ transitionDelay: '.05s' }}>{t('aboutPage.uniqueService')}</h2>
          <div className="reveal from-bottom" style={{ transitionDelay: '.1s' }}>
            <p className="text-[16px] text-text-mid leading-[1.85] mb-5">{t('aboutSection.p1')}</p>
            <p className="text-[16px] text-text-mid leading-[1.85] mb-5">{t('aboutSection.p2')}</p>
          </div>
        </div>
        <div className="relative reveal from-right">
          <div className="absolute -top-3.5 -right-3.5 bottom-3.5 left-3.5 border border-forest-pale -z-10" />
          <Image src="/gallery/g1.jpg" alt="" width={600} height={450} className="w-full aspect-[4/3] object-cover saturate-[0.85]" />
        </div>
      </div>

      {/* Central office / requisites */}
      <div className="px-8 md:px-14 pb-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border reveal-stagger">
          <div className="bg-white p-8">
            <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg mb-4">🏛️</div>
            <div className="text-[11px] text-text-dim font-bold tracking-widest uppercase mb-2">Юридический адрес</div>
            <div className="text-[14px] text-forest font-semibold leading-relaxed">г. Алматы, мкр Таусамалы, ул. Мереке, 24</div>
          </div>
          <div className="bg-white p-8">
            <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg mb-4">📍</div>
            <div className="text-[11px] text-text-dim font-bold tracking-widest uppercase mb-2">Фактический адрес</div>
            <div className="text-[14px] text-forest font-semibold leading-relaxed">г. Алматы, ул. Абая, 32/2</div>
          </div>
          <div className="bg-white p-8">
            <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg mb-4">📞</div>
            <div className="text-[11px] text-text-dim font-bold tracking-widest uppercase mb-2">Контакты</div>
            <a href="tel:+77273461371" className="block text-[14px] text-forest font-semibold no-underline hover:text-amber-dark">+7 (727) 346-13-71</a>
            <a href="mailto:Airbar@list.ru" className="block text-[14px] text-forest-light font-semibold no-underline hover:text-amber-dark mt-1">Airbar@list.ru</a>
          </div>
        </div>
      </div>

      {/* Вид деятельности + аккордеоны */}
      <div className="px-8 md:px-14 pb-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{L(activity.eyebrow)}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-8 reveal from-bottom">{L(activity.title)}</h2>
        <p className="text-[16px] text-text-mid leading-[1.85] max-w-[900px] mb-8 reveal from-bottom" style={{ transitionDelay: '.05s' }}>{L(activity.intro)}</p>

        <div className="flex flex-col gap-4 max-w-[940px] reveal from-bottom" style={{ transitionDelay: '.1s' }}>
          {/* Аккордеон: услуги по уставу */}
          <details className="group bg-white border border-border rounded-xl overflow-hidden open:shadow-md transition-shadow">
            <summary className="flex items-center justify-between gap-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 md:px-7 py-5 hover:bg-sky transition-colors">
              <span className="text-[15px] md:text-[16px] font-bold text-forest leading-snug">{L(activity.servicesHeader)}</span>
              <span className="shrink-0 w-8 h-8 rounded-full bg-sky text-forest flex items-center justify-center text-[15px] transition-transform duration-300 group-open:rotate-180">▾</span>
            </summary>
            <div className="px-6 md:px-7 pb-7 pt-2 border-t border-border">
              <ul className="flex flex-col gap-3.5 mt-4">
                {activity.services.map((s, i) => (
                  <li key={i} className="flex gap-3.5 text-[14.5px] text-text-mid leading-[1.7]">
                    <span className="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-forest-pale text-forest text-[12px] font-bold flex items-center justify-center">{i + 1}</span>
                    <span>{L(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>

      {/* Functions */}
      <div className="bg-sky px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.functions')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.functionsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border reveal-stagger">
          {functions.map((f, i) => (
            <div key={i} className="bg-white p-8 hover:bg-sky transition-colors">
              <div className="text-[40px] font-extrabold text-forest-pale leading-none mb-3.5 tracking-tight">{f.num}</div>
              <div className="text-[14px] font-bold text-forest mb-2 leading-snug">{t(`services.s${i + 1}_title`)}</div>
              <div className="text-[12.5px] text-text-dim leading-relaxed">{t(`services.s${i + 1}_desc`)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.history')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.historyTitle')}</h2>
        <div className="flex flex-col gap-0 relative mt-10">
          <div className="absolute left-[120px] top-0 bottom-0 w-px bg-border hidden md:block" />
          {timeline.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-8 border-b border-border last:border-b-0 relative reveal from-bottom" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-[26px] font-extrabold text-forest tracking-tight leading-none pt-1">{item.year}</div>
              <div className={`absolute left-[112px] top-[38px] w-[17px] h-[17px] rounded-full border-2 hidden md:block ${item.active ? 'bg-amber border-amber' : 'bg-white border-forest-light'}`} />
              <div>
                <h3 className="text-[15px] font-bold text-forest mb-2">{item.title}</h3>
                <p className="text-[13.5px] text-text-dim leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Аккордеон: краткая история создания */}
        <details className="group mt-8 bg-white border border-border rounded-xl overflow-hidden open:shadow-md transition-shadow max-w-[940px] reveal from-bottom">
          <summary className="flex items-center justify-between gap-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 md:px-7 py-5 hover:bg-sky transition-colors">
            <span className="flex items-center gap-3 text-[15px] md:text-[16px] font-bold text-forest leading-snug">
              <span className="text-[19px]">📜</span>{L(activity.historyTitle)}
            </span>
            <span className="shrink-0 w-8 h-8 rounded-full bg-sky text-forest flex items-center justify-center text-[15px] transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <div className="px-6 md:px-7 pb-7 pt-2 border-t border-border">
            <div className="flex flex-col gap-4 mt-4">
              {activity.history.map((p, i) => (
                <p key={i} className="text-[14.5px] text-text-mid leading-[1.85]">{L(p)}</p>
              ))}
            </div>
          </div>
        </details>
      </div>

      {/* Gallery */}
      <div className="bg-sky px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.gallery')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.galleryTitle')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 reveal-stagger">
          {[
            '/gallery/g2.jpg',
            '/gallery/g3.jpg',
            '/gallery/g4.jpeg',
            '/gallery/g1.jpg',
            '/gallery/g5.jpeg',
            '/gallery/g6.jpg',
            '/gallery/g7.jpg',
          ].map((src, i) => (
            <Image key={i} src={src} alt="" width={300} height={225} className={`w-full aspect-[4/3] object-cover saturate-[0.8] hover:saturate-110 hover:scale-[1.02] transition-all cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : ''}`} />
          ))}
        </div>
      </div>
    </>
  );
}
