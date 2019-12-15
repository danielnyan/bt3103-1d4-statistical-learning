let fuee = new Vue({
    el: '#app',
    data: {
        q4: {
            solved: false
        },
        q4a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
        q4b: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            wrong_attempts: 0
        },
    },
    methods: {
        submit4a: async function() {
            let answer = $("#answer4a").val();
            if (answer === "3.9565") {
                this.q4a.status = "correct";
                this.q4a.solved = true;
                setProgress("4a");
                if (this.q4b.solved) {
                    this.q4.solved = true;
                }
            } else if (answer === "4.372" || answer === "3.541") {
                this.q4a.status = "incorrect";
                this.q4a.incorrect = "Incorrect! The person is not a student, so the value of Rating is 0.";
                this.q4a.wrong_attempts += 1;
            } else if (answer === "-7.9129") {
                this.q4a.status = "incorrect";
                this.q4a.incorrect = "Incorrect! Are you sure you're looking at the correct variable?";
                this.q4a.wrong_attempts += 1;
            } else {
                this.q4a.status = "incorrect";
                this.q4a.incorrect = "Incorrect! When the value of a regressor increases by 1, the dependent variable's value will change by the coefficient of the regressor.";
                this.q4a.wrong_attempts += 1;
            }
        },
        submit4b: async function() {
            let answer = $("#answer4b").val();
            if (answer === "4.372") {
                this.q4b.status = "correct";
                this.q4b.solved = true;
                setProgress("4b");
                if (this.q4a.solved) {
                    this.q4.solved = true;
                }
            } else if (answer === "3.9565") {
                this.q4b.status = "incorrect";
                this.q4b.incorrect = "Incorrect! The person is a student, so we need to look at the coefficient of Student:Rating as well.";
                this.q4b.wrong_attempts += 1;
            } else if (answer === "3.541") {
                this.q4b.status = "incorrect";
                this.q4b.incorrect = "Incorrect! You're close, but you should be adding instead of subtracting.";
                this.q4b.wrong_attempts += 1;
            } else {
                this.q4b.status = "incorrect";
                this.q4b.incorrect = "Incorrect! Try calculating the change in Balance when Student = 1 and Rating increases by 1.";
                this.q4b.wrong_attempts += 1;
            }
        },
        nextPage() {
            if (this.q4.solved || $("#prompt").css("display") !== "none") {
                window.location.href = "probit_logit.html"
            } else {
                $("#prompt").slideDown(500);
                setTimeout(this.hidePrompt, 5000)
            }
        },
        hidePrompt() {
            $("#prompt").slideUp(500);
        }
    },
    mounted() {
        retrieveProgress().then((result) => {
            if (result.includes("4a")) {
                this.q4a.solved = true;
            }
            if (result.includes("4b")) {
                this.q4b.solved = true;
            }
            if (this.q4a.solved && this.q4b.solved) {
                this.q4.solved = true;
            }
        });
    }
})