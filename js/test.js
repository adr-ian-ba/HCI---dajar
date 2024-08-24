
class GoogleFormSubmitter{
    constructor(formUrl){
        this.formUrl = formUrl;
        this.details = {};
    }

    setDetail(key, value){
        this.details["entry." + key] = value;
    } 

    getDetail(key) {
        return this.details["entry." + key];
    }

    prepareFormBody(){
        let formBody = [];
        for(const each in this.details){
            const encodeKey = encodeURIComponent(each);
            const encodeValue = encodeURIComponent(this.details[each])
            formBody.push(encodeKey + "=" + encodeValue);
        }
        return formBody.join("&");
    }

    submit() {
        fetch(this.formUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'insomnia/8.6.1'
            },
            body: this.prepareFormBody()
        }).then(response => console.log("Form submitted successfully", response))
          .catch(error => console.error("Failed to submit form", error));
    }
}

const googleForm = new GoogleFormSubmitter("https://docs.google.com/forms/u/0/d/e/1FAIpQLScx_iML5pIKkgy2HVcF43YUPj3lGW5a_0Lgf0pT9C-cKdDtog/formResponse");

 googleForm.setDetail("62044878", "full name"); 
 googleForm.setDetail("1351592364", "email");

 googleForm.getDetail("62044878") 
 googleForm.submit(); 