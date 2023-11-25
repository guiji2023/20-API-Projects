

const setMovieData=(movieIndex, moviePrice)=>{
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);

}


const updateSeatsCount = (count, total, seats) => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsIndex =[...selectedSeats].map((selectedSeat) =>[...seats].indexOf(selectedSeat));

    //store selectedSeatsIndex into localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    let ticketprice = +localStorage.getItem('moviePrice');

    count.innerText = selectedSeats.length;
    total.innerText = "$"+ selectedSeats.length * ticketprice;
}



//get data from localStorage and populate UI
const populateUI =(seats, movieSelected) => {
    const selectedSeatsIndex = JSON.parse( localStorage.getItem('selectedSeats'));
    if(selectedSeatsIndex!==null && selectedSeatsIndex.length >0){
        seats.forEach((seat, index) => {
            if(selectedSeatsIndex.indexOf(index) >-1){
                seat.classList.add('selected');
            }
            
        });

    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const moviePrice = localStorage.getItem('moviePrice');
    if(selectedMovieIndex){
        movieSelected.selectedIndex = selectedMovieIndex;
        movieSelected.value = moviePrice;
    }

}



(() => {

    //select all non occupied seats

    const container = document.querySelector('.container');
    const count = document.querySelector("#count");
    const total = document.querySelector("#total");
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    let movieSelected = document.querySelector("#movie");
    let ticketprice = +movieSelected.value;

    
    // event handler for selecting movie price
    movieSelected.addEventListener('change', (e)=>{
        // to access the index of the option selected (movieSelected)
        // we can do : e.target.selectedIndex
        ticketprice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSeatsCount(count, total, seats);
    });

    // event handler for selecting seats
    container.addEventListener('click', (e) =>{

        // if the clicked seat is has the class seat and does not have the class occupied
        // toggle class selected and update the count and total accordingly
        if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')){
            e.target.classList.toggle('selected');
            updateSeatsCount(count, total, seats);
        }
    });

    populateUI(seats, movieSelected);
    updateSeatsCount(count, total, movieSelected.value, seats);
 



})();