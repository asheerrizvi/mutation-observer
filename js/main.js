const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");

const fillProgress = setInterval(() => {
    if (progressBar.style.width.split("%")[0] < 100) {
        progressBar.style.width =
            Number.parseInt(progressBar.style.width.split("%")[0]) + 25 + "%";
    } else {
        progressBar.style.width = "0%";
        progress.style.display = "none";
        clearInterval(fillProgress);
    }
}, 1000);

// Options for the observer (which mutations to observe)
const config = { attributes: true, attributeFilter: ["style"] };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
            if (mutation.target.style.width === "0%") {
                progressBar.style.width = "100%";
                progress.style.display = "flex";
                observer.disconnect();
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(progressBar, config);
