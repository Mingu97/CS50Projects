document.addEventListener("DOMContentLoaded", () => {

    const checkMultAnswer = () => {
        const buttons = document.querySelectorAll(".multipleAnswers button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const answer = button.textContent;
                const answerContainer = button.closest(".answer-container");
                const feedback = answerContainer.querySelector(".answer-feedback");

                if (answer == "1 person per 5 sheep") {
                    button.classList.add("correct-answer");
                    feedback.textContent = "Correct";
                }
                else {
                    button.classList.add("incorrect-answer");
                    feedback.textContent = "Incorrect";
                }
            });
        });
    };

    const checkFreeAnswer = () => {
        const checkAns = document.querySelector(".freeAnswer button")

        checkAns.addEventListener("click", () => {
            const answerContainer = checkAns.closest(".answer-container");
            const answerValue = document.getElementById("freeAns").value;
            const feedback = answerContainer.querySelector(".answer-feedback");
            const answerInput = document.getElementById("freeAns");
            if (answerValue == "Switzerland") {
                answerInput.classList.value = "correct-answer";
                feedback.textContent = "Correct";
            }
            else {
                answerInput.classList.value = "incorrect-answer";
                feedback.textContent = "Incorrect";
            };
        });
    };
    checkMultAnswer();
    checkFreeAnswer();
});