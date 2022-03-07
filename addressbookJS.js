window.onload = function () {

    //event Listeners
    $('#searchInput').keyup(search);
    $("#tablebody").click(deleteContact);
    $("#tablebody").click(prepareEdit);
    $("#cancelbtn").click(closeForm);
    $("#addbtn").click(saveContact);
    $("#addicon").click(openForm);

    //Functions


    function openForm() { //open new contacts form with clean inputs and Add btn.
        clearInputs();
        $("#addform").slideDown("slow");
        $("#addbtn").css("display", "block");
        $("#savebtn").css("display", "none");
    }

    function closeForm(e) {
        e.preventDefault();
        $("#addform").slideUp("slow", "linear");
    }
    //teste para merge
    
    function saveContact(e) {

        var newFirstName = $("#firstName").val();
        var newLastName = $("#lastName").val();
        var newPhone = $("#phone").val();
        var newAddress = $("#address").val();

        if (!newFirstName || !newLastName || !newPhone || !newAddress) {
            $('#fillFormMsg').html("Please fill the entire form").css('display', 'block').fadeOut(4000); //show message to fill the form
            e.preventDefault();

        } else {
            var contact = {
                firstName: newFirstName,
                lastName: newLastName,
                phone: newPhone,
                address: newAddress
            };
            if (localStorage.getItem('storedData') === null) {
                var storedData = [];
                storedData.push(contact);
                localStorage.setItem('storedData', JSON.stringify(storedData));

            } else {
                var storedData = JSON.parse(localStorage.getItem('storedData'));
                storedData.push(contact);
                localStorage.setItem('storedData', JSON.stringify(storedData));
            }
            e.preventDefault();
            closeForm(e);
            clearInputs();
            displayContacts();
        }
    }

    //open the Addform and load the data of the contact to be edited
    function prepareEdit(e) {
        if (e.target.classList.contains('editbtn')) {
            $("#addform").slideDown("slow");
            $("#addbtn").css("display", "none"); //hides the add new contact button and display the save edit button
            $("#savebtn").css("display", "block");

            //load the data from the selected contact to the inputs
            var storedData = JSON.parse(localStorage.getItem('storedData'));
            var id = e.target.getAttribute('data-id');
            $("#firstName").val(storedData[id].firstName);
            $("#lastName").val(storedData[id].lastName);
            $("#phone").val(storedData[id].phone);
            $("#address").val(storedData[id].address);
        }
        $("#savebtn").click(edit);

        //nested function to save the edited contact
        function edit(e) {
            var newFirstName = $("#firstName").val();
            var newLastName = $("#lastName").val();
            var newPhone = $("#phone").val();
            var newAddress = $("#address").val();

            var editedContact = {
                firstName: newFirstName,
                lastName: newLastName,
                phone: newPhone,
                address: newAddress
            };

            storedData[id] = editedContact;
            localStorage.setItem('storedData', JSON.stringify(storedData));
            e.preventDefault();
            $("#addbtn").css("display", "block");
            $("#savebtn").css("display", "none");
            closeForm(e);
            displayContacts();
        }
    }

    function clearInputs() {
        $("#firstName").val("");
        $("#lastName").val("");
        $("#phone").val("");
        $("#address").val("");
    }



    function search() {

        var searchFilter = $('#searchInput').val().toUpperCase();
        var tr = $("tbody > tr");

        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[0];
            td2 = tr[i].getElementsByTagName("td")[1];
            td3 = tr[i].getElementsByTagName("td")[2];
            td4 = tr[i].getElementsByTagName("td")[3];

            //filter all td`s inside all tr`s
            if (td) {
                textValue1 = td.textContent || td.innerText;
                textValue2 = td2.textContent || td2.innerText;
                textValue3 = td3.textContent || td3.innerText;
                textValue4 = td4.textContent || td4.innerText;

                //check if the search matches the contacts
                if (textValue1.toUpperCase().indexOf(searchFilter) > -1) {
                    tr[i].style.display = "";
                    tr[i].classList.remove("hidden");
                } else if (textValue2.toUpperCase().indexOf(searchFilter) > -1) {
                    tr[i].style.display = "";
                    tr[i].classList.remove("hidden");
                } else if (textValue3.toUpperCase().indexOf(searchFilter) > -1) {
                    tr[i].style.display = "";
                    tr[i].classList.remove("hidden");
                } else if (textValue4.toUpperCase().indexOf(searchFilter) > -1) {
                    tr[i].style.display = "";
                    tr[i].classList.remove("hidden");
                } else {
                    tr[i].style.display = "none"
                    if (tr[i].style.display === "none") { //add hidden class to make the hidden elements countable
                        tr[i].classList.add("hidden");
                    }
                }

                //if all elements from the table are hidden, display 'no results'
                var trsOnTable = $("#tablebody").prop('childElementCount');
                if (trsOnTable === $('tr.hidden').length) {
                    $('#noResults').css('display', 'block')
                } else {
                    $('#noResults').css('display', 'none')
                }
            }
        }
    }

    function displayContacts() {
        var storedData = JSON.parse(localStorage.getItem('storedData'));
        var contactsTable = document.getElementById("tablebody");
        contactsTable.innerHTML = "";

        if (storedData != undefined) {

            for (var i = 0; i < storedData.length; i++) {
                var firstname = storedData[i].firstName;
                var lastname = storedData[i].lastName;
                var phone = storedData[i].phone;
                var address = storedData[i].address;

                //create a new row for each new contact. The delete column has a data-id.
                let str = '<tr>';
                str += '<td>' + firstname + '</td>';
                str += '<td>' + lastname + '</td>';
                str += '<td>' + phone + '</td>';
                str += '<td>' + address + '</td>';
                str += '<td class="coldel"><i type="submit" class="delbutton bi bi-trash fa-2x" data-id="' + i + '"></i><i  id"editbtn" type="submit" class="editbtn bi bi-pencil-square fa-2x" data-id="' + i + '"></i></td>';
                str += '</tr>';
                contactsTable.innerHTML += str;
            }
        }
    }


    function deleteContact(e) {

        var storedData = JSON.parse(localStorage.getItem('storedData'));
        //delete contact based on the data-id
        if (e.target.classList.contains('delbutton')) {
            var removeID = e.target.getAttribute('data-id');
            storedData.splice(removeID, 1);
            localStorage['storedData'] = JSON.stringify(storedData);
            displayContacts();
        }
    }
    displayContacts();
}