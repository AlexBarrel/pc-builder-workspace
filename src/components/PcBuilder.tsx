import React, { useState } from 'react';
import { HARDWARE_CATALOG, SLOTS } from '../data/hardwareData';
import type { HardwareItem, ComponentCategory, CompatibilityIssue } from '../types/hardware';

export default function PcBuilder() {
  const [selectedComponents, setSelectedComponents] = useState<Partial<Record<ComponentCategory, HardwareItem>>>({});
  const [activeModalCategory, setActiveModalCategory] = useState<ComponentCategory | null>(null);

  const handleSelect = (item: HardwareItem) => {
    setSelectedComponents(prev => ({
      ...prev,
      [item.category]: item
    }));
    setActiveModalCategory(null);
  };

  const handleRemove = (category: ComponentCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponents(prev => {
      const copy = { ...prev };
      delete copy[category];
      return copy;
    });
  };

  const totalPrice = Object.values(selectedComponents).reduce((acc, item) => acc + (item?.price || 0), 0);

  const totalWattage = Object.values(selectedComponents).reduce((acc, item) => {
    return acc + (item?.specs?.powerConsumptionWatts || 0);
  }, 0);

  const getIssues = (): CompatibilityIssue[] => {
    const issues: CompatibilityIssue[] = [];
    const cpu = selectedComponents['cpu'];
    const mb = selectedComponents['motherboard'];
    const ram = selectedComponents['ram'];
    const psu = selectedComponents['psu'];

    if (cpu && mb && cpu.specs.socket !== mb.specs.socket) {
      issues.push({
        type: 'error',
        title: 'Несовместимый сокет',
        message: `Процессор (${cpu.specs.socket}) не подходит к материнской плате (${mb.specs.socket}).`
      });
    }

    if (mb && ram && mb.specs.memoryType !== ram.specs.memoryType) {
      issues.push({
        type: 'error',
        title: 'Несовместимый тип памяти',
        message: `Материнская плата требует ${mb.specs.memoryType}, а память — ${ram.specs.memoryType}.`
      });
    }

    if (psu && psu.specs.psuWattage && psu.specs.psuWattage < totalWattage) {
      issues.push({
        type: 'error',
        title: 'Недостаточно мощности БП',
        message: `Система потребляет ~${totalWattage} Вт, а блок питания рассчитан на ${psu.specs.psuWattage} Вт.`
      });
    }

    return issues;
  };

  const issues = getIssues();
  const catalogItems = HARDWARE_CATALOG.filter(item => item.category === activeModalCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Шапка без технического стека */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <span className="text-indigo-500">⚡</span> Конфигуратор ПК
          </h1>
          <p className="text-slate-400 mt-1">Соберите свой идеальный компьютер с проверкой совместимости железа</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl shadow-lg">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Энергопотребление</div>
            <div className="text-lg font-bold text-amber-400">{totalWattage} Вт</div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Итого стоимость</div>
            <div className="text-xl font-black text-emerald-400">${totalPrice}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Слоты */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-200 mb-4">Конфигурация системы</h2>

          {SLOTS.map(slot => {
            const selected = selectedComponents[slot.category];
            return (
              <div 
                key={slot.category}
                onClick={() => setActiveModalCategory(slot.category)}
                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Исправлен контейнер иконки: фиксированная ширина, перенос слов/уменьшенный текст */}
                  <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-[10px] tracking-tighter text-center px-1 group-hover:text-indigo-400 leading-tight">
                    {slot.category.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{slot.label}</div>
                    {selected ? (
                      <>
                        <div className="text-base font-semibold text-white mt-0.5">{selected.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{selected.brand} • <span className="text-emerald-400">${selected.price}</span></div>
                      </>
                    ) : (
                      <div className="text-sm font-medium text-slate-500 italic mt-0.5">Компонент не выбран (Нажмите для выбора)</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selected && (
                    <button 
                      onClick={(e) => handleRemove(slot.category, e)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                  <div className="text-slate-600 group-hover:text-indigo-400">→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Проверка совместимости */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-200 mb-4">Статус совместимости</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-6 shadow-xl">
            {issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-3">✓</div>
                <h3 className="text-base font-bold text-white">Всё отлично!</h3>
                <p className="text-xs text-slate-400 mt-1">Конфликтов в железе не обнаружено.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Обнаружены проблемы ({issues.length})</div>
                {issues.map((issue, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border bg-rose-950/30 border-rose-900/50 text-rose-200 text-sm">
                    <div className="font-bold flex items-center gap-2"><span>🔴</span> {issue.title}</div>
                    <div className="text-xs mt-1 opacity-90">{issue.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {activeModalCategory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white capitalize">Выбор: {activeModalCategory}</h3>
              <button onClick={() => setActiveModalCategory(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {catalogItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500">В этой категории пока нет комплектующих.</div>
              ) : (
                catalogItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.brand}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-400">${item.price}</div>
                      <div className="text-xs text-indigo-400 mt-0.5">Выбрать →</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-950/30 flex justify-end">
              <button onClick={() => setActiveModalCategory(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg">Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}