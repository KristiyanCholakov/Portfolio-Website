export const scrollToSection = (sectionId: string, offset: number = 80, closeMenu?: () => void) => {
  if (sectionId === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } else {
    const targetElement = document.getElementById(sectionId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth',
      })
    }
  }

  // Close menu if provided
  if (closeMenu) {
    closeMenu()
  }
}
