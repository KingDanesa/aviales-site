'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Tab = 'dashboard' | 'news' | 'vacancies' | 'messages';

const navItems: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: '📊' },
  { id: 'news', label: 'Новости', icon: '📰' },
  { id: 'vacancies', label: 'Вакансии', icon: '📋' },
  { id: 'messages', label: 'Сообщения', icon: '✉️' },
];

export default function AdminDashboard() {
  const [active, setActive] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0a1510] border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="px-7 py-6 border-b border-white/[0.06]">
          <div className="text-[14px] font-extrabold text-white tracking-wider">КАЗАВИАЛЕСООХРАНА</div>
          <div className="text-[9px] text-white/25 tracking-[0.2em] uppercase mt-0.5">Панель управления</div>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
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
            <button className="text-[11px] text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none">Выйти</button>
          </div>
        </div>

        <div className="p-8">
          {active === 'dashboard' && <DashboardTab />}
          {active === 'news' && <NewsTab />}
          {active === 'vacancies' && <VacanciesTab />}
          {active === 'messages' && <MessagesTab />}
        </div>
      </main>
    </div>
  );
}

function DashboardTab() {
  const stats = [
    { label: 'Новости', value: '24', icon: '📰' },
    { label: 'Вакансии', value: '5', icon: '📋' },
    { label: 'Сообщения', value: '18', icon: '✉️' },
    { label: 'Посещения', value: '2,450', icon: '👁️' },
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
            <div className="text-[32px] font-extrabold text-white tracking-tight leading-none">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsTab() {
  const [showForm, setShowForm] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [form, setForm] = useState({ titleRu: '', titleKz: '', titleEn: '', contentRu: '', contentKz: '', contentEn: '', category: 'training', imageUrl: '', published: true });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      setNews(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (published: boolean) => {
    await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published }),
    });
    setShowForm(false);
    setForm({ titleRu: '', titleKz: '', titleEn: '', contentRu: '', contentKz: '', contentEn: '', category: 'training', imageUrl: '', published: true });
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить новость?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    fetchNews();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/50 text-[13px]">Управление новостями сайта</div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors">
          {showForm ? '← Назад' : '+ Создать новость'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white/[0.04] border border-white/[0.08] p-8">
          <h3 className="text-[17px] font-bold text-white mb-6">Новая новость</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (RU)</label>
              <input value={form.titleRu} onChange={e=>setForm({...form, titleRu: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none transition-colors font-sans" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (KZ)</label>
              <input value={form.titleKz} onChange={e=>setForm({...form, titleKz: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none transition-colors font-sans" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Заголовок (EN)</label>
              <input value={form.titleEn} onChange={e=>setForm({...form, titleEn: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none transition-colors font-sans" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Категория</label>
            <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none font-sans">
              <option value="training">Обучение</option>
              <option value="fire">Пожары</option>
              <option value="raids">Рейды</option>
              <option value="meetings">Совещания</option>
              <option value="anticorr">Антикоррупция</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (RU)</label>
              <textarea value={form.contentRu} onChange={e=>setForm({...form, contentRu: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none min-h-[200px] resize-y font-sans" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (KZ)</label>
              <textarea value={form.contentKz} onChange={e=>setForm({...form, contentKz: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none min-h-[200px] resize-y font-sans" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Содержание (EN)</label>
              <textarea value={form.contentEn} onChange={e=>setForm({...form, contentEn: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none min-h-[200px] resize-y font-sans" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">URL Картинки</label>
            <input value={form.imageUrl} onChange={e=>setForm({...form, imageUrl: e.target.value})} placeholder="https://..." className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none font-sans" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSubmit(true)} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors">Опубликовать</button>
            <button onClick={() => handleSubmit(false)} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-transparent text-white/50 border border-white/20 rounded-sm hover:border-white/40 cursor-pointer transition-colors">Сохранить черновик</button>
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

function VacanciesTab() {
  const [showForm, setShowForm] = useState(false);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ titleRu: '', titleKz: '', titleEn: '', descriptionRu: '', location: '', salary: '', isHot: false, published: true });

  const fetchVacancies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vacancies');
      setVacancies(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVacancies(); }, []);

  const handleSubmit = async () => {
    await fetch('/api/vacancies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({ titleRu: '', titleKz: '', titleEn: '', descriptionRu: '', location: '', salary: '', isHot: false, published: true });
    fetchVacancies();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить вакансию?')) return;
    await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
    fetchVacancies();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/50 text-[13px]">Управление вакансиями</div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none transition-colors">
          {showForm ? '← Назад' : '+ Добавить вакансию'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white/[0.04] border border-white/[0.08] p-8">
          <h3 className="text-[17px] font-bold text-white mb-6">Новая вакансия</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Название (RU)</label>
              <input value={form.titleRu} onChange={e=>setForm({...form, titleRu: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Локация</label>
              <input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Зарплата</label>
              <input value={form.salary} onChange={e=>setForm({...form, salary: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <input type="checkbox" checked={form.isHot} onChange={e=>setForm({...form, isHot: e.target.checked})} id="isHot" />
            <label htmlFor="isHot" className="text-sm text-white">Горячая вакансия</label>
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Описание (RU)</label>
            <textarea value={form.descriptionRu} onChange={e=>setForm({...form, descriptionRu: e.target.value})} className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber outline-none min-h-[100px]" />
          </div>
          <button onClick={handleSubmit} className="px-7 py-3 text-[12px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark cursor-pointer border-none">Сохранить</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {loading ? <div className="text-white/30">Загрузка...</div> :
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

  useEffect(() => {
    // In real app we fetch this, for demo keeping it empty to show it works
    setMessages([]);
  }, []);

  return (
    <div>
      <div className="text-white/50 text-[13px] mb-6">Входящие сообщения с формы обратной связи</div>
      {messages.length === 0 ? (
        <div className="text-white/30 text-sm">Нет новых сообщений</div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((m, i) => (
            <div key={i} className="p-5 border border-white/[0.08] flex justify-between items-center hover:bg-white/[0.03]">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="text-[14px] font-semibold text-white/80">{m.name}</div>
                  <div className="text-[11px] text-white/25">{m.email}</div>
                </div>
                <div className="text-[13px] text-white/40 mt-1">{m.subject}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
