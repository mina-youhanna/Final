import React from "react"; // استيراد مكتبة React
import { Link } from "react-router-dom"; // استيراد عنصر Link من مكتبة react-router-dom للتنقل بين الصفحات
import styled from "styled-components"; // استيراد مكتبة styled-components لتنسيق CSS في JavaScript
import logo from "../assets/logo.png"; // استيراد ملف الشعار
import { FaPowerOff } from "react-icons/fa"; // استيراد أيقونة تسجيل الخروج من مكتبة react-icons
import { signOut } from "firebase/auth"; // استيراد دالة تسجيل الخروج من Firebase Authentication
import { firebaseAuth } from "../utils/firebase-config"; // استيراد تهيئة Firebase

// تعريف مكون Navbar واستقبال المعامل isScrolled
export default function Navbar({ isScrolled }) {
  // دالة تسجيل الخروج
  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("User signed out successfully"); // رسالة نجاح تسجيل الخروج
      })
      .catch((error) => {
        console.error("Error signing out:", error); // رسالة خطأ في حالة فشل تسجيل الخروج
      });
  };

  // تعريف الروابط الموجودة في شريط التنقل
  const links = [
    { name: "Home", link: "/" },
    { name: "Teacher", link: "/teacher" },
    { name: "Login", link: "/login" },
    { name: "Sign up", link: "/signup" },
    { name: "Subscription", link: "/subscription" },
  ];

  // عرض محتوى الشريط
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}> {/* تطبيق صنف "scrolled" إذا كان isScrolled صحيح */}
        <div className="left flex a-center j-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" /> {/* عرض الشعار */}
          </div>
        </div>
        <div className="center flex a-center j-center">
          <ul className="links flex">
            {links.map(({ name, link }) => ( // تكرار عناصر القائمة
              <li key={name}>
                <Link to={link}>{name}</Link> {/* عنصر التنقل */}
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <button onClick={handleSignOut}> {/* زر تسجيل الخروج */}
            <FaPowerOff /> {/* أيقونة تسجيل الخروج */}
          </button>
        </div>
      </nav>
    </Container>
  );
}

// تنسيقات CSS باستخدام styled-components
const Container = styled.div`
  .scrolled {
    background-color: #1e1e1e; // لون الخلفية عند التمرير
  }
  nav {
    position: sticky; // الشريط يبقى في الجزء العلوي عند التمرير
    top: 0; // الشريط في أعلى الصفحة
    height: 5rem; // ارتفاع الشريط
    width: 100%; // عرض الشريط 100%
    display: flex; // تطبيق flexbox على الشريط
    justify-content: space-between; // توزيع المسافات بين العناصر
    position: fixed; // تثبيت الشريط
    z-index: 2; // ترتيب الشريط فوق العناصر الأخرى
    padding: 0 4rem; // التباعد الداخلي للشريط
    align-items: center; // محاذاة العناصر وسط الشريط عموديًا
    transition: 0.3s ease-in-out; // تأثير انتقال بمدة 0.3 ثانية
    background-color: #28a745; // لون الخلفية الافتراضي
    
    .left {
      display: flex;
      gap: 1rem; // فجوة بين العناصر
      .brand {
        img {
          height: 8rem; // تكبير الشعار
          width: auto; // الحفاظ على النسبة الصحيحة للشعار
          object-fit: contain; // تجنب التشويه
          filter: brightness(0) invert(1); // تغيير لون الشعار إلى الأبيض
        }
      }
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      .links {
        list-style-type: none; // إزالة النقاط من القائمة
        gap: 2rem; // فجوة بين الروابط
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          position: relative;
          a {
            color: #fff; // تغيير لون النص إلى الأبيض
            text-decoration: none; // إزالة الزخرفة من الروابط
            font-size: 1.5rem; // حجم النص
            transition: color 0.3s ease; // تأثير انتقال على اللون
            cursor: pointer; // مؤشر الفأرة عند التمرير
            &:hover {
              color: #f39c12; // تغيير لون النص عند التمرير
            }
          }
        }
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem; // فجوة بين العناصر
      button {
        background-color: transparent; // إزالة خلفية الزر
        border: none; // إزالة حدود الزر
        cursor: pointer; // مؤشر الفأرة عند التمرير
        svg {
          color: #fff; // تغيير لون الأيقونة إلى الأبيض
          font-size: 1.2rem; // حجم الأيقونة
        }
      }
    }
  }
`;
