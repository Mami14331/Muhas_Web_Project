<script>
    // 1. መሠረታዊ ቫሪያብሎች (Global Variables)
    let currentLang = 'am';
    let index = 0;
    const total = 24; // እንደ ቀደመው ኮድህ የተወሰደ
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRV24izRKMCcdc_a2V0vBLDvh0m1ExLHVHbwqMCmajDQotW4C2hn5quW1FJ2Uk4xh8KMJ-KVYoHpsI1/pub?output=csv';

    // 2. የጨለማ ገጽታ (Dark/Light Theme Toggle)
    // ማሳሰቢያ፡ በኤችቲኤምኤልህ ላይ '.btn-toggle' የሚል ክላስ ያለው በተን መኖር አለበት
    const btn = document.querySelector(".btn-toggle");
    if (btn) {
        btn.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
        });
    }

    // 3. የጋለሪ ስላይደር መቆጣጠሪያ (Gallery Slide Logic)
    function showSlide() {
        const slideRow = document.getElementById('slide-row');
        if (!slideRow) return; // ኤለመንቱ ከሌለ ስህተት እንዳይፈጥር

        if (index >= total) index = 0;
        if (index < 0) index = total - 1;
        
        // የስላይድ እንቅስቃሴ
        slideRow.style.transform = `translateX(${-index * 100}%)`;
        
        // የነጥቦቹን (Dots) ገጽታ ማደስ
        for (let i = 0; i < total; i++) {
            const d = document.getElementById(`dot-${i}`);
            if (d) {
                d.style.background = (i === index) ? 'var(--accent-color)' : '#bbb';
                d.style.transform = (i === index) ? 'scale(1.3)' : 'scale(1)';
            }
        }
    }

    function changeSlide(n) { 
        index += n; 
        showSlide(); 
    }
    
    function goToSlide(n) { 
        index = n; 
        showSlide(); 
    }

    // 4. ገጹ ሲከፈት ሥራዎችን ማስጀመር (Initialization)
    document.addEventListener('DOMContentLoaded', () => {
        // fetchNews() ካለ ይጠራሻል
        if (typeof fetchNews === 'function') {
            fetchNews();
        }
        
        showSlide(); // የመጀመሪያውን ነጥብ አክቲቭ ያደርጋል
        
        // በየ 5 ሰከንዱ ስላይዱ እንዲቀያየር
        setInterval(() => { 
            index++; 
            showSlide(); 
        }, 5000);
        
        // 5. የማስታወቂያ ፎርም ቴምፕሌቶች (Notice Template Dynamic Filler)
        // ማሳሰቢያ፡ በኤችቲኤምኤልህ ላይ 'notice_template' የሚል ID ያለው select ቦክስ መኖር አለበት
        const noticeTemplate = document.getElementById('notice_template');
        if (noticeTemplate) {
            noticeTemplate.addEventListener('change', function() {
                const selectedTemplate = this.value;

                const templates = {
                    'registration_2019': {
                        title: "የምዝገባ ጥሪ ማስታወቂያ",
                        content: "ለ2019 የትምህርት ዘመን ምዝገባ ጀምረናል።\n\nአዲስና ነባር ተማሪዎች ከ [ቀን] ጀምሮ በሁሉም ቅርንጫፎቻችን እየተገኘችሁ መመዝገብ የምትችሉ መሆኑን እንገልጻለን።\n\nአስፈላጊ ነገሮች፡\n1. \n2. "
                    },
                    'holiday_closure': {
                        title: "የበዓል ዝግጅት ማስታወቂያ",
                        content: "እንኳን ለ[የበዓሉ ስም] በዓል በሰላም አደረሳችሁ።\n\nበበዓሉ ምክንያት ተቋማችን ከ [ቀን] እስከ [ቀን] ዝግ ሆኖ የሚቆይ መሆኑን እናሳውቃለን。"
                    },
                    'meeting_call': {
                        title: "አስቸኳይ የወላጆች ስብሰባ",
                        content: "ክቡራን ወላጆች/አሳዳጊዎች፤\n\nበ [ቀን] ከጠዋቱ [ሰዓት] ጀምሮ በዋናው አዳራሽ ውስጥ ወሳኝ በሆኑ ጉዳዮች ላይ ለመወያየት ስብሰባ ስለተጠራ እንድትገኙ እናሳስባለን。"
                    }
                };

                const titleInput = document.getElementById('notice_title');
                const contentInput = document.getElementById('notice_content');

                if (titleInput && contentInput) {
                    if (templates[selectedTemplate]) {
                        titleInput.value = templates[selectedTemplate].title;
                        contentInput.value = templates[selectedTemplate].content;
                    } else {
                        titleInput.value = "";
                        contentInput.value = "";
                    }
                }
            });
        }
    });
</script>