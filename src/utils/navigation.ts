export const scrollToSection = (sectionId: string, offset: number = 80, closeMenu?: () => void) => {
  // Close menu if provided
  if (closeMenu) {
    closeMenu()
  }

  const targetPosition =
    sectionId === 'top' ? 0 : (document.getElementById(sectionId)?.offsetTop ?? 0) - offset

  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 1200 // Increased duration (in ms) for slower animation
  let startTime: number

  // Easing function for smoother animation
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  const scrollAnimation = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easing = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * easing)

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation)
    }
  }

  requestAnimationFrame(scrollAnimation)
}
