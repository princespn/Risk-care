export default {
    methods: {
        MobileValidation(e) {
            const number = e.target.value;
            number.replace(/\s/g, "");
            if (number == "") {
                this.phone = "Mobile should not be blank.";
            }
            else if (isNaN(number)) {
                this.phone = "Please enter only digits";
            }
            else if (number.length < 10) {
                this.phone = "Enter minimum 10 Digits";
            } else if (number.length > 20) {
                this.phone = "Enter maximum 20 Digits";
            } else {
                this.phone = "";
            }
        },
        CountryValidation(e) {
            const country = e.target.value;
            if (country == "") {
                this.countryerr = "please select country";
            } else {
                this.countryerr = "";
            }
        },
        NameValidation(e) {
           const first_name = e.target.value;
           // var first_name = first_name.replace(/ /g, "");
            if (first_name == "") {
                this.nameErr = "Full name should not be blank.";
            } else if (!first_name.match(/^[a-zA-Z ]+$/)) {
                this.nameErr = "Please enter alphabets only";
            } else if (first_name.length < 5) {
                this.nameErr = " Enter minimum 5 character";
            } else if (first_name.length > 30) {
                this.nameErr = "Enter maximum 30 character";
            } else {
                this.nameErr = "";
            }
        },
        EmaiValidation(e) {
            const email = e.target.value;
            if (email == "") {
                this.emaiErr = "Email should not be blank.";
            } else if (
                !email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
                )
            ) {
                this.emaiErr = "Please enter email in correct formate";
            } else {
                this.emaiErr = "";
            }
        },
    }
};