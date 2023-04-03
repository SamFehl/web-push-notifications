const client = (() => {
    let serviceWorker = undefined;
    const notificationbutton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationbutton.style.display = "block";
    }

    const checkNotificationSupport = () => {
        if (!('notification' in window)) {
            return Promise.reject("This browser doesn't support notifications.")
        }
        console.log("The browser supports Notifications")
        return Promise.resolve("Ok!")
    }

    const registerServiceWorker = () => {
        if (!('serviceWorker') in navigator) {
            return Promise.reject("service worker is not available")
        }
        return navigator.serviceWorker.register('service-worker.js')
            .then(regObj => {
                console.log("Service worker is registered successfully!");
                serviceWorkerRegObj = regObj;
                showNotificationButton();
            })
    }

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Notifications Permission Status:", status);
        })
    }

    //How the constructors are called
    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))
})()