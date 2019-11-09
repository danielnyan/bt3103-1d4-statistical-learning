let fuee = new Vue({
    el: '#app',
    data: {
        q3a: {
            correct: "Correct! Because there is no pattern in the plot, linear model should be a good fit.",
            incorrect: "Incorrect! Try again!",
            status: "none",
            solved: false
        },
    },
    methods: {
        chooseYes() {
            this.q3a.status = "correct"
            submitToLambda("3a", JSON.stringify("Yes"));
        },
        chooseNo() {
            this.q3a.status = "incorrect"
            submitToLambda("3a", JSON.stringify("No"));
        },

        nextPage() {
            if (this.q3a.solved || $("#prompt").css("display") !== "none") {
                window.location.href = "interaction.html"
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
            if (result.includes("3a")) {
                this.q3a.solved = true;
            }
        });
    }
});