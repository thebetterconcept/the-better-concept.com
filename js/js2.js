// //////////////////////////////////////////////////////////
// init Isotope
var iso = new Isotope(".isotope-container .row", {
  itemSelector: ".col-6",
  layoutMode: "fitRows",
});

// دالة لتفعيل الفلتر من الهاش
function activateFilterFromHash() {
  let hash = window.location.hash;
  if (hash) {
    let target = document.querySelector(hash);
    if (target) {
      // شيل الـ filter-active القديم
      document
        .querySelector(".menu-filters .filter-active")
        ?.classList.remove("filter-active");

      // ضيف الجديد
      target.classList.add("filter-active");

      // فلترة Isotope
      let filterValue = target.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });

      // حرك شريط الفلاتر
      const parent = document.querySelector(".menu-filters");
      const offsetLeft =
        target.offsetLeft - parent.clientWidth / 2 + target.clientWidth / 2;
      parent.scrollTo({ left: offsetLeft, behavior: "smooth" });

      // يرجع الصفحة لفوق
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
}

// filter items on click
document.querySelectorAll(".menu-filters li").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelector(".menu-filters .filter-active")
      ?.classList.remove("filter-active");
    this.classList.add("filter-active");

    // يخلي الفلتر المختار يبان قدام اليوزر
    const parent = document.querySelector(".menu-filters");
    const offsetLeft =
      this.offsetLeft - parent.clientWidth / 2 + this.clientWidth / 2;
    parent.scrollTo({ left: offsetLeft, behavior: "smooth" });

    let filterValue = this.getAttribute("data-filter");
    iso.arrange({ filter: filterValue });

    // تحديث الهاش في الرابط
    history.replaceState(null, null, "#" + this.id);

    // يرجع الصفحة لفوق
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// تشغيل الفلتر الافتراضي (بس لو مفيش هاش في الرابط)
if (!window.location.hash) {
  let activeFilter = document.querySelector(".menu-filters .filter-active");
  if (activeFilter) {
    let filterValue = activeFilter.getAttribute("data-filter");
    iso.arrange({ filter: filterValue });
  }
}

// arrow back //////////////////////////////////////////////////
document.getElementById("back-btn").addEventListener("click", function () {
  window.location.href = "../index.html"; // غيرها لاسم صفحة الهوم بتاعتك
});

// /////////////////////////////////////////////////////////////////////
// 1- أول ما الصفحة تتحمل
window.addEventListener("DOMContentLoaded", activateFilterFromHash);

// 2- لما الهاش يتغير
window.addEventListener("hashchange", activateFilterFromHash);

// 3- لما الصفحة تخلص تحميل (مهم للموبايل والكاش)
window.addEventListener("load", activateFilterFromHash);

// ///////////////////////////////////////////////////////////////////////////////
$(document).on("turbolinks:load", function () {
  const observer = lozad();
  observer.observe();
});
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", "false");
});
// ///////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // منع النقر بزر الفأرة الأيمن على الصفحة بالكامل
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // منع سحب الصور
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  // تعطيل اختصارات F12 و Ctrl+U و Ctrl+Shift+I
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.key.toLowerCase() === "u") ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")
    ) {
      e.preventDefault();
      alert("تم تعطيل عرض المصدر لحماية المحتوى!");
    }
  });
});
