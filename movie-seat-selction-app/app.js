let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.seatTaken)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selMovie = document.getElementById('movie');
let ticketPrice = +selMovie.value;
console.log('ticketPrice :', ticketPrice);

selMovie.addEventListener('change', function (e) {

    ticketPrice = e.target.value
    console.log('ticketPrice :', ticketPrice);
    return ticketPrice
})

const updateCount = () => {
    let selectedSeats = document.querySelectorAll('.row .seat.selected')
    seatsIndex = [...selectedSeats].map(e => [...seats].indexOf(e))
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    console.log('selectSeats :', seatsIndex);
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

const handleClick = (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('seatTaken')) {
        e.target.classList.toggle('selected');
        updateCount()
    }
}

container.addEventListener('click', handleClick)