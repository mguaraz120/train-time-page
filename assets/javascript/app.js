var firebaseConfig = 
{
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


var frequency = 0;

$("#submit-btn").on("click", function () 
    {
    event.preventDefault();
    if ($("#trainName").val().trim() === "" ||
        $("#destination").val().trim() === "" ||
        $("#firstTrain").val().trim() === "" ||
        $("#frequency").val().trim() === "") {

        alert("Please fill in all details to add new train");

    } 
    else 
    {
        trainName =   $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain =  $("#firstTrain").val().trim();
        frequency =   $("#frequency").val().trim();

        
        database.ref().push(
            {
                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency
            });
        clearForm()
    }
});
    
database.ref().on("child_added", function(snapshot)
{


    var nameSnap = snapshot.val().trainName;
    var destinationSnap = snapshot.val().destination;
    var firstTrainSnap = snapshot.val().firstTrain;
    var frequencySnap = snapshot.val().frequency;

    var timeConverted = moment(firstTrainSnap, "HH:mm").subtract(1, "years");

    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    var timeRemain = timeDiff % frequencySnap;
    var minToArrival = frequencySnap - timeRemain;
    var nextTrain = moment().add(minToArrival, "minutes").format("hh:mm");
    console.log(timeDiff);
    console.log(timeRemain);
    
    var createRow = $("<tr>").append(
    $("<td>").text(nameSnap),
    $("<td>").text(destinationSnap),
    $("<td>").text(snapshot.val().frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minToArrival),
    );
    $("tbody").append(createRow);
});
function clearForm ()
{
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val(""); 
}
function currentTime() 
{
    var current = moment().format('LT');
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
};
currentTime();