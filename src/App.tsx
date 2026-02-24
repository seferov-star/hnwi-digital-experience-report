import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  TrendingUp, Users, ShieldCheck, Smartphone, 
  Briefcase, Activity, DollarSign,
  Clock, CheckCircle2, ArrowRight, ExternalLink, BookOpen, AlertTriangle,
  FileText, Network, TableProperties
} from 'lucide-react';

// --- DATA CONSTANTS ---

const EXPECTATIONS_DATA = [
  { name: 'Цифровой опыт критичен', value: 55, color: '#fbbf24' },
  { name: 'Недовольны интерфейсом', value: 47, color: '#f87171' },
  { name: 'Не хватает персонализации', value: 65, color: '#60a5fa' },
  { name: 'Планируют сменить брокера', value: 44, color: '#c084fc' },
  { name: 'Уйдут вслед за своим RM', value: 62, color: '#34d399' },
];

const CLIENT_PORTRAIT = [
  { title: 'Определение', desc: 'HNWI: от $1m+, UHNWI: от $30m+ investable assets. Поведение и ожидания в этих группах заметно различаются.' },
  { title: 'Гибридный сервис', desc: 'Запрос на financial/non-financial value-added услуги (concierge, networking) и персонализированный совет "под меня сейчас".' },
  { title: 'Мульти-провайдерность', desc: 'У UHNWI растет число параллельных отношений с брокерами (в среднем с 3 до 7), индустрия не добирает по качеству услуг.' },
  { title: 'Канал-микс по задаче', desc: 'Не "все в мобайле". Web и video часто важнее для сложных задач, mobile — для execution и портфельного доступа.' },
  { title: 'Специфика РФ', desc: 'Порог квала 12 млн ₽. Высокая концентрация: ~11.5 тыс. клиентов держат ~5.2 трлн ₽ (почти 50% активов физлиц).' },
];

const EVIDENCE_BASE = [
  { source: 'Capgemini (WWR 2023/2024)', metric: '55% HNWI', desc: 'Опыт в digital-каналах критичен при выборе WM-фирмы; 47% недовольны текущим интерфейсом. 78% UHNWI считают value-added услуги essential.' },
  { source: 'EY (Global Wealth Research)', metric: '44%', desc: 'Планируют изменить отношения с провайдерами за ~3 года. Из них >50% переведут более 25% активов. Мотивы: performance, diversification, volatility.' },
  { source: 'J.D. Power (2025 Study)', metric: '+72 pts', desc: 'Рост удовлетворенности (по шкале 1000) при наличии и использовании virtual assistant для advised клиентов (+47 pts для DIY).' },
  { source: 'Accenture (2025 Study)', metric: '+17%', desc: 'Advocates (лояльные клиенты) держат на 17% больше продуктов и размещают +5…+30% больше финансового портфеля в основном банке.' },
  { source: 'McKinsey (Experience-led growth)', metric: '+15-25%', desc: 'Потенциальный рост cross-sell при росте удовлетворенности ≥20%. Share-of-wallet растет на 5-10%, engagement на 20-30%.' },
  { source: 'BCG (Global Wealth Report)', metric: '20-30%', desc: 'Экономия времени (time savings) в servicing/onboarding при внедрении unified data platform и AI. Сокращение false positives на >40%.' }
];

const EFFECTS_DATA = [
  { metric: 'Удержание (Churn)', min: 5, max: 15, unit: '%', desc: 'Снижение AUM-attrition верхнего сегмента. Основание: масштаб планируемых перетоков (44%) + роль digital-каналов (55%) + роль RM (62%).' },
  { metric: 'AUM на клиента', min: 3, max: 10, unit: '%', desc: 'Рост share-of-wallet при устранении «цифровых провалов» и улучшении персонализации. До +10-20% при наличии off-platform агрегатора.' },
  { metric: 'Кросс-продажи', min: 15, max: 25, unit: '%', desc: 'Рост проникновения advisory tiers, кредитных/маржинальных продуктов, альтернатив и «семейных» услуг.' },
  { metric: 'Частота торгов', min: 5, max: 25, unit: '%', desc: 'Рост частоты self-service действий у активных трейдеров. До +10-40% к объему заявок через новые low-friction каналы.' },
  { metric: 'Cost-to-serve', min: 10, max: 25, unit: '%', desc: 'Снижение за 1-3 года за счет устранения лишних контактов, ошибок и роста самообслуживания. Экономия на операциях и комплаенсе.' },
];

const METRICS_TABLE = [
  { metric: 'ARPU / revenue per client', calc: '(Комиссии + advisory fees + net interest) / #клиентов', impact: 'Итоговая монетизация', dx: 'Омниканал + снижение трения + персонализация' },
  { metric: 'AUM per client', calc: 'AUM / #активных клиентов', impact: 'Основа fee-yield и маржинальности', dx: 'Share-of-wallet механики, агрегация активов, доверие' },
  { metric: 'Fee yield (bps)', calc: 'Доходы от AUM / средний AUM', impact: '«Цена» сервиса и mix продуктов', dx: 'Персонализация и value-added пакет' },
  { metric: 'Trading frequency', calc: '#сделок / активного клиента / период', impact: 'Комиссия, spread-доходы', dx: 'Быстрый execution, удобные сценарии ордеров' },
  { metric: 'Trade volume', calc: 'Σ объем торгов / клиент / период', impact: 'Доходы от комиссий/маржи', dx: 'Low-friction execution и быстрые коммуникации с RM' },
  { metric: 'Share-of-wallet', calc: 'AUM у вас / оценка total liquid wealth', impact: 'Главный драйвер роста без новых клиентов', dx: 'Консолидация, аналитика, персональные инсайты' },
  { metric: 'Cross-sell rate', calc: '#клиентов с ≥2 продуктами / #клиентов', impact: 'Диверсифицирует доход и удерживает', dx: 'UX-“next best action”, RM-инструменты' },
  { metric: 'Retention / churn', calc: 'Закрытие/нулевой AUM N дней', impact: 'Потеря будущего дохода', dx: 'Надежность, доверие, быстрое решение проблем' },
  { metric: 'AUM attrition', calc: 'max(0, outflow) / starting AUM', impact: 'Самая «дорогая» форма churn', dx: 'Прозрачность, advisory integration, value-added' },
  { metric: 'Cost-to-serve', calc: '(RM+ops+support) / активного клиента', impact: 'Прямой вклад в OPEX', dx: 'Самообслуживание, снижение обращений, automation' },
];

const FEATURES_ROI_TABLE = [
  { cluster: 'Performance & trust baseline', feature: 'Crash-free sessions, low latency, консистентность', metrics: 'Retention, NPS/CSAT, cost-to-serve', why: 'System performance и design — факторы digital-удовлетворенности', risks: 'Требует наблюдаемости (SLO/SLI)' },
  { cluster: 'RM-centric omnichannel', feature: 'Secure chat с RM, совместный просмотр, scheduling', metrics: 'AUM attrition ↓, share-of-wallet ↑', why: '62% Next-gen follow RM; недостаток инструментов подрывает продуктивность', risks: 'Комплаенс и запись коммуникаций' },
  { cluster: 'Holistic client view', feature: 'Единый профиль: портфель + цели + риск-профиль', metrics: 'AUM per client ↑, cross-sell ↑', why: 'Digital platform с holistic view — топ-capability', risks: 'Данные и согласия; качество мастер-данных' },
  { cluster: 'Personalized insights & alerts', feature: 'Actionable insights, персональные алерты', metrics: 'Engagement ↑, trading freq ↑', why: 'Клиенты обеспокоены отсутствием персонализированного advice', risks: 'Риск «alert fatigue»' },
  { cluster: 'Self-service journeys', feature: 'Онбординг/KYC, переводы, отчетность, справки', metrics: 'TTFX ↓, cost-to-serve ↓', why: 'CX-инициативы повышают satisfaction и снижают churn', risks: 'Ошибки автоматики дорого стоят' },
  { cluster: 'Digital assistant (bounded)', feature: 'Ассистент для рутины: "где документ?", "статус?"', metrics: 'CSAT ↑, cost-to-serve ↓', why: 'Наличие virtual assistant связано с +47…+72 satisfaction points', risks: 'Risk of hallucination, нельзя давать инвест. рекомендации' },
  { cluster: 'Low-friction order capture', feature: 'Быстрая отправка поручения, шаблоны, one-tap', metrics: 'Trade volume ↑, margin per trade ↑', why: 'Рост транзакций и объемов при digital order capture', risks: 'Регуляторика, anti-fraud' },
];

const SOURCES = [
  { name: 'J.D. Power — 2025 U.S. Wealth Management Digital Experience Study', url: 'https://www.jdpower.com/sites/default/files/file/2025-11-19/2025156%20U.S.%20Wealth%20Management%20Digital%20Experience%20Study.pdf' },
  { name: 'J.D. Power — 2025 U.S. Investor Satisfaction Study', url: 'https://www.jdpower.com/sites/default/files/file/2025-03/2025024%20U.S.%20Investor%20Satisfaction.pdf' },
  { name: 'Capgemini — Wealth Management Top Trends 2024', url: 'https://www.capgemini.com/wp-content/uploads/2024/01/Wealth-Management-Top-Trends-2024_web.pdf' },
  { name: 'Capgemini — World Wealth Report 2024 & 2025', url: 'https://www.capgemini.com/wp-content/uploads/2024/06/06_05_World-Wealth-Report-2024_ENG.pdf' },
  { name: 'EY — Global Wealth Research (assets in flux)', url: 'https://www.ey.com/en_us/insights/wealth-asset-management/where-can-wealth-managers-find-opportunity-when-assets-are-in-flux' },
  { name: 'Accenture — Global Banking Consumer Study 2025', url: 'https://www.accenture.com/content/dam/accenture/final/industry/banking/document/Accenture-Global-Banking-Consumer-Study-2025-Report.pdf' },
  { name: 'McKinsey — Experience-led growth (2023)', url: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/experience-led-growth-a-new-way-to-create-value' },
  { name: 'Boston Consulting Group — Global Wealth Report 2024', url: 'https://web-assets.bcg.com/0c/b4/1e8b9a66409a8deae6fc166aa26e/2024-global-wealth-report-july-2024-edit-02.pdf' },
  { name: 'Банк России — Обзор ключевых показателей брокеров (IV кв. 2024)', url: 'https://www.cbr.ru/collection/collection/file/55198/review_broker_q4_2024.pdf' }
];

// --- COMPONENTS ---

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500/30">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/wealth/1920/1080?blur=10')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium mb-6 border border-amber-500/20">
              <BookOpen className="w-4 h-4" />
              <span>Executive Summary Report</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif leading-tight">
              Цифровой опыт HNWI/UHNWI
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Как мобильный и веб-клиентский опыт брокера влияет на отток, AUM и прибыльность. 
              Интерактивный отчет на основе кросс-индустриальных данных, исследований McKinsey, Capgemini, EY и J.D. Power.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Client Portrait Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
              Портрет клиента и ожидания
            </h2>
            <p className="mt-4 text-zinc-400 max-w-3xl">
              Кто такие HNWI/UHNWI клиенты и чего они ждут от цифровых фронтов брокера.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_PORTRAIT.map((item, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context & Expectations Chart */}
      <section className="py-16 sm:py-24 bg-zinc-900/30 border-y border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
                Активы «в движении»
              </h2>
              <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  В 2024–2025 контуре ожидания HNWI/UHNWI смещаются от «сохранить» к «управлять сложностью». 
                  Почти половина wealth-клиентов глобально планировали изменить отношения с провайдерами в горизонте ~3 лет.
                </p>
                <p>
                  У Next-gen HNWI лояльность существенно «переезжает» с института на конкретного Relationship Manager (RM). 
                  При этом цифровой фронт — не замена, а усилитель (или разрушитель) человеческого доверия.
                </p>
              </div>
              <div className="mt-8 space-y-6">
                {EXPECTATIONS_DATA.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                      <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-300">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-center">
               <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={EXPECTATIONS_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={180} tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fafafa', borderRadius: '8px' }}
                      itemStyle={{ color: '#fafafa' }}
                      cursor={{ fill: '#27272a' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
                      {EXPECTATIONS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Base */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
              Доказательная база
            </h2>
            <p className="mt-4 text-zinc-400">
              Сводка исследований и кейсов, связывающих цифровой опыт с удержанием и метриками дохода.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVIDENCE_BASE.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col"
              >
                <div className="text-xs font-bold tracking-wider text-amber-500 uppercase mb-2">{item.source}</div>
                <div className="text-3xl font-serif text-white mb-4">{item.metric}</div>
                <p className="text-sm text-zinc-400 leading-relaxed flex-grow">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantitative Effects */}
      <section className="py-16 sm:py-24 bg-zinc-900/30 border-y border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
              Диапазоны эффектов для брокера
            </h2>
            <p className="mt-4 text-zinc-400">
              Рабочие диапазоны для продуктовых метрик брокера при улучшении цифрового опыта.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {EFFECTS_DATA.map((effect, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="flex-shrink-0 w-32 text-center p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-2xl font-bold text-amber-400 font-mono">
                    {effect.min}-{effect.max}{effect.unit}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${effect.metric === 'Cost-to-serve' || effect.metric === 'Удержание (Churn)' ? 'text-emerald-400' : 'text-emerald-400'}`}>
                    {effect.metric === 'Cost-to-serve' || effect.metric === 'Удержание (Churn)' ? 'Снижение' : 'Рост'}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{effect.metric}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{effect.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Measurement & Implementation */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
                Как измерять влияние
              </h2>
              <p className="mt-4 text-zinc-400">
                Сегмент HNWI/UHNWI сложен тем, что AUM и активность сильнее зависят от рынков, налоговых событий и качества advice. Измерение должно быть «устойчивым к шуму».
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">Cohort retention + AUM survival:</strong>
                    <p className="text-sm text-zinc-400">По каждой когорте (месяц/квартал подключения) строить survival по account churn и AUM-attrition. Это лучше, чем "annual churn", так как улавливает перетоки раньше.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">Difference-in-differences / step-wedge:</strong>
                    <p className="text-sm text-zinc-400">Для HNWI часто опасно делать «жесткий A/B» на всех клиентах. Реалистичная схема — по RM-пулу или регионам запускать фичи волнами и оценивать дифференциальный эффект.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">Uplift-тесты на коммуникациях и "nudges":</strong>
                    <p className="text-sm text-zinc-400">Персональные алерты/инсайты хорошо тестируются рандомизацией на уровне события и измерением следующего действия (вход, звонок RM, сделка).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">Контроль за "RM-migration risk":</strong>
                    <p className="text-sm text-zinc-400">Учитывая 62% "follow RM", метрика удержания RM и качество его tooling становятся частью продуктового KPI: RM churn — предиктор клиентского churn.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8">
              <h3 className="text-xl font-semibold text-white mb-8 font-serif">План внедрения (Gantt)</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-medium">Foundation (Data & Dashboards)</span>
                    <span className="text-zinc-500 font-mono text-xs">Месяцы 1-3</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-1/3 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-medium">Quick Experiments</span>
                    <span className="text-zinc-500 font-mono text-xs">Месяцы 3-5</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-amber-500 w-1/4 left-1/3 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-medium">RM-centric Pilots</span>
                    <span className="text-zinc-500 font-mono text-xs">Месяцы 5-8</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-amber-400 w-1/4 left-5/12 rounded-full" style={{ left: '41.6%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-medium">Scale & Govern</span>
                    <span className="text-zinc-500 font-mono text-xs">Месяцы 8-12</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-amber-300 w-1/3 left-2/3 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPENDICES */}
      <div className="border-t-4 border-zinc-800 mt-12">
        <div className="bg-zinc-900 py-8 text-center border-b border-zinc-800">
          <h1 className="text-3xl font-bold tracking-widest text-zinc-500 uppercase">Appendices</h1>
        </div>

        {/* Appendix 1: Causal Chain Visualization */}
        <section className="py-16 sm:py-24 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex items-center gap-4">
              <Network className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif">
                Приложение 1: Причинные цепочки (Causal Chains)
              </h2>
            </div>
            
            <div className="overflow-x-auto pb-8">
              <div className="min-w-[900px] flex flex-col gap-8">
                {/* Level 1 */}
                <div className="flex justify-center">
                  <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-3 rounded-lg font-semibold text-center w-64">
                    Цифровой опыт (Mobile + Web)
                  </div>
                </div>
                
                {/* Arrows down */}
                <div className="flex justify-center h-8">
                  <div className="w-px bg-zinc-700 h-full"></div>
                </div>

                {/* Level 2 */}
                <div className="grid grid-cols-6 gap-4">
                  {['Производительность и надежность', 'Возможности и самообслуживание', 'Персонализация и инсайты', 'Уверенность в безопасности', 'Интеграция с Advisor/RM', 'Омниканальная консистентность'].map((text, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-700 text-zinc-300 p-3 rounded-lg text-xs text-center flex items-center justify-center">
                      {text}
                    </div>
                  ))}
                </div>

                {/* Arrows down */}
                <div className="grid grid-cols-6 gap-4 h-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex justify-center"><div className="w-px bg-zinc-700 h-full"></div></div>
                  ))}
                </div>

                {/* Level 3 */}
                <div className="grid grid-cols-6 gap-4">
                  {['Меньше трения и инцидентов', 'Выше % успешного завершения задач', 'Выше воспринимаемая релевантность', 'Выше доверие / ниже тревожность', 'Более сильные отношения (качество)', 'Предсказуемый опыт во всех каналах'].map((text, i) => (
                    <div key={i} className="bg-zinc-800 border border-zinc-600 text-zinc-200 p-3 rounded-lg text-xs text-center flex items-center justify-center">
                      {text}
                    </div>
                  ))}
                </div>

                {/* Arrows down */}
                <div className="grid grid-cols-6 gap-4 h-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex justify-center"><div className="w-px bg-zinc-700 h-full"></div></div>
                  ))}
                </div>

                {/* Level 4 */}
                <div className="grid grid-cols-6 gap-4">
                  {['Выше вовлеченность (сессии, MAU)', 'Более быстрый онбординг и TTFX', 'Намерение увеличить share-of-wallet', 'Ниже склонность к оттоку (churn)', 'Выше удержание и рекомендации', 'Меньше обращений в поддержку'].map((text, i) => (
                    <div key={i} className="bg-zinc-800 border border-zinc-600 text-zinc-200 p-3 rounded-lg text-xs text-center flex items-center justify-center">
                      {text}
                    </div>
                  ))}
                </div>

                {/* Arrows down to Level 5 (Complex routing simplified) */}
                <div className="flex justify-center h-8 relative">
                  <div className="w-px bg-zinc-700 h-full"></div>
                  <div className="absolute top-1/2 w-3/4 h-px bg-zinc-700"></div>
                </div>

                {/* Level 5 */}
                <div className="grid grid-cols-4 gap-6">
                  {['Частота/объем торгов (Trading freq/volume)', 'Приток AUM / доля кошелька (wallet share)', 'Снижение Cost-to-serve', 'Снижение AUM attrition'].map((text, i) => (
                    <div key={i} className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg text-sm font-medium text-center flex items-center justify-center">
                      {text}
                    </div>
                  ))}
                </div>

                {/* Arrows down */}
                <div className="flex justify-center h-8 relative">
                  <div className="w-px bg-zinc-700 h-full"></div>
                  <div className="absolute top-1/2 w-1/2 h-px bg-zinc-700"></div>
                </div>

                {/* Level 6 */}
                <div className="flex justify-center">
                  <div className="bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 px-8 py-4 rounded-xl font-bold text-lg text-center w-80 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    Выручка и прибыльность
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Appendix 2: Metrics Table */}
        <section className="py-16 sm:py-24 bg-zinc-900/50 border-y border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex items-center gap-4">
              <TableProperties className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif">
                Приложение 2: Полный список продуктовых метрик
              </h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
              <table className="min-w-full divide-y divide-zinc-800 text-sm text-left">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Метрика</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Как считать (практично)</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Почему влияет на прибыль</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Что в DX влияет сильнее всего</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {METRICS_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-amber-400">{row.metric}</td>
                      <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{row.calc}</td>
                      <td className="px-6 py-4 text-zinc-300">{row.impact}</td>
                      <td className="px-6 py-4 text-zinc-400">{row.dx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Appendix 3: Features ROI Table */}
        <section className="py-16 sm:py-24 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex items-center gap-4">
              <FileText className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif">
                Приложение 3: Таблица приоритезации фич по ROI
              </h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
              <table className="min-w-full divide-y divide-zinc-800 text-sm text-left">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Кластер фич</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Что именно сделать в mobile/web</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Какие метрики двигает</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Почему ожидается эффект</th>
                    <th className="px-6 py-4 font-semibold text-zinc-300">Риски/условия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {FEATURES_ROI_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.cluster}</td>
                      <td className="px-6 py-4 text-zinc-300">{row.feature}</td>
                      <td className="px-6 py-4 text-emerald-400 font-medium">{row.metrics}</td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">{row.why}</td>
                      <td className="px-6 py-4 text-amber-500/80 text-xs">{row.risks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Sources Section */}
      <section className="py-16 sm:py-24 bg-zinc-900/30 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-serif mb-8">
            Первичные источники
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOURCES.map((source, i) => (
              <a 
                key={i} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
              >
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  {source.name}
                </span>
              </a>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <h3 className="text-sm font-semibold text-amber-500 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Ограничения и допущения
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Почти все публичные источники по wealth-digital — либо опросы (stated preferences), либо пресс-релизы исследований удовлетворенности. Это полезно для выявления направлений и порядка величин, но слабее для строгой причинности. Риск неверной интерпретации: смешение "рынок вырос" и "мы улучшили продукт". AUM и активность у HNWI чувствительны к рынкам (ставки, волатильность). Нужны DiD/holdout-подходы, иначе эффект цифровых изменений будет переоценен.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-500">
            На основе отчета «Как мобильный и веб-клиентский опыт брокера для HNWI/UHNWI влияет на отток, AUM и прибыльность».
          </p>
        </div>
      </footer>
    </div>
  );
}