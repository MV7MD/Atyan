// Translation Dictionaries for Form
const formTranslations = {
  en: { 
    fnamePlc: "Ahmed", lnamePlc: "Hassan", emailPlc: "ahmed@company.com", orgPlc: "Your company or institution", msgPlc: "Tell us what you're working on and how Atyan might help...", 
    lblFname: "First name", lblLname: "Last name", lblEmail: "Email address", lblOrg: "Organisation", lblRole: "I am a", lblMsg: "Message", btnSend: "Send Message",
    opt0: "Select your role", opt1: "Cooperative / Farmer Organisation", opt2: "Exporter / Food Processor", opt3: "Agricultural Bank / Financier", opt4: "Certification Body / Auditor", opt5: "Development Finance / NGO", opt6: "Fertiliser / Input Manufacturer", opt7: "Investor / Impact Fund", opt8: "Government / Regulator", opt9: "Other" 
  },
  ar: { 
    fnamePlc: "أحمد", lnamePlc: "حسن", emailPlc: "ahmed@company.com", orgPlc: "مؤسستك أو شركتك", msgPlc: "أخبرنا بما تعمل عليه وكيف يمكن لأطيان مساعدتك...",
    lblFname: "الاسم الأول", lblLname: "الاسم الأخير", lblEmail: "البريد الإلكتروني", lblOrg: "المؤسسة", lblRole: "صفتي", lblMsg: "الرسالة", btnSend: "إرسال الرسالة",
    opt0: "اختر صفتك", opt1: "تعاونية / منظمة مزارعين", opt2: "مُصدّر / مصنع أغذية", opt3: "بنك زراعي / ممول", opt4: "جهة اعتماد / مراجع", opt5: "مؤسسة تنموية / منظمة غير ربحية", opt6: "مصنع أسمدة / مدخلات", opt7: "مستثمر / صندوق تأثير", opt8: "حكومة / جهة تنظيمية", opt9: "أخرى" 
  }
};

// Language Toggle
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  
  if(currentLang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    langToggle.innerText = 'EN';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    langToggle.innerText = 'AR';
  }
  
  updateFormLanguage(currentLang);
});

function updateFormLanguage(lang) {
  const dict = formTranslations[lang];
  document.getElementById('fname').placeholder = dict.fnamePlc;
  document.getElementById('lname').placeholder = dict.lnamePlc;
  document.getElementById('email').placeholder = dict.emailPlc;
  document.getElementById('org').placeholder = dict.orgPlc;
  document.getElementById('message').placeholder = dict.msgPlc;
  
  document.getElementById('lblFname').innerText = dict.lblFname;
  document.getElementById('lblLname').innerText = dict.lblLname;
  document.getElementById('lblEmail').innerText = dict.lblEmail;
  document.getElementById('lblOrg').innerText = dict.lblOrg;
  document.getElementById('lblRole').innerText = dict.lblRole;
  document.getElementById('lblMsg').innerText = dict.lblMsg;
  document.getElementById('submitBtn').innerText = dict.btnSend;
  
  document.getElementById('opt0').innerText = dict.opt0;
  document.getElementById('opt1').innerText = dict.opt1;
  document.getElementById('opt2').innerText = dict.opt2;
  document.getElementById('opt3').innerText = dict.opt3;
  document.getElementById('opt4').innerText = dict.opt4;
  document.getElementById('opt5').innerText = dict.opt5;
  document.getElementById('opt6').innerText = dict.opt6;
  document.getElementById('opt7').innerText = dict.opt7;
  document.getElementById('opt8').innerText = dict.opt8;
  document.getElementById('opt9').innerText = dict.opt9;
}

// Mobile Menu Auto-close
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mmenu = document.getElementById('mm');
const mlinks = document.querySelectorAll('.mlink');

window.addEventListener('scroll', () => {
  if (mmenu.classList.contains('op')) {
    mobileMenuBtn.classList.remove('active');
    mmenu.classList.remove('op');
  }
});

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mmenu.classList.toggle('op');
});

mlinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mmenu.classList.remove('op');
  });
});

// Robust Scroll Animations Setup
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { 
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); 
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => observer.observe(el));
});

// Form submit (Web3Forms API)
async function submitForm(e) {
  e.preventDefault();
  
  const form = document.getElementById('cf');
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.innerText = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  
  // الـ Key الجديد الخاص بإيميل العميل (ask@atyan.earth) تم إضافته هنا
  formData.append("access_key", "4e855b69-0220-4142-9cc6-8d7cbf4cc522"); 
  formData.append("subject", "New Message from Atyan Website");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('contactFormContent').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      alert(currentLang === 'ar' ? "حدث خطأ! يرجى المحاولة مرة أخرى." : "Something went wrong! Please try again.");
      submitBtn.innerText = formTranslations[currentLang].btnSend;
      submitBtn.disabled = false;
    }
  } catch (error) {
    alert(currentLang === 'ar' ? "خطأ في الشبكة. يرجى التحقق من اتصالك." : "Network error. Please check your connection.");
    submitBtn.innerText = formTranslations[currentLang].btnSend;
    submitBtn.disabled = false;
  }
}

// Video modal
function openVideoModal() {
  document.getElementById('videoModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal(e) {
  if (!e || e.target === document.getElementById('videoModal') || e.target.tagName === 'BUTTON') {
    document.getElementById('videoModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

// Nav background on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10, 46, 26, 0.98)';
  } else {
    nav.style.background = 'rgba(10, 46, 26, 0.95)';
  }
});