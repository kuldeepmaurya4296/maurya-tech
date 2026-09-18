'use client';

import React, { useState, useMemo } from 'react';
import { NumericInput } from '@/components/tools/NumericInput';
import { CalculatorContainer } from '@/components/tools/CalculatorContainer';
import { DollarSign, Clock, Sparkles, Building, Briefcase } from 'lucide-react';

export function HourlyToAnnualCalculator({
  country = 'us',
  countryName = 'United States',
  computeConfig = {},
  tool,
}) {
  const currencySymbol = '$';

  // Input states
  const [hourlyRate, setHourlyRate] = useState(45);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [contractorType, setContractorType] = useState('w2'); // 'w2' or '1099'

  // Pure client-side math
  const calculation = useMemo(() => {
    const rate = Math.max(0, Number(hourlyRate) || 0);
    const weeklyHours = Math.max(1, Number(hoursPerWeek) || 0);
    const annualWeeks = Math.max(1, Number(weeksPerYear) || 0);

    const totalHours = weeklyHours * annualWeeks;
    const grossAnnual = rate * totalHours;
    const grossMonthly = grossAnnual / 12;
    const grossBiweekly = grossAnnual / 26;
    const grossWeekly = grossAnnual / annualWeeks;
    const grossDaily = rate * (weeklyHours / 5);

    // Tax Estimation (US Federal 2026 single standard)
    const standardDeduction = 14600;
    const taxableFederal = Math.max(0, grossAnnual - standardDeduction);

    let federalIncomeTax = 0;
    const brackets = [
      { min: 0, max: 11600, rate: 0.1 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ];

    for (const b of brackets) {
      if (taxableFederal > b.min) {
        const taxableInBracket = Math.min(taxableFederal, b.max) - b.min;
        federalIncomeTax += taxableInBracket * b.rate;
      }
    }

    // FICA / Self-Employment Tax
    // W-2 pays 7.65% employee share; 1099 pays full 15.3% self-employment tax
    const ficaRate = contractorType === '1099' ? 0.153 : 0.0765;
    const ficaTax = grossAnnual * ficaRate;

    // Average State Tax Estimate (~4.5%)
    const stateTaxEstimate = grossAnnual * 0.045;

    const totalDeductions = federalIncomeTax + ficaTax + stateTaxEstimate;
    const netAnnual = Math.max(0, grossAnnual - totalDeductions);
    const netMonthly = netAnnual / 12;

    return {
      totalHours,
      grossAnnual: Math.round(grossAnnual),
      grossMonthly: Math.round(grossMonthly),
      grossBiweekly: Math.round(grossBiweekly),
      grossWeekly: Math.round(grossWeekly),
      grossDaily: Math.round(grossDaily),
      federalIncomeTax: Math.round(federalIncomeTax),
      ficaTax: Math.round(ficaTax),
      stateTaxEstimate: Math.round(stateTaxEstimate),
      totalDeductions: Math.round(totalDeductions),
      netAnnual: Math.round(netAnnual),
      netMonthly: Math.round(netMonthly),
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear, contractorType]);

  const formatMoney = (val) => {
    return `${currencySymbol}${Number(val || 0).toLocaleString('en-US')}`;
  };

  const summaryText = `Hourly Wage: ${formatMoney(hourlyRate)}/hr (${hoursPerWeek}h/wk) → Annual Gross: ${formatMoney(
    calculation.grossAnnual
  )} | Estimated Monthly Take-Home (${contractorType.toUpperCase()}): ${formatMoney(calculation.netMonthly)}/mo`;

  return (
    <CalculatorContainer
      country={country}
      countryName={countryName}
      toolName={tool?.name || 'Hourly to Annual Salary Calculator'}
      category="salary"
      badge="2026 US Wage & Tax Standards"
      description="Convert your hourly pay to annual, monthly, bi-weekly, and weekly gross income with estimated federal, FICA, and state taxes for W-2 employees and 1099 contractors."
      resultSummaryText={summaryText}
      faqs={tool?.seo?.faqSchema || []}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Card */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Wage & Schedule Details</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your hourly pay and working schedule below.
            </p>
          </div>

          <NumericInput
            id="hourly-input"
            label="Hourly Rate"
            prefix="$"
            value={hourlyRate}
            onChange={setHourlyRate}
            step={1}
            min={0}
            placeholder="45"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <NumericInput
              id="hours-per-week"
              label="Hours Per Week"
              suffix="hrs"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              step={1}
              min={1}
              max={80}
            />
            <NumericInput
              id="weeks-per-year"
              label="Weeks Per Year"
              suffix="wks"
              value={weeksPerYear}
              onChange={setWeeksPerYear}
              step={1}
              min={1}
              max={52}
            />
          </div>

          {/* Employment Type Toggle (W-2 vs 1099) */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Employment Status (Tax Type)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContractorType('w2')}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                  contractorType === 'w2'
                    ? 'border-cyan-600 bg-cyan-50/70 text-cyan-950 shadow-xs ring-2 ring-cyan-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-cyan-600" />
                  <span>W-2 Employee</span>
                </div>
                <span className="text-[10px] text-slate-500 font-normal">7.65% FICA (Employer Match)</span>
              </button>

              <button
                type="button"
                onClick={() => setContractorType('1099')}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                  contractorType === '1099'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>1099 Contractor</span>
                </div>
                <span className="text-[10px] text-slate-500 font-normal">15.3% Self-Employment Tax</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Result Highlight Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0A192F] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Annual Gross Earnings
              </span>
              <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                {calculation.totalHours} hrs/yr
              </span>
            </div>

            {/* Big Headline Gross Annual */}
            <div className="space-y-1">
              <div className="text-xs text-slate-300 font-medium">Gross Annual Salary</div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                <span>{formatMoney(calculation.grossAnnual)}</span>
                <span className="text-sm font-medium text-slate-300">/ year</span>
              </div>
            </div>

            {/* Estimated Take-Home Net */}
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 font-bold block">Estimated Take-Home (Net Pay)</span>
                <span className="text-[11px] text-slate-300">After Federal, FICA & State deductions</span>
              </div>
              <span className="text-xl font-extrabold text-emerald-300">{formatMoney(calculation.netMonthly)}/mo</span>
            </div>

            {/* Frequency Pay Table */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Gross Pay Equivalents
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-200">
                <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-bold">{formatMoney(calculation.grossMonthly)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                  <span>Bi-Weekly:</span>
                  <span className="font-bold">{formatMoney(calculation.grossBiweekly)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                  <span>Weekly:</span>
                  <span className="font-bold">{formatMoney(calculation.grossWeekly)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 flex justify-between">
                  <span>Daily (8h):</span>
                  <span className="font-bold">{formatMoney(calculation.grossDaily)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorContainer>
  );
}
