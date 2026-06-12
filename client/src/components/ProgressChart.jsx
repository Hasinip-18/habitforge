import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProgressChart() {

  const data = [
    { day: "Mon", xp: 20 },
    { day: "Tue", xp: 35 },
    { day: "Wed", xp: 40 },
    { day: "Thu", xp: 60 },
    { day: "Fri", xp: 70 },
    { day: "Sat", xp: 90 },
    { day: "Sun", xp: 120 },
  ];

  return (
    <div className="chart-card">

      <h2>Weekly Progress</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="xp"
            stroke="#a855f7"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProgressChart;