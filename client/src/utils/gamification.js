export const calculateStreak = (
  completionDates = []
) => {

  if (
    completionDates.length === 0
  ) {
    return 0;
  }

  const dates =
    [...completionDates]
      .sort();

  let streak = 1;

  for (
    let i = dates.length - 1;
    i > 0;
    i--
  ) {

    const current =
      new Date(dates[i]);

    const previous =
      new Date(dates[i - 1]);

    const diffDays =
      Math.floor(
        (current - previous) /
        (1000 * 60 * 60 * 24)
      );

    if (diffDays === 1) {

      streak++;

    } else {

      break;

    }

  }

  return streak;

};
export const calculateBestStreak = (
  completionDates = []
) => {

  if (
    completionDates.length === 0
  ) {
    return 0;
  }

  const dates =
    [...completionDates]
      .sort();

  let best = 1;
  let current = 1;

  for (
    let i = 1;
    i < dates.length;
    i++
  ) {

    const prev =
      new Date(
        dates[i - 1]
      );

    const curr =
      new Date(
        dates[i]
      );

    const diffDays =
      Math.floor(
        (curr - prev) /
        (1000 * 60 * 60 * 24)
      );

    if (diffDays === 1) {

      current++;

      best =
        Math.max(
          best,
          current
        );

    } else {

      current = 1;

    }

  }

  return best;

};
export const calculateConsistency = (
  completionDates = []
) => {

  if (
    completionDates.length === 0
  ) {
    return 0;
  }

  const firstDate =
    new Date(
      completionDates[0]
    );

  const today =
    new Date();

  const totalDays =
    Math.max(
      1,
      Math.floor(
        (today - firstDate) /
        (1000 * 60 * 60 * 24)
      ) + 1
    );

  return Math.round(
    (
      completionDates.length /
      totalDays
    ) * 100
  );

};
export const generateHeatmap = (
  completionDates = []
) => {

  const last30Days = [];

  for (
    let i = 29;
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

    last30Days.push(
      completionDates.includes(
        formatted
      )
    );

  }

  return last30Days;

};
export const getMostActiveDay = (
  completionDates = []
) => {

  if (
    completionDates.length === 0
  ) {
    return "N/A";
  }

  const counts = {};

  completionDates.forEach(
    (date) => {

      const day =
        new Date(date)
          .toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          );

      counts[day] =
        (counts[day] || 0) + 1;

    }
  );

  return Object.keys(
    counts
  ).reduce((a, b) =>
    counts[a] > counts[b]
      ? a
      : b
  );

};