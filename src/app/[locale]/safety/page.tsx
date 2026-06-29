'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Section = {
  icon: string;
  title: string;
  paragraphs?: string[];
  warn?: { label: string; items: string[] };
  list?: string[];
  paragraphsAfter?: string[];
};

const sections: Section[] = [
  {
    icon: '📋',
    title: 'Общие положения',
    paragraphs: [
      'Обеспечение охраны труда и безопасности работников является одним из приоритетных направлений деятельности РГКП «Казавиалесоохрана». Предприятие осуществляет авиационную охрану лесов, выполнение авиационных работ, десантирование работников и участие в тушении лесных пожаров, что относится к работам повышенной опасности.',
      'Все производственные задачи выполняются в соответствии с требованиями законодательства Республики Казахстан в области охраны труда, авиационной и пожарной безопасности.',
      'К выполнению работ допускаются работники, прошедшие медицинское освидетельствование, профессиональную подготовку, обучение по охране труда и инструктаж, а также обеспеченные необходимыми средствами индивидуальной защиты.',
    ],
  },
  {
    icon: '🛠️',
    title: 'Организация безопасного выполнения работ',
    paragraphs: [
      'Перед началом работ проводится проверка технического состояния оборудования, инструмента, спускового и противопожарного снаряжения, средств связи и индивидуальной защиты. Работник обязан убедиться в безопасности рабочего места и выполнять только те работы, к которым он допущен.',
      'В процессе работы необходимо соблюдать установленный технологический процесс, требования инструкций по охране труда и распоряжения руководителя работ. Использование неисправного оборудования и нарушение требований безопасности не допускаются.',
      'По окончании работ оборудование приводится в безопасное состояние, выявленные неисправности подлежат обязательному докладу ответственным должностным лицам.',
    ],
  },
  {
    icon: '✈️',
    title: 'Безопасность при выполнении авиационных работ',
    paragraphs: [
      'Посадка, высадка и нахождение в зоне работы воздушных судов осуществляются только по указанию членов экипажа. Во время полёта работники обязаны соблюдать требования авиационной безопасности, правильно размещать оборудование и пользоваться ремнями безопасности.',
    ],
    warn: {
      label: 'Запрещается:',
      items: [
        'приближаться к вращающимся винтам и работающим двигателям;',
        'самостоятельно открывать двери воздушного судна;',
        'перемещаться по кабине без разрешения экипажа;',
        'курить на борту воздушного судна;',
        'перевозить незакреплённые грузы.',
      ],
    },
  },
  {
    icon: '🪂',
    title: 'Безопасность при десантировании и тушении лесных пожаров',
    paragraphs: [
      'Перед выполнением десантирования проверяются исправность спусковых устройств, страховочных систем, средств связи и личного снаряжения. Во время спуска работники обязаны выполнять команды выпускающего и соблюдать установленную последовательность действий.',
      'При тушении лесных пожаров предварительно оценивается пожарная обстановка, определяются безопасные маршруты отхода и организуется постоянная связь между участниками работ. Выполнение работ допускается только в составе группы с обязательным использованием средств индивидуальной защиты.',
    ],
    warn: {
      label: 'Не допускается:',
      items: [
        'работа в одиночку;',
        'заход в зону возможного окружения огнём;',
        'самовольное оставление места работ;',
        'продолжение работы при угрозе жизни и здоровью.',
      ],
    },
  },
  {
    icon: '🦺',
    title: 'Средства индивидуальной защиты',
    paragraphs: [
      'В зависимости от характера выполняемых работ используются защитные каски, специальная одежда и обувь, перчатки, защитные очки, сигнальные жилеты, респираторы, страховочные системы и другие средства индивидуальной защиты.',
      'Использование средств индивидуальной защиты является обязательным.',
    ],
  },
  {
    icon: '🔥',
    title: 'Пожарная и производственная безопасность',
    paragraphs: [
      'При обращении с горюче-смазочными материалами и химическими веществами необходимо соблюдать требования пожарной безопасности, исключать применение открытого огня, предотвращать разливы топлива и обеспечивать хранение материалов в специально оборудованных местах.',
      'При организации полевых лагерей обеспечиваются безопасное размещение работников, соблюдение санитарных требований, наличие питьевой воды и безопасное хранение топлива.',
    ],
  },
  {
    icon: '🚨',
    title: 'Действия при нештатных ситуациях',
    paragraphs: ['При возникновении аварийной или иной опасной ситуации работник обязан:'],
    list: [
      'немедленно прекратить выполнение работ;',
      'предупредить окружающих;',
      'сообщить непосредственному руководителю;',
      'при необходимости оказать первую помощь;',
      'действовать в соответствии с установленным порядком ликвидации аварийных ситуаций.',
    ],
    paragraphsAfter: [
      'До прибытия медицинских работников необходимо обеспечить безопасность места происшествия, вызвать экстренные службы и принять меры по предотвращению дальнейшего развития опасной ситуации.',
    ],
  },
  {
    icon: '✅',
    title: 'Основные принципы безопасной работы',
    list: [
      'соблюдать требования охраны труда, техники и пожарной безопасности;',
      'использовать только исправное оборудование и средства индивидуальной защиты;',
      'выполнять работы исключительно в пределах предоставленного допуска;',
      'соблюдать требования авиационной безопасности;',
      'незамедлительно сообщать обо всех неисправностях, происшествиях и потенциально опасных ситуациях.',
    ],
  },
];

export default function SafetyPage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.safety')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.08] max-w-[760px] relative z-[1]">{t('nav.safety')}</h1>
        <p className="mt-3 text-[15px] text-white/55 relative z-[1]">РГКП «Казавиалесоохрана»</p>
      </div>

      <div className="max-w-[920px] mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col gap-6">
          {sections.map((s, i) => (
            <section key={i} className="bg-white border border-border rounded-xl p-7 md:p-8 shadow-sm reveal from-bottom">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-12 h-12 rounded-lg bg-sky flex items-center justify-center text-2xl shrink-0">{s.icon}</span>
                <h2 className="text-[19px] md:text-[21px] font-extrabold text-forest leading-snug">{s.title}</h2>
              </div>

              {s.paragraphs && (
                <div className="flex flex-col gap-3">
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="text-[14.5px] text-text-mid leading-[1.8]">{p}</p>
                  ))}
                </div>
              )}

              {s.warn && (
                <div className="mt-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg p-5">
                  <div className="text-[13px] font-bold tracking-wide uppercase text-red-600 mb-3">{s.warn.label}</div>
                  <ul className="flex flex-col gap-2">
                    {s.warn.items.map((it, j) => (
                      <li key={j} className="flex gap-2.5 text-[14px] text-text-mid leading-snug">
                        <span className="text-red-500 mt-0.5 shrink-0">✕</span>{it}
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
                      {it}
                    </li>
                  ))}
                </ul>
              )}

              {s.paragraphsAfter && (
                <div className="flex flex-col gap-3 mt-4">
                  {s.paragraphsAfter.map((p, j) => (
                    <p key={j} className="text-[14.5px] text-text-mid leading-[1.8]">{p}</p>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Priority callout */}
          <section className="rounded-xl p-8 md:p-9 bg-gradient-to-br from-forest to-forest-mid text-white relative overflow-hidden reveal from-bottom">
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/[0.05]" />
            <span className="inline-block bg-amber text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 relative z-[1]">Обязательно</span>
            <h2 className="text-[20px] md:text-[24px] font-extrabold mb-4 relative z-[1]">Главный приоритет предприятия</h2>
            <p className="text-[15px] text-white/80 leading-[1.85] mb-3 relative z-[1]">
              Соблюдение требований охраны труда и безопасности является обязательным условием эффективного выполнения задач по авиационной охране лесов и защите лесного фонда Республики Казахстан.
            </p>
            <p className="text-[15px] text-white/90 font-semibold leading-[1.85] relative z-[1]">
              Главным приоритетом РГКП «Казавиалесоохрана» является сохранение жизни и здоровья работников.
            </p>
          </section>

          {/* Contacts */}
          <section className="bg-sky border border-border rounded-xl p-7 md:p-8 reveal from-bottom">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0 shadow-sm">📞</span>
              <h2 className="text-[19px] md:text-[21px] font-extrabold text-forest leading-snug">Контакты службы охраны труда</h2>
            </div>
            <p className="text-[14.5px] text-text-mid leading-[1.8] mb-5">
              По вопросам охраны труда, техники безопасности и производственной безопасности работники могут обратиться в службу охраны труда РГКП «Казавиалесоохрана».
            </p>
            <div className="bg-white border border-border rounded-lg p-5">
              <div className="text-[11px] text-text-dim font-bold tracking-widest uppercase mb-1">Главный инженер по охране труда и технике безопасности</div>
              <div className="text-[16px] font-extrabold text-forest mb-2">Иген Айсултан Айбекулы</div>
              <a href="tel:+77058645338" className="inline-flex items-center gap-2 text-[15px] font-bold text-forest no-underline hover:text-amber-dark">
                <span className="text-text-dim">📞</span>Телефон: +7705-864-53-38
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
