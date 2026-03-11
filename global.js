document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const langToggles = document.querySelectorAll(".lang-toggle, #langToggle");
    const themeToggles = document.querySelectorAll(".theme-toggle, #themeToggle");

    let currentLang = localStorage.getItem("appLang") || "ar";
    let currentTheme = localStorage.getItem("appTheme") || "light";

    applyLanguage(currentLang);
    if(currentTheme === "dark") body.classList.add("dark-mode");

    langToggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            currentLang = currentLang === "en" ? "ar" : "en";
            localStorage.setItem("appLang", currentLang);
            applyLanguage(currentLang);
        });
    });

    themeToggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            body.classList.toggle("dark-mode");
            localStorage.setItem("appTheme", body.classList.contains("dark-mode") ? "dark" : "light");
            applyLanguage(currentLang);
        });
    });

    function applyLanguage(lang) {
        body.setAttribute("data-lang", lang);
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;

        langToggles.forEach(btn => {
            if(btn.classList.contains('text-only')) {
                btn.innerHTML = lang === "ar" ? 'EN' : 'AR';
            } else {
                btn.innerHTML = lang === "ar" ? '<i class="fa-solid fa-globe"></i> English' : '<i class="fa-solid fa-globe"></i> العربية';
            }
        });

        themeToggles.forEach(btn => {
            if(lang === "ar") btn.innerHTML = body.classList.contains("dark-mode") ? '<i class="fa-solid fa-sun"></i> الوضع النهاري' : '<i class="fa-solid fa-moon"></i> الوضع الليلي';
            else btn.innerHTML = body.classList.contains("dark-mode") ? '<i class="fa-solid fa-sun"></i> Light Mode' : '<i class="fa-solid fa-moon"></i> Dark Mode';
        });

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
    }

    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    const otpInputs = document.querySelectorAll('.otp-input');
    if(otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            input.addEventListener('keyup', function(e) {
                if (this.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                if (e.key === 'Backspace' && index > 0 && this.value === '') {
                    otpInputs[index - 1].focus();
                }
            });
        });

        let count = 60;
        const countdownEl = document.getElementById('countdown');
        const timerDisplay = document.getElementById('timerDisplay');
        const resendBtn = document.getElementById('resendBtn');

        if(countdownEl) {
            let timer = setInterval(() => {
                count--;
                countdownEl.textContent = count;
                if(count <= 0) {
                    clearInterval(timer);
                    timerDisplay.style.display = 'none';
                    resendBtn.style.display = 'block';
                }
            }, 1000);
        }
    }

    const expandMapBtn = document.getElementById('expandMapBtn');
    const closeMapBtn = document.getElementById('closeMapBtn');
    const mapContainer = document.getElementById('mapContainerBox');
    
    if(expandMapBtn && closeMapBtn && mapContainer) {
        expandMapBtn.addEventListener('click', () => {
            mapContainer.classList.add('fullscreen');
            document.body.style.overflow = 'hidden';
        });
        closeMapBtn.addEventListener('click', () => {
            mapContainer.classList.remove('fullscreen');
            document.body.style.overflow = 'auto';
        });
    }
});

const translations = {
    "en": {
        // Navbar & Home
        "my_profile": "My Profile",
        "btn_logout": '<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout',
        "home_title": "Lost Something at the Airport?",
        "home_desc": "An integrated and secure electronic system for managing lost and found items at the airport.",
        "btn_search": "Search",
        "ph_search": "Describe your lost item (e.g. Black bag at Gate 4)...",
        "btn_report_lost": '<i class="fa-solid fa-search"></i> Report Lost Item',
        "btn_report_found": '<i class="fa-solid fa-hand-holding-heart"></i> Report Found Item',
        "cat_bags": "Luggage & Bags",
        "cat_elec": "Electronics",
        "cat_docs": "Official Documents",
        "cat_personal": "Personal Items",
        "footer_desc": "A fast and secure system to return your lost belongings.",
        "footer_copy": "© 2026 All Rights Reserved - Lost & Found",

        // Auth
        "auth_login_title": "Login to your account",
        "auth_email": "Email Address",
        "auth_email_ph": "example@airport.com",
        "auth_pass": "Password",
        "auth_pass_ph": "••••••••",
        "auth_btn_login": "Login Now",
        "auth_forgot": "Forgot Password?",
        "auth_create": "Create New Account",
        "auth_reg_title": "Create New Account",
        "auth_name": "Full Name",
        "auth_name_ph": "John Doe",
        "auth_pass_conf": "Confirm Password",
        "auth_btn_reg": "Sign Up",
        "auth_have_acc": "Already have an account? Login",
        "auth_otp_title": "Email Verification",
        "auth_otp_desc": "Enter the 4-digit code sent to your email.",
        "auth_btn_otp": "Verify & Continue",
        "auth_reset_title": "Reset Password",
        "auth_reset_desc": "Enter your new password below.",
        "auth_btn_reset": "Update Password",
        "auth_remember": "Remembered your password? Login",

        // Admin
        "nav_dash": '<i class="fa-solid fa-chart-pie"></i> Dashboard',
        "nav_lost": '<i class="fa-solid fa-box-open"></i> Lost Reports',
        "nav_found": '<i class="fa-solid fa-warehouse"></i> Found Reports',
        "nav_staff": '<i class="fa-solid fa-users-gear"></i> Manage Staff',
        "nav_matches": '<i class="fa-solid fa-robot"></i> AI Matches',
        "welcome": "Welcome Back, Admin",
        "welcome_desc": "Here are today's system statistics",
        "stat_lost": "Total Lost Items",
        "stat_found": "Total Found Items",
        "stat_matches": "Active Matches",
        "map_title": '<i class="fa-solid fa-map-location-dot"></i> Airport Map',
        "btn_expand": '<i class="fa-solid fa-expand"></i> Expand Map',
        "btn_close": '<i class="fa-solid fa-xmark"></i> Close Map',

        // Report Forms (Lost & Found)
        "rep_lost_title": "Report a Lost Item",
        "rep_lost_desc": "Please provide accurate details to help our system match your item.",
        "rep_found_title": "Report a Found Item",
        "rep_found_desc": "Thank you! Please provide details to help us return it to its owner.",
        "sec_personal": "Personal Information",
        "sec_item": "Item Details",
        "lbl_fullname": "Full Name",
        "ph_fullname": "John Doe",
        "lbl_email": "Email Address",
        "ph_email": "example@airport.com",
        "lbl_phone": "Phone Number",
        "ph_phone": "+962 7X XXX XXXX",
        "lbl_item_name": "Item Name",
        "ph_item_name": "e.g., Black Leather Wallet",
        "lbl_category": "Category",
        "cat_opt_bags": "Bags & Luggage",
        "cat_opt_elec": "Electronics",
        "cat_opt_docs": "Documents",
        "lbl_color": "Item Color",
        "lbl_location_lost": "Where did you lose it?",
        "lbl_location_found": "Where did you find it?",
        "loc_opt_1": "Terminal 1",
        "loc_opt_2": "Terminal 2",
        "loc_opt_3": "Security Checkpoint",
        "loc_opt_4": "Departure Gates",
        "loc_opt_5": "Duty Free",
        "loc_opt_6": "Not Sure",
        "lbl_date_lost": "Date Lost",
        "lbl_date_found": "Date Found",
        "lbl_time": "Approximate Time",
        "lbl_desc": "Additional Description",
        "ph_desc": "Any unique marks, contents, or details...",
        "lbl_upload": "Upload Image (Optional)",
        "btn_submit_lost": '<i class="fa-solid fa-paper-plane"></i> Submit Report',
        "btn_submit_found": '<i class="fa-solid fa-hand-holding-heart"></i> Submit Found Item',
        "btn_export_pdf": '<i class="fa-solid fa-file-pdf"></i> Export as PDF'
    },
    "ar": {
        // Navbar & Home
        "my_profile": "حسابي",
        "btn_logout": '<i class="fa-solid fa-arrow-right-from-bracket"></i> تسجيل خروج',
        "home_title": "هل فقدت شيئاً في المطار؟",
        "home_desc": "نظام إلكتروني متكامل وآمن لإدارة المفقودات والمعثورات في المطار.",
        "btn_search": "بحث عام",
        "ph_search": "اكتب ما فقدته (مثال: حقيبة سوداء عند البوابة 4)...",
        "btn_report_lost": '<i class="fa-solid fa-search"></i> الإبلاغ عن مفقود',
        "btn_report_found": '<i class="fa-solid fa-hand-holding-heart"></i> الإبلاغ عن معثور عليه',
        "cat_bags": "الحقائب والأمتعة",
        "cat_elec": "الإلكترونيات",
        "cat_docs": "الوثائق الرسمية",
        "cat_personal": "متعلقات شخصية",
        "footer_desc": "نظام آمن وسريع لضمان عودة مقتنياتك المفقودة إليك.",
        "footer_copy": "© 2026 جميع الحقوق محفوظة - إدارة المفقودات",

        // Auth Pages
        "auth_login_title": "تسجيل الدخول للنظام",
        "auth_email": "البريد الإلكتروني",
        "auth_email_ph": "example@airport.com",
        "auth_pass": "كلمة المرور",
        "auth_pass_ph": "••••••••",
        "auth_btn_login": "دخول النظام",
        "auth_forgot": "نسيت كلمة المرور؟",
        "auth_create": "إنشاء حساب جديد",
        "auth_reg_title": "إنشاء حساب جديد",
        "auth_name": "الاسم الكامل",
        "auth_name_ph": "أحمد محمد",
        "auth_pass_conf": "تأكيد كلمة المرور",
        "auth_btn_reg": "تسجيل حساب",
        "auth_have_acc": "لديك حساب بالفعل؟ تسجيل الدخول",
        "auth_otp_title": "التحقق من البريد",
        "auth_otp_desc": "أدخل الرمز المكون من 4 أرقام المرسل إلى بريدك الإلكتروني.",
        "auth_btn_otp": "التحقق والمتابعة",
        "auth_reset_title": "استعادة كلمة المرور",
        "auth_reset_desc": "أدخل كلمة المرور الجديدة الخاصة بك أدناه.",
        "auth_btn_reset": "تحديث كلمة المرور",
        "auth_remember": "تذكرت كلمة المرور؟ تسجيل الدخول",

        // Admin Dashboard
        "nav_dash": '<i class="fa-solid fa-chart-pie"></i> لوحة التحكم',
        "nav_lost": '<i class="fa-solid fa-box-open"></i> بلاغات المفقودات',
        "nav_found": '<i class="fa-solid fa-warehouse"></i> بلاغات المعثورات',
        "nav_staff": '<i class="fa-solid fa-users-gear"></i> إدارة الموظفين',
        "nav_matches": '<i class="fa-solid fa-robot"></i> المطابقات النشطة',
        "welcome": "مرحباً بك، أيها المدير",
        "welcome_desc": "إليك إحصائيات النظام اليوم",
        "stat_lost": "إجمالي المفقودات",
        "stat_found": "إجمالي المعثورات",
        "stat_matches": "المطابقات النشطة",
        "map_title": '<i class="fa-solid fa-map-location-dot"></i> خريطة المطار',
        "btn_expand": '<i class="fa-solid fa-expand"></i> تكبير الخريطة',
        "btn_close": '<i class="fa-solid fa-xmark"></i> إغلاق الخريطة',

        // Report Forms (Lost & Found)
        "rep_lost_title": "الإبلاغ عن مفقود",
        "rep_lost_desc": "يرجى تعبئة التفاصيل بدقة لمساعدة نظامنا في مطابقة مقتنياتك المفقودة.",
        "rep_found_title": "الإبلاغ عن معثور عليه",
        "rep_found_desc": "شكراً لك! يرجى تعبئة التفاصيل لمساعدتنا في إرجاع الغرض لصاحبه.",
        "sec_personal": "معلومات التواصل",
        "sec_item": "تفاصيل الغرض",
        "lbl_fullname": "الاسم الكامل",
        "ph_fullname": "أحمد محمد",
        "lbl_email": "البريد الإلكتروني",
        "ph_email": "example@airport.com",
        "lbl_phone": "رقم الهاتف",
        "ph_phone": "079XXXXXXX",
        "lbl_item_name": "اسم الغرض",
        "ph_item_name": "مثال: محفظة جلد سوداء",
        "lbl_category": "فئة الغرض",
        "cat_opt_bags": "الحقائب والأمتعة",
        "cat_opt_elec": "الإلكترونيات",
        "cat_opt_docs": "الوثائق الرسمية",
        "lbl_color": "لون الغرض",
        "lbl_location_lost": "أين فقدته تقريباً؟",
        "lbl_location_found": "أين وجدته؟",
        "loc_opt_1": "مبنى الركاب 1 (Terminal 1)",
        "loc_opt_2": "مبنى الركاب 2 (Terminal 2)",
        "loc_opt_3": "نقطة التفتيش الأمني",
        "loc_opt_4": "بوابات المغادرة",
        "loc_opt_5": "السوق الحرة",
        "loc_opt_6": "غير متأكد",
        "lbl_date_lost": "تاريخ الفقدان",
        "lbl_date_found": "تاريخ العثور عليه",
        "lbl_time": "الوقت التقريبي",
        "lbl_desc": "وصف إضافي",
        "ph_desc": "أي علامات مميزة، محتويات الغرض، إلخ...",
        "lbl_upload": "إرفاق صورة (اختياري)",
        "btn_submit_lost": '<i class="fa-solid fa-paper-plane"></i> إرسال البلاغ',
        "btn_submit_found": '<i class="fa-solid fa-hand-holding-heart"></i> تسليم المعثورات',
        "btn_export_pdf": '<i class="fa-solid fa-file-pdf"></i> تصدير كـ PDF'
    }
};