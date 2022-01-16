window.onload = () => {
    let menu = document.querySelector(".header_column-menu")
    menu.addEventListener("click", () => {
        menu.classList.toggle("_click")
        menu.classList.toggle("_ttY")
        document.querySelector(".header-menu_body").classList.toggle("_display")
    })

    const CLASS_LIST = {
        MISSION_IMAGE: 'mission__image',
        MISSION_TRANSFORM: 'js-missionTransform'
    }
    const ID = {
        FORM: 'form'
    }
    const missionImage = document.querySelector(`.${CLASS_LIST.MISSION_IMAGE}`)

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? entry.target.classList.add(CLASS_LIST.MISSION_TRANSFORM) :  null
        })
    }, { threshold: 0.3, rootMargin: '0px', root: null})
    observer.observe(missionImage)

    // заглушка для формы
    document.getElementById(ID.FORM).onsubmit = e => e.preventDefault()
}
