/**
 * script.js - ملف JavaScript الخاص بموقع "من جديد"
 * مسؤول عن جميع التفاعلات والوظائف الديناميكية في الموقع
 */

document.addEventListener('DOMContentLoaded', function() {
    // --------- التعامل مع قائمة التنقل في الهواتف ---------
    const toggleMenu = document.querySelector('.toggle-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // فتح وإغلاق القائمة عند النقر على زر القائمة
    if (toggleMenu && navLinks) {
        toggleMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند النقر على أي رابط
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // --------- التعامل مع سلايدر صور التطبيق ---------
    const sliderTrack = document.querySelector('.screenshot-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (sliderTrack && prevBtn && nextBtn) {
        // نظراً لاتجاه الموقع RTL، تبديل الأزرار المستخدمة للتنقل
        nextBtn.addEventListener('click', function() {
            sliderTrack.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        prevBtn.addEventListener('click', function() {
            sliderTrack.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // --------- تأثيرات التمرير السلس ---------
    // تطبيق التمرير السلس عند النقر على روابط القائمة
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // حساب الموضع مع مراعاة ارتفاع القائمة الثابتة
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------- التحقق من نموذج الاتصال ---------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من الحقول
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // التحقق من البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
            
            // التحقق من باقي الحقول
            if (name === '' || subject === '' || message === '') {
                alert('يرجى ملء جميع الحقول المطلوبة');
                isValid = false;
            }
            
            // إرسال النموذج إذا كان صحيحاً
            if (isValid) {
                // يمكن إضافة كود هنا للتعامل مع إرسال النموذج عبر AJAX
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                contactForm.reset();
            }
        });
    }

    // --------- إظهار وإخفاء زر العودة إلى الأعلى ---------
    // إضافة زر العودة للأعلى ديناميكياً
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    document.body.appendChild(backToTopBtn);

    // مراقبة التمرير لإظهار/إخفاء الزر
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // التمرير إلى الأعلى عند النقر على الزر
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --------- تأثيرات التحميل والظهور بالتدريج ---------
    // إضافة تأثير ظهور تدريجي للعناصر عند التمرير
    const fadeElements = document.querySelectorAll('.feature-card, .about-content, .screenshot, .contact-item');
    
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        fadeObserver.observe(element);
    });
});