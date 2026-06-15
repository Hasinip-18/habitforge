import { useState } from "react";
import axios from "axios";

function AISuggestions() {

  const [goal, setGoal] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {

    try {

      const response =
        await axios.post(
          "http://localhost:8000/api/ai/suggest",
          { goal }
        );

      setSuggestions(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  const addSuggestionAsHabit = async (
  suggestion
) => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await axios.post(
      "http://localhost:8000/api/habits",
      {
        text: suggestion,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(
      "Habit added successfully!"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to add habit"
    );

  }

};

  return (

    <div className="ai-card">

      <h2>
        🤖 AI Habit Suggestions
      </h2>

      <input
        type="text"
        placeholder="Enter your goal..."
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value)
        }
      />

      <button
        onClick={getSuggestions}
      >
        Generate
      </button>
{suggestions.map(
  (suggestion, index) => (

    <div
      key={index}
      className="suggestion-item"
    >

      <span>
        {suggestion}
      </span>

      <button
        onClick={() =>
          addSuggestionAsHabit(
            suggestion
          )
        }
      >
        Add Habit
      </button>

    </div>

  )
)}

    </div>

  );
}

export default AISuggestions;