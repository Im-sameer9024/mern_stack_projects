import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import CustomSelectField from '@/shared/components/custom/CustomSelectField';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CustomBarChart = ({ apiData = [] }) => {
  const currentYear = new Date().getFullYear();

  // ✅ Ensure apiData is always array
  const safeData = useMemo(() => {
    return Array.isArray(apiData) ? apiData : [];
  }, [apiData]);
  const [year, setYear] = useState(null);

  // ✅ Extract years safely
  const availableYears = useMemo(() => {
    return [...new Set(safeData.map((item) => item?._id?.year))].filter(Boolean);
  }, [safeData]);

  const selectedYear =
    year || (availableYears.includes(currentYear) ? currentYear : availableYears[0]);

  // ✅ Transform data based on selected year
  const chartData = useMemo(() => {
    const dataMap = {};

    safeData.forEach((item) => {
      if (item?._id?.year === selectedYear) {
        dataMap[item._id.month] = item.totalAmount;
      }
    });

    return monthNames.map((month, index) => ({
      month,
      amount: dataMap[index + 1] || 0,
    }));
  }, [safeData, selectedYear]);

  const getBarColor = (index) => (index % 2 === 0 ? '#875cf5' : '#cfbefb');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-slate-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0]?.payload?.month}</p>
          <p className="text-sm text-slate-600">
            Amount:{' '}
            <span className="text-sm font-medium text-slate-900">
              ₹{payload[0]?.payload?.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 p-4 rounded">
      {/* 🔥 Year Filter */}
      <div className="flex justify-end mb-4">
        <CustomSelectField
          placeholder="Select year"
          value={year ?? selectedYear}
          onChange={(val) => setYear(Number(val))}
          options={availableYears.map((y) => ({
            label: String(y),
            value: y,
          }))}
        />
      </div>

      {/* 📊 Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
