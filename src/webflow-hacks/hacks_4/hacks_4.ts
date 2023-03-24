// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const ACTIVE_CLASS = 'hack4-active';
  const FILTER_BUTTON_SELECTOR = '[fs-hacks-element="hack4-filter-button"]';
  const SECTION_SELECTOR = '[fs-hacks-element="hack4-cms-anchor-section"]';
  const filterLinks = document.querySelectorAll<HTMLAnchorElement>(FILTER_BUTTON_SELECTOR);
  const sections = document.querySelectorAll<HTMLDivElement>(SECTION_SELECTOR);

  if (sections.length !== filterLinks.length) return;

  filterLinks.forEach((link, index) => {
    const linkText = link.innerText.replace(/\W/g, '-').toLowerCase();
    link.setAttribute('href', '#' + linkText);
    sections[index].setAttribute('id', linkText);
  });

  // set up intersection observer to observe when the anchor sections are in the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;

        filterLinks.forEach((link) => {
          if (link.href === `#${target.id}`) {
            link.classList.add(ACTIVE_CLASS);
          } else {
            link.classList.remove(ACTIVE_CLASS);
          }
        });
      });
    },
    { threshold: 1 }
  );

  // start the intersection observer for each anchor section
  sections.forEach((section) => {
    observer.observe(section);
  });
});
