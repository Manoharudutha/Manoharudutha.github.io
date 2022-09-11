let userForm = document.getElementById("user-form");

let retrieveEntries = () => {
    entries = localStorage.getItem("user-entries");
    if(entries)
    {
        entries = JSON.parse(entries)
    }
    else
    {
        entries = [];
    }
    return entries;
}

let displayEntries = () => {
    const entries = retrieveEntries();

    let items = entries.map((entry) => {
    const nameval = "<td>"+entry.name+"</td>";
    const emailval = "<td>"+entry.email+"</td>";
    const passwordval = "<td>"+entry.password+"</td>";
    const dobval = "<td>"+entry.dob+"</td>";
    const acceptsTermsAndConditionsval = "<td>"+entry.acceptsTermsAndConditions+"</td>";
     const row = "<tr>"+nameval+""+emailval+""+passwordval+""+dobval+""+acceptsTermsAndConditionsval+"</tr>"
    
     return row;
    }).join("\n");

    let tableData = 
    "<table border='2'><tr><th>Name</th><th>Email</th><th>Password</th><th>Date Of Birth</th><th>Accept Terms & Conditions</th></tr>"+items+"</table>"
    
    document.getElementById("user-entries").innerHTML=tableData;
}

let userEntries = retrieveEntries();
let saveEntry = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;

    let age = 2022-parseInt(dob.substr(0,4));
    if(!(age>18 && age<55))
    {
        let dobEle = document.getElementById("dob")
        dobEle.setCustomValidity("Enter the age between 18 and 55 only!!!")
        dobEle.reportValidity();
    }

    const acceptsTermsAndConditions = document.getElementById("acceptTerms").checked;
    
    let entry = {
        name,
        email,
        password,
        dob,
        acceptsTermsAndConditions
    }

    userEntries.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(userEntries))
    displayEntries(); 
}
userForm.addEventListener("submit", saveEntry);
displayEntries();