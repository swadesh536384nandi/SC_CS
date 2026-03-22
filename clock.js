function updateClock() {
            const now = new Date();
            document.getElementById('dateTime').innerText = now.toLocaleString();
        }
        setInterval(updateClock, 1000);
        updateClock();