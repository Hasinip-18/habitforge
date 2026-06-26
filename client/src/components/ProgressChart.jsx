import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function ProgressChart({
  habits,
}) {

const data = [];

for (
  let i = 6;
  i >= 0;
  i--
) {

  const date =
    new Date();

  date.setDate(
    date.getDate() - i
  );

  const formatted =
    date
      .toISOString()
      .split("T")[0];

  const count =
    habits.filter((habit) =>

      habit
        .completionDates
        ?.includes(
          formatted
        )

    ).length;

  data.push({

    day:
      date.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      ),

    completions: count,

  });

}
  return (
    <div className="chart-card">

      <h2>📈 Weekly Habit Analytics</h2>

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
            dataKey="completions"
            stroke="#a855f7"
            strokeWidth={3}
            dot={{ r: 5 }}
activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProgressChart;