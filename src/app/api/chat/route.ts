import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = `
О предприятии:
- РГКП «Казавиалесоохрана» — единственное государственное предприятие в Казахстане по авиационной охране лесов
- Основано в 1978 году
- 14 авиационных отделений по всему Казахстану
- Охраняет более 6,5 млн гектаров лесов
- 6200–9000 налётных часов в год
- Адрес: г. Алматы, ул. Абая 32/2
- Телефон: +7 (727) 346-13-71
- Email: airbar@list.ru

Основные функции:
- Обнаружение и тушение лесных пожаров с воздуха
- Охрана особо охраняемых природных территорий
- Авиационные полёты для нужд лесного хозяйства

Авиапарк: МИ-8, МИ-171, Bell-206, EC-120B, MD-600

Авиационные отделения: Алматинское, Боровское, Каркаралинское, Павлодарское, Риддерское, Жамбылское, Петропавловское, Букебаевское и другие.
`;

export async function POST(request: Request) {
  try {
    const { message, locale } = await request.json();

    // Since we don't have a real LLM API key configured here, we'll use simple keyword matching
    // In a real scenario, you would pass the message and KNOWLEDGE_BASE to OpenAI/Anthropic API
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking

    const msgLower = message.toLowerCase();
    let reply = '';

    if (locale === 'kz') {
      if (msgLower.includes('телефон') || msgLower.includes('байланыс')) reply = 'Біздің телефон: +7 (727) 346-13-71, Email: airbar@list.ru';
      else if (msgLower.includes('тікұшақ') || msgLower.includes('техника')) reply = 'Біздің авиапаркте МИ-8, МИ-171, Bell-206, EC-120B, MD-600 тікұшақтары бар.';
      else if (msgLower.includes('бөлімше')) reply = 'Бізде Қазақстан бойынша 14 авиациялық бөлімше бар (Алматы, Боровское, Қарқаралы және т.б.).';
      else reply = 'Кешіріңіз, мен бұл сұраққа жауап бере алмаймын. Өтініш, +7 (727) 346-13-71 нөміріне хабарласыңыз.';
    } else if (locale === 'en') {
      if (msgLower.includes('phone') || msgLower.includes('contact')) reply = 'Our phone: +7 (727) 346-13-71, Email: airbar@list.ru';
      else if (msgLower.includes('helicopter') || msgLower.includes('equipment')) reply = 'Our fleet includes MI-8, MI-171, Bell-206, EC-120B, MD-600 helicopters.';
      else if (msgLower.includes('branch')) reply = 'We have 14 aviation branches across Kazakhstan (Almaty, Borovoe, Karkaralinsk, etc.).';
      else reply = 'Sorry, I cannot answer this. Please contact us at +7 (727) 346-13-71.';
    } else {
      if (msgLower.includes('телефон') || msgLower.includes('контакт') || msgLower.includes('связь')) reply = 'Наш телефон: +7 (727) 346-13-71, Email: airbar@list.ru. Адрес: г. Алматы, ул. Абая 32/2.';
      else if (msgLower.includes('вертолет') || msgLower.includes('техника')) reply = 'Наш авиапарк включает вертолеты МИ-8, МИ-171, Bell-206, EC-120B, MD-600.';
      else if (msgLower.includes('отделени') || msgLower.includes('филиал')) reply = 'У нас 14 авиационных отделений по всему Казахстану, включая Алматинское, Боровское, Каркаралинское и другие.';
      else if (msgLower.includes('функц') || msgLower.includes('что вы делаете')) reply = 'Наши основные функции: обнаружение и тушение лесных пожаров с воздуха, охрана природных территорий и защита лесов.';
      else reply = 'РГКП «Казавиалесоохрана» — единственное предприятие в РК по авиационной охране лесов. Для подробной консультации позвоните: +7 (727) 346-13-71.';
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
