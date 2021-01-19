const popupLinks = document.querySelectorAll('.popupLink')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lockPadding')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i]
        popupLink.addEventListener('click', (e) => {
            const popupName = popupLink.getAttribute('href').replace('#', '')
            const curentPopup = document.getElementById(popupName)
            popupOpen(curentPopup)
            e.preventDefault();
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.closePopup')
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i]
        el.addEventListener('click', (e) => {
            popupClose(el.closest('.popup'))
            e.preventDefault()
        })
    }
}

let popupOpen = (curentPopup) => {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup .open')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            // bodyUnLock() не работает при адаптиной версте 
        }
        curentPopup.classList.add('open')
        curentPopup.addEventListener('click', (e) => {
            if (!e.target.closest('.popupContent')) {
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}

let popupClose = (popupActive, doUnlock = true) => {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnLock()
        }
    }

}

// let bodyLock = () => {
//     const lockPaddingValue = window.innerWidth - document.querySelector('.wrapperAll').offsetWidth + 'px'
//     if (lockPadding.length > 0) {
//         for (let i = 0; i < lockPadding.length; i++) {
//             const el = lockPadding[i]
//             el.style.paddingRight = lockPaddingValue
//         }
//     }
//     body.style.paddingRight = lockPaddingValue
//     body.classList.add('lock')

//     unlock = false
//     setTimeout(() => {
//         unlock = true
//     }, timeout)
// }

let bodyUnLock = () => {
    setTimeout(() => {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i]
            el.style.paddingRight = '0px'
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout)

    unlock = false
    setTimeout(() => {
        unlock = true
    }, timeout)
}