const navLinks = document.querySelectorAll(".side-nav a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.toggleAttribute("aria-current", isCurrent);
      });
    });
  },
  { rootMargin: "-30% 0px -58% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

const filterButtons = document.querySelectorAll(".filter-button");
const publications = document.querySelectorAll(".publication-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      const shouldShow = filter === "all" || publication.dataset.type === filter;
      publication.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
