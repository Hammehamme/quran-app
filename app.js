// أسماء سور القرآن الكريم الـ 114
const surahsNames = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
];

// دالة لتعبئة قائمة السور عند تحميل الصفحة
window.onload = function() {
    const surahSelect = document.getElementById('surahSelect');
    
    surahsNames.forEach((name, index) => {
        // تحويل الرقم إلى صيغة 3 خانات (مثل: 001, 010, 114) لأن هذه هي صيغة الملفات في الخادم
        const surahNumber = (index + 1).toString().padStart(3, '0');
        const option = document.createElement('option');
        option.value = `${surahNumber}.mp3`;
        option.textContent = `${index + 1}. سورة ${name}`;
        surahSelect.appendChild(option);
    });
};

// تسجيل Service Worker للأوفلاين
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("تم تفعيل ميزة الأوفلاين."))
        .catch(err => console.error("خطأ في الأوفلاين:", err));
}

// تشغيل الصوت
function playAudio() {
    const reciterUrl = document.getElementById('reciterSelect').value;
    const surahFile = document.getElementById('surahSelect').value;
    const audioPlayer = document.getElementById('audioPlayer');
    
    audioPlayer.src = reciterUrl + surahFile;
    audioPlayer.play();
}

// تحميل السورة وحفظها للاستماع أوفلاين
function downloadAudio() {
    const reciterUrl = document.getElementById('reciterSelect').value;
    const surahFile = document.getElementById('surahSelect').value;
    const fullUrl = reciterUrl + surahFile;
    
    // تنبيه المستخدم أن التحميل بدأ
    alert("بدأ تحميل السورة لحفظها على جهازك... يرجى الانتظار قليلاً وعدم إغلاق الصفحة.");

    fetch(fullUrl).then(response => {
        return caches.open('quran-audio-v1').then(cache => {
            cache.put(fullUrl, response.clone());
            alert("✅ تم التحميل بنجاح! السورة متاحة الآن للاستماع بدون إنترنت.");
        });
    }).catch(err => {
        console.error("حدث خطأ:", err);
        alert("❌ فشل التحميل، تأكد من اتصالك بالإنترنت.");
    });
}
