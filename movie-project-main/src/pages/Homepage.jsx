import React, { useState, useEffect } from "react"; // استيراد مكتبة React والمكونات useState وuseEffect
import styled, { keyframes } from "styled-components"; // استيراد مكتبة styled-components وتفاعل keyframes
import Navbar from "../components/Navbar"; // استيراد مكون Navbar
import Select from "../components/Select"; // استيراد مكون Select
import Carousel from "../components/Carousel"; // استيراد مكون Carousel

// تعريف مكون Container باستخدام styled-components
const Container = styled.div`
  display: flex; // استخدام flexbox لتوزيع العناصر بشكل أفقي
  flex-direction: column; // ترتيب العناصر بشكل عمودي
  align-items: center; // محاذاة العناصر في الوسط أفقياً
  justify-content: flex-start; // محاذاة العناصر في الأعلى
  min-height: 100vh; // ارتفاع الحاوية 100% من ارتفاع النافذة
  background-image: url('https://images.pexels.com/photos/8500417/pexels-photo-8500417.jpeg'); // تحديد صورة الخلفية
  background-size: cover; // جعل الخلفية تغطي كامل الحاوية
  background-position: center; // محاذاة الخلفية في المركز
  background-attachment: fixed; // تثبيت الخلفية
  padding: 20px; // تباعد داخلي
  color: #333; // لون النص
  margin-top: 100px; // مسافة من أعلى
  width: 100%; // عرض الحاوية 100%
`;

// تعريف مكون Header باستخدام styled-components
const Header = styled.header`
  text-align: center; // محاذاة النص في المركز
  margin-bottom: 40px; // مسافة من أسفل
`;

// تعريف مكون Title باستخدام styled-components
const Title = styled.h1`
  font-size: 36px; // حجم الخط
  color: #28a745; // لون النص
`;

// تعريف مكون Subtitle باستخدام styled-components
const Subtitle = styled.h2`
  font-size: 24px; // حجم الخط
  color: #555; // لون النص
`;

// تعريف التفاعل الحركي باستخدام keyframes
const slideUp = keyframes`
  from {
    transform: translateY(100%); // بدء الحركة من أسفل
    opacity: 0; // شفافية 0
  }
  to {
    transform: translateY(0); // إنهاء الحركة في الموضع الأصلي
    opacity: 1; // شفافية 1
  }
`;

// تعريف مكون VideoGrid باستخدام styled-components
const VideoGrid = styled.div`
  display: flex; // استخدام flexbox لتوزيع العناصر بشكل أفقي
  justify-content: space-between; // توزيع المسافات بين العناصر
  flex-wrap: wrap; // التفاف العناصر عند نهاية السطر
  gap: 20px; // فجوة بين العناصر
  margin-top: 20px; // مسافة من أعلى
  width: 80%; // عرض الحاوية 80%
  animation: ${slideUp} 1s ease-in-out; // تطبيق التفاعل الحركي
`;

// تعريف مكون VideoCard باستخدام styled-components
const VideoCard = styled.div`
  width: 45%; // عرض البطاقة 45%
  position: relative; // تحديد الوضع النسبي
  border-radius: 12px; // زوايا مدورة
  overflow: hidden; // إخفاء الفائض
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // ظل خفيف
  transition: transform 0.3s ease-in-out; // تأثير انتقال
  &:hover {
    transform: scale(1.05); // تكبير البطاقة عند التمرير
  }
`;

// تعريف مكون VideoImage باستخدام styled-components
const VideoImage = styled.img`
  width: 100%; // عرض الصورة 100%
  height: 250px; // ارتفاع الصورة 250px
  object-fit: cover; // تغطية الحاوية بدون تشويه
`;

// تعريف مكون VideoInfo باستخدام styled-components
const VideoInfo = styled.div`
  position: absolute; // تحديد الوضع المطلق
  bottom: 0; // محاذاة في الأسفل
  background-color: rgba(255, 255, 255, 0.8); // خلفية شفافة
  width: 100%; // عرض 100%
  height: 60px; // ارتفاع 60px
  display: flex; // استخدام flexbox لتوزيع العناصر بشكل أفقي
  flex-direction: column; // ترتيب العناصر بشكل عمودي
  justify-content: center; // محاذاة العناصر في الوسط عموديًا
  align-items: center; // محاذاة العناصر في الوسط أفقياً
  text-align: center; // محاذاة النص في المركز
  padding: 10px; // تباعد داخلي
  transition: background-color 0.3s ease-in-out; // تأثير انتقال على لون الخلفية
  &:hover {
    background-color: #ffebcc; // تغيير لون الخلفية عند التمرير
  }
`;

// تعريف مكون VideoTitle باستخدام styled-components
const VideoTitle = styled.h3`
  margin: 0; // إزالة المسافة
  font-size: 14px; // حجم الخط
  color: #28a745; // لون النص
  transition: color 0.3s ease-in-out; // تأثير انتقال على لون النص
  &:hover {
    color: #ff6347; // تغيير لون النص عند التمرير
  }
`;

// تعريف مكون VideoDetails باستخدام styled-components
const VideoDetails = styled.p`
  font-size: 12px; // حجم الخط
  color: #555; // لون النص
`;

// تعريف مكون VideoPlayerContainer باستخدام styled-components
const VideoPlayerContainer = styled.div`
  width: 100%; // عرض الحاوية 100%
  margin: 20px 0; // مسافة من أعلى وأسفل
  display: ${(props) => (props.show ? 'block' : 'none')}; // عرض أو إخفاء بناءً على الخاصية
`;

// تعريف مكون Iframe باستخدام styled-components
const Iframe = styled.iframe`
  width: 100%; // عرض الإطار 100%
  height: 300px; // ارتفاع الإطار 300px
`;

// تعريف مكون CloseButton باستخدام styled-components
const CloseButton = styled.button`
  padding: 8px 16px; // تباعد داخلي
  background-color: #dc3545; // لون الخلفية أحمر
  color: white; // لون النص أبيض
  border: none; // إزالة الحدود
  border-radius: 4px; // زوايا مدورة
  cursor: pointer; // مؤشر الفأرة عند التمرير
  font-size: 14px; // حجم الخط
  margin-top: 10px; // مسافة من أعلى
  &:hover {
    background-color: #c82333; // تغيير لون الخلفية عند التمرير
  }
`;

// تعريف مكون StyledDescription باستخدام styled-components
const StyledDescription = styled.p`
  font-size: 24px; // حجم الخط
  color: #28a745; // لون النص
  margin: 20px auto; // مسافة من أعلى وأسفل ومحاذاة في الوسط أفقياً
  text-align: center; // محاذاة النص في المركز
  max-width: 800px; // عرض أقصى 800px
  background-color: rgba(0, 0, 0, 0.8); // خلفية شفافة سوداء
  padding: 20px; // تباعد داخلي
  border-radius: 10px; // زوايا مدورة
  width: 80%; // عرض الحاوية 80%
`;

// تعريف مكون HomePage
function HomePage() {
  // تعريف الحالة للمكون باستخدام useState
  const [grade, setGrade] = useState(""); // تعريف حالة الصف
  const [subject, setSubject] = useState(""); // تعريف حالة المادة
  const [allVideos, setAllVideos] = useState({}); // تعريف حالة جميع الفيديوهات
  const [selectedVideos, setSelectedVideos] = useState([]); // تعريف حالة الفيديوهات المختارة
  const [videoToShow, setVideoToShow] = useState(null); // تعريف حالة الفيديو لعرضه
  const [clickedVideoIndex, setClickedVideoIndex] = useState(null); // تعريف حالة الفهرس للفيديو المنقر عليه
  
  // تعريف قائمة المواد لكل صف
  const subjects = {
    "1": ["Arabic", "Math", "English"],
    "2": ["Arabic", "Math", "English"],
    "3": ["Arabic", "Math", "English"],
    "4": ["Arabic", "Math", "English", "Science", "Studies"],
    "5": ["Arabic", "Math", "English", "Science", "Studies"],
    "6": ["Arabic", "Math","English", "Science", "Studies"]
  }
  useEffect(() => { // استخدام Hook useEffect لتنفيذ الكود عند تحميل المكون
    fetch('../videos.json') // جلب البيانات من ملف JSON
      .then(response => response.json()) // تحويل الاستجابة إلى JSON
      .then(data => { // التعامل مع البيانات المحولة
        const videosWithDetails = Object.entries(data).flatMap(([grade, subjects]) => // تحويل البيانات إلى قائمة من الفيديوهات مع تفاصيلها
          Object.entries(subjects).flatMap(([subject, videos]) => 
            videos.map(video => ({ ...video, grade, subject })) // إضافة الصف والمادة لكل فيديو
          )
        );
        setAllVideos(data); // تخزين البيانات المحملة في حالة allVideos
        setSelectedVideos(videosWithDetails); // تخزين الفيديوهات في حالة selectedVideos
      })
      .catch(error => console.error("Error fetching videos:", error)); // معالجة الأخطاء في حالة فشل الجلب
  }, []); // تنفيذ هذا الكود مرة واحدة عند تحميل المكون

useEffect(() => { // استخدام Hook useEffect لتنفيذ الكود عند تغير حالة grade أو allVideos
    if (grade) { // إذا كان هناك صف مختار
      const filteredVideos = allVideos[grade] ? Object.entries(allVideos[grade]).flatMap(([subject, videos]) => // فلترة الفيديوهات بناءً على الصف
        videos.map(video => ({ ...video, grade, subject })) // إضافة الصف والمادة لكل فيديو
      ) : [];
      setSelectedVideos(filteredVideos); // تخزين الفيديوهات المفلترة في حالة selectedVideos
    } else { // إذا لم يكن هناك صف مختار
      const allVideosArray = Object.entries(allVideos).flatMap(([grade, subjects]) => // تحويل جميع الفيديوهات إلى قائمة واحدة
        Object.entries(subjects).flatMap(([subject, videos]) => 
          videos.map(video => ({ ...video, grade, subject })) // إضافة الصف والمادة لكل فيديو
        )
      );
      setSelectedVideos(allVideosArray); // تخزين جميع الفيديوهات في حالة selectedVideos
    }
  }, [grade, allVideos]); // تنفيذ هذا الكود عند تغير حالة grade أو allVideos

useEffect(() => { // استخدام Hook useEffect لتنفيذ الكود عند تغير حالة subject أو grade أو allVideos
    if (subject) { // إذا كانت هناك مادة مختارة
      const filteredVideos = allVideos[grade]?.[subject] ? allVideos[grade][subject].map(video => ({ ...video, grade, subject })) : []; // فلترة الفيديوهات بناءً على الصف والمادة
      setSelectedVideos(filteredVideos); // تخزين الفيديوهات المفلترة في حالة selectedVideos
    } else if (grade) { // إذا كان هناك صف مختار ولكن لا توجد مادة مختارة
      const filteredVideos = allVideos[grade] ? Object.entries(allVideos[grade]).flatMap(([subject, videos]) => 
        videos.map(video => ({ ...video, grade, subject })) // إضافة الصف والمادة لكل فيديو
      ) : [];
      setSelectedVideos(filteredVideos); // تخزين الفيديوهات المفلترة في حالة selectedVideos
    }
  }, [subject, grade, allVideos]); // تنفيذ هذا الكود عند تغير حالة subject أو grade أو allVideos

const handleVideoClick = (videoLink, index) => { // دالة لمعالجة النقر على الفيديو
    const videoId = videoLink.includes("youtube") // إذا كان رابط الفيديو يحتوي على "youtube"
      ? videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("/")[3] // استخراج معرّف الفيديو من الرابط
      : videoLink; // إذا لم يكن رابط يوتيوب، استخدام الرابط كما هو
    setVideoToShow(`https://www.youtube.com/embed/${videoId}`); // تحديث حالة videoToShow برابط الفيديو المراد عرضه
    setClickedVideoIndex(index); // تحديث حالة clickedVideoIndex بفهرس الفيديو الذي تم النقر عليه
  };

const closeVideoPlayer = () => { // دالة لإغلاق مشغل الفيديو
    setVideoToShow(null); // إعادة تعيين حالة videoToShow إلى null
    setClickedVideoIndex(null); // إعادة تعيين حالة clickedVideoIndex إلى null
  };

const renderVideoPlayer = (index) => { // دالة لعرض مشغل الفيديو إذا تم النقر على الفيديو
    if (videoToShow && clickedVideoIndex === index) { // إذا كان هناك فيديو للعرض وتم النقر عليه
      return ( // عرض مشغل الفيديو
        <VideoPlayerContainer show={videoToShow}>
          <Iframe
            src={videoToShow}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <CloseButton onClick={closeVideoPlayer}>Close Video</CloseButton>
        </VideoPlayerContainer>
      );
    }
    return null; // إذا لم يتم النقر على الفيديو، لا تعرض شيئًا
  };

return ( // عرض الواجهة
    <>
      <Navbar /> {/* عرض مكون Navbar */}
      <Container> {/* مكون Container بداخل الواجهة */}
        <Header> {/* مكون Header بداخل Container */}
          <Title>Welcome to Bright Mind</Title> {/* عنوان الترحيب */}
          <Subtitle>ذاكر بطريقة تفاعلية وحقق درجتك النهائية معنا!</Subtitle> {/* العنوان الفرعي */}
          <Carousel /> {/* عرض مكون Carousel */}
          <StyledDescription> {/* عرض النص الوصفي بتنسيق CSS مخصص */}
            في Bright Mind، نقدم لك تجربة تعليمية فريدة وممتعة. اختر الصف والمادة لعرض الدروس المتاحة واستمتع بالتعلم بطريقة جديدة ومبتكرة.
          </StyledDescription>
        </Header>
        <Select // عرض مكون Select لاختيار الصف والمادة
          grade={grade}
          setGrade={setGrade}
          subject={subject}
          setSubject={setSubject}
          handleSubmit={() => {}}
          subjects={subjects}
        />
        <VideoGrid> {/* عرض مكون VideoGrid لعرض الفيديوهات */}
          {selectedVideos.length > 0 ? ( // التحقق من وجود فيديوهات مختارة
            selectedVideos.map((video, index) => ( // تكرار الفيديوهات المختارة
              <>
                <VideoCard key={index} onClick={() => handleVideoClick(video.link, index)}> {/* مكون VideoCard عند النقر عليه */}
                  <VideoImage src={video.img} alt={video.title} /> {/* عرض صورة الفيديو */}
                  <VideoInfo>
                    <VideoTitle>{video.title}</VideoTitle> {/* عرض عنوان الفيديو */}
                    <VideoDetails>{`Grade: ${video.grade} - Subject: ${video.subject}`}</VideoDetails> {/* عرض تفاصيل الفيديو */}
                  </VideoInfo>
                </VideoCard>
                {renderVideoPlayer(index)} {/* عرض مشغل الفيديو إذا تم النقر عليه */}
              </>
            ))
          ) : ( // إذا لم تكن هناك فيديوهات مختارة
            <p>No videos available for the selected grade and subject.</p>
          )}
        </VideoGrid>
      </Container>
    </>
  );
}
