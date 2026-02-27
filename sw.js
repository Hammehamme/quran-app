// تسجيل Service Worker ليعمل التطبيق بدون إنترنت
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("تم تسجيل Service Worker بنجاح!"))
    .catch(err => console.error("خطأ في تسجيل Service Worker:", err));
}

// دالة تشغيل الصوت
function playAudio() {
    const reciterUrl = document.getElementById('reciterSelect').value;
    const surahFile = document.getElementById('surahSelect').value;
    const audioPlayer = document.getElementById('audioPlayer');
    
    // دمج رابط القارئ مع رقم السورة
    audioPlayer.src = reciterUrl + surahFile;
    audioPlayer.play();
}

// دالة تحميل الصوت وحفظه في الـ Cache للأوفلاين
function downloadAudio() {
    const reciterUrl = document.getElementById('reciterSelect').value;
    const surahFile = document.getElementById('surahSelect').value;
    const fullUrl = reciterUrl + surahFile;

    fetch(fullUrl).then(response => {
        return caches.open('quran-audio-v1').then(cache => {
            cache.put(fullUrl, response.clone());
            alert("تم تحميل السورة بنجاح! يمكنك الآن الاستماع إليها بدون إنترنت.");
        });
    }).catch(err => {
        console.error("حدث خطأ أثناء التحميل:", err);
        alert("فشل التحميل، تأكد من اتصالك بالإنترنت.");
    });
}
