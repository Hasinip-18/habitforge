import axios from "axios";

function ExportCSV({
  habits,
  user,
  setUser,
}) {

  const exportCSV = async () => {

    // Stop if user has used all free exports
    if (
      !user.isPremium &&
      user.csvExports >= 5
    ) {

      alert(
        "🚀 You've used all 5 FREE CSV exports!\nUpgrade to HabitForge Pro to continue."
      );

      return;

    }

    const headers = [
      "Habit",
      "Category",
      "Difficulty",
      "Frequency",
      "Completed",
    ];

    const rows = habits.map((habit) => [

      habit.text,

      habit.category,

      habit.difficulty,

      habit.frequency,

      habit.completed
        ? "Yes"
        : "No",

    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) =>
          row.join(",")
        )
        .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "HabitForge_Data.csv";

    a.click();

    window.URL.revokeObjectURL(
      url
    );

    // Increase export count
    if (!user.isPremium) {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/csv-export`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUser({
        ...user,
        csvExports:
          user.csvExports + 1,
      });

    }

  };

  return (

    <div className="export-section">

      <button
        className="export-btn"
        onClick={exportCSV}
      >
        📄 Export CSV
      </button>

      <p className="export-count">

        {user?.isPremium
          ? "♾️ Unlimited Exports"
          : `📄 ${
              5 -
              (user?.csvExports || 0)
            } Free Exports Left`}

      </p>

    </div>

  );

}

export default ExportCSV;