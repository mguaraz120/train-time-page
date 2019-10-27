var firebaseConfig = {
    apiKey: "AIzaSyDUILboNzEcQYOj2LJzjVvTtqYGehAoO0o",
    authDomain: "test-project-7bc13.firebaseapp.com",
    databaseURL: "https://test-project-7bc13.firebaseio.com",
    projectId: "test-project-7bc13",
    storageBucket: "test-project-7bc13.appspot.com",
    messagingSenderId: "384460822857",
    appId: "1:384460822857:web:d0ec9a3bca75c7cdf02298"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

$("#submit-btn").on("click", function () {
    event.preventDefault();
    trainName =   $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain =  $("#firstTrain").val().trim();
    frequency =   $("#frequency").val().trim();

    
    database.ref().push
        ({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });

});

database.ref().on("child_added", function(snapshot)
{
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    var createRow = $("<tr>").append(
    $("<td>").html(snapshot.val().trainName),
    $("<td>").html(snapshot.val().destination),
    $("<td>").html(snapshot.val().firstTrain),
    $("<td>").html(snapshot.val().frequency)
    );
    $("tbody").append(createRow);
});