'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Tab = 'dashboard' | 'news' | 'vacancies' | 'messages' | 'users';

const navItems: { id: Tab; label: string; icon: string; adminOnly?: boolean }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: '📊' },
  { id: 'news', label: 'Новости', icon: '📰' },
  { id: 'vacancies', label: 'Вакансии', icon: '📋' },
  { id: 'messages', label: 'Сообщения', icon: '✉️' },
  { id: 'users', label: 'Пользователи', icon: '👥', adminOnly: true },
];

export default function AdminDashboard() {
  const [active, setActive] = useState<Tab>('dashboard');
  const [me, setMe] = useState<{ email: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  const isAdmin = me?.role === 'admin';
  const items = navItems.filter(i => !i.adminOnly || isAdmin);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0a1510] border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="px-7 py-6 border-b border-white/[0.06]">
          <div className="text-[14px] font-extrabold text-white tracking-wider">КАЗАВИАЛЕСООХРАНА</div>
          <div className="text-[9px] text-white/25 tracking-[0.2em] uppercase mt-0.5">Панель управления</div>
        </div>
        <nav className="flex-1 py-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-7 py-3 text-[13px] font-semibold cursor-pointer border-none font-sans transition-all ${
                active === item.id
                  ? 'bg-white/[0.08] text-white border-l-2 border-l-amber'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border-l-2 border-l-transparent'
              }`}
            >
              <span className="text-[16px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-7 py-4 border-t border-white/[0.06]">
          <Link href="/" className="text-white/30 text-[12px] no-underline hover:text-white/60 transition-colors flex items-center gap-2">
            ← На сайт
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
          <h1 className="text-[20px] font-extrabold text-white tracking-tight">
            {navItems.find(n => n.id === active)?.label}
          </h1>
          <div className="flex items-center gap-4">
            {me?.email && (
              <span className="text-[11px] text-white/35">
                {me.email} · <span className="text-amber/80">{isAdmin ? 'админ' : 'редактор'}</span>
              </span>
            )}
            <button onClick={handleLogout} className="text-[11px] text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none font-sans">Выйти</button>
          </div>
        </div>

        <div className="p-8">
          {active === 'dashboard' && <DashboardTab />}
          {active === 'news' && <NewsTab />}
          {active === 'vacancies' && <VacanciesTab />}
          {active === 'messages' && <MessagesTab />}
          {active === 'users' && isAdmin && <UsersTab currentEmail={me?.email} />}
        </div>
      </main>
    </div>
  );
}

function DashboardTab() {
  const [counts, setCounts] = useState({ news: 0, published: 0, vacancies: 0, messages: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const j = (url: string) => fetch(url).then(r => r.json()).catch(() => []);
    Promise.all([j('/api/news'), j('/api/vacancies'), j('/api/contact')]).then(([news, vac, msg]) => {
      const n = Array.isArray(news) ? news : [];
      const v = Array.isArray(vac) ? vac : [];
      const m = Array.isArray(msg) ? msg : [];
      setCounts({ news: n.length, published: n.filter((x: any) => x.published).length, vacancies: v.length, messages: m.length });
      setLoaded(true);
    });
  }, []);

  const stats = [
    { label: 'Новости', value: counts.news, icon: '📰' },
    { label: 'Опубликовано', value: counts.published, icon: '✅' },
    { label: 'Вакансии', value: counts.vacancies, icon: '📋' },
    { label: 'Сообщения', value: counts.messages, icon: '✉️' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/[0.08] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/30">{s.label}</span>
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className="text-[32px] font-extrabold text-white tracking-tight leading-none">{loaded ? s.value : '—'}</div>
          </div>
        ))}
      </div>
      <div className="text-white/30 text-[12px]">Данные считаются из базы в реальном времени. Если показывает «—» — база данных недоступна.</div>
    </div>
  );
}

const emptyNews = { titleRu: '', titleKz: '', titleEn: '', contentRu: '', contentKz: '', contentEn: '', category: 'training', imageUrl: '', published: true };

function NewsTab() {
  const [showForm, setShowForm] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyNews);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch {
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || 'Не удалось загрузить фото');
      setForm(f => ({ ...f, imageUrl: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки фото');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (published: boolean) => {
    if (!form.titleRu.trim()) { setError('Заполните заголовок (RU)'); return; }
    setSubmitting(true); setError(''); setOk('');
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Не удалось сохранить. Проверьте подключение к базе данных.');
      }
      setOk(published ? 'Новость опубликована' : 'Черновик сохранён');
      setForm(emptyNews);
      setShowForm(false);
      fetchNews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить новость?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    fetchNews();
  };

  const inputCls = 'border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none transition-colors font-sans';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/50 text-[13px]">Управление новостями сайта</div>
        <button onClick={() => { setShowForm(!showForm); setError(''); setOk(''); }} className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors">
          {showForm ? '← Назад' : '+ Создать новость'}
        </button>
      </div>

      {ok && !showForm && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-semibold p-3 mb-5">✓ {ok}</div>}

      {showForm ? (
        <div className="bg-white/[0.04] border border-white/[0.08] p-8">
          <h3 className="text-[17px] font-bold text-white mb-6">Новая новость</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (RU)</label>
              <input value={form.titleRu} onChange={e=>setForm({...form, titleRu: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (KZ)</label>
              <input value={form.titleKz} onChange={e=>setForm({...form, titleKz: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (EN)</label>
              <input value={form.titleEn} onChange={e=>setForm({...form, titleEn: e.target.value})} className={inputCls} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-5 max-w-xs">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Категория</label>
            <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="border border-white/15 bg-white text-black px-4 py-3 text-sm focus:border-amber outline-none font-sans rounded-sm">
              <option value="training">Обучение</option>
              <option value="fire">Пожары</option>
              <option value="raids">Рейды</option>
              <option value="meetings">Совещания</option>
              <option value="events">Мероприятия</option>
              <option value="anticorr">Антикоррупция</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (RU)</label>
              <textarea value={form.contentRu} onChange={e=>setForm({...form, contentRu: e.target.value})} className={`${inputCls} min-h-[200px] resize-y`} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (KZ)</label>
              <textarea value={form.contentKz} onChange={e=>setForm({...form, contentKz: e.target.value})} className={`${inputCls} min-h-[200px] resize-y`} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (EN)</label>
              <textarea value={form.contentEn} onChange={e=>setForm({...form, contentEn: e.target.value})} className={`${inputCls} min-h-[200px] resize-y`} />
            </div>
          </div>

          {/* Загрузка фото */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Фото новости</label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="px-5 py-2.5 text-[12px] font-bold bg-white/10 text-white rounded-sm hover:bg-white/20 cursor-pointer transition-colors inline-flex items-center gap-2">
                📷 {uploading ? 'Загрузка...' : 'Выбрать фото'}
                <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
              </label>
              {form.imageUrl && (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.imageUrl} alt="" className="w-20 h-14 object-cover rounded border border-white/15" />
                  <button type="button" onClick={() => setForm({ ...form, imageUrl: '' })} className="text-[11px] text-red-400/70 hover:text-red-400 bg-transparent border-none cursor-pointer">Убрать</button>
                </div>
              )}
            </div>
            <div className="text-[10px] text-white/25">JPG/PNG. Файл загрузится автоматически после выбора.</div>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[13px] font-medium p-3 mb-4">{error}</div>}

          <div className="flex gap-3">
            <button disabled={submitting || uploading} onClick={() => handleSubmit(true)} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors disabled:opacity-50">{submitting ? 'Сохранение...' : 'Опубликовать'}</button>
            <button disabled={submitting || uploading} onClick={() => handleSubmit(false)} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-transparent text-white/50 border border-white/20 rounded-sm hover:border-white/40 cursor-pointer transition-colors disabled:opacity-50">Сохранить черновик</button>
          </div>
        </div>
      ) : (
        <div className="bg-white/[0.04] border border-white/[0.08]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Категория</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Дата</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Статус</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="p-6 text-center text-white/30">Загрузка...</td></tr> :
               news.length === 0 ? <tr><td colSpan={5} className="p-6 text-center text-white/30">Новостей нет (или база недоступна)</td></tr> :
               news.map((n) => (
                <tr key={n.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-[13px] font-semibold text-white/80">{n.titleRu}</td>
                  <td className="px-6 py-4"><span className="bg-white/[0.08] text-white/50 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">{n.category}</span></td>
                  <td className="px-6 py-4 text-[12px] text-white/30">{new Date(n.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 ${n.published ? 'bg-green-500/10 text-green-400' : 'bg-amber/10 text-amber'}`}>
                      {n.published ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleDelete(n.id)} className="text-[11px] text-red-400/60 hover:text-red-400 cursor-pointer bg-transparent border-none">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const emptyVac = { titleRu: '', titleKz: '', titleEn: '', descriptionRu: '', location: '', salary: '', isHot: false, published: true };

function VacanciesTab() {
  const [showForm, setShowForm] = useState(false);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyVac);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchVacancies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      setVacancies(Array.isArray(data) ? data : []);
    } catch {
      setVacancies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVacancies(); }, []);

  const handleSubmit = async () => {
    if (!form.titleRu.trim()) { setError('Заполните название (RU)'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/vacancies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Не удалось сохранить. Проверьте подключение к базе данных.');
      }
      setForm(emptyVac);
      setShowForm(false);
      fetchVacancies();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить вакансию?')) return;
    await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
    fetchVacancies();
  };

  const inputCls = 'border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none font-sans';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/50 text-[13px]">Управление вакансиями</div>
        <button onClick={() => { setShowForm(!showForm); setError(''); }} className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors">
          {showForm ? '← Назад' : '+ Добавить вакансию'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white/[0.04] border border-white/[0.08] p-8">
          <h3 className="text-[17px] font-bold text-white mb-6">Новая вакансия</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Название (RU)</label>
              <input value={form.titleRu} onChange={e=>setForm({...form, titleRu: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Название (KZ)</label>
              <input value={form.titleKz} onChange={e=>setForm({...form, titleKz: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Локация</label>
              <input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Зарплата</label>
              <input value={form.salary} onChange={e=>setForm({...form, salary: e.target.value})} className={inputCls} />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <input type="checkbox" checked={form.isHot} onChange={e=>setForm({...form, isHot: e.target.checked})} id="isHot" />
            <label htmlFor="isHot" className="text-sm text-white">Горячая вакансия</label>
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Описание (RU)</label>
            <textarea value={form.descriptionRu} onChange={e=>setForm({...form, descriptionRu: e.target.value})} className={`${inputCls} min-h-[100px]`} />
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[13px] font-medium p-3 mb-4">{error}</div>}
          <button disabled={submitting} onClick={handleSubmit} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none disabled:opacity-50">{submitting ? 'Сохранение...' : 'Сохранить'}</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {loading ? <div className="text-white/30">Загрузка...</div> :
           vacancies.length === 0 ? <div className="text-white/30 text-sm">Вакансий нет (или база недоступна)</div> :
           vacancies.map((v) => (
            <div key={v.id} className="bg-white/[0.04] border border-white/[0.08] p-6 flex justify-between items-center">
              <div>
                <div className="text-[15px] font-bold text-white mb-1">{v.titleRu}</div>
                <div className="flex gap-2 mt-2">
                  <span className="bg-white/[0.08] text-white/50 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">📍 {v.location || 'РК'}</span>
                  {v.isHot && <span className="bg-red-500/10 text-red-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">🔥 Горячая</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(v.id)} className="px-4 py-2 text-[11px] text-red-400/60 border border-red-400/20 bg-transparent hover:border-red-400/50 cursor-pointer">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.json())
      .then(d => setMessages(Array.isArray(d) ? d : []))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="text-white/50 text-[13px] mb-6">Входящие сообщения с формы обратной связи</div>
      {loading ? (
        <div className="text-white/30 text-sm">Загрузка...</div>
      ) : messages.length === 0 ? (
        <div className="text-white/30 text-sm">Нет новых сообщений</div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((m, i) => (
            <div key={i} className="p-5 border border-white/[0.08] hover:bg-white/[0.03]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="text-[14px] font-semibold text-white/80">{m.name}</div>
                  <div className="text-[11px] text-white/25">{m.email}{m.phone ? ` · ${m.phone}` : ''}</div>
                </div>
                <div className="text-[11px] text-white/25">{m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</div>
              </div>
              {m.subject && <div className="text-[13px] text-white/50 mt-2 font-semibold">{m.subject}</div>}
              <div className="text-[13px] text-white/60 mt-1 whitespace-pre-line">{m.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const emptyUser = { email: '', password: '', role: 'editor', name: '' };

function UsersTab({ currentEmail }: { currentEmail?: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyUser);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const flash = (msg: string) => { setOk(msg); setTimeout(() => setOk(''), 3000); };

  const handleCreate = async () => {
    setError('');
    if (!form.email.trim() || !form.password) { setError('Укажите email и пароль'); return; }
    if (form.password.length < 6) { setError('Пароль не короче 6 символов'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Не удалось создать пользователя');
      setForm(emptyUser);
      setShowForm(false);
      flash('Пользователь создан');
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (u: any) => {
    const pw = prompt(`Новый пароль для ${u.email} (мин. 6 символов):`);
    if (pw === null) return;
    if (pw.length < 6) { alert('Пароль слишком короткий (мин. 6 символов)'); return; }
    const res = await fetch(`/api/users/${u.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) { alert(d.error || 'Не удалось сменить пароль'); return; }
    flash(`Пароль для ${u.email} обновлён`);
  };

  const handleChangeRole = async (u: any, role: string) => {
    const res = await fetch(`/api/users/${u.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) { alert(d.error || 'Не удалось сменить роль'); return; }
    fetchUsers();
  };

  const handleDelete = async (u: any) => {
    if (!confirm(`Удалить пользователя ${u.email}?`)) return;
    const res = await fetch(`/api/users/${u.id}`, { method: 'DELETE' });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) { alert(d.error || 'Не удалось удалить'); return; }
    flash('Пользователь удалён');
    fetchUsers();
  };

  const inputCls = 'border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none transition-colors font-sans';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/50 text-[13px]">Учётные записи для входа в панель. Роль «редактор» — только новости и вакансии; «админ» — всё и управление пользователями.</div>
        <button onClick={() => { setShowForm(!showForm); setError(''); }} className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors whitespace-nowrap ml-4">
          {showForm ? '← Назад' : '+ Добавить'}
        </button>
      </div>

      {ok && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-semibold p-3 mb-5">✓ {ok}</div>}

      {showForm ? (
        <div className="bg-white/[0.04] border border-white/[0.08] p-8 max-w-2xl">
          <h3 className="text-[17px] font-bold text-white mb-6">Новый пользователь</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Email (логин)</label>
              <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className={inputCls} placeholder="editor@aviales.kz" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Имя (необязательно)</label>
              <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Пароль</label>
              <input type="text" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className={inputCls} placeholder="мин. 6 символов" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Роль</label>
              <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="border border-white/15 bg-white text-black px-4 py-3 text-sm focus:border-amber outline-none font-sans rounded-sm">
                <option value="editor">Редактор</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[13px] font-medium p-3 mb-4">{error}</div>}
          <button disabled={submitting} onClick={handleCreate} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none disabled:opacity-50">{submitting ? 'Создание...' : 'Создать'}</button>
        </div>
      ) : (
        <div className="bg-white/[0.04] border border-white/[0.08]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Email</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Роль</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-white/30">Создан</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold tracking-widest uppercase text-white/30">Действия</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={4} className="p-6 text-center text-white/30">Загрузка...</td></tr> :
               users.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-white/30">Пользователей нет</td></tr> :
               users.map((u) => {
                const isSelf = u.email === currentEmail;
                return (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-[13px] font-semibold text-white/80">{u.email}{isSelf && <span className="ml-2 text-[10px] text-white/30">(вы)</span>}</td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role === 'admin' ? 'admin' : 'editor'}
                      onChange={e => handleChangeRole(u, e.target.value)}
                      disabled={isSelf}
                      className="bg-white/[0.06] text-white/70 text-[11px] font-bold tracking-wider uppercase px-2 py-1.5 rounded-sm border border-white/10 outline-none focus:border-amber disabled:opacity-40 cursor-pointer"
                    >
                      <option className="text-black" value="editor">Редактор</option>
                      <option className="text-black" value="admin">Админ</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-white/30">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleResetPassword(u)} className="text-[11px] text-amber/80 hover:text-amber cursor-pointer bg-transparent border border-amber/20 hover:border-amber/50 px-3 py-1.5 rounded-sm transition-colors">Сбросить пароль</button>
                      {!isSelf && <button onClick={() => handleDelete(u)} className="text-[11px] text-red-400/60 hover:text-red-400 cursor-pointer bg-transparent border border-red-400/20 hover:border-red-400/50 px-3 py-1.5 rounded-sm transition-colors">Удалить</button>}
                    </div>
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
