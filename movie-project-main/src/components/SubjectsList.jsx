import React from "react";

function SubjectsList({ grade, setSelectedSubject }) {
  const subjects = {
    "Grade 1": ["Arabic", "Math"],
    "Grade 2": ["Arabic", "Math"],
    "Grade 3": ["Arabic", "Math"],
    "Grade 4": ["Arabic", "Math", "Science", "Social Studies"],
    "Grade 5": ["Arabic", "Math", "Science", "Social Studies"],
    "Grade 6": ["Arabic", "Math", "Science", "Social Studies"]
  };

  return (
    <div className="subjects-list">
      {subjects[grade]?.map((subject) => (
        <button key={subject} onClick={() => setSelectedSubject(subject)}>
          {subject}
        </button>
      ))}
    </div>
  );
}

export default SubjectsList;
