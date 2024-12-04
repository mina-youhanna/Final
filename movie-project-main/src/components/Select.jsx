import React from "react"; // استيراد مكتبة React
import styled from "styled-components"; // استيراد مكتبة styled-components لتنسيق CSS في JavaScript

// تعريف مكون SelectContainer باستخدام styled-components
const SelectContainer = styled.div`
  display: flex; // استخدام flexbox لتوزيع العناصر بشكل أفقي
  justify-content: center; // محاذاة العناصر في الوسط أفقياً
  gap: 20px; // فجوة بين العناصر
  margin-bottom: 20px; // مسافة من أسفل
  background-color: rgba(255, 255, 255, 0.9); // لون خلفية شفاف أبيض
  padding: 20px; // تباعد داخلي
  border-radius: 8px; // زوايا مدورة
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // ظل خفيف
  margin-top: 80px; // مسافة من أعلى لتناسب شريط التنقل
`;

// تعريف مكون SelectBox باستخدام styled-components
const SelectBox = styled.select`
  padding: 12px; // تباعد داخلي
  font-size: 16px; // حجم الخط
  border: 1px solid #ccc; // حدود خفيفة
  border-radius: 4px; // زوايا مدورة
  width: 200px; // عرض المربع
`;

// تعريف مكون Button باستخدام styled-components
const Button = styled.button`
  padding: 12px 24px; // تباعد داخلي
  background-color: #28a745; // لون خلفية أخضر
  color: white; // لون النص أبيض
  border: none; // إزالة الحدود
  border-radius: 4px; // زوايا مدورة
  cursor: pointer; // مؤشر الفأرة عند التمرير
  font-size: 16px; // حجم الخط
  &:hover {
    background-color: #218838; // لون الخلفية عند التمرير
  }
`;

// تعريف مكون VideoSelector واستقبال المعاملات
const VideoSelector = ({ grade, setGrade, subject, setSubject, handleSubmit, subjects }) => {
  // تحديث القائمة بناءً على الصف المختار
  const updateSubjects = (e) => {
    setGrade(e.target.value); // تحديث الصف المختار
    setSubject(""); // إعادة تعيين المادة المختارة
  };

  // عرض مكونات الاختيار
  return (
    <SelectContainer>
      <SelectBox value={grade} onChange={updateSubjects}>
        <option value="">Select Grade</option> {/* خيار افتراضي */}
        <option value="1">Grade 1</option>
        <option value="2">Grade 2</option>
        <option value="3">Grade 3</option>
        <option value="4">Grade 4</option>
        <option value="5">Grade 5</option>
        <option value="6">Grade 6</option>
      </SelectBox>
      <SelectBox value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="">Select Subject</option> {/* خيار افتراضي */}
        {grade && subjects[grade].map((subj, index) => (
          <option key={index} value={subj}>
            {subj} {/* عرض المادة */}
          </option>
        ))}
      </SelectBox>
      <Button onClick={() => handleSubmit()}>Show Lessons</Button> {/* زر لعرض الدروس */}
    </SelectContainer>
  );
};

// تصدير المكون كقيمة افتراضية
export default VideoSelector;
