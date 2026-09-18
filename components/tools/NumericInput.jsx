'use client';

import React from 'react';

export function NumericInput({
  id,
  label,
  value,
  onChange,
  prefix = '',
  suffix = '',
  min = 0,
  max,
  step = 1,
  placeholder = '0',
  hint = '',
  required = false,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
        </div>
      )}

      <div className="relative rounded-xl shadow-2xs">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="text-slate-400 font-semibold text-sm">{prefix}</span>
          </div>
        )}

        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
            onChange(isNaN(val) ? 0 : val);
          }}
          className={`block w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-hidden transition min-h-[48px] ${
            prefix ? 'pl-8' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'}`}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
            <span className="text-slate-400 font-medium text-xs">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}
