export default {
    data() {
      return {
        errors: {},
      };
    },
    methods: {
      validateField(field, value, rules) {
        this.errors[field] = ""; 
                
        if (rules.required && !value) {
          this.errors[field] = "";
        } else if (rules.minLength && value.length < rules.minLength) {
          this.errors[field] = ` ${rules.minLength} `;
        } else if (rules.maxLength && value.length > rules.maxLength) {
          this.errors[field] = ` ${rules.maxLength} `;
        } else if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
          this.errors[field] = "";
        }
      },
      validateForm(fields) {
        let isValid = true;
        for (let field in fields) {
          this.validateField(field, fields[field].value, fields[field].rules);
          if (this.errors[field]) isValid = false;
        }
        return isValid;
      },
    },
  };
  