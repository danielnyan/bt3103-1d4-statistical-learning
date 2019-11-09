let fuee = new Vue({
    el: '#app',
    data: {
        q3a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "no answer",
            solved: false,
            message = ""
        },
    },
    methods: {
        chooseYes() {
            this.q3a.status = "yes"
        },
        chooseNo() {
            this.q3a.status = "no"
        },
        submit3a: async function() {
            let answer = this.q3a.status
            submitToLambda("3a", JSON.stringify(answer));
            if (this.q3a.status === "no answer") {
                this.q3a.message = "You have not chosen an answer yet. Please choose one!"
            } else if (this.q3a.status === "no") {
                this.q3a.message = "You have answered wrongly. There is no pattern in the plot, so linear model should be a good fit."
            } else {
                this.q3a.message = "Congrats! Because there is no pattern in the plot, linear model should be a good fit. Please click next page for new section."
                this.q3a.solved = true
            }
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
        // initializeCodeblocks(["answer3a"]);
        retrieveProgress().then((result) => {
            if (result.includes("3a")) {
                this.q3a.solved = true;
            }
        });
    }
});