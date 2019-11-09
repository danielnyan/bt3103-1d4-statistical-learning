// Not yet implemented
let fuee = new Vue({
    el: '#app',
    data: {
        q3a: {
            correct: "Correct!",
            incorrect: "Incorrect!",
            status: "none",
            solved: false,
            have_answer: false,
            answer = 'none'
        },
    },
    methods: {
        chooseYes() {
            this.q3a.answer = "yes"
            this.q3a.have_answer = true
        },
        chooseNo() {
            this.q3a.answer = "no"
            this.q3a.have_answer = true
        }
        submit3a() {
            if (!this.q3a.have_answer) {
                this.q3a.status = "You have not chosen an answer yet. Please choose one!"
            } else if (this.q3a.answer = "no") {
                this.q3a.status = "You have answered wrongly. There is no pattern in the plot. So linear model should be a good fit."
            } else {
                this.q3a.status = "Congrats! Because there is no pattern in the plot, linear model should be a good fit. Please click next page for new section."
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