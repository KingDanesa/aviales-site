'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type L = { ru: string; kz: string; en: string };

type Section = {
  icon: string;
  title: L;
  paragraphs?: L[];
  warn?: { label: L; items: L[] };
  list?: L[];
  paragraphsAfter?: L[];
};

const sections: Section[] = [
  {
    icon: '📋',
    title: { ru: 'Общие положения', kz: 'Жалпы ережелер', en: 'General provisions' },
    paragraphs: [
      {
        ru: 'Обеспечение охраны труда и безопасности работников является одним из приоритетных направлений деятельности РГКП «Казавиалесоохрана». Предприятие осуществляет авиационную охрану лесов, выполнение авиационных работ, десантирование работников и участие в тушении лесных пожаров, что относится к работам повышенной опасности.',
        kz: 'Еңбекті қорғауды және қызметкерлердің қауіпсіздігін қамтамасыз ету «Казавиалесоохрана» РМҚК қызметінің басым бағыттарының бірі болып табылады. Кәсіпорын ормандарды авиациялық қорғауды, авиациялық жұмыстарды орындауды, қызметкерлерді десанттауды және орман өрттерін сөндіруге қатысуды жүзеге асырады, бұл жоғары қауіптілік жұмыстарына жатады.',
        en: 'Ensuring occupational safety and the protection of workers is one of the priority areas of activity of RGKP «Kazavialesookhrana». The enterprise carries out aerial forest protection, aviation works, deployment of workers and participation in extinguishing forest fires, which are classified as high-risk operations.',
      },
      {
        ru: 'Все производственные задачи выполняются в соответствии с требованиями законодательства Республики Казахстан в области охраны труда, авиационной и пожарной безопасности.',
        kz: 'Барлық өндірістік міндеттер Қазақстан Республикасының еңбекті қорғау, авиациялық және өрт қауіпсіздігі саласындағы заңнама талаптарына сәйкес орындалады.',
        en: 'All operational tasks are carried out in accordance with the requirements of the legislation of the Republic of Kazakhstan in the field of occupational, aviation and fire safety.',
      },
      {
        ru: 'К выполнению работ допускаются работники, прошедшие медицинское освидетельствование, профессиональную подготовку, обучение по охране труда и инструктаж, а также обеспеченные необходимыми средствами индивидуальной защиты.',
        kz: 'Жұмыстарды орындауға медициналық куәландырудан, кәсіптік дайындықтан, еңбекті қорғау бойынша оқытудан және нұсқамадан өткен, сондай-ақ қажетті жеке қорғаныш құралдарымен қамтамасыз етілген қызметкерлер жіберіледі.',
        en: 'Only workers who have passed a medical examination, professional training, occupational safety training and briefing, and who are provided with the necessary personal protective equipment, are permitted to perform the work.',
      },
    ],
  },
  {
    icon: '🛠️',
    title: { ru: 'Организация безопасного выполнения работ', kz: 'Жұмыстарды қауіпсіз орындауды ұйымдастыру', en: 'Organization of safe work' },
    paragraphs: [
      {
        ru: 'Перед началом работ проводится проверка технического состояния оборудования, инструмента, спускового и противопожарного снаряжения, средств связи и индивидуальной защиты. Работник обязан убедиться в безопасности рабочего места и выполнять только те работы, к которым он допущен.',
        kz: 'Жұмыс басталар алдында жабдықтың, құрал-саймандардың, түсіру және өртке қарсы жарақтардың, байланыс және жеке қорғаныш құралдарының техникалық жай-күйі тексеріледі. Қызметкер жұмыс орнының қауіпсіздігіне көз жеткізуге және өзі рұқсат етілген жұмыстарды ғана орындауға міндетті.',
        en: 'Before starting work, the technical condition of equipment, tools, descent and fire-fighting gear, communication and personal protective equipment is checked. The worker must ensure the safety of the workplace and perform only the work they are authorized to do.',
      },
      {
        ru: 'В процессе работы необходимо соблюдать установленный технологический процесс, требования инструкций по охране труда и распоряжения руководителя работ. Использование неисправного оборудования и нарушение требований безопасности не допускаются.',
        kz: 'Жұмыс барысында белгіленген технологиялық процесті, еңбекті қорғау жөніндегі нұсқаулықтардың талаптарын және жұмыс жетекшісінің өкімдерін сақтау қажет. Ақаулы жабдықты пайдалануға және қауіпсіздік талаптарын бұзуға жол берілмейді.',
        en: 'During work, the established technological process, occupational safety instructions and the orders of the work supervisor must be observed. The use of faulty equipment and violation of safety requirements are not permitted.',
      },
      {
        ru: 'По окончании работ оборудование приводится в безопасное состояние, выявленные неисправности подлежат обязательному докладу ответственным должностным лицам.',
        kz: 'Жұмыс аяқталғаннан кейін жабдық қауіпсіз күйге келтіріледі, анықталған ақаулар туралы жауапты лауазымды адамдарға міндетті түрде баяндалуға тиіс.',
        en: 'Upon completion of the work, equipment is brought to a safe condition, and any detected malfunctions must be reported to the responsible officials.',
      },
    ],
  },
  {
    icon: '✈️',
    title: { ru: 'Безопасность при выполнении авиационных работ', kz: 'Авиациялық жұмыстарды орындау кезіндегі қауіпсіздік', en: 'Safety during aviation operations' },
    paragraphs: [
      {
        ru: 'Посадка, высадка и нахождение в зоне работы воздушных судов осуществляются только по указанию членов экипажа. Во время полёта работники обязаны соблюдать требования авиационной безопасности, правильно размещать оборудование и пользоваться ремнями безопасности.',
        kz: 'Әуе кемелерінің жұмыс аймағына отырғызу, түсіру және онда болу тек экипаж мүшелерінің нұсқауы бойынша жүзеге асырылады. Ұшу кезінде қызметкерлер авиациялық қауіпсіздік талаптарын сақтауға, жабдықты дұрыс орналастыруға және қауіпсіздік белдіктерін пайдалануға міндетті.',
        en: 'Boarding, disembarking and being in the operating area of aircraft are carried out only as directed by crew members. During flight, workers must comply with aviation safety requirements, position equipment correctly and use seat belts.',
      },
    ],
    warn: {
      label: { ru: 'Запрещается:', kz: 'Тыйым салынады:', en: 'Prohibited:' },
      items: [
        { ru: 'приближаться к вращающимся винтам и работающим двигателям;', kz: 'айналып тұрған винттерге және жұмыс істеп тұрған қозғалтқыштарға жақындау;', en: 'approaching rotating propellers and running engines;' },
        { ru: 'самостоятельно открывать двери воздушного судна;', kz: 'әуе кемесінің есіктерін өз бетінше ашу;', en: 'opening aircraft doors on your own;' },
        { ru: 'перемещаться по кабине без разрешения экипажа;', kz: 'экипаждың рұқсатынсыз кабина ішінде жүру;', en: 'moving around the cabin without crew permission;' },
        { ru: 'курить на борту воздушного судна;', kz: 'әуе кемесінің бортында темекі шегу;', en: 'smoking on board the aircraft;' },
        { ru: 'перевозить незакреплённые грузы.', kz: 'бекітілмеген жүктерді тасымалдау.', en: 'transporting unsecured cargo.' },
      ],
    },
  },
  {
    icon: '🪂',
    title: { ru: 'Безопасность при десантировании и тушении лесных пожаров', kz: 'Десанттау және орман өрттерін сөндіру кезіндегі қауіпсіздік', en: 'Safety during deployment and fire extinguishing' },
    paragraphs: [
      {
        ru: 'Перед выполнением десантирования проверяются исправность спусковых устройств, страховочных систем, средств связи и личного снаряжения. Во время спуска работники обязаны выполнять команды выпускающего и соблюдать установленную последовательность действий.',
        kz: 'Десанттауды орындар алдында түсіру құрылғыларының, сақтандыру жүйелерінің, байланыс құралдарының және жеке жарақтың жарамдылығы тексеріледі. Түсу кезінде қызметкерлер шығарушының командаларын орындауға және белгіленген іс-әрекеттер реттілігін сақтауға міндетті.',
        en: 'Before performing deployment, the serviceability of descent devices, safety systems, communication equipment and personal gear is checked. During descent, workers must follow the dispatcher’s commands and observe the established sequence of actions.',
      },
      {
        ru: 'При тушении лесных пожаров предварительно оценивается пожарная обстановка, определяются безопасные маршруты отхода и организуется постоянная связь между участниками работ. Выполнение работ допускается только в составе группы с обязательным использованием средств индивидуальной защиты.',
        kz: 'Орман өрттерін сөндіру кезінде алдын ала өрт жағдайы бағаланады, қауіпсіз шегіну бағыттары айқындалады және жұмысқа қатысушылар арасында тұрақты байланыс ұйымдастырылады. Жұмыстарды орындауға тек топ құрамында, жеке қорғаныш құралдарын міндетті түрде пайдалана отырып жол беріледі.',
        en: 'When extinguishing forest fires, the fire situation is assessed in advance, safe retreat routes are identified and constant communication between participants is arranged. Work is permitted only as part of a group with mandatory use of personal protective equipment.',
      },
    ],
    warn: {
      label: { ru: 'Не допускается:', kz: 'Жол берілмейді:', en: 'Not permitted:' },
      items: [
        { ru: 'работа в одиночку;', kz: 'жалғыз жұмыс істеу;', en: 'working alone;' },
        { ru: 'заход в зону возможного окружения огнём;', kz: 'отпен қоршалу мүмкін аймаққа кіру;', en: 'entering an area where being surrounded by fire is possible;' },
        { ru: 'самовольное оставление места работ;', kz: 'жұмыс орнын өз бетінше тастап кету;', en: 'leaving the work site without authorization;' },
        { ru: 'продолжение работы при угрозе жизни и здоровью.', kz: 'өмір мен денсаулыққа қауіп төнген кезде жұмысты жалғастыру.', en: 'continuing work when life and health are at risk.' },
      ],
    },
  },
  {
    icon: '🦺',
    title: { ru: 'Средства индивидуальной защиты', kz: 'Жеке қорғаныш құралдары', en: 'Personal protective equipment' },
    paragraphs: [
      {
        ru: 'В зависимости от характера выполняемых работ используются защитные каски, специальная одежда и обувь, перчатки, защитные очки, сигнальные жилеты, респираторы, страховочные системы и другие средства индивидуальной защиты.',
        kz: 'Орындалатын жұмыстардың сипатына байланысты қорғаныш дулығалары, арнайы киім мен аяқ киім, қолғаптар, қорғаныш көзілдіріктері, сигналдық жилеттер, респираторлар, сақтандыру жүйелері және басқа да жеке қорғаныш құралдары пайдаланылады.',
        en: 'Depending on the nature of the work, protective helmets, special clothing and footwear, gloves, safety goggles, high-visibility vests, respirators, safety harnesses and other personal protective equipment are used.',
      },
      {
        ru: 'Использование средств индивидуальной защиты является обязательным.',
        kz: 'Жеке қорғаныш құралдарын пайдалану міндетті болып табылады.',
        en: 'The use of personal protective equipment is mandatory.',
      },
    ],
  },
  {
    icon: '🔥',
    title: { ru: 'Пожарная и производственная безопасность', kz: 'Өрт және өндірістік қауіпсіздік', en: 'Fire and industrial safety' },
    paragraphs: [
      {
        ru: 'При обращении с горюче-смазочными материалами и химическими веществами необходимо соблюдать требования пожарной безопасности, исключать применение открытого огня, предотвращать разливы топлива и обеспечивать хранение материалов в специально оборудованных местах.',
        kz: 'Жанар-жағармай материалдарымен және химиялық заттармен жұмыс істеу кезінде өрт қауіпсіздігі талаптарын сақтау, ашық отты пайдалануды болдырмау, отынның төгілуінің алдын алу және материалдарды арнайы жабдықталған орындарда сақтауды қамтамасыз ету қажет.',
        en: 'When handling fuels, lubricants and chemicals, fire safety requirements must be observed, the use of open flame excluded, fuel spills prevented, and materials stored in specially equipped areas.',
      },
      {
        ru: 'При организации полевых лагерей обеспечиваются безопасное размещение работников, соблюдение санитарных требований, наличие питьевой воды и безопасное хранение топлива.',
        kz: 'Дала лагерьлерін ұйымдастыру кезінде қызметкерлерді қауіпсіз орналастыру, санитарлық талаптарды сақтау, ауыз судың болуы және отынды қауіпсіз сақтау қамтамасыз етіледі.',
        en: 'When setting up field camps, safe accommodation of workers, compliance with sanitary requirements, availability of drinking water and safe storage of fuel are ensured.',
      },
    ],
  },
  {
    icon: '🚨',
    title: { ru: 'Действия при нештатных ситуациях', kz: 'Штаттан тыс жағдайлардағы іс-әрекеттер', en: 'Actions in emergency situations' },
    paragraphs: [
      {
        ru: 'При возникновении аварийной или иной опасной ситуации работник обязан:',
        kz: 'Авариялық немесе өзге де қауіпті жағдай туындаған кезде қызметкер міндетті:',
        en: 'In the event of an emergency or other dangerous situation, the worker must:',
      },
    ],
    list: [
      { ru: 'немедленно прекратить выполнение работ;', kz: 'жұмысты дереу тоқтату;', en: 'immediately stop performing the work;' },
      { ru: 'предупредить окружающих;', kz: 'айналасындағыларды ескерту;', en: 'warn those nearby;' },
      { ru: 'сообщить непосредственному руководителю;', kz: 'тікелей басшыға хабарлау;', en: 'notify their immediate supervisor;' },
      { ru: 'при необходимости оказать первую помощь;', kz: 'қажет болған жағдайда алғашқы көмек көрсету;', en: 'provide first aid if necessary;' },
      { ru: 'действовать в соответствии с установленным порядком ликвидации аварийных ситуаций.', kz: 'авариялық жағдайларды жою бойынша белгіленген тәртіпке сәйкес әрекет ету.', en: 'act in accordance with the established procedure for eliminating emergencies.' },
    ],
    paragraphsAfter: [
      {
        ru: 'До прибытия медицинских работников необходимо обеспечить безопасность места происшествия, вызвать экстренные службы и принять меры по предотвращению дальнейшего развития опасной ситуации.',
        kz: 'Медицина қызметкерлері келгенге дейін оқиға орнының қауіпсіздігін қамтамасыз ету, жедел қызметтерді шақыру және қауіпті жағдайдың одан әрі дамуының алдын алу бойынша шаралар қабылдау қажет.',
        en: 'Until medical personnel arrive, it is necessary to secure the incident site, call emergency services and take measures to prevent further escalation of the dangerous situation.',
      },
    ],
  },
  {
    icon: '✅',
    title: { ru: 'Основные принципы безопасной работы', kz: 'Қауіпсіз жұмыстың негізгі қағидаттары', en: 'Key principles of safe work' },
    list: [
      { ru: 'соблюдать требования охраны труда, техники и пожарной безопасности;', kz: 'еңбекті қорғау, техника және өрт қауіпсіздігі талаптарын сақтау;', en: 'comply with occupational, technical and fire safety requirements;' },
      { ru: 'использовать только исправное оборудование и средства индивидуальной защиты;', kz: 'тек жарамды жабдық пен жеке қорғаныш құралдарын пайдалану;', en: 'use only serviceable equipment and personal protective equipment;' },
      { ru: 'выполнять работы исключительно в пределах предоставленного допуска;', kz: 'жұмыстарды тек берілген рұқсат шегінде орындау;', en: 'perform work solely within the granted authorization;' },
      { ru: 'соблюдать требования авиационной безопасности;', kz: 'авиациялық қауіпсіздік талаптарын сақтау;', en: 'comply with aviation safety requirements;' },
      { ru: 'незамедлительно сообщать обо всех неисправностях, происшествиях и потенциально опасных ситуациях.', kz: 'барлық ақаулар, оқиғалар және ықтимал қауіпті жағдайлар туралы дереу хабарлау.', en: 'immediately report all malfunctions, incidents and potentially dangerous situations.' },
    ],
  },
];

const T = {
  orgName: { ru: 'РГКП «Казавиалесоохрана»', kz: '«Казавиалесоохрана» РМҚК', en: 'RGKP «Kazavialesookhrana»' },
  calloutBadge: { ru: 'Обязательно', kz: 'Міндетті', en: 'Mandatory' },
  calloutHeading: { ru: 'Главный приоритет предприятия', kz: 'Кәсіпорынның басты басымдығы', en: 'The enterprise’s top priority' },
  calloutP1: {
    ru: 'Соблюдение требований охраны труда и безопасности является обязательным условием эффективного выполнения задач по авиационной охране лесов и защите лесного фонда Республики Казахстан.',
    kz: 'Еңбекті қорғау және қауіпсіздік талаптарын сақтау — ормандарды авиациялық қорғау және Қазақстан Республикасының орман қорын қорғау жөніндегі міндеттерді тиімді орындаудың міндетті шарты.',
    en: 'Compliance with occupational safety requirements is a mandatory condition for the effective performance of tasks in aerial forest protection and safeguarding the forest fund of the Republic of Kazakhstan.',
  },
  calloutP2: {
    ru: 'Главным приоритетом РГКП «Казавиалесоохрана» является сохранение жизни и здоровья работников.',
    kz: '«Казавиалесоохрана» РМҚК-ның басты басымдығы — қызметкерлердің өмірі мен денсаулығын сақтау.',
    en: 'The top priority of RGKP «Kazavialesookhrana» is preserving the life and health of its workers.',
  },
  contactsHeading: { ru: 'Контакты службы охраны труда', kz: 'Еңбекті қорғау қызметінің байланыстары', en: 'Occupational safety service contacts' },
  contactsDesc: {
    ru: 'По вопросам охраны труда, техники безопасности и производственной безопасности работники могут обратиться в службу охраны труда РГКП «Казавиалесоохрана».',
    kz: 'Еңбекті қорғау, техника қауіпсіздігі және өндірістік қауіпсіздік мәселелері бойынша қызметкерлер «Казавиалесоохрана» РМҚК еңбекті қорғау қызметіне жүгіне алады.',
    en: 'On matters of occupational safety, health and industrial safety, workers may contact the occupational safety service of RGKP «Kazavialesookhrana».',
  },
  roleLabel: {
    ru: 'Главный инженер по охране труда и технике безопасности',
    kz: 'Еңбекті қорғау және техника қауіпсіздігі жөніндегі бас инженер',
    en: 'Chief Engineer for Occupational Safety and Health',
  },
  phoneWord: { ru: 'Телефон', kz: 'Телефон', en: 'Phone' },
};

export default function SafetyPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  const L = (o: L) => o[(locale as 'ru' | 'kz' | 'en')] ?? o.ru;

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.safety')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.08] max-w-[760px] relative z-[1]">{t('nav.safety')}</h1>
        <p className="mt-3 text-[15px] text-white/55 relative z-[1]">{L(T.orgName)}</p>
      </div>

      <div className="max-w-[920px] mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col gap-6">
          {sections.map((s, i) => (
            <section key={i} className="bg-white border border-border rounded-xl p-7 md:p-8 shadow-sm reveal from-bottom">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-12 h-12 rounded-lg bg-sky flex items-center justify-center text-2xl shrink-0">{s.icon}</span>
                <h2 className="text-[19px] md:text-[21px] font-extrabold text-forest leading-snug">{L(s.title)}</h2>
              </div>

              {s.paragraphs && (
                <div className="flex flex-col gap-3">
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="text-[14.5px] text-text-mid leading-[1.8]">{L(p)}</p>
                  ))}
                </div>
              )}

              {s.warn && (
                <div className="mt-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg p-5">
                  <div className="text-[13px] font-bold tracking-wide uppercase text-red-600 mb-3">{L(s.warn.label)}</div>
                  <ul className="flex flex-col gap-2">
                    {s.warn.items.map((it, j) => (
                      <li key={j} className="flex gap-2.5 text-[14px] text-text-mid leading-snug">
                        <span className="text-red-500 mt-0.5 shrink-0">✕</span>{L(it)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.list && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {s.list.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[14.5px] text-text-mid leading-snug">
                      <span className="w-6 h-6 rounded-full bg-forest-pale text-forest text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                      {L(it)}
                    </li>
                  ))}
                </ul>
              )}

              {s.paragraphsAfter && (
                <div className="flex flex-col gap-3 mt-4">
                  {s.paragraphsAfter.map((p, j) => (
                    <p key={j} className="text-[14.5px] text-text-mid leading-[1.8]">{L(p)}</p>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Priority callout */}
          <section className="rounded-xl p-8 md:p-9 bg-gradient-to-br from-forest to-forest-mid text-white relative overflow-hidden reveal from-bottom">
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/[0.05]" />
            <span className="inline-block bg-amber text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 relative z-[1]">{L(T.calloutBadge)}</span>
            <h2 className="text-[20px] md:text-[24px] font-extrabold mb-4 relative z-[1]">{L(T.calloutHeading)}</h2>
            <p className="text-[15px] text-white/80 leading-[1.85] mb-3 relative z-[1]">{L(T.calloutP1)}</p>
            <p className="text-[15px] text-white/90 font-semibold leading-[1.85] relative z-[1]">{L(T.calloutP2)}</p>
          </section>

          {/* Contacts */}
          <section className="bg-sky border border-border rounded-xl p-7 md:p-8 reveal from-bottom">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0 shadow-sm">📞</span>
              <h2 className="text-[19px] md:text-[21px] font-extrabold text-forest leading-snug">{L(T.contactsHeading)}</h2>
            </div>
            <p className="text-[14.5px] text-text-mid leading-[1.8] mb-5">{L(T.contactsDesc)}</p>
            <div className="bg-white border border-border rounded-lg p-5">
              <div className="text-[11px] text-text-dim font-bold tracking-widest uppercase mb-1">{L(T.roleLabel)}</div>
              <div className="text-[16px] font-extrabold text-forest mb-2">Иген Айсултан Айбекулы</div>
              <a href="tel:+77058645338" className="inline-flex items-center gap-2 text-[15px] font-bold text-forest no-underline hover:text-amber-dark">
                <span className="text-text-dim">📞</span>{L(T.phoneWord)}: +7705-864-53-38
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
