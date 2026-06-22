'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function HomeContact() {
  const t = useTranslations();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const upd = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-sky px-8 md:px-14 py-16 md:py-20">
      <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
        <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('cta.btn')}
      </div>
      <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom" style={{ textWrap: 'balance' as never }}>
        {t('cta.title')}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Form */}
        <form onSubmit={submit} className="bg-white border border-border p-7 md:p-9 rounded-sm reveal from-left flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.name')}</label>
              <input value={form.name} onChange={upd('name')} type="text" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.phoneLbl')}</label>
              <input value={form.phone} onChange={upd('phone')} type="tel" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.emailLbl')}</label>
            <input value={form.email} onChange={upd('email')} type="email" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5 mb-4 flex-1">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.message')}</label>
            <textarea value={form.message} onChange={upd('message')} className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors min-h-[120px] resize-y flex-1" />
          </div>
          <button type="submit" disabled={status === 'sending'} className="w-full px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none font-sans disabled:opacity-60">
            {status === 'sending' ? t('common.loading') : t('contactsPage.send')}
          </button>
          {status === 'ok' && <div className="bg-forest text-white p-4 text-sm font-semibold mt-4">✓ {t('contactsPage.success')}</div>}
          {status === 'error' && <div className="bg-amber-dark text-white p-4 text-sm font-semibold mt-4">{t('contactsPage.consent')}</div>}
        </form>

        {/* Map with info card */}
        <div className="relative min-h-[420px] border border-border rounded-sm overflow-hidden reveal from-right">
          <iframe
            title="Казавиалесоохрана на карте"
            src="https://yandex.ru/map-widget/v1/?ll=76.934044%2C43.240941&z=16&pt=76.934044%2C43.240941%2Cpm2rdm"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
          {/* Info card overlay */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-[320px] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.18)] p-5 z-[1]">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-amber/15 text-amber-dark flex items-center justify-center text-base shrink-0">📍</span>
              <div className="text-[14px] font-semibold text-forest leading-snug">г. Алматы, ул. Абая, 32/2</div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-amber/15 text-amber-dark flex items-center justify-center text-base shrink-0">✉️</span>
              <a href="mailto:Airbar@list.ru" className="text-[14px] font-semibold text-forest no-underline hover:text-amber-dark">Airbar@list.ru</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-amber/15 text-amber-dark flex items-center justify-center text-base shrink-0">📞</span>
              <a href="tel:+77273461371" className="text-[14px] font-semibold text-forest no-underline hover:text-amber-dark">+7 (727) 346-13-71</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
